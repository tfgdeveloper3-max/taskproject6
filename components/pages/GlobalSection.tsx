"use client";
import { useEffect, useRef, useState } from "react";
import { Phone, CalendarCheck } from "lucide-react";
import { ConsultationModal } from "./ConsultationModal";

export function GlobalSection() {
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
        /* ── GlobalSection base ── */
        .gs-section {
          font-family: var(--font);
          background: var(--white);
          margin-top: 48px;
        }

        /* ── Banner ── */
        .gs-banner {
          background: linear-gradient(90deg, #0d1240 0%, #1a1f5e 72%, #fff 100%);
          padding: 32px 80px;
        }
        .gs-banner h2 {
          color: var(--white);
          font-family: var(--font2);
          font-size: clamp(20px, 2.8vw, 34px);
          font-weight: 800;
          line-height: 1.4;
          margin: 0;
        }

        /* ── Content row ── */
        .gs-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 56px 80px;
          gap: 48px;
          flex-wrap: wrap;
        }

        /* ── Left text block ── */
        .gs-text {
          flex: 1;
          min-width: 280px;
          max-width: 580px;
        }
        .gs-text p {
          font-size: 1.1rem;
          color: #555;
          line-height: 1.9;
          margin-bottom: 16px;
        }
        .gs-ctas {
          display: flex;
          gap: 16px;
          margin-top: 32px;
          flex-wrap: wrap;
        }
        .gs-ctas a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Image ── */
        .gs-image-wrap {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .gs-image-wrap img {
          width: 520px;
          max-width: 100%;
          object-fit: contain;
        }

        /* ── Tagline + brands bar ── */
        .gs-footer-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 26px 80px;
          background: #fefefe;
          border-top: 1px solid #eee;
          flex-wrap: wrap;
          gap: 24px;
        }
        .gs-tagline {
          flex: 0 0 auto;
          max-width: 540px;
          padding-right: 32px;
          border-right: 2px solid #ddd;
        }
        .gs-tagline p {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--navy2);
          line-height: 1.65;
          margin: 0;
        }
        .gs-brands {
          display: flex;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
          padding-left: 40px;
          margin-left: auto;
        }
        .gs-brands img {
          height: 28px;
          width: auto;
          object-fit: contain;
          opacity: 0.75;
          transition: opacity 0.2s, transform 0.2s;
        }
        .gs-brands img:hover {
          opacity: 1;
          transform: scale(1.08);
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Small mobile: ≤ 375px ── */
        @media (max-width: 375px) {
          .gs-section { margin-top: 32px; }
          .gs-banner { padding: 20px 16px; }
          .gs-content { padding: 32px 16px; gap: 28px; }
          .gs-image-wrap img { width: 100%; }
          .gs-footer-bar { padding: 20px 16px; flex-direction: column; align-items: flex-start; }
          .gs-tagline { border-right: none; padding-right: 0; border-bottom: 2px solid #ddd; padding-bottom: 16px; max-width: 100%; }
          .gs-brands { padding-left: 0; gap: 20px; margin-left: 0; }
          .gs-ctas { flex-direction: column; }
          .gs-ctas a { width: 100%; justify-content: center; }
        }

        /* ── Mobile: 376px – 480px ── */
        @media (min-width: 376px) and (max-width: 480px) {
          .gs-banner { padding: 24px 20px; }
          .gs-content { padding: 36px 20px; gap: 32px; flex-direction: column; }
          .gs-text { max-width: 100%; }
          .gs-image-wrap img { width: 100%; }
          .gs-footer-bar { padding: 22px 20px; flex-direction: column; align-items: flex-start; }
          .gs-tagline { border-right: none; padding-right: 0; border-bottom: 2px solid #ddd; padding-bottom: 16px; max-width: 100%; }
          .gs-brands { padding-left: 0; gap: 24px; margin-left: 0; }
          .gs-ctas { flex-direction: column; }
          .gs-ctas a { width: 100%; justify-content: center; }
        }

        /* ── Tablet: 481px – 768px ── */
        @media (min-width: 481px) and (max-width: 768px) {
          .gs-banner { padding: 28px 32px; }
          .gs-content { padding: 40px 32px; flex-direction: column; gap: 36px; }
          .gs-text { max-width: 100%; }
          .gs-image-wrap img { width: min(480px, 100%); }
          .gs-footer-bar { padding: 24px 32px; flex-direction: column; align-items: flex-start; }
          .gs-tagline { border-right: none; padding-right: 0; border-bottom: 2px solid #ddd; padding-bottom: 16px; max-width: 100%; }
          .gs-brands { padding-left: 0; margin-left: 0; gap: 28px; }
        }

        /* ── Small laptop: 769px – 1024px ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .gs-banner { padding: 28px 48px; }
          .gs-content { padding: 48px 48px; gap: 36px; }
          .gs-image-wrap img { width: 380px; }
          .gs-footer-bar { padding: 24px 48px; }
          .gs-tagline { max-width: 380px; }
          .gs-brands { gap: 28px; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .gs-banner { padding: 32px 64px; }
          .gs-content { padding: 52px 64px; }
          .gs-image-wrap img { width: 440px; }
          .gs-footer-bar { padding: 26px 64px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .gs-banner { padding: 32px 80px; }
          .gs-content { padding: 56px 80px; }
          .gs-image-wrap img { width: 520px; }
          .gs-footer-bar { padding: 26px 80px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .gs-section { margin-top: 60px; }
          .gs-banner { padding: 40px 100px; }
          .gs-banner h2 { font-size: clamp(28px, 2.5vw, 42px); }
          .gs-content { padding: 72px 100px; gap: 64px; max-width: 1600px; margin: 0 auto; }
          .gs-text { max-width: 680px; }
          .gs-image-wrap img { width: 620px; }
          .gs-footer-bar { padding: 32px 100px; }
          .gs-tagline { max-width: 620px; }
          .gs-brands img { height: 34px; }
          .gs-brands { gap: 48px; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .gs-section { margin-top: 72px; }
          .gs-banner { padding: 52px 140px; }
          .gs-banner h2 { font-size: clamp(36px, 2.4vw, 52px); }
          .gs-content { padding: 88px 140px; gap: 80px; max-width: 2000px; margin: 0 auto; }
          .gs-text { max-width: 780px; }
          .gs-text p { font-size: 1.1rem; line-height: 2; }
          .gs-image-wrap img { width: 740px; }
          .gs-footer-bar { padding: 40px 140px; max-width: 2000px; margin: 0 auto; }
          .gs-tagline { max-width: 720px; }
          .gs-tagline p { font-size: 1.25rem; }
          .gs-brands img { height: 40px; }
          .gs-brands { gap: 56px; }
        }

        /* ── 4K / 2560px+ ── */
        @media (min-width: 2561px) {
          .gs-section { margin-top: 96px; }
          .gs-banner { padding: 72px 200px; }
          .gs-banner h2 { font-size: clamp(48px, 2.2vw, 72px); }
          .gs-content { padding: 110px 200px; gap: 100px; max-width: 2600px; margin: 0 auto; }
          .gs-text { max-width: 960px; }
          .gs-text p { font-size: 1.1rem; line-height: 2.1; }
          .gs-image-wrap img { width: 900px; }
          .gs-footer-bar { padding: 52px 200px; max-width: 2600px; margin: 0 auto; }
          .gs-tagline { max-width: 880px; }
          .gs-tagline p { font-size: 1.4rem; }
          .gs-brands img { height: 52px; }
          .gs-brands { gap: 72px; }
        }
      `}</style>

      <section ref={ref} className="gs-section" id="about">

        {/* ── Banner ── */}
        <div className="gs-banner reveal">
          <h2>
            INVICTUS PUBLISHING – Building Books <br />with Precision and Purpose
          </h2>
        </div>

        {/* ── Content ── */}
        <div className="gs-content">

          <div className="gs-text reveal-left">
            {[
              "At Invictus Publishing, we turn manuscripts into professionally built books designed for real publication and real readers. We work with authors at every stage, from early ideas to fully developed, market-ready titles.",
              "Our process is complete and structured: ghostwriting, editing, design, formatting, ISBN setup, and global distribution across major platforms including Amazon. Every stage is handled with clarity, precision, and publishing intent.",
              "We don't treat writing as a file, we develop it into a finished product built for visibility, credibility, and long-term impact.",
              "Invictus Publishing exists to move stories from concept to publication with purpose, structure, and global reach and we want you in our list!",
            ].map((p, i) => <p key={i}>{p}</p>)}

            <div className="gs-ctas">
              <a href="tel:2797770367" className="btn-navy">
                <Phone size={16} aria-hidden="true" /> Call now
              </a>
              <a href="#" className="btn-accent" onClick={(e) => { e.preventDefault(); setModalOpen(true); }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <CalendarCheck size={16} /> Book Free Consultation
              </a>
            </div>
          </div>

          <div className="gs-image-wrap reveal-right">
            <img src="/images/Section-2.png" alt="Book Mockup" />
          </div>

        </div>

        {/* ── Tagline + brands bar ── */}
        <div className="gs-footer-bar reveal">
          <div className="gs-tagline">
            <p>We bridge the gap between writing a book and getting it accepted into the market</p>
          </div>
          <div className="gs-brands">
            {["brand1.webp", "brand2.webp", "brand4.webp", "brand5.webp"].map(b => (
              <img key={b} src={`/images/${b}`} alt="" />
            ))}
          </div>
        </div>
        <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </section>
    </>
  );
}