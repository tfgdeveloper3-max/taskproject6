"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  { id: 1, thumb: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80", author: null, book: null, label: "writing, editing, and" },
  { id: 2, thumb: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&q=80", author: "Diana Cristy", book: "The Face Of A Killer", label: null },
  { id: 3, thumb: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80", author: "Davia R. K.", book: null, label: null },
  { id: 4, thumb: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80", author: "Sarah M.", book: "Beyond The Horizon", label: null },
  { id: 5, thumb: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&q=80", author: "James T.", book: "The Last Chapter", label: null },
];

export function AuthorTestimonials() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  /* update visible count based on window width */
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w <= 480) setVisibleCount(1);
      else if (w <= 768) setVisibleCount(2);
      else setVisibleCount(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - visibleCount);
  const safeIndex = Math.min(index, maxIndex);
  const visible = TESTIMONIALS.slice(safeIndex, safeIndex + visibleCount);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll(".reveal,.reveal-scale").forEach(c => c.classList.add("revealed"));
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── CTA band ── */
        .at-cta {
          background: #fff;
          text-align: center;
          padding: 52px 24px 56px;
          border-bottom: 1px solid #f0f0f0;
        }
        .at-cta h2 { margin-bottom: 10px; color: var(--navy, #0d1240) !important; }
        .at-cta p {
          font-size: 1.1rem;
          font-weight: 400;
          color: var(--navy);
          margin-bottom: 16px;
        }
        .at-cta a { font-size: clamp(15px, 1.9vw, 21px); }

        /* ── Carousel band ── */
        .at-carousel {
          background: var(--accent);
          padding: 60px 24px 68px;
        }
        .at-carousel h3 {
          font-family: var(--font2);
          font-size: clamp(22px, 2.9vw, 36px);
          font-weight: 900;
          color: var(--navy);
          text-align: center;
          margin-bottom: 48px;
        }

        /* ── Carousel inner row ── */
        .at-row {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ── Arrow buttons ── */
        .at-arrow {
          background: rgba(13,18,64,0.1);
          border: 2.5px solid var(--navy);
          border-radius: 50%;
          width: 50px; height: 50px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin: 0 16px;
          transition: background 0.2s, transform 0.2s;
          color: var(--navy);
          cursor: pointer;
        }
        .at-arrow:disabled { opacity: 0.35; cursor: default; }
        .at-arrow:not(:disabled):hover {
          background: rgba(13,18,64,0.18);
          transform: scale(1.05);
        }

        /* ── Cards wrapper ── */
        .at-cards {
          display: flex;
          gap: 20px;
          overflow: hidden;
          flex: 1;
          max-width: 920px;
        }

        /* ── Single card ── */
        .at-card {
          flex: 0 0 calc(33.333% - 14px);
          border-radius: 10px;
          overflow: hidden;
          border: 3px solid var(--navy);
          position: relative;
          aspect-ratio: 9/16;
          max-height: 300px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .at-card img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
        }
        .at-card-dim {
          position: absolute; inset: 0;
          background: rgba(0,0,0,0.22);
        }

        /* play button */
        .at-play {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          width: 54px; height: 54px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .at-play:hover { transform: translate(-50%,-50%) scale(1.12); }

        /* card footer */
        .at-card-foot {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          background: linear-gradient(transparent, rgba(0,0,0,0.78));
          padding: 28px 12px 12px;
        }
        .at-card-author {
          font-size: 12px; font-weight: 700;
          text-transform: uppercase;
          color: var(--navy);
          background: var(--accent);
          padding: 2px 8px;
          display: inline-block; margin-bottom: 4px;
        }
        .at-card-label {
          font-size: 11px; color: #fff; font-weight: 600; display: block;
        }
        .at-card-book {
          font-size: 11px; color: rgba(255,255,255,0.82); display: block;
        }

        /* ── Dots ── */
        .at-dots {
          display: flex;
          justify-content: center;
          gap: 9px;
          margin-top: 28px;
        }
        .at-dot {
          width: 10px; height: 10px;
          border-radius: 50%; border: none;
          transition: all 0.2s; cursor: pointer;
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Small mobile: ≤ 375px ── */
        @media (max-width: 375px) {
          .at-cta { padding: 40px 16px 44px; }
          .at-carousel { padding: 44px 12px 52px; }
          .at-carousel h3 { margin-bottom: 32px; }
          .at-arrow { width: 38px; height: 38px; margin: 0 8px; }
          .at-card { flex: 0 0 100%; max-height: 340px; }
          .at-cards { max-width: 100%; }
          .at-play { width: 46px; height: 46px; }
        }

        /* ── Mobile: 376px – 480px ── */
        @media (min-width: 376px) and (max-width: 480px) {
          .at-cta { padding: 44px 18px 48px; }
          .at-carousel { padding: 48px 16px 56px; }
          .at-arrow { width: 40px; height: 40px; margin: 0 10px; }
          .at-card { flex: 0 0 100%; max-height: 360px; }
          .at-cards { max-width: 100%; }
        }

        /* ── Tablet: 481px – 768px ── */
        @media (min-width: 481px) and (max-width: 768px) {
          .at-carousel { padding: 52px 20px 60px; }
          .at-arrow { width: 42px; height: 42px; margin: 0 10px; }
          .at-card { flex: 0 0 calc(50% - 10px); }
          .at-cards { max-width: 100%; }
        }

        /* ── Small laptop: 769px – 1024px ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .at-carousel { padding: 56px 24px 64px; }
          .at-row { max-width: 900px; }
          .at-cards { max-width: 760px; }
          .at-card { max-height: 280px; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .at-row { max-width: 1000px; }
          .at-cards { max-width: 840px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .at-row { max-width: 1100px; }
          .at-cards { max-width: 920px; }
          .at-card { max-height: 300px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .at-cta { padding: 64px 32px 68px; }
          .at-carousel { padding: 72px 40px 80px; }
          .at-row { max-width: 1380px; }
          .at-cards { max-width: 1160px; }
          .at-card { max-height: 380px; }
          .at-arrow { width: 58px; height: 58px; margin: 0 20px; }
          .at-play { width: 64px; height: 64px; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .at-cta { padding: 80px 40px 84px; }
          .at-carousel { padding: 88px 60px 96px; }
          .at-carousel h3 { margin-bottom: 60px; }
          .at-row { max-width: 1760px; }
          .at-cards { max-width: 1500px; gap: 28px; }
          .at-card { max-height: 480px; }
          .at-arrow { width: 68px; height: 68px; margin: 0 24px; }
          .at-play { width: 76px; height: 76px; }
          .at-dots { gap: 12px; margin-top: 36px; }
          .at-dot { width: 13px; height: 13px; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .at-cta { padding: 100px 60px 110px; }
          .at-carousel { padding: 110px 80px 120px; }
          .at-row { max-width: 2200px; }
          .at-cards { max-width: 1900px; gap: 36px; }
          .at-card { max-height: 620px; }
          .at-arrow { width: 80px; height: 80px; margin: 0 28px; }
          .at-play { width: 90px; height: 90px; }
          .at-dots { gap: 16px; margin-top: 48px; }
          .at-dot { width: 16px; height: 16px; }
        }
      `}</style>

      <div ref={ref} style={{ fontFamily: "var(--font)" }}>

        {/* ── CTA band ── */}
        <div className="at-cta">
          <h2 className="reveal section-title">It&apos;s Time to Become a Published Author</h2>
          <p className="reveal delay-1">Join published authors who trusted our team.</p>
          <a href="#" className="nybp-link-accent reveal delay-2">Invictus Is Waiting For You!</a>
        </div>

        {/* ── Carousel band ── */}
        <div className="at-carousel">
          <h3 className="reveal">Watch Our Authors Share Their Journey in Their Own Words</h3>

          <div className="at-row">
            {/* Left arrow */}
            <button
              className="at-arrow"
              onClick={() => setIndex(i => Math.max(0, i - 1))}
              disabled={safeIndex === 0}
              aria-label="Previous"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button>

            {/* Cards */}
            <div className="at-cards">
              {visible.map(t => (
                <div key={t.id} className="at-card nybp-card-hover">
                  <img src={t.thumb} alt={t.author ?? "Author"} />
                  <div className="at-card-dim" />
                  <div className="at-play">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--navy)" style={{ marginLeft: 3 }}>
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </div>
                  {(t.author || t.label) && (
                    <div className="at-card-foot">
                      {t.author && <span className="at-card-author">{t.author}</span>}
                      {t.label && <span className="at-card-label">{t.label}</span>}
                      {t.book && <span className="at-card-book">{t.book}</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right arrow */}
            <button
              className="at-arrow"
              onClick={() => setIndex(i => Math.min(maxIndex, i + 1))}
              disabled={safeIndex >= maxIndex}
              aria-label="Next"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Dots */}
          <div className="at-dots">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                className="at-dot"
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  background: i === safeIndex ? "var(--navy)" : "rgba(13,18,64,0.3)",
                  transform: i === safeIndex ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}