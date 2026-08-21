import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FLOW, STRINGS, START_NODE, PRODUCTS } from "../data/chatFlow.js";
import "./Chatbot.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const BRAND_LOGO =
  "https://res.cloudinary.com/ds4i8pujs/image/upload/v1787234846/blingcrm/RMJ-removebg-preview_hn4mxb.png";

const MAX_ATTACHMENT_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_ATTACHMENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
];

function getSessionId() {
  let id = sessionStorage.getItem("rj_chat_session_id");
  if (!id) {
    id = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem("rj_chat_session_id", id);
  }
  return id;
}

function makeBotMessage(text) {
  return { id: `${Date.now()}_${Math.random()}`, sender: "bot", text };
}
function makeUserMessage(text, extra = {}) {
  return { id: `${Date.now()}_${Math.random()}`, sender: "user", text, ...extra };
}

// Kept the GrainIcon for the subtle background watermark field
function GrainIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 1.5c4.5 3 7 7.2 7 11.2 0 4.2-3.1 9.8-7 9.8s-7-5.6-7-9.8c0-4 2.5-8.2 7-11.2Z"
        fill="currentColor"
      />
      <path
        d="M12 2.5c0 6-.4 12-1.6 19"
        fill="none"
        stroke="rgba(0,0,0,0.18)"
        strokeWidth="0.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Rice-bag illustration used when a platform doesn't allow us to source a
// real product photo (e.g. Blinkit / Amazon block scraping). Drawn to match
// the brand palette so it still looks intentional, not like a broken image.
function RiceBagIllustration({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="rjBagGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--rj-husk-soft)" />
          <stop offset="100%" stopColor="var(--rj-husk)" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="120" height="120" rx="0" fill="url(#rjBagGrad)" />
      <path
        d="M40 30h40l6 12c4 8 6 16 6 26 0 22-15 38-32 38s-32-16-32-38c0-10 2-18 6-26z"
        fill="#fff"
        opacity="0.92"
      />
      <path
        d="M46 30l-2-10a8 8 0 0 1 8-9h16a8 8 0 0 1 8 9l-2 10"
        fill="none"
        stroke="var(--rj-soil)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line x1="44" y1="44" x2="76" y2="44" stroke="rgba(107,66,38,0.25)" strokeWidth="2" />
      <ellipse cx="52" cy="66" rx="4.5" ry="7" fill="var(--rj-paddy)" opacity="0.85" transform="rotate(-18 52 66)" />
      <ellipse cx="64" cy="72" rx="4.5" ry="7" fill="var(--rj-paddy-deep)" opacity="0.85" transform="rotate(10 64 72)" />
      <ellipse cx="72" cy="58" rx="4.5" ry="7" fill="var(--rj-paddy)" opacity="0.85" transform="rotate(-32 72 58)" />
      <ellipse cx="58" cy="54" rx="4.5" ry="7" fill="var(--rj-husk)" opacity="0.9" transform="rotate(20 58 54)" />
    </svg>
  );
}

function TypingBubble() {
  return (
    <div className="rj-bubble rj-bubble-bot rj-typing" aria-label="Typing">
      <span />
      <span />
      <span />
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [currentNodeId, setCurrentNodeId] = useState(START_NODE);
  const [language, setLanguage] = useState("english");
  const [pendingQueryType, setPendingQueryType] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [attachment, setAttachment] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [attachmentError, setAttachmentError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [typing, setTyping] = useState(false);
  const sessionId = useRef(getSessionId());
  const bottomRef = useRef(null);

  const t = STRINGS[language];

  useEffect(() => {
    if (!open) return;
    const node = FLOW[currentNodeId];
    if (!node) return;

    setTyping(true);
    const delay = messages.length === 0 ? 250 : 500;
    const timer = setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, makeBotMessage(node.text(t))]);
    }, delay);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNodeId, open, language]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    if (messages.length === 0) {
      setCurrentNodeId(START_NODE);
    }
  };

  const handleOptionClick = (option) => {
    // Get label text - handle both string and function labels
    const labelText = typeof option.label === "function" ? option.label(t) : option.label;
    setMessages((prev) => [...prev, makeUserMessage(labelText)]);

    if (option.value) {
      setLanguage(option.value);
    }
    if (option.queryType) {
      setPendingQueryType(option.queryType);
    }

    if (option.link) {
      window.open(option.link, "_blank", "noopener,noreferrer");
      return;
    }

    if (option.next) {
      setCurrentNodeId(option.next);
    }
  };

  const handleFormChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const clearAttachment = () => {
    setAttachment(null);
    setAttachmentPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setAttachmentError("");
  };

  const handleAttachmentChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file later
    if (!file) return;

    if (!ALLOWED_ATTACHMENT_TYPES.includes(file.type)) {
      setAttachmentError(t.attachmentBadType);
      return;
    }
    if (file.size > MAX_ATTACHMENT_SIZE) {
      setAttachmentError(t.attachmentTooLarge);
      return;
    }

    setAttachmentError("");
    setAttachmentPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
    });
    setAttachment(file);
  };

  // Revoke any object URL on unmount to avoid leaking memory.
  useEffect(() => {
    return () => {
      if (attachmentPreview) URL.revokeObjectURL(attachmentPreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (attachmentError) return;
    setSubmitting(true);
    setError("");
    try {
      const payload = new FormData();
      payload.append("sessionId", sessionId.current);
      payload.append("language", language);
      payload.append("queryType", pendingQueryType || "general");
      Object.entries(formValues).forEach(([key, value]) => {
        if (value) payload.append(key, value);
      });
      if (attachment) {
        payload.append("attachment", attachment);
      }

      const response = await axios.post(`${API_BASE_URL}/queries`, payload);
      const savedAttachmentUrl = response?.data?.data?.attachmentUrl || null;

      const summaryParts = Object.entries(formValues)
        .filter(([, v]) => v)
        .map(([, v]) => v);

      setMessages((prev) => [
        ...prev,
        makeUserMessage(summaryParts.join(" | ") || "(details submitted)", {
          attachmentUrl: savedAttachmentUrl,
          attachmentName: attachment?.name,
          attachmentIsImage: attachment
            ? attachment.type.startsWith("image/")
            : /\.(jpe?g|png|webp|gif)$/i.test(savedAttachmentUrl || ""),
        }),
      ]);
      setFormValues({});
      clearAttachment();
      const nextId = FLOW.query_form.next;
      setCurrentNodeId(nextId);
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          "Something went wrong while saving your details. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    setMessages([]);
    setFormValues({});
    clearAttachment();
    setPendingQueryType(null);
    setLanguage("english");
    setCurrentNodeId(START_NODE);
  };

  if (!open) {
    return (
      <button className="rj-chat-fab" onClick={handleOpen}>
        <img src={BRAND_LOGO} alt="Ramajeyam Logo" className="rj-fab-logo" />
        <span>Chat with us</span>
      </button>
    );
  }

  const node = FLOW[currentNodeId];

  return (
    <div className="rj-chat-fullscreen" role="dialog" aria-modal="true">
      <div className="rj-grain-field" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <GrainIcon key={i} className={`rj-grain-deco rj-grain-deco-${i}`} />
        ))}
      </div>

      <div className="rj-chat-header">
        <div className="rj-header-brand">
          <span className="rj-header-badge">
            <img src={BRAND_LOGO} alt="Brand Logo" className="rj-brand-img" />
          </span>
          <div className="rj-header-copy">
            <span className="rj-header-title">Ramajeyam Rice Support</span>
            <span className="rj-header-subtitle">
              Field to kitchen, we're here to help
            </span>
          </div>
        </div>
        <div className="rj-header-actions">
          <button
            className="rj-header-btn"
            onClick={handleRestart}
            title="Start over"
            aria-label="Start over"
          >
            ↺
          </button>
          <button
            className="rj-header-btn rj-header-btn-close"
            onClick={() => setOpen(false)}
            title="Close"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="rj-chat-body">
        <div className="rj-chat-scroll">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`rj-msg-row rj-msg-row-${m.sender}`}
            >
              {m.sender === "bot" && (
                <span className="rj-avatar">
                  <img src={BRAND_LOGO} alt="Bot" className="rj-brand-img" />
                </span>
              )}
              <div className={`rj-bubble rj-bubble-${m.sender}`}>
                {m.text}
                {m.attachmentUrl && (
                  <div className="rj-bubble-attachment">
                    {m.attachmentIsImage ? (
                      <a
                        href={m.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={m.attachmentUrl}
                          alt={m.attachmentName || "Attachment"}
                          className="rj-bubble-attachment-img"
                        />
                      </a>
                    ) : (
                      <a
                        href={m.attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rj-bubble-attachment-file"
                      >
                        📄 {m.attachmentName || "View attachment"}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className="rj-msg-row rj-msg-row-bot">
              <span className="rj-avatar">
                <img src={BRAND_LOGO} alt="Bot" className="rj-brand-img" />
              </span>
              <TypingBubble />
            </div>
          )}

          {!typing && node?.type === "options" && (
            <div className="rj-options">
              {node.options.map((opt) => {
                // Get label text - handle both string and function labels
                const labelText = typeof opt.label === "function" ? opt.label(t) : opt.label;
                return (
                  <button
                    key={labelText}
                    className="rj-option-chip"
                    onClick={() => handleOptionClick(opt)}
                  >
                    {labelText}
                  </button>
                );
              })}
            </div>
          )}

          {!typing && node?.type === "products" && (
            <>
              <div className={`rj-product-grid rj-accent-${node.accent || ""}`}>
                {PRODUCTS[node.platform]?.items.map((p) => (
                  <div className="rj-product-card" key={p.url}>
                    <div className="rj-product-media">
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.name}
                          className="rj-product-photo"
                          loading="lazy"
                        />
                      ) : (
                        <RiceBagIllustration className="rj-product-illustration" />
                      )}
                      <span className="rj-product-platform-badge">
                        {PRODUCTS[node.platform]?.label}
                      </span>
                    </div>
                    <div className="rj-product-info">
                      <div className="rj-product-name">{p.name}</div>
                      <button
                        className="rj-product-btn"
                        onClick={() =>
                          window.open(p.url, "_blank", "noopener,noreferrer")
                        }
                      >
                        {t.viewProduct} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {PRODUCTS[node.platform]?.moreLink && (
                <a
                  className="rj-more-link"
                  href={PRODUCTS[node.platform].moreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.moreProducts} →
                </a>
              )}

              <div className="rj-options">
                <button
                  className="rj-option-chip"
                  onClick={() => setCurrentNodeId("main_menu")}
                >
                  {t.goBack}
                </button>
              </div>
            </>
          )}

          {!typing && node?.type === "form" && (
            <form className="rj-form" onSubmit={handleFormSubmit}>
              <div className="rj-form-title">Order details</div>
              {node.fields.map((field) =>
                field.type === "file" ? (
                  <div key={field.key} className="rj-form-field">
                    <span>{t[field.labelKey]}</span>

                    {!attachment ? (
                      <label className="rj-file-dropzone">
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                          onChange={handleAttachmentChange}
                        />
                        <span className="rj-file-dropzone-icon">📎</span>
                        <span className="rj-file-dropzone-text">
                          {t.attachmentChoose}
                        </span>
                        <span className="rj-file-dropzone-hint">
                          {t.attachmentHint}
                        </span>
                      </label>
                    ) : (
                      <div className="rj-file-preview">
                        {attachmentPreview ? (
                          <img
                            src={attachmentPreview}
                            alt={attachment.name}
                            className="rj-file-preview-thumb"
                          />
                        ) : (
                          <span className="rj-file-preview-icon">📄</span>
                        )}
                        <div className="rj-file-preview-info">
                          <span className="rj-file-preview-name">
                            {attachment.name}
                          </span>
                          <span className="rj-file-preview-size">
                            {(attachment.size / 1024).toFixed(0)} KB
                          </span>
                        </div>
                        <label className="rj-file-change-btn">
                          {t.attachmentChange}
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
                            onChange={handleAttachmentChange}
                          />
                        </label>
                        <button
                          type="button"
                          className="rj-file-remove-btn"
                          onClick={clearAttachment}
                          aria-label={t.attachmentRemove}
                        >
                          ✕
                        </button>
                      </div>
                    )}
                    {attachmentError && (
                      <div className="rj-error">{attachmentError}</div>
                    )}
                  </div>
                ) : (
                  <label key={field.key} className="rj-form-field">
                    <span>{t[field.labelKey]}</span>
                    {field.multiline ? (
                      <textarea
                        value={formValues[field.key] || ""}
                        onChange={(e) =>
                          handleFormChange(field.key, e.target.value)
                        }
                        rows={3}
                      />
                    ) : (
                      <input
                        type={field.inputType || "text"}
                        value={formValues[field.key] || ""}
                        onChange={(e) =>
                          handleFormChange(field.key, e.target.value)
                        }
                      />
                    )}
                  </label>
                )
              )}
              {error && <div className="rj-error">{error}</div>}
              <button
                type="submit"
                className="rj-submit-btn"
                disabled={submitting}
              >
                {submitting ? "Sending..." : t.submit}
              </button>
            </form>
          )}

          {!typing && node?.type === "end" && (
            <div className="rj-options">
              <button className="rj-option-chip" onClick={handleRestart}>
                {t.restart}
              </button>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}