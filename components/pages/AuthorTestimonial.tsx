"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  { id: 1, video: "/images/Author-2.mp4", author: null, book: null, label: null },
  { id: 2, video: "/images/Author-3.mp4", author: null, book: null, label: null },
  { id: 3, video: "/images/Beth.mp4", author: null, book: null, label: null },
];

export function AuthorTestimonials() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

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

        .at-row {
          display: flex;
          align-items: center;
          justify-content: center;
          max-width: 1100px;
          margin: 0 auto;
        }

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

        .at-cards {
          display: flex;
          gap: 20px;
          overflow: hidden;
          flex: 1;
          max-width: 920px;
        }

        .at-card {
          flex: 0 0 calc(33.333% - 14px);
          border-radius: 10px;
          overflow: hidden;
          border: 3px solid var(--navy);
          position: relative;
          aspect-ratio: 9/16;
          max-height: 300px;
          background: #000;
        }

        .at-card video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

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
        .at-card-label { font-size: 11px; color: #fff; font-weight: 600; display: block; }
        .at-card-book  { font-size: 11px; color: rgba(255,255,255,0.82); display: block; }

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

        @media (max-width: 375px) {
          .at-cta { padding: 40px 16px 44px; }
          .at-carousel { padding: 44px 12px 52px; }
          .at-carousel h3 { margin-bottom: 32px; }
          .at-arrow { width: 38px; height: 38px; margin: 0 8px; }
          .at-card { flex: 0 0 100%; max-height: 340px; }
          .at-cards { max-width: 100%; }
        }
        @media (min-width: 376px) and (max-width: 480px) {
          .at-cta { padding: 44px 18px 48px; }
          .at-carousel { padding: 48px 16px 56px; }
          .at-arrow { width: 40px; height: 40px; margin: 0 10px; }
          .at-card { flex: 0 0 100%; max-height: 360px; }
          .at-cards { max-width: 100%; }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .at-carousel { padding: 52px 20px 60px; }
          .at-arrow { width: 42px; height: 42px; margin: 0 10px; }
          .at-card { flex: 0 0 calc(50% - 10px); }
          .at-cards { max-width: 100%; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .at-carousel { padding: 56px 24px 64px; }
          .at-row { max-width: 900px; }
          .at-cards { max-width: 760px; }
          .at-card { max-height: 280px; }
        }
        @media (min-width: 1025px) and (max-width: 1280px) {
          .at-row { max-width: 1000px; }
          .at-cards { max-width: 840px; }
        }
        @media (min-width: 1281px) and (max-width: 1600px) {
          .at-row { max-width: 1100px; }
          .at-cards { max-width: 920px; }
          .at-card { max-height: 300px; }
        }
        @media (min-width: 1601px) and (max-width: 1920px) {
          .at-cta { padding: 64px 32px 68px; }
          .at-carousel { padding: 72px 40px 80px; }
          .at-row { max-width: 1380px; }
          .at-cards { max-width: 1160px; }
          .at-card { max-height: 380px; }
          .at-arrow { width: 58px; height: 58px; margin: 0 20px; }
        }
        @media (min-width: 1921px) and (max-width: 2560px) {
          .at-cta { padding: 80px 40px 84px; }
          .at-carousel { padding: 88px 60px 96px; }
          .at-carousel h3 { margin-bottom: 60px; }
          .at-row { max-width: 1760px; }
          .at-cards { max-width: 1500px; gap: 28px; }
          .at-card { max-height: 480px; }
          .at-arrow { width: 68px; height: 68px; margin: 0 24px; }
          .at-dots { gap: 12px; margin-top: 36px; }
          .at-dot { width: 13px; height: 13px; }
        }
        @media (min-width: 2561px) {
          .at-cta { padding: 100px 60px 110px; }
          .at-carousel { padding: 110px 80px 120px; }
          .at-row { max-width: 2200px; }
          .at-cards { max-width: 1900px; gap: 36px; }
          .at-card { max-height: 620px; }
          .at-arrow { width: 80px; height: 80px; margin: 0 28px; }
          .at-dots { gap: 16px; margin-top: 48px; }
          .at-dot { width: 16px; height: 16px; }
        }
      `}</style>

      <div ref={ref} style={{ fontFamily: "var(--font)" }}>

        {/* ── CTA band ── */}
        <div className="at-cta">
          <h2 className="reveal section-title">It&apos;s Time to Become a Published Author</h2>
          <p className="reveal delay-1">Join published authors who trusted our team.<br /><br />
          <span className="nybp-link-accent reveal delay-2">Invictus Is Waiting For You!</span></p> 
        </div>

        {/* ── Carousel band ── */}
        <div className="at-carousel">
          <h3 className="reveal">Watch Our Authors Share Their Journey in Their Own Words</h3>

          <div className="at-row">
            {/* <button
              className="at-arrow"
              onClick={() => setIndex(i => Math.max(0, i - 1))}
              disabled={safeIndex === 0}
              aria-label="Previous"
            >
              <ChevronLeft size={20} aria-hidden="true" />
            </button> */}

            <div className="at-cards">
              {visible.map(t => (
                <div key={t.id} className="at-card">
                  <video
                    src={t.video}
                    autoPlay
                    loop
                    muted
                    controls
                    playsInline
                    preload="auto"
                    aria-label={t.author ?? `Author testimonial ${t.id}`}
                  />
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

            {/* <button
              className="at-arrow"
              onClick={() => setIndex(i => Math.min(maxIndex, i + 1))}
              disabled={safeIndex >= maxIndex}
              aria-label="Next"
            >
              <ChevronRight size={20} aria-hidden="true" />
            </button> */}
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