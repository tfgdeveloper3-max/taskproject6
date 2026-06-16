"use client";
import { useEffect, useRef } from "react";

const books = [
    { src: "/images/Portfolio/01.jpg", alt: "The New Dark" },
    { src: "/images/Portfolio/02.jpg", alt: "Engraved" },
    { src: "/images/Portfolio/03.jpg", alt: "Money Lies and The Housewives" },
    { src: "/images/Portfolio/04.jpg", alt: "The Face of a Killer" },
    { src: "/images/Portfolio/05.jpg", alt: "Boundless" },
    { src: "/images/Portfolio/06.jpg", alt: "DNAlien" },
    { src: "/images/Portfolio/07.jpg", alt: "DNAlien II" },
    { src: "/images/Portfolio/08.jpg", alt: "DNAlien III" },
    { src: "/images/Portfolio/09.jpg", alt: "The First Book of the Heart" },
    { src: "/images/Portfolio/10.jpg", alt: "The Seed of Adam" },
    { src: "/images/Portfolio/11.jpg", alt: "Saboteur" },
    { src: "/images/Portfolio/12.jpg", alt: "Becoming Quitproof" },
];

export function PortfolioSection() {
    const swiperRef = useRef<HTMLDivElement>(null);
    const instanceRef = useRef<any>(null);
    const secRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = secRef.current; if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) el.querySelectorAll(".reveal").forEach(c => c.classList.add("revealed"));
        }, { threshold: 0.1 });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        const load = async () => {
            if (!document.getElementById("swiper-css")) {
                const link = document.createElement("link");
                link.id = "swiper-css"; link.rel = "stylesheet";
                link.href = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
                document.head.appendChild(link);
            }
            if (!(window as any).Swiper) {
                await new Promise<void>(r => {
                    const s = document.createElement("script");
                    s.src = "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js";
                    s.onload = () => r(); document.body.appendChild(s);
                });
            }
            if (swiperRef.current && !(swiperRef.current as any)._inst) {
                const inst = new (window as any).Swiper(swiperRef.current, {
                    effect: "coverflow", grabCursor: true, centeredSlides: true, slidesPerView: "auto", loop: true,
                    autoplay: { delay: 2800, disableOnInteraction: false },
                    coverflowEffect: { rotate: 45, stretch: 0, depth: 120, modifier: 1, slideShadows: true },
                    pagination: { el: ".port-pag", clickable: true },
                    navigation: { nextEl: ".port-next", prevEl: ".port-prev" },
                });
                (swiperRef.current as any)._inst = inst;
                instanceRef.current = inst;
            }
        };
        load();
        return () => { instanceRef.current?.destroy?.(true, true); };
    }, []);

    return (
        <>
            <style>{`
        /* ── Section ── */
        .port-section {
          background: #ebebeb;
          padding: 64px 0 72px;
          font-family: var(--font);
        }

        /* ── Heading ── */
        .port-head {
          text-align: center;
          padding: 0 20px;
          margin-bottom: 0;
        }
        .port-head h2 {
          color: var(--navy, #0d1240) !important;
        }

        /* ── Swiper base ── */
        .port-swiper {
          width: 100%;
          padding-top: 50px !important;
          padding-bottom: 60px !important;
        }
        .port-swiper .swiper-slide {
          width: 300px !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .port-swiper .swiper-slide img {
          width: 300px;
          height: 455px;
          object-fit: cover;
          border-radius: 10px;
          box-shadow: 0 12px 36px rgba(0,0,0,0.35);
          border: 2px solid rgba(240,165,0,0.2);
          transition: transform .25s, box-shadow .25s;
        }
        .port-swiper .swiper-slide img:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 56px rgba(0,0,0,0.45);
        }
        .port-swiper .swiper-button-prev,
        .port-swiper .swiper-button-next {
          color: var(--accent) !important;
          background: rgba(13,18,64,0.7);
          border-radius: 50%;
          width: 44px !important;
          height: 44px !important;
        }
        .port-swiper .swiper-button-prev::after,
        .port-swiper .swiper-button-next::after { font-size: 16px !important; }
        .port-swiper .swiper-pagination-bullet {
          background: rgba(240,165,0,0.3) !important;
          width: 10px !important;
          height: 10px !important;
        }
        .port-swiper .swiper-pagination-bullet-active {
          background: var(--accent) !important;
          transform: scale(1.35) !important;
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Small mobile: ≤ 375px ── */
        @media (max-width: 375px) {
          .port-section { padding: 44px 0 52px; }
          .port-swiper .swiper-slide { width: 180px !important; }
          .port-swiper .swiper-slide img { width: 180px; height: 272px; }
          .port-swiper .swiper-button-prev,
          .port-swiper .swiper-button-next { width: 34px !important; height: 34px !important; }
        }

        /* ── Mobile: 376px – 480px ── */
        @media (min-width: 376px) and (max-width: 480px) {
          .port-section { padding: 48px 0 56px; }
          .port-swiper .swiper-slide { width: 200px !important; }
          .port-swiper .swiper-slide img { width: 200px; height: 303px; }
        }

        /* ── Tablet: 481px – 768px ── */
        @media (min-width: 481px) and (max-width: 768px) {
          .port-section { padding: 52px 0 60px; }
          .port-swiper .swiper-slide { width: 230px !important; }
          .port-swiper .swiper-slide img { width: 230px; height: 348px; }
        }

        /* ── Small laptop: 769px – 1024px ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .port-section { padding: 56px 0 64px; }
          .port-swiper .swiper-slide { width: 260px !important; }
          .port-swiper .swiper-slide img { width: 260px; height: 394px; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .port-swiper .swiper-slide { width: 280px !important; }
          .port-swiper .swiper-slide img { width: 280px; height: 424px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .port-swiper .swiper-slide { width: 300px !important; }
          .port-swiper .swiper-slide img { width: 300px; height: 455px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .port-section { padding: 72px 0 84px; }
          .port-swiper .swiper-slide { width: 340px !important; }
          .port-swiper .swiper-slide img { width: 340px; height: 515px; }
          .port-swiper .swiper-button-prev,
          .port-swiper .swiper-button-next { width: 52px !important; height: 52px !important; }
          .port-swiper .swiper-button-prev::after,
          .port-swiper .swiper-button-next::after { font-size: 20px !important; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .port-section { padding: 88px 0 100px; }
          .port-swiper .swiper-slide { width: 400px !important; }
          .port-swiper .swiper-slide img { width: 400px; height: 606px; }
          .port-swiper .swiper-button-prev,
          .port-swiper .swiper-button-next { width: 60px !important; height: 60px !important; }
          .port-swiper .swiper-button-prev::after,
          .port-swiper .swiper-button-next::after { font-size: 22px !important; }
          .port-swiper .swiper-pagination-bullet { width: 13px !important; height: 13px !important; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .port-section { padding: 110px 0 124px; }
          .port-swiper .swiper-slide { width: 500px !important; }
          .port-swiper .swiper-slide img { width: 500px; height: 757px; }
          .port-swiper .swiper-button-prev,
          .port-swiper .swiper-button-next { width: 72px !important; height: 72px !important; }
          .port-swiper .swiper-button-prev::after,
          .port-swiper .swiper-button-next::after { font-size: 26px !important; }
          .port-swiper .swiper-pagination-bullet { width: 16px !important; height: 16px !important; }
        }
      `}</style>

            <section ref={secRef} className="port-section" id="portfolio">

                {/* ── Heading ── */}
                <div className="port-head reveal">
                    <p className="section-eyebrow" style={{ color: "var(--navy2)" }}>PROUDLY PUBLISHED WORK</p>
                    <h2 className="section-title">A Collection of Our Successful Author Stories</h2>
                </div>

                {/* ── Swiper ── */}
                <div ref={swiperRef} className="swiper port-swiper">
                    <div className="swiper-wrapper">
                        {books.map((b, i) => (
                            <div className="swiper-slide" key={i}>
                                <img src={b.src} alt={b.alt} />
                            </div>
                        ))}
                    </div>
                    <div className="swiper-button-prev port-prev" />
                    <div className="swiper-button-next port-next" />
                    <div className="swiper-pagination port-pag" />
                </div>

            </section>
        </>
    );
}