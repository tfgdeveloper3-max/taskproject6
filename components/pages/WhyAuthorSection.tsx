"use client";
import { useEffect, useRef } from "react";

const services = [
  { icon: "/images/Ghostwriting-Services.png", title: "Ghostwriting Services", desc: "Have a powerful idea but need help putting it into words? Our ghostwriters transform your concepts into a complete manuscript while preserving your voice, tone, and intent throughout the writing process." },
  { icon: "/images/Book-Editing.png", title: "Book Editing Services", desc: "Our editors refine your manuscript for clarity, structure, and flow, enhancing readability while ensuring your original message and style remain intact." },
  { icon: "/images/Book-Cover.png", title: "Book Cover Design Services", desc: "We design compelling, genre-focused covers that capture attention instantly and reflect the essence of your story with professional precision." },
  { icon: "/images/Book-Publishing.png", title: "Book Publishing Services", desc: "We manage the complete publishing process including formatting, setup, and distribution, ensuring your book is professionally released across major platforms." },
  { icon: "/images/Video-Trailor.png", title: "Video Trailer Services", desc: "We create engaging video trailers that highlight your book's message and help you build stronger visibility across digital platforms." },
  { icon: "/images/Book-Marketing.png", title: "Book Marketing Services", desc: "Our marketing strategies are designed to position your book in front of the right audience through targeted promotion and visibility campaigns." },
  { icon: "/images/Illustration-Design.png", title: "Illustration Design Services", desc: "Our illustrators bring your story to life with custom visuals that enhance storytelling and strengthen your book's identity." },
  { icon: "/images/bookstore.png", title: "Book Events Participation", desc: "We support authors in exploring literary events and industry opportunities that help expand visibility and connect with wider audiences." },
];

export function WhyAuthorsSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale").forEach((c, i) => {
          setTimeout(() => c.classList.add("revealed"), i * 60);
        });
      }
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Section ── */
        .was-section {
          background: #fafaf8;
          padding: 80px 60px 90px;
          font-family: var(--font);
        }

        /* ── Heading block ── */
        .was-head {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 60px;
        }
        .was-head h2 {
          color: var(--navy, #0d1240) !important;
        }
        .was-head p {
          font-size: 1.1rem;
          line-height: 1.85;
        }

        /* ── Grid ── */
        .was-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          max-width: 1200px;
          margin: 0 auto;
          gap: 0;
          border: 1px solid rgba(240,165,0,0.15);
          border-radius: 16px;
          overflow: hidden;
        }

        /* ── Card ── */
        .was-card {
          padding: 40px 24px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: background 0.3s;
        }
        .was-card-accent-bar {
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 100%;
          background: var(--accent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .was-card:hover .was-card-accent-bar { opacity: 1; }

        /* ── Icon circle ── */
        .was-icon-wrap {
          width: 76px;
          height: 76px;
          background: linear-gradient(135deg, var(--navy), var(--navy2));
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          box-shadow: 0 8px 24px rgba(13,18,64,0.25);
          transition: transform 0.3s;
          position: relative;
          z-index: 1;
          flex-shrink: 0;
        }
        .was-icon-wrap:hover { transform: scale(1.1) rotate(-5deg); }
        .was-icon-wrap img {
          width: 42px;
          height: 42px;
          object-fit: contain;
          display: block;
          position: relative;
          z-index: 2;
        }

        /* ── Card text ── */
        .was-card h3 {
          font-size: 17px;
          font-weight: 600;
          color: var(--navy);
          margin-bottom: 12px;
          line-height: 1.3;
        }
        .was-card p {
          font-size: 1rem;
          color: #777;
          line-height: 1.8;
          margin-bottom: 22px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .was-card a {
          font-size: 12px;
          padding: 9px 22px;
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Small mobile: ≤ 375px ── */
        @media (max-width: 375px) {
          .was-section { padding: 40px 14px 50px; }
          .was-head { margin-bottom: 36px; }
          .was-grid { grid-template-columns: 1fr; border-radius: 12px; }
          .was-card { padding: 28px 18px 24px; }
          .was-card p { -webkit-line-clamp: unset; }
        }

        /* ── Mobile: 376px – 480px ── */
        @media (min-width: 376px) and (max-width: 480px) {
          .was-section { padding: 44px 16px 56px; }
          .was-head { margin-bottom: 40px; }
          .was-grid { grid-template-columns: 1fr; border-radius: 12px; }
          .was-card { padding: 28px 20px 24px; }
          .was-card p { -webkit-line-clamp: unset; }
        }

        /* ── Tablet: 481px – 768px ── */
        @media (min-width: 481px) and (max-width: 768px) {
          .was-section { padding: 52px 24px 64px; }
          .was-grid { grid-template-columns: repeat(2, 1fr); }
          .was-card { padding: 32px 20px 28px; }
          .was-card p { -webkit-line-clamp: unset; }
        }

        /* ── Small laptop: 769px – 1024px ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .was-section { padding: 60px 32px 72px; }
          .was-grid { grid-template-columns: repeat(2, 1fr); max-width: 900px; }
          .was-card h3 { font-size: 15px; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .was-section { padding: 68px 40px 80px; }
          .was-grid { max-width: 1100px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .was-section { padding: 80px 60px 90px; }
          .was-grid { max-width: 1200px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .was-section { padding: 88px 80px 100px; }
          .was-grid { max-width: 1480px; }
          .was-head { max-width: 1000px; }
          .was-icon-wrap { width: 88px; height: 88px; border-radius: 22px; }
          .was-icon-wrap img { width: 50px; height: 50px; }
          .was-card h3 { font-size: 16px; }
          .was-card p { font-size: 1.1rem; }
          .was-card { padding: 48px 28px 38px; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .was-section { padding: 96px 100px 112px; }
          .was-grid { max-width: 1900px; }
          .was-head { max-width: 1200px; margin-bottom: 72px; }
          .was-head p { font-size: 1.2rem; }
          .was-icon-wrap { width: 100px; height: 100px; border-radius: 24px; }
          .was-icon-wrap img { width: 58px; height: 58px; }
          .was-card h3 { font-size: 18px; }
          .was-card p { font-size: 1.1rem; }
          .was-card { padding: 56px 32px 44px; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .was-section { padding: 120px 140px 140px; }
          .was-grid { max-width: 2400px; }
          .was-head { max-width: 1500px; margin-bottom: 88px; }
          .was-head p { font-size: 1.35rem; }
          .was-icon-wrap { width: 120px; height: 120px; border-radius: 28px; }
          .was-icon-wrap img { width: 70px; height: 70px; }
          .was-card h3 { font-size: 22px; }
          .was-card p { font-size: 1.2rem; }
          .was-card { padding: 68px 40px 56px; }
        }
      `}</style>

      <section ref={ref} className="was-section" id="services">

        {/* ── Heading ── */}
        <div className="was-head reveal">
          <p className="section-eyebrow">Our Services</p>
          <h2 className="section-title">THE REASON AUTHORS MOVE FORWARD WITH INVICTUS</h2>
          <p>
            Our structured publishing approach helps transform manuscripts into professionally developed and presented books. Our top-notch services are listed below for your review.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="was-grid">
          {services.map((s, i) => {
            const row = Math.floor(i / 4), col = i % 4;
            const isLight = (row + col) % 2 === 0;
            const isLastRow = row >= 1;
            const isLastCol = col === 3;

            return (
              <div
                key={i}
                className="was-card nybp-card-hover reveal"
                style={{
                  background: isLight ? "#fff" : "rgba(240,165,0,0.04)",
                  borderRight: !isLastCol ? "1px solid rgba(240,165,0,0.12)" : "none",
                  borderBottom: !isLastRow ? "1px solid rgba(240,165,0,0.12)" : "none",
                }}
              >
                <div className="was-card-accent-bar" />

                {/* icon */}
                <div className="was-icon-wrap">
                  <img src={s.icon} alt={s.title} />
                </div>

                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <a href="#" className="btn-navy">Explore Now</a>
              </div>
            );
          })}
        </div>

      </section>
    </>
  );
}