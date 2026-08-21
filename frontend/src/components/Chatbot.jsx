import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FLOW, STRINGS, START_NODE } from "../data/chatFlow.js";
import "./Chatbot.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const BRAND_LOGO =
  "https://res.cloudinary.com/ds4i8pujs/image/upload/v1787234846/blingcrm/RMJ-removebg-preview_hn4mxb.png";

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
function makeUserMessage(text) {
  return { id: `${Date.now()}_${Math.random()}`, sender: "user", text };
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
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentNodeId, setCurrentNodeId] = useState(START_NODE);
  const [language, setLanguage] = useState("english");
  const [pendingQueryType, setPendingQueryType] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [file, setFile] = useState(null);
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
    setMessages((prev) => [...prev, makeUserMessage(option.label)]);

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    // multipart/form-data so the optional attachment can travel with the
    // rest of the fields in one request. Backend needs multer wired up
    // (upload.single("attachment")) to receive this correctly.
    const formData = new FormData();
    formData.append("sessionId", sessionId.current);
    formData.append("language", language);
    formData.append("queryType", pendingQueryType || "general");

    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (file) {
      formData.append("attachment", file);
    }

    try {
      await axios.post(`${API_BASE_URL}/queries`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      let summaryText = Object.entries(formValues)
        .filter(([, v]) => v)
        .map(([, v]) => v)
        .join(" | ");

      if (file) summaryText += ` | [Attached: ${file.name}]`;

      setMessages((prev) => [
        ...prev,
        makeUserMessage(summaryText || "(details submitted)"),
      ]);
      setFormValues({});
      setFile(null);
      const nextId = FLOW.query_form.next;
      setCurrentNodeId(nextId);
    } catch (err) {
      console.error(err);
      setError(
        "Something went wrong while saving your details. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    setMessages([]);
    setFormValues({});
    setFile(null);
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
              {node.options.map((opt) => (
                <button
                  key={opt.label}
                  className="rj-option-chip"
                  onClick={() => handleOptionClick(opt)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {!typing && node?.type === "form" && (
            <form className="rj-form" onSubmit={handleFormSubmit}>
              <div className="rj-form-title">Order details</div>
              {node.fields.map((field) => (
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
              ))}

              <label className="rj-form-field">
                <span>Upload Image/File (Optional)</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                />
                {file && (
                  <span className="rj-file-chip">
                    📎 {file.name}
                    <button
                      type="button"
                      className="rj-file-remove"
                      onClick={() => setFile(null)}
                      aria-label="Remove attached file"
                    >
                      ✕
                    </button>
                  </span>
                )}
              </label>

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