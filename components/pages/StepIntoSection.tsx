"use client";
import { useEffect, useRef } from "react";
import { BookOpen, MessageCircle, Phone } from "lucide-react";

export function StepIntoSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll(".reveal,.reveal-right").forEach(c => c.classList.add("revealed"));
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Section ── */
        .sis-section {
          background: var(--navy, #0d1240);
          position: relative;
          overflow: hidden;
          padding: 68px 80px;
          font-family: var(--font);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          min-height: 320px;
        }

        /* ── Decorative overlay ── */
        .sis-overlay {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 45%;
          background: linear-gradient(135deg, transparent, rgba(255,255,255,0.04));
          pointer-events: none;
        }

        /* ── Leaf image ── */
        .sis-leaf {
          position: absolute;
          right: 0; bottom: 0;
          height: 100%;
          object-fit: contain;
          object-position: bottom right;
          opacity: 0.12;
          pointer-events: none;
          z-index: 0;
        }

        /* ── Text block ── */
        .sis-text {
          flex: 1;
          max-width: 600px;
          position: relative;
          z-index: 1;
        }

        .sis-text h2 {
          font-family: var(--font2);
          font-size: clamp(24px, 2.9vw, 36px);
          font-weight: 900;
          color: var(--accent, #f0a500);
          line-height: 1.28;
          margin-bottom: 18px;
        }

        .sis-text p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.8;
          margin-bottom: 32px;
          max-width: 520px;
        }

        /* ── CTAs ── */
        .sis-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }
        .sis-ctas a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Book image ── */
        .sis-book {
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          margin-right: 60px;
        }
        .sis-book img {
          width: 280px;
          height: 340px;
          object-fit: contain;
          filter: drop-shadow(0 16px 40px rgba(0,0,0,0.45));
          animation: scaleIn 0.8s 0.3s ease both;
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Small mobile: ≤ 375px ── */
        @media (max-width: 375px) {
          .sis-section {
            flex-direction: column;
            padding: 40px 16px;
            gap: 28px;
            min-height: auto;
            text-align: center;
          }
          .sis-text { max-width: 100%; }
          .sis-text h2 { font-size: 22px; }
          .sis-text p { font-size: 1rem; max-width: 100%; }
          .sis-ctas { justify-content: center; flex-direction: column; }
          .sis-ctas a { width: 100%; justify-content: center; }
          .sis-book { margin-right: 0; }
          .sis-book img { width: 180px; height: 220px; }
        }

        /* ── Mobile: 376px – 480px ── */
        @media (min-width: 376px) and (max-width: 480px) {
          .sis-section {
            flex-direction: column;
            padding: 44px 20px;
            gap: 32px;
            min-height: auto;
            text-align: center;
          }
          .sis-text { max-width: 100%; }
          .sis-text p { max-width: 100%; }
          .sis-ctas { justify-content: center; }
          .sis-book { margin-right: 0; }
          .sis-book img { width: 200px; height: 244px; }
        }

        /* ── Tablet: 481px – 768px ── */
        @media (min-width: 481px) and (max-width: 768px) {
          .sis-section {
            flex-direction: column;
            padding: 52px 32px;
            gap: 36px;
            min-height: auto;
          }
          .sis-text { max-width: 100%; }
          .sis-text p { max-width: 100%; }
          .sis-book { margin-right: 0; }
          .sis-book img { width: 220px; height: 268px; }
        }

        /* ── Small laptop: 769px – 1024px ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .sis-section { padding: 56px 40px; gap: 32px; }
          .sis-book { margin-right: 20px; }
          .sis-book img { width: 320px; height: 390px; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .sis-section { padding: 64px 60px; }
          .sis-book img { width: 360px; height: 440px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .sis-section { padding: 68px 80px; }
          .sis-book img { width: 600px; height: 580px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .sis-section { padding: 80px 120px; min-height: 420px; }
          .sis-text { max-width: 700px; }
          .sis-text h2 { font-size: clamp(32px, 2.5vw, 44px); }
          .sis-text p { font-size: 1.15rem; max-width: 600px; }
          .sis-book img { width: 560px; height: 660px; }
          .sis-book { margin-right: 80px; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .sis-section { padding: 96px 160px; min-height: 520px; gap: 60px; }
          .sis-text { max-width: 860px; }
          .sis-text h2 { font-size: clamp(40px, 2.4vw, 56px); }
          .sis-text p { font-size: 1.2rem; max-width: 720px; }
          .sis-book img { width: 600px; height: 720px; }
          .sis-book { margin-right: 100px; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .sis-section { padding: 120px 220px; min-height: 680px; gap: 80px; }
          .sis-text { max-width: 1060px; }
          .sis-text h2 { font-size: clamp(56px, 2.2vw, 72px); }
          .sis-text p { font-size: 1.35rem; max-width: 880px; }
          .sis-book img { width: 660px; height: 800px; }
          .sis-book { margin-right: 120px; }
          .sis-ctas { gap: 20px; }
        }
      `}</style>

      <section ref={ref} className="sis-section">

        {/* decorative overlay */}
        <div className="sis-overlay" />
        <img src="/images/ready-leaf.png" alt="" className="sis-leaf" />

        {/* text */}
        <div className="sis-text reveal">
          <h2>
            Your Manuscript Is Already Closer To Success Than You Think -&nbsp;
            <br />Let&apos;s Begin the Process Now!
          </h2>
          <p>
            Don&apos;t wait any longer, Take the next step with us. Start building your author identity with professional publishing support now!
          </p>
          <div className="sis-ctas">
            <a href="#" className="btn-accent">
              <BookOpen size={16} aria-hidden="true" /> Book Now
            </a>
            <a href="#" className="btn-outline-white">
              <MessageCircle size={16} aria-hidden="true" /> Chat with Experts
            </a>
            <a href="tel:8553847020" className="btn-outline-white">
              <Phone size={16} aria-hidden="true" /> Call now
            </a>
          </div>
        </div>

        {/* book image */}
        <div className="sis-book reveal-right">
          <img src="/images/Get-In-Touch.png" alt="Stack of Books" />
        </div>

      </section>
    </>
  );
}