const express = require("express");
const { PollyClient, SynthesizeSpeechCommand } = require("@aws-sdk/client-polly");

const router = express.Router();

// ---------------------------------------------------------------------------
// RAMAJEYAM AI VOICE (backend)
//
// This route synthesizes speech server-side, so:
//   - No third-party client-side script is ever loaded in the browser
//     (nothing like Puter.js, no sign-in/login popup risk for customers).
//   - No API keys/credentials ever reach the browser — they stay in this
//     server's environment (or, for Tamil, no key is needed at all).
//
// LANGUAGE -> PROVIDER
//   english -> Amazon Polly, voice "Kajal" (Indian-English, neural).
//              Needs AWS_ACCESS_KEY_ID / AWS_SECRET_ACCESS_KEY / AWS_REGION
//              in the environment.
//   tamil   -> Google's free public Translate TTS voice ("ta"). Amazon
//              Polly has no Tamil voice at all (confirmed against AWS's
//              own supported-language list — Polly's Indian voices, Kajal
//              and Aditi, only speak Hindi and Indian English). This is
//              the same voice used by the "listen" (speaker) button on
//              translate.google.com — it needs no API key, no Google
//              Cloud account, and no billing, so it's a genuinely free
//              way to get real Tamil speech instead of falling back to
//              whatever (if any) Tamil voice happens to be installed on
//              the visitor's own device.
//
//              Note: this hits an undocumented public Google endpoint, not
//              an official/paid API. It's reliable in practice (it's what
//              powers Google Translate's own speaker icon), but if Google
//              ever changes or rate-limits it, Tamil playback falls over
//              to the browser's own speechSynthesis voice, same as English
//              does if Polly is unreachable. If you later want a
//              guaranteed-SLA Tamil voice, swap synthesizeTamilSpeech()
//              below for Google Cloud TTS or Sarvam.ai — both have real
//              Tamil neural voices, just not for free/keyless.
// ---------------------------------------------------------------------------

const pollyClient = new PollyClient({
  region: process.env.AWS_REGION || "ap-south-1", // Mumbai — closest Polly region to Chennai
  credentials:
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined, // falls back to default AWS credential chain if unset
});

const MAX_CHARS = 3000; // Polly's own per-request text limit
const MAX_TAMIL_CHARS = 2000; // keeps Tamil replies to a handful of Google TTS chunks

async function synthesizeEnglishSpeech(text) {
  const command = new SynthesizeSpeechCommand({
    Text: text,
    OutputFormat: "mp3",
    VoiceId: "Kajal",
    Engine: "neural",
    LanguageCode: "en-IN",
  });

  const result = await pollyClient.send(command);
  if (!result.AudioStream) {
    throw new Error("Polly returned no audio stream");
  }
  // result.AudioStream is a Node.js Readable in the Node runtime — buffer
  // it so both providers return the same shape (a Buffer) to the caller.
  const chunks = [];
  for await (const chunk of result.AudioStream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

// ---- Tamil: free Google Translate TTS ("listen" button) ----

const GOOGLE_TTS_ENDPOINT = "https://translate.google.com/translate_tts";
// Google's public TTS endpoint silently truncates/rejects long input, so
// long replies are split into speech-friendly chunks well under that cap.
const GOOGLE_TTS_CHUNK_LIMIT = 180;
const GOOGLE_TTS_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";

// Splits text into <= GOOGLE_TTS_CHUNK_LIMIT-character pieces on word
// boundaries (falling back to a hard slice for single very long "words",
// e.g. a long Tamil compound with no spaces) so no chunk ever exceeds the
// endpoint's limit.
function splitForGoogleTTS(text) {
  const words = text.split(" ").filter(Boolean);
  const chunks = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= GOOGLE_TTS_CHUNK_LIMIT) {
      current = candidate;
      continue;
    }
    if (current) chunks.push(current);
    current = "";
    let rest = word;
    while (rest.length > GOOGLE_TTS_CHUNK_LIMIT) {
      chunks.push(rest.slice(0, GOOGLE_TTS_CHUNK_LIMIT));
      rest = rest.slice(GOOGLE_TTS_CHUNK_LIMIT);
    }
    current = rest;
  }
  if (current) chunks.push(current);
  return chunks;
}

async function fetchGoogleTTSChunk(chunkText, index, total) {
  const params = new URLSearchParams({
    ie: "UTF-8",
    client: "tw-ob", // the client id Google Translate's own "listen" icon uses
    q: chunkText,
    tl: "ta", // Tamil
    idx: String(index),
    total: String(total),
    textlen: String(chunkText.length),
  });

  const response = await fetch(`${GOOGLE_TTS_ENDPOINT}?${params.toString()}`, {
    headers: {
      "User-Agent": GOOGLE_TTS_USER_AGENT,
      Referer: "https://translate.google.com/",
    },
  });

  if (!response.ok) {
    throw new Error(`Google TTS chunk ${index + 1}/${total} failed with ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

async function synthesizeTamilSpeech(text) {
  const chunks = splitForGoogleTTS(text);
  if (!chunks.length) {
    throw new Error("Nothing to synthesize after splitting Tamil text");
  }

  // Sequential (not parallel) on purpose — this is an unofficial public
  // endpoint, and firing many requests at once is a good way to get
  // temporarily rate-limited.
  const buffers = [];
  for (let i = 0; i < chunks.length; i++) {
    buffers.push(await fetchGoogleTTSChunk(chunks[i], i, chunks.length));
  }
  return Buffer.concat(buffers);
}

// POST /api/voice -> { text: string, language?: "english" | "tamil" } -> audio/mpeg stream
router.post("/", async (req, res) => {
  try {
    const { text, language } = req.body || {};

    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ success: false, message: "text is required" });
    }

    const isTamil = language === "tamil";
    const charLimit = isTamil ? MAX_TAMIL_CHARS : MAX_CHARS;

    const clean = text
      .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "") // strip emoji, both voices mispronounce them
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, charLimit);

    if (!clean) {
      return res.status(400).json({ success: false, message: "text is empty after cleanup" });
    }

    const audioBuffer = isTamil
      ? await synthesizeTamilSpeech(clean)
      : await synthesizeEnglishSpeech(clean);

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "no-store");
    return res.send(audioBuffer);
  } catch (err) {
    console.error("Voice synthesis error:", err);
    return res.status(500).json({
      success: false,
      message: "Voice synthesis failed. The chat still works without audio.",
    });
  }
});

module.exports = router;