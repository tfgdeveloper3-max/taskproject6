"use client";
import { useEffect, useRef } from "react";

export function WatchSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll(".reveal").forEach(c => c.classList.add("revealed"));
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Section ── */
        .ws-section {
          background: var(--gradient-dark);
          padding: 80px 60px;
          text-align: center;
          overflow: hidden;
          font-family: var(--font);
          min-height: 420px;
          position: relative;
        }

        /* ── Background layer ── */
        .ws-bg {
          position: absolute;
          inset: 0;
          background-image: url('/images/discover-layer-2.png');
          background-size: cover;
          background-position: center;
          opacity: 0.9;
          pointer-events: none;
        }

        /* ── Inner content ── */
        .ws-inner {
          position: relative;
          z-index: 1;
          max-width: 1000px;
          margin: 0 auto;
        }

        .ws-inner h2 {
          font-family: var(--font2);
          font-size: clamp(22px, 3.5vw, 40px);
          font-weight: 800;
          color: var(--accent);
          line-height: 1.25;
          margin-bottom: 24px;
        }

        .ws-inner p {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.88;
          max-width: 900px;
          margin: 0 auto 44px;
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Small mobile: ≤ 375px ── */
        @media (max-width: 375px) {
          .ws-section { padding: 48px 16px; min-height: auto; }
          .ws-inner p { font-size: 1rem; margin-bottom: 32px; }
        }

        /* ── Mobile: 376px – 480px ── */
        @media (min-width: 376px) and (max-width: 480px) {
          .ws-section { padding: 52px 20px; min-height: auto; }
          .ws-inner p { margin-bottom: 36px; }
        }

        /* ── Tablet: 481px – 768px ── */
        @media (min-width: 481px) and (max-width: 768px) {
          .ws-section { padding: 60px 32px; min-height: auto; }
          .ws-inner { max-width: 100%; }
        }

        /* ── Small laptop: 769px – 1024px ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .ws-section { padding: 68px 40px; }
          .ws-inner { max-width: 860px; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .ws-section { padding: 72px 48px; }
          .ws-inner { max-width: 960px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .ws-section { padding: 80px 60px; }
          .ws-inner { max-width: 1000px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .ws-section { padding: 96px 80px; min-height: 500px; }
          .ws-inner { max-width: 1200px; }
          .ws-inner h2 { font-size: clamp(32px, 3vw, 48px); }
          .ws-inner p { font-size: 1.15rem; max-width: 1060px; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .ws-section { padding: 112px 120px; min-height: 580px; }
          .ws-inner { max-width: 1500px; }
          .ws-inner h2 { font-size: clamp(40px, 2.8vw, 60px); }
          .ws-inner p { font-size: 1.2rem; max-width: 1300px; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .ws-section { padding: 140px 160px; min-height: 720px; }
          .ws-inner { max-width: 1900px; }
          .ws-inner h2 { font-size: clamp(56px, 2.5vw, 80px); }
          .ws-inner p { font-size: 1.35rem; max-width: 1700px; margin-bottom: 60px; }
        }
      `}</style>

      <section ref={ref} className="ws-section">
        <div className="ws-bg" />

        <div className="ws-inner">
          <p className="section-eyebrow reveal">PUBLISHING WITHOUT COMPLEXITY</p>
          <h2 className="reveal delay-1">
            Let&apos;s See How Effortless Book Publishing Can Be With Us
          </h2>
          <p className="reveal delay-2">
            At INVICTUS PUBLISHING, we simplify the entire journey from idea to published book. From shaping your manuscript and refining your writing, to professional editing, cover design, formatting, ISBN setup, and global distribution, we handle every stage with precision so your book reaches readers without confusion or delay.
          </p>
          <a href="#contact" className="btn-accent reveal delay-3">Make Your Book Official Today!</a>
        </div>
      </section>
    </>
  );
}