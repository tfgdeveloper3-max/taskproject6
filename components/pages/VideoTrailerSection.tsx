"use client";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, BookOpen } from "lucide-react";
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

export function VideoTrailerSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll(".reveal,.reveal-scale").forEach(c => c.classList.add("revealed"));
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Section ── */
        .vts-section {
          position: relative;
          overflow: hidden;
          padding: 88px 40px;
          font-family: var(--font);
          text-align: center;
          background: var(--gradient-dark);
        }

        /* ── BG layers ── */
        .vts-bg-img {
          position: absolute; inset: 0;
          background-image: url('/images/trailer-bg.webp');
          background-size: cover;
          background-position: center;
          opacity: 0.07;
          pointer-events: none;
        }
        .vts-bg-overlay {
          position: absolute; inset: 0;
          background: rgba(7,9,30,0.78);
          pointer-events: none;
        }

        /* ── Rings ── */
        .vts-ring {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          pointer-events: none;
        }
        .vts-ring-1 { width: 600px; height: 600px; border: 1px solid rgba(240,165,0,0.06); animation: pulse-ring 5s ease-out infinite; }
        .vts-ring-2 { width: 400px; height: 400px; border: 1px solid rgba(240,165,0,0.09); animation: pulse-ring 5s 1.5s ease-out infinite; }

        /* ── Inner content ── */
        .vts-inner {
          position: relative;
          z-index: 2;
          max-width: 800px;
          margin: 0 auto;
        }
        .vts-inner h2 {
          font-family: var(--font2);
          margin-bottom: 20px;
        }
        .vts-inner > p {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.88;
          margin: 0 auto 40px;
          max-width: 680px;
        }

        /* ── Video frame ── */
        .vts-video {
          width: 100%;
          max-width: 540px;
          margin: 0 auto 44px;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0,0,0,0.6);
          aspect-ratio: 16/9;
          background: #000;
          border: 2px solid rgba(240,165,0,0.3);
        }

        /* ── CTAs ── */
        .vts-ctas {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .vts-ctas a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Small mobile: ≤ 375px ── */
        @media (max-width: 375px) {
          .vts-section { padding: 52px 16px; }
          .vts-ring-1 { width: 280px; height: 280px; }
          .vts-ring-2 { width: 180px; height: 180px; }
          .vts-inner { max-width: 100%; }
          .vts-inner > p { font-size: 1rem; max-width: 100%; }
          .vts-video { max-width: 100%; margin-bottom: 32px; }
          .vts-ctas { flex-direction: column; align-items: center; }
          .vts-ctas a { width: 100%; justify-content: center; }
        }

        /* ── Mobile: 376px – 480px ── */
        @media (min-width: 376px) and (max-width: 480px) {
          .vts-section { padding: 56px 20px; }
          .vts-ring-1 { width: 320px; height: 320px; }
          .vts-ring-2 { width: 210px; height: 210px; }
          .vts-inner > p { max-width: 100%; }
          .vts-video { max-width: 100%; margin-bottom: 36px; }
          .vts-ctas { flex-direction: column; align-items: center; }
          .vts-ctas a { width: 100%; justify-content: center; }
        }

        /* ── Tablet: 481px – 768px ── */
        @media (min-width: 481px) and (max-width: 768px) {
          .vts-section { padding: 64px 28px; }
          .vts-ring-1 { width: 420px; height: 420px; }
          .vts-ring-2 { width: 280px; height: 280px; }
          .vts-video { max-width: 480px; }
        }

        /* ── Small laptop: 769px – 1024px ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .vts-section { padding: 72px 36px; }
          .vts-inner { max-width: 720px; }
          .vts-video { max-width: 500px; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .vts-section { padding: 80px 40px; }
          .vts-inner { max-width: 760px; }
          .vts-video { max-width: 520px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .vts-inner { max-width: 800px; }
          .vts-video { max-width: 540px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .vts-section { padding: 104px 60px; }
          .vts-ring-1 { width: 760px; height: 760px; }
          .vts-ring-2 { width: 520px; height: 520px; }
          .vts-inner { max-width: 980px; }
          .vts-inner > p { font-size: 1.15rem; max-width: 820px; }
          .vts-video { max-width: 660px; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .vts-section { padding: 120px 80px; }
          .vts-ring-1 { width: 960px; height: 960px; }
          .vts-ring-2 { width: 660px; height: 660px; }
          .vts-inner { max-width: 1200px; }
          .vts-inner > p { font-size: 1.2rem; max-width: 1000px; }
          .vts-video { max-width: 820px; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .vts-section { padding: 160px 120px; }
          .vts-ring-1 { width: 1200px; height: 1200px; }
          .vts-ring-2 { width: 820px; height: 820px; }
          .vts-inner { max-width: 1560px; }
          .vts-inner > p { font-size: 1.35rem; max-width: 1300px; margin-bottom: 56px; }
          .vts-video { max-width: 1060px; margin-bottom: 60px; }
          .vts-ctas { gap: 24px; }
        }
      `}</style>

      <section ref={ref} className="vts-section">
        <div className="vts-bg-img" />
        <div className="vts-bg-overlay" />
        <div className="vts-ring vts-ring-1" />
        <div className="vts-ring vts-ring-2" />

        <div className="vts-inner">
          <p className="section-eyebrow reveal">Featured in Times Square, NYC</p>
          <h2 className="section-title-accent reveal delay-1">
            A Celebration of Authors on a Global Stage —&nbsp;
            <br />See Your Story on the World&apos;s Biggest Stage With Invictus
          </h2>
          <p className="reveal delay-2">
            We bring your publishing journey to life on one of the most iconic screens in the world — Times Square, New York!
          </p>

          {/* video frame */}
          <div className="vts-video reveal-scale delay-3" />

          <div className="vts-ctas">
            <button
              type="button"
              className="btn-outline-white"
              onClick={openLiveChat}
            >
              <MessageCircle size={16} />
              Let&apos;s Discuss
            </button>
            <a href="#" className="btn-accent reveal delay-5" onClick={(e) => { e.preventDefault(); setModalOpen(true); }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <BookOpen size={16} /> Create Your Book&apos;s Future
            </a>
          </div>
        </div>
        <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </section>
    </>
  );
}