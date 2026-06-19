"use client";
import { CalendarCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ConsultationModal } from "./ConsultationModal";

export function ProudSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale").forEach(c => c.classList.add("revealed"));
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Section ── */
        .ps-section {
          background: #fff;
          font-family: var(--font);
          display: flex;
          align-items: stretch;
          min-height: 560px;
          overflow: hidden;
        }

        /* ── Left image panel ── */
        .ps-left {
          flex: 0 0 44%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          background: linear-gradient(180deg, #fff 0%, #fef8ec 100%);
          position: relative;
        }
        .ps-left-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
        }
        .ps-left img {
          width: 150%;
          max-width: 800px;
          object-fit: contain;
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.15));
          position: relative;
          z-index: 1;
        }

        /* ── Right text panel ── */
        .ps-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 64px 60px 48px;
        }
        .ps-right h2 {
          color: var(--navy, #0d1240) !important;
          margin-top: 20px;
        }
        .ps-right p {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.9;
          margin-bottom: 16px;
          max-width: 480px;
        }
        .ps-right a {
          align-self: flex-start;
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Small mobile: ≤ 375px ── */
        @media (max-width: 375px) {
          .ps-section { flex-direction: column; min-height: auto; }
          .ps-left { flex: none; padding: 32px 16px 0; justify-content: center; }
          .ps-left img { width: 220px; }
          .ps-right { padding: 28px 16px 40px; }
          .ps-right p { max-width: 100%; font-size: 1rem; }
          .ps-right a { width: 100%; text-align: center; justify-content: center; }
        }

        /* ── Mobile: 376px – 480px ── */
        @media (min-width: 376px) and (max-width: 480px) {
          .ps-section { flex-direction: column; min-height: auto; }
          .ps-left { flex: none; padding: 36px 20px 0; justify-content: center; }
          .ps-left img { width: 260px; }
          .ps-right { padding: 32px 20px 44px; }
          .ps-right p { max-width: 100%; }
        }

        /* ── Tablet: 481px – 768px ── */
        @media (min-width: 481px) and (max-width: 768px) {
          .ps-section { flex-direction: column; min-height: auto; }
          .ps-left { flex: none; padding: 44px 32px 0; justify-content: center; }
          .ps-left img { width: 320px; }
          .ps-right { padding: 40px 32px 56px; }
          .ps-right p { max-width: 100%; }
        }

        /* ── Small laptop: 769px – 1024px ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .ps-section { min-height: 480px; }
          .ps-left { flex: 0 0 44%; padding: 0 16px; }
          .ps-left img { max-width: 520px; }
          .ps-right { padding: 48px 40px 48px 36px; }
          .ps-right p { max-width: 100%; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .ps-section { min-height: 520px; }
          .ps-left img { max-width: 620px; }
          .ps-right { padding: 56px 56px 56px 44px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .ps-left img { max-width: 850px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .ps-section { min-height: 640px; }
          .ps-left { flex: 0 0 46%; }
          .ps-left img { max-width: 900px; }
          .ps-right { padding: 72px 80px 72px 56px; }
          .ps-right p { font-size: 1.1rem; max-width: 560px; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .ps-section { min-height: 780px; }
          .ps-left { flex: 0 0 46%; }
          .ps-left img { max-width: 860px; }
          .ps-right { padding: 88px 120px 88px 72px; }
          .ps-right p { font-size: 1.2rem; max-width: 680px; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .ps-section { min-height: 980px; }
          .ps-left img { max-width: 1060px; }
          .ps-right { padding: 110px 160px 110px 96px; }
          .ps-right p { font-size: 1.35rem; max-width: 860px; }
        }
      `}</style>

      <section ref={ref} className="ps-section">

        {/* ── Left ── */}
        <div className="ps-left reveal-left">
          <div className="ps-left-bar" />
          <img src="/images/Proud.png" alt="Published Books Stack" />
        </div>

        {/* ── Right ── */}
        <div className="ps-right reveal-right">
          <div className="nybp-badge reveal delay-1">Invictus Empowers Authors</div>
          <h2 className="section-title reveal delay-2">
            WE FINDS PURPOSE IN <br />EVERY MANUSCRIPT WE DEVELOP
          </h2>
          <p className="reveal delay-3">
            Every author has a unique story, we&apos;ve supported countless creators in transforming their ideas into professionally published books. We help authors refine their work, strengthen their presentation, and confidently move toward publication with professional support from start to finish. So, why wait to share the story only you can tell?
          </p>
          <a href="#" className="btn-accent reveal delay-4" onClick={(e) => { e.preventDefault(); setModalOpen(true); }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <CalendarCheck size={16} />Get a free quote for your book projects
          </a>
        </div>
        <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </section>
    </>
  );
}