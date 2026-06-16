"use client";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { id: 1, name: "Carmen Alvina", review: "Don Rhodes is a treat to work with. They strengthened the substance and structure of my manuscript and elevated the quality of my book. Their white glove services are exceptional." },
  { id: 2, name: "Scott L. Miller", review: "In three months since Boundless was published, NYBP has turned it into a #1 bestseller on Kindle. They have been extremely helpful and receptive to my questions and needs." },
  { id: 3, name: "Stacy Kaye", review: "They are professionals in book publishing and possess a strong grip on the publishing process at various platforms. They are even pros at content development and designing illustrations and covers." },
  { id: 4, name: "Donald Hobson", review: "They religiously guided us through the intricacies of the publishing world. Collaborating with them was a life-changing experience that will remain forever in our memories." },
  { id: 5, name: "K. Scott Wells", review: "Very professional and excellent illustration, editing, and publication. There is a pleasant helpful, and professional relationship, communication, and interaction right away." },
  { id: 6, name: "Queen", review: "Lisa Smith has been exceptional to work with. Their cover teams are excellent, and I've had the perfect amount of input. Bottom line is I'm very happy with my experience with NYBP." },
];

export function TestimonialsSection() {
  const secRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = secRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll(".reveal,.reveal-scale").forEach(c => c.classList.add("revealed"));
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const init = () => {
      const w = window.innerWidth;
      const spv = w <= 480 ? 1 : w <= 768 ? 2 : 3;
      new (window as any).Swiper(".t-swiper-inner", {
        slidesPerView: spv, centeredSlides: true, spaceBetween: 28, loop: true, speed: 700,
        autoplay: { delay: 3500, disableOnInteraction: false },
        navigation: { nextEl: ".t-next", prevEl: ".t-prev" },
      });
    };
    if (!(window as any).Swiper) {
      const s = document.createElement("script");
      s.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
      s.onload = init; document.body.appendChild(s);
    } else { init(); }
  }, []);

  return (
    <>
      <style>{`
        /* ── Swiper overrides ── */
        .t-swiper-inner .swiper-slide-active .t-card {
          transform: scale(1.08);
          box-shadow: 0 28px 72px rgba(0,0,0,0.45);
          z-index: 2;
        }
        .t-swiper-inner .swiper-slide:not(.swiper-slide-active) .t-card {
          transform: scale(0.88);
          opacity: 0.75;
        }
        .t-swiper-inner { overflow: visible !important; padding: 44px 0 54px !important; }

        /* ── Section ── */
        .ts-section {
          font-family: var(--font);
          background: var(--gradient-dark);
          background-image: url('/images/testimonial-bg.png');
          background-size: cover;
          background-position: center;
          padding: 80px 0 90px;
          position: relative;
          overflow: hidden;
        }
        .ts-overlay {
          position: absolute; inset: 0;
          background: rgba(7,9,30,0.72);
          z-index: 0;
        }

        /* ── Heading block ── */
        .ts-head {
          text-align: center;
          margin-bottom: 52px;
          position: relative;
          z-index: 1;
          padding: 0 20px;
        }
        .ts-head p.ts-sub {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 520px;
          margin: 12px auto 0;
          line-height: 1.8;
        }

        /* ── Slider row ── */
        .ts-row {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 10px;
        }

        /* ── Arrow buttons ── */
        .ts-arrow {
          background: var(--accent);
          border: none;
          border-radius: 50%;
          width: 52px; height: 52px;
          flex-shrink: 0;
          color: var(--navy);
          font-weight: 900;
          box-shadow: 0 6px 20px rgba(240,165,0,0.35);
          transition: all 0.2s;
          z-index: 10;
          margin: 0 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .ts-arrow:hover { background: var(--accent-hover); }

        /* ── Card ── */
        .t-card {
          background: var(--white);
          border-radius: 18px;
          padding: 54px 26px 30px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-height: 340px;
          transition: transform 0.4s ease, box-shadow 0.4s ease, opacity 0.4s ease;
          border-top: 4px solid var(--accent);
        }
        .t-card-quote {
          position: absolute;
          top: -26px; left: 50%;
          transform: translateX(-50%);
          width: 52px; height: 52px;
          border-radius: 12px;
          background: var(--navy);
          border: 2px solid var(--accent);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 6px 20px rgba(0,0,0,0.25);
        }
        .t-card-bar {
          position: absolute;
          left: 0; top: 18%; bottom: 18%;
          width: 3px;
          background: var(--accent);
          border-radius: 0 2px 2px 0;
        }
        .t-card p {
          font-size: 1.1rem;
          color: #444;
          line-height: 1.8;
          margin-bottom: 20px;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 7;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .t-card-stars {
          color: var(--accent);
          font-size: 18px;
          letter-spacing: 4px;
          margin-bottom: 8px;
        }
        .t-card-name {
          font-size: 16px;
          font-weight: 800;
          color: var(--navy);
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Small mobile: ≤ 375px ── */
        @media (max-width: 375px) {
          .ts-section { padding: 52px 0 60px; }
          .ts-head { margin-bottom: 36px; }
          .ts-row { padding: 0 6px; }
          .ts-arrow { width: 38px; height: 38px; margin: 0 4px; }
          .t-card { min-height: 280px; padding: 44px 18px 24px; }
        }

        /* ── Mobile: 376px – 480px ── */
        @media (min-width: 376px) and (max-width: 480px) {
          .ts-section { padding: 56px 0 64px; }
          .ts-head { margin-bottom: 40px; }
          .ts-arrow { width: 40px; height: 40px; margin: 0 6px; }
          .t-card { min-height: 300px; padding: 48px 20px 26px; }
        }

        /* ── Tablet: 481px – 768px ── */
        @media (min-width: 481px) and (max-width: 768px) {
          .ts-section { padding: 60px 0 68px; }
          .ts-head { margin-bottom: 44px; }
          .ts-arrow { width: 44px; height: 44px; margin: 0 8px; }
          .t-card { min-height: 300px; }
        }

        /* ── Small laptop: 769px – 1024px ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .ts-section { padding: 68px 0 76px; }
          .ts-row { max-width: 980px; }
          .t-card { min-height: 320px; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .ts-row { max-width: 1100px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .ts-row { max-width: 1300px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .ts-section { padding: 96px 0 108px; }
          .ts-head { margin-bottom: 64px; }
          .ts-head p.ts-sub { font-size: 1.15rem; max-width: 640px; }
          .ts-row { max-width: 1560px; }
          .ts-arrow { width: 60px; height: 60px; margin: 0 16px; }
          .t-card { min-height: 400px; padding: 64px 32px 36px; }
          .t-card p { font-size: 1.1rem; }
          .t-card-quote { width: 60px; height: 60px; top: -30px; }
          .t-card-stars { font-size: 22px; }
          .t-card-name { font-size: 18px; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .ts-section { padding: 112px 0 128px; }
          .ts-head { margin-bottom: 80px; }
          .ts-head p.ts-sub { font-size: 1.2rem; max-width: 800px; }
          .ts-row { max-width: 1960px; }
          .ts-arrow { width: 72px; height: 72px; margin: 0 20px; }
          .t-card { min-height: 500px; padding: 80px 40px 44px; }
          .t-card p { font-size: 1.15rem; }
          .t-card-quote { width: 72px; height: 72px; top: -36px; border-radius: 16px; }
          .t-card-stars { font-size: 26px; }
          .t-card-name { font-size: 20px; }
          .t-card-bar { width: 4px; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .ts-section { padding: 140px 0 160px; }
          .ts-head { margin-bottom: 100px; }
          .ts-head p.ts-sub { font-size: 1.35rem; max-width: 1000px; }
          .ts-row { max-width: 2500px; }
          .ts-arrow { width: 88px; height: 88px; margin: 0 28px; }
          .t-card { min-height: 640px; padding: 100px 52px 56px; }
          .t-card p { font-size: 1.25rem; -webkit-line-clamp: 8; }
          .t-card-quote { width: 88px; height: 88px; top: -44px; border-radius: 20px; }
          .t-card-stars { font-size: 32px; }
          .t-card-name { font-size: 24px; }
          .t-card-bar { width: 5px; }
        }
      `}</style>

      <section ref={secRef} className="ts-section" id="reviews">
        <div className="ts-overlay" />

        {/* ── Heading ── */}
        <div className="ts-head reveal">
          <p className="section-eyebrow">SUCCESS STORIES</p>
          <h2 className="section-title-accent" style={{ fontFamily: "var(--font2)" }}>VOICES FROM PUBLISHED WRITERS</h2>
          <p className="ts-sub">Honest feedback from clients who trusted us with their publishing journey.</p>
        </div>

        {/* ── Slider row ── */}
        <div className="ts-row">
          <button className="ts-arrow t-prev" aria-label="Previous">
            <ChevronLeft size={22} aria-hidden="true" />
          </button>

          <div className="swiper t-swiper-inner" style={{ flex: 1, minWidth: 0 }}>
            <div className="swiper-wrapper">
              {testimonials.map(t => (
                <div className="swiper-slide" key={t.id}>
                  <div className="t-card">
                    <div className="t-card-quote">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="var(--accent)">
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                      </svg>
                    </div>
                    <div className="t-card-bar" />
                    <p>{t.review}</p>
                    <div className="t-card-stars">★★★★★</div>
                    <div className="t-card-name">{t.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="ts-arrow t-next" aria-label="Next">
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      </section>
    </>
  );
} 