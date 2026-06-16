"use client";
import { useState, useEffect, useRef } from "react";

const FAQS = [
  { q: "How does the book publishing process work?", a: "The process typically includes manuscript review, editing, design, formatting, approval stages, publishing, and distribution across selected platforms." },
  { q: "How long does it take to publish a book?", a: "Timelines vary depending on editing, design, and approvals, but most publishing projects take several weeks to a few months to complete." },
  { q: "Do you help with editing and proofreading my manuscript?", a: "Yes. We provide professional editing and proofreading to improve clarity, structure, grammar, and overall readability while preserving your voice." },
  { q: "Can I publish my book in both print and digital formats?", a: "Yes. We support both print and eBook publishing to ensure your book reaches readers across multiple platforms and formats." },
  { q: "Do you offer book marketing and promotion?", a: "Yes. We provide promotional services such as social media marketing, PR content, and visibility strategies to help your book reach the right audience." },
  { q: "How much does it cost to publish a book?", a: "Costs vary depending on services like editing, design, printing, and marketing. We provide customized quotes after reviewing your project." },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll(".reveal").forEach(c => c.classList.add("revealed"));
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Section ── */
        .faq-section {
          font-family: var(--font);
          background: var(--gradient-dark);
          padding: 72px 40px 108px;
          position: relative;
          overflow: visible;
        }

        /* ── Glow ── */
        .faq-glow {
          position: absolute;
          top: 30%; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(240,165,0,0.08), transparent);
          pointer-events: none;
        }

        /* ── Heading ── */
        .faq-head {
          text-align: center;
          margin-bottom: 52px;
        }
        .faq-head h2 {
          font-family: var(--font2);
          font-size: clamp(22px, 2.9vw, 34px);
          font-weight: 800;
          color: var(--white);
          line-height: 1.25;
          margin: 0;
        }

        /* ── Items list ── */
        .faq-list {
          max-width: 780px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        /* ── FAQ item ── */
        .faq-item {
          transition: border-radius 0.3s;
        }

        /* ── Question button ── */
        .faq-question {
          width: 100%;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 26px;
          gap: 16px;
          text-align: left;
          font-family: var(--font);
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.2s;
        }

        /* ── Answer ── */
        .faq-answer {
          overflow: hidden;
          transition: max-height 0.38s ease, padding 0.25s;
        }
        .faq-answer p {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.9;
          padding: 0 26px 20px;
          margin: 0;
        }

        /* ── Decorative book ── */
        .faq-book {
          position: absolute;
          bottom: -40px;
          left: 24px;
          width: 110px;
          opacity: 0.85;
          pointer-events: none;
          z-index: 1;
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Small mobile: ≤ 375px ── */
        @media (max-width: 375px) {
          .faq-section { padding: 48px 14px 80px; }
          .faq-head { margin-bottom: 36px; }
          .faq-question { padding: 14px 16px; font-size: 1rem; }
          .faq-answer p { padding: 0 16px 16px; font-size: 0.95rem; }
          .faq-book { width: 70px; left: 12px; }
          .faq-list { gap: 10px; }
        }

        /* ── Mobile: 376px – 480px ── */
        @media (min-width: 376px) and (max-width: 480px) {
          .faq-section { padding: 52px 16px 88px; }
          .faq-head { margin-bottom: 40px; }
          .faq-question { padding: 16px 18px; }
          .faq-answer p { padding: 0 18px 16px; }
          .faq-book { width: 80px; }
        }

        /* ── Tablet: 481px – 768px ── */
        @media (min-width: 481px) and (max-width: 768px) {
          .faq-section { padding: 60px 24px 96px; }
          .faq-list { max-width: 100%; }
          .faq-book { width: 90px; }
        }

        /* ── Small laptop: 769px – 1024px ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .faq-section { padding: 64px 32px 100px; }
          .faq-list { max-width: 680px; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .faq-section { padding: 68px 40px 104px; }
          .faq-list { max-width: 740px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .faq-list { max-width: 780px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .faq-section { padding: 88px 60px 128px; }
          .faq-head { margin-bottom: 64px; }
          .faq-list { max-width: 980px; gap: 18px; }
          .faq-question { padding: 22px 32px; font-size: 1.15rem; }
          .faq-answer p { padding: 0 32px 24px; font-size: 1.1rem; }
          .faq-book { width: 140px; }
          .faq-glow { width: 800px; height: 400px; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .faq-section { padding: 108px 80px 160px; }
          .faq-head { margin-bottom: 80px; }
          .faq-list { max-width: 1240px; gap: 22px; }
          .faq-question { padding: 26px 40px; font-size: 1.25rem; }
          .faq-answer p { padding: 0 40px 28px; font-size: 1.15rem; }
          .faq-book { width: 170px; left: 36px; }
          .faq-glow { width: 1000px; height: 500px; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .faq-section { padding: 140px 120px 200px; }
          .faq-head { margin-bottom: 100px; }
          .faq-list { max-width: 1600px; gap: 28px; }
          .faq-question { padding: 32px 52px; font-size: 1.45rem; }
          .faq-answer p { padding: 0 52px 36px; font-size: 1.3rem; }
          .faq-book { width: 210px; left: 48px; }
          .faq-glow { width: 1300px; height: 650px; }
        }
      `}</style>

      <div ref={ref} className="faq-section">
        <div className="faq-glow" />

        {/* Heading */}
        <div className="faq-head reveal">
          <p className="section-eyebrow">Before You Get Started</p>
          <h2>What You Should Know About Invictus Publishing</h2>
        </div>

        {/* Items */}
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="nybp-faq-item faq-item reveal"
              style={{ borderRadius: open === i ? 16 : 40 }}
            >
              <button
                className="nybp-faq-question faq-question"
                onClick={() => setOpen(open === i ? null : i)}
                style={{ color: open === i ? "var(--accent)" : "var(--white)" }}
              >
                <span>{faq.q}</span>
                <span
                  className="nybp-faq-icon"
                  style={{
                    transform: open === i ? "rotate(45deg)" : "none",
                    background: open === i ? "var(--accent)" : "transparent",
                    color: open === i ? "var(--navy)" : "var(--accent)",
                  }}
                >
                  +
                </span>
              </button>
              <div
                className="faq-answer"
                style={{ maxHeight: open === i ? 280 : 0 }}
              >
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative book */}
        <img src="/images/read-book.webp" alt="" className="faq-book" />
      </div>
    </>
  );
}