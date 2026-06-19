"use client";
import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MessageCircle, BookOpen } from "lucide-react";
import { ConsultationModal } from "./ConsultationModal";

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

export function GetPremiumSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
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
        /* ── Section ── */
        .gps-section {
          background: var(--white);
          overflow: hidden;
          font-family: var(--font);
        }

        /* ── GET bar ── */
        .gps-bar {
          display: flex;
          justify-content: flex-end;
        }
        .gps-bar-inner {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          width: 52%;
          min-height: 96px;
          display: flex;
          align-items: flex-end;
          padding: 0 44px;
        }
        .gps-bar-text {
          font-size: clamp(56px, 8.5vw, 104px);
          font-weight: 900;
          color: rgba(13,18,64,0.15);
          line-height: 1;
          padding: 18px 0;
          letter-spacing: -2px;
          font-family: var(--font2);
          user-select: none;
        }

        /* ── Body ── */
        .gps-body {
          display: flex;
          align-items: flex-start;
          padding: 0 44px 68px;
          flex-wrap: wrap;
          gap: 0;
        }

        /* ── Book image ── */
        .gps-image {
          flex: 0 0 44%;
          margin-top: -64px;
          z-index: 2;
          position: relative;
        }
        .gps-image img {
          width: 100%;
          max-width: 780px;
          height: 800px;
          object-fit: contain;
          filter: drop-shadow(0 24px 48px rgba(0,0,0,0.2));
        }

        /* ── Text ── */
        .gps-text {
          flex: 1;
          padding: 40px 0 0 36px;
          min-width: 280px;
        }
        .gps-text h2 {
          font-family: var(--font2);
          font-size: clamp(24px, 3vw, 38px);
          font-weight: 900;
          color: var(--navy);
          line-height: 1.2;
          margin-bottom: 18px;
        }
        .gps-text h2 span { color: var(--accent); }
        .gps-text p {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.9;
          margin-bottom: 30px;
          max-width: 460px;
        }

        /* ── Contact items ── */
        .gps-contacts {
          display: flex;
          gap: 28px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        .gps-contact-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .gps-contact-icon {
          width: 46px;
          height: 46px;
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--navy);
        }
        .gps-contact-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--accent);
          display: block;
          margin-bottom: 2px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .gps-contact-val {
          font-size: 13px;
          color: var(--navy);
          font-weight: 600;
          display: block;
        }

        /* ── CTAs ── */
        .gps-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .gps-ctas a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Small mobile: ≤ 375px ── */
        @media (max-width: 375px) {
          .gps-bar-inner { width: 100%; padding: 0 16px; }
          .gps-body { flex-direction: column; padding: 0 16px 48px; }
          .gps-image { flex: none; width: 100%; margin-top: -40px; }
          .gps-image img { max-width: 100%; height: 280px; }
          .gps-text { padding: 24px 0 0; }
          .gps-text p { max-width: 100%; }
          .gps-ctas { flex-direction: column; }
          .gps-ctas a { width: 100%; justify-content: center; }
        }

        /* ── Mobile: 376px – 480px ── */
        @media (min-width: 376px) and (max-width: 480px) {
          .gps-bar-inner { width: 100%; padding: 0 20px; }
          .gps-body { flex-direction: column; padding: 0 20px 52px; }
          .gps-image { flex: none; width: 100%; margin-top: -40px; }
          .gps-image img { max-width: 100%; height: 320px; }
          .gps-text { padding: 28px 0 0; }
          .gps-text p { max-width: 100%; }
          .gps-ctas { flex-direction: column; }
          .gps-ctas a { width: 100%; justify-content: center; }
        }

        /* ── Tablet: 481px – 768px ── */
        @media (min-width: 481px) and (max-width: 768px) {
          .gps-bar-inner { width: 65%; padding: 0 32px; }
          .gps-body { flex-direction: column; padding: 0 32px 60px; }
          .gps-image { flex: none; width: 60%; margin-top: -48px; }
          .gps-image img { max-width: 100%; height: 380px; }
          .gps-text { padding: 32px 0 0; }
          .gps-text p { max-width: 100%; }
        }

        /* ── Small laptop: 769px – 1024px ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .gps-bar-inner { width: 54%; padding: 0 36px; }
          .gps-body { padding: 0 36px 60px; }
          .gps-image img { max-width: 440px; height: 460px; }
          .gps-text { padding: 36px 0 0 28px; }
          .gps-text p { max-width: 100%; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .gps-image img { max-width: 500px; height: 520px; }
          .gps-body { padding: 0 44px 64px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .gps-image img { max-width: 680px; height: 600px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .gps-bar-inner { min-height: 112px; padding: 0 64px; }
          .gps-body { padding: 0 64px 80px; }
          .gps-image img { max-width: 780px; height: 700px; }
          .gps-text { padding: 48px 0 0 48px; }
          .gps-text p { font-size: 1.1rem; max-width: 540px; }
          .gps-contact-icon { width: 52px; height: 52px; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .gps-bar-inner { min-height: 130px; padding: 0 96px; }
          .gps-body { padding: 0 96px 100px; }
          .gps-image img { max-width: 820px; height: 860px; }
          .gps-text { padding: 56px 0 0 64px; }
          .gps-text p { font-size: 1.2rem; max-width: 640px; }
          .gps-contact-icon { width: 60px; height: 60px; border-radius: 16px; }
          .gps-contact-label { font-size: 13px; }
          .gps-contact-val { font-size: 15px; }
          .gps-contacts { gap: 36px; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .gps-bar-inner { min-height: 160px; padding: 0 140px; }
          .gps-body { padding: 0 140px 130px; }
          .gps-image img { max-width: 1020px; height: 1060px; }
          .gps-text { padding: 72px 0 0 80px; }
          .gps-text p { font-size: 1.35rem; max-width: 800px; }
          .gps-contact-icon { width: 72px; height: 72px; border-radius: 18px; }
          .gps-contact-label { font-size: 14px; }
          .gps-contact-val { font-size: 17px; }
          .gps-contacts { gap: 48px; margin-bottom: 40px; }
          .gps-ctas { gap: 20px; }
        }
      `}</style>

      <section ref={ref} className="gps-section">

        {/* ── GET bar ── */}
        <div className="gps-bar">
          <div className="gps-bar-inner">
            <span className="gps-bar-text">GET</span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="gps-body">

          {/* book mockup */}
          <div className="gps-image reveal-left">
            <img src="/images/Get-Premium.png" alt="Book mockup" />
          </div>

          {/* text */}
          <div className="gps-text reveal-right">
            <p className="section-eyebrow" style={{ marginBottom: 10 }}>Invictus Publishing</p>
            <h2>
              Take Your Book Beyond the Draft with our Premium{" "}
              <span>Book<br />Publishing</span> Services!
            </h2>
            <p>
              Great stories don&apos;t just get written; they get prepared, presented, and published with Invictus. Call us today to get the free quote.
            </p>

            {/* contact items */}
            <div className="gps-contacts">
              {[
                { icon: <Phone size={20} aria-hidden="true" />, label: "Call Us", val: "(855) 384-7020" },
                { icon: <Mail size={20} aria-hidden="true" />, label: "Discuss your ideas", val: "info@invictuspublishings.com" },
              ].map(({ icon, label, val }) => (
                <div key={label} className="gps-contact-item">
                  <div className="gps-contact-icon">{icon}</div>
                  <div>
                    <span className="gps-contact-label">{label}</span>
                    <span className="gps-contact-val">{val}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="gps-ctas">
              <a href="#" className="btn-accent reveal delay-5" onClick={(e) => { e.preventDefault(); setModalOpen(true); }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <BookOpen size={16} /> Get a free quote for your book projects
              </a>
              <button
                type="button"
                className="btn-navy"
                onClick={openLiveChat}
              >
                <MessageCircle size={16} />
                Live Chat
              </button>
            </div>
          </div>

        </div>
        <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </section>
    </>
  );
}