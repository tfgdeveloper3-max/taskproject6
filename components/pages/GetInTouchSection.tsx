"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Phone, MessageCircle } from "lucide-react";

declare global {
  interface Window {
    LiveChatWidget: any;
    LC_API: any;
  }
}

function openLiveChat() {
  if (typeof window === "undefined") return;
  if (window.LiveChatWidget) {
    window.LiveChatWidget.call("maximize");
    return;
  }
  const lc = (window as any).LC_API;
  if (lc && typeof lc.open_chat_window === "function") {
    lc.open_chat_window();
    return;
  }
  const selectors = [
    "#chat-widget-container button",
    "[id^='chat-widget']",
    "iframe[title*='chat' i]",
  ];
  for (const sel of selectors) {
    const el = document.querySelector<HTMLElement>(sel);
    if (el) { el.click(); return; }
  }
}

const services = [
  "Ghostwriting Services",
  "Book Editing Services",
  "Book Cover Design Services",
  "Book Publishing Services",
  "Video Trailer Services",
  "Book Marketing Services",
  "Illustration Design Services",
  "Book Events Participation",
];

export function GetInTouchSection() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://leads.authorpublishers.us/api/lead/QoihAxdBb1nYBCKZ28lYvey1wJgbJELf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: form.name,
          Email: form.email,
          "Phone Number": form.phone,
          "Service Name": form.service,
          Message: form.message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
        router.push("/thank-you");
      } else {
        setError(data?.message || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach(c => c.classList.add("revealed"));
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .git-wrap {
          font-family: var(--font);
          background: var(--white);
        }

        .git-cta {
          text-align: center;
          padding: 68px 24px 52px;
          border-bottom: 1px solid #f0f0f0;
        }
        .git-cta h2 { color: var(--navy, #0d1240) !important; }
        .git-cta h3 {
          font-size: clamp(15px, 2vw, 22px);
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 16px;
          line-height: 1.4;
        }
        .git-cta p {
          font-size: 1rem;
          color: #666;
          line-height: 1.85;
          max-width: 500px;
          margin: 0 auto 32px;
        }
        .git-cta-btns {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .git-cta-btns a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .git-body {
          padding: 68px 48px 80px;
          display: flex;
          gap: 44px;
          align-items: flex-start;
          max-width: 1100px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        .git-img-col {
          flex: 0 0 460px;
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: stretch;
          min-height: 100%;
        }
        .git-img-col img {
          width: 100%;
          height: 100%;
          min-height: 540px;
          object-fit: contain;
          filter: drop-shadow(0 12px 32px rgba(0,0,0,0.12));
        }

        .git-form-col {
          flex: 1;
          min-width: 280px;
        }
        .git-form-col h3 {
          color: var(--navy, #0d1240) !important;
          margin-bottom: 28px;
        }
        .git-fields {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .git-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .git-select {
          width: 100%;
          border: 1.5px solid #dde1e7;
          border-radius: var(--radius-md);
          padding: 13px 16px;
          font-size: 14px;
          font-family: var(--font);
          color: #222;
          background: #f8fafc;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23aab0bc' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 12px;
          cursor: pointer;
        }
        .git-select:focus {
          border-color: var(--accent);
          background-color: #fff;
          box-shadow: 0 0 0 4px rgba(240,165,0,0.12);
        }
        .git-select option[value=""] { color: #aab0bc; }

        .git-error {
          background: #fff5f5;
          border: 1.5px solid #f44336;
          border-radius: var(--radius-md);
          padding: 12px 16px;
          color: #c62828;
          font-size: 13px;
        }

        .git-submit {
          align-self: flex-start;
          border-radius: var(--radius-pill);
          padding: 14px 48px;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          cursor: pointer;
          opacity: 1;
          transition: opacity 0.2s;
        }
        .git-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        @media (max-width: 375px) {
          .git-cta { padding: 44px 16px 36px; }
          .git-cta-btns { flex-direction: column; align-items: center; }
          .git-cta-btns a { width: 100%; justify-content: center; }
          .git-body { padding: 40px 16px 56px; gap: 28px; flex-direction: column; }
          .git-img-col { flex: none; width: 100%; }
          .git-img-col img { height: 260px; max-width: 260px; margin: 0 auto; display: block; }
          .git-grid { grid-template-columns: 1fr; }
          .git-submit { width: 100%; justify-content: center; }
        }

        @media (min-width: 376px) and (max-width: 480px) {
          .git-cta { padding: 48px 18px 40px; }
          .git-cta-btns { flex-direction: column; align-items: center; }
          .git-cta-btns a { width: 100%; justify-content: center; }
          .git-body { padding: 44px 18px 60px; gap: 28px; flex-direction: column; }
          .git-img-col { flex: none; width: 100%; }
          .git-img-col img { height: 300px; max-width: 300px; margin: 0 auto; display: block; }
          .git-grid { grid-template-columns: 1fr; }
          .git-submit { width: 100%; justify-content: center; }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          .git-cta { padding: 52px 24px 44px; }
          .git-body { padding: 52px 28px 68px; flex-direction: column; gap: 32px; }
          .git-img-col { flex: none; width: 100%; }
          .git-img-col img { height: 360px; max-width: 360px; margin: 0 auto; display: block; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .git-body { padding: 56px 36px 72px; max-width: 900px; gap: 36px; }
          .git-img-col { flex: 0 0 340px; }
          .git-img-col img { min-height: 460px; }
        }

        @media (min-width: 1025px) and (max-width: 1280px) {
          .git-body { padding: 60px 44px 76px; max-width: 1000px; }
          .git-img-col { flex: 0 0 400px; }
          .git-img-col img { min-height: 500px; }
        }

        @media (min-width: 1281px) and (max-width: 1600px) {
          .git-body { max-width: 1100px; }
          .git-img-col { flex: 0 0 460px; }
          .git-img-col img { min-height: 540px; }
        }

        @media (min-width: 1601px) and (max-width: 1920px) {
          .git-cta { padding: 80px 32px 64px; }
          .git-cta p { font-size: 1.05rem; max-width: 620px; }
          .git-body { padding: 80px 60px 96px; max-width: 1380px; gap: 56px; }
          .git-img-col { flex: 0 0 560px; }
          .git-img-col img { min-height: 640px; }
        }

        @media (min-width: 1921px) and (max-width: 2560px) {
          .git-cta { padding: 96px 40px 80px; }
          .git-cta p { font-size: 1.1rem; max-width: 760px; }
          .git-body { padding: 96px 80px 120px; max-width: 1760px; gap: 72px; }
          .git-img-col { flex: 0 0 700px; }
          .git-img-col img { min-height: 800px; }
          .git-fields { gap: 18px; }
        }

        @media (min-width: 2561px) {
          .git-cta { padding: 120px 60px 100px; }
          .git-cta p { font-size: 1.2rem; max-width: 960px; }
          .git-body { padding: 120px 120px 160px; max-width: 2300px; gap: 96px; }
          .git-img-col { flex: 0 0 900px; }
          .git-img-col img { min-height: 1000px; }
          .git-fields { gap: 22px; }
          .git-submit { padding: 18px 64px; font-size: 16px; }
        }
      `}</style>

      <div ref={ref} className="git-wrap" id="contact">

        {/* ── Top CTA ── */}
        <div className="git-cta reveal">
          <p className="section-eyebrow">Contact Us</p>
          <h2 className="section-title">Let&apos;s Talk About Your Book</h2>
          <h3>Reach Out to Invictus Publishing for Professional Author Solutions</h3>
          <p>Get in touch and start building your path toward professional publishing success.</p>
          <div className="git-cta-btns">
            <button
              type="button"
              className="btn-accent"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              onClick={openLiveChat}
            >
              <MessageCircle size={16} />
              Chat With Experts
            </button>
            <a href="tel:2797770367" className="btn-navy">
              <Phone size={16} aria-hidden="true" /> (279) 777-0367
            </a>
          </div>
        </div>

        {/* ── Form body ── */}
        <div className="git-body">

          {/* image */}
          <div className="git-img-col reveal-left">
            <img src="/images/StepInto.png" alt="Books" />
          </div>

          {/* form */}
          <div className="git-form-col reveal-right">
            <h3 className="section-title">Ready To Discuss Your Story?</h3>

            <div className="git-fields">
              <input
                className="nybp-input"
                name="name"
                placeholder="Enter Your Name *"
                value={form.name}
                onChange={handle}
              />
              <div className="git-grid">
                <input
                  className="nybp-input"
                  name="email"
                  type="email"
                  placeholder="Enter Your Email *"
                  value={form.email}
                  onChange={handle}
                />
                <input
                  className="nybp-input"
                  name="phone"
                  type="tel"
                  placeholder="Enter Phone Number *"
                  value={form.phone}
                  onChange={handle}
                />
              </div>

              <select
                className="git-select"
                name="service"
                value={form.service}
                onChange={handle}
              >
                <option value="">Select a Service</option>
                {services.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>

              <textarea
                className="nybp-input"
                name="message"
                placeholder="Enter Message"
                value={form.message}
                onChange={handle}
                style={{ minHeight: 130 }}
              />

              {error && <div className="git-error">{error}</div>}

              <button
                className="btn-navy git-submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Sending..." : "Get Started"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}