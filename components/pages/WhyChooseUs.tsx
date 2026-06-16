"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

const firstItems = [
    { number: "01", ribbon: "/images/01.png", title: "Content Refinement", description: "Your draft is shaped, structured, and strengthened to ensure clarity, flow, and reader engagement." },
    { number: "02", ribbon: "/images/02.png", title: "Professional Editing", description: "We refine grammar, tone, pacing, and consistency while preserving your unique voice and message." },
    { number: "03", ribbon: "/images/03.png", title: "Design & Presentation", description: "Cover design and interior formatting are crafted to give your book a professional, market-ready appearance." },
];
const secondItems = [
    { number: "04", ribbon: "/images/04.png", title: "Publishing Setup", description: "We handle ISBN registration, platform setup, and global publishing distribution across major channels." },
    { number: "05", ribbon: "/images/05.png", title: "Launch & Visibility", description: "Your book goes live with strategic positioning to ensure it reaches the right audience and gains visibility." },
    { number: "06", ribbon: "/images/06.png", title: "Marketing & Reader Reach", description: "We position your book through strategic marketing, promotional campaigns, and audience-focused efforts to increase visibility." },
];

export default function WhyChooseUs() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const heading = section.querySelector(".wcu-heading") as HTMLElement;
                    if (heading) { heading.style.opacity = "1"; heading.style.transform = "translateY(0)"; }

                    const leftPhoto1 = section.querySelector(".wcu-photo-left-1") as HTMLElement;
                    if (leftPhoto1) setTimeout(() => { leftPhoto1.style.opacity = "1"; leftPhoto1.style.transform = "translateX(0)"; }, 150);

                    const rightPhoto2 = section.querySelector(".wcu-photo-right-2") as HTMLElement;
                    if (rightPhoto2) setTimeout(() => { rightPhoto2.style.opacity = "1"; rightPhoto2.style.transform = "translateX(0)"; }, 150);

                    section.querySelectorAll(".wcu-ribbon-item").forEach((item, i) => {
                        setTimeout(() => {
                            (item as HTMLElement).style.opacity = "1";
                            (item as HTMLElement).style.transform = "translateX(0)";
                        }, 200 + i * 120);
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.1 });
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style>{`
        @keyframes wcuShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* ── Section ── */
        .wcu-section {
          font-family: var(--font);
          background: var(--white);
          padding: 70px 30px;
          max-width: 1180px;
          margin: 0 auto;
        }

        /* ── Heading ── */
        .wcu-heading {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          text-align: center;
          font-size: clamp(24px, 3.5vw, 42px);
          font-weight: 900;
          color: var(--navy2, #1a1f5e);
          line-height: 1.3;
          margin-bottom: 20px;
          font-family: var(--font2);
        }

        /* ── Sub paragraph ── */
        .wcu-sub {
          font-size: 1.1rem;
          color: #555;
          line-height: 1.7;
          max-width: 900px;
          text-align: center;
          margin: 40px auto 50px;
        }

        /* ── Rows ── */
        .wcu-row {
          display: flex;
          align-items: stretch;
          gap: 20px;
          margin-bottom: 50px;
        }

        /* ── Photo block ── */
        .wcu-photo {
          width: 48%;
          flex-shrink: 0;
          height: 560px;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          opacity: 0;
          transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
        }
        .wcu-photo-left-1  { transform: translateX(-60px); }
        .wcu-photo-right-2 { transform: translateX(60px); }

        .wcu-photo-inner {
          width: 100%;
          height: 100%;
          transition: transform 6s ease;
        }
        .wcu-photo-inner:hover { transform: scale(1.04); }

        /* ── Items column ── */
        .wcu-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        /* ── Ribbon items ── */
        .wcu-ribbon-item {
          position: relative;
          min-height: 120px;
          display: flex;
          align-items: center;
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .wcu-ribbon-item-left { transform: translateX(-40px) !important; }

        .wcu-ribbon-item:hover .wcu-ribbon-content h3 {
          background: linear-gradient(90deg, var(--accent), #1a1f5e, var(--accent));
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: wcuShimmer 1.5s linear infinite;
        }
        .wcu-ribbon-img { transition: transform 0.4s ease; }
        .wcu-ribbon-item:hover .wcu-ribbon-img { transform: scale(1.02); }

        .wcu-ribbon-content {
          position: relative;
          z-index: 1;
          width: 100%;
        }
        .wcu-ribbon-content h3 {
          color: #1A1F5E;
          font-size: 1.1rem;
          font-weight: 800;
          margin: 0 0 5px;
        }
        .wcu-ribbon-content p {
          font-size: 1.1rem;
          color: #444;
          line-height: 1.65;
          margin: 0;
        }

        /* right-side ribbon padding */
        .wcu-pad-right { padding: 50px 20px 54px 200px; }
        /* left-side ribbon padding */
        .wcu-pad-left  { padding: 50px 200px 54px 20px; }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Small mobile: ≤ 375px ── */
        @media (max-width: 375px) {
          .wcu-section { padding: 40px 14px; }
          .wcu-heading { font-size: 22px; }
          .wcu-row { flex-direction: column; gap: 24px; }
          .wcu-photo { width: 100%; height: 220px; }
          .wcu-ribbon-item { min-height: 90px; }
          .wcu-pad-right,
          .wcu-pad-left  { padding: 20px 16px 20px 90px; }
          .wcu-ribbon-content h3 { font-size: 0.95rem; }
          .wcu-ribbon-content p  { font-size: 0.85rem; }
        }

        /* ── Mobile: 376px – 480px ── */
        @media (min-width: 376px) and (max-width: 480px) {
          .wcu-section { padding: 44px 16px; }
          .wcu-row { flex-direction: column; gap: 28px; }
          .wcu-photo { width: 100%; height: 260px; }
          .wcu-ribbon-item { min-height: 100px; }
          .wcu-pad-right,
          .wcu-pad-left  { padding: 22px 16px 22px 100px; }
        }

        /* ── Tablet: 481px – 768px ── */
        @media (min-width: 481px) and (max-width: 768px) {
          .wcu-section { padding: 52px 24px; }
          .wcu-row { flex-direction: column; gap: 32px; }
          .wcu-photo { width: 100%; height: 320px; }
          .wcu-ribbon-item { min-height: 110px; }
          .wcu-pad-right,
          .wcu-pad-left  { padding: 28px 20px 28px 130px; }
        }

        /* ── Small laptop: 769px – 1024px ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .wcu-section { padding: 60px 28px; max-width: 960px; }
          .wcu-photo { height: 520px; }
          .wcu-pad-right { padding: 38px 16px 42px 150px; }
          .wcu-pad-left  { padding: 38px 150px 42px 16px; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .wcu-section { padding: 64px 30px; max-width: 1100px; }
          .wcu-photo { height: 600px; }
          .wcu-pad-right { padding: 44px 20px 48px 180px; }
          .wcu-pad-left  { padding: 44px 180px 48px 20px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .wcu-photo { height: 660px; }
          .wcu-pad-right { padding: 50px 20px 54px 200px; }
          .wcu-pad-left  { padding: 50px 200px 54px 20px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .wcu-section { max-width: 1480px; padding: 80px 40px; }
          .wcu-photo { height: 640px; }
          .wcu-heading { font-size: clamp(38px, 3vw, 52px); }
          .wcu-ribbon-content h3 { font-size: 1.25rem; }
          .wcu-ribbon-content p  { font-size: 1.1rem; }
          .wcu-pad-right { padding: 56px 24px 60px 220px; }
          .wcu-pad-left  { padding: 56px 220px 60px 24px; }
          .wcu-ribbon-item { min-height: 140px; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .wcu-section { max-width: 1900px; padding: 96px 60px; }
          .wcu-photo { height: 740px; }
          .wcu-heading { font-size: clamp(48px, 3vw, 64px); }
          .wcu-sub { font-size: 1.25rem; max-width: 1100px; }
          .wcu-ribbon-content h3 { font-size: 1.4rem; }
          .wcu-ribbon-content p  { font-size: 1.15rem; }
          .wcu-pad-right { padding: 64px 28px 68px 260px; }
          .wcu-pad-left  { padding: 64px 260px 68px 28px; }
          .wcu-ribbon-item { min-height: 160px; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .wcu-section { max-width: 2400px; padding: 120px 80px; }
          .wcu-photo { height: 900px; }
          .wcu-heading { font-size: clamp(64px, 3vw, 88px); }
          .wcu-sub { font-size: 1.4rem; max-width: 1400px; }
          .wcu-ribbon-content h3 { font-size: 1.65rem; }
          .wcu-ribbon-content p  { font-size: 1.25rem; }
          .wcu-pad-right { padding: 80px 32px 84px 320px; }
          .wcu-pad-left  { padding: 80px 320px 84px 32px; }
          .wcu-ribbon-item { min-height: 200px; }
        }
      `}</style>

            <section ref={sectionRef} className="wcu-section">

                {/* ── Heading ── */}
                <h2 className="wcu-heading">
                    OUR STEP-BY-STEP PUBLISHING PROCESS BEFORE <br />THE BESTSELLER BADGE
                </h2>

                <p className="wcu-sub">
                    We begin by understanding your idea, goals, and raw manuscript to define the right publishing direction.
                </p>

                {/* ── Row 1: Photo Left, Items Right ── */}
                <div className="wcu-row">
                    <div className="wcu-photo wcu-photo-left-1">
                        <div className="wcu-photo-inner">
                            <Image src="/images/Services-1.jpg" alt="Expert book publishing" fill sizes="(max-width:768px) 100vw, 48vw" style={{ objectFit: "cover" }} />
                        </div>
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,18,64,0.25) 0%, transparent 50%)", pointerEvents: "none" }} />
                    </div>

                    <div className="wcu-col">
                        {firstItems.map(item => (
                            <div key={item.number} className="wcu-ribbon-item">
                                <div className="wcu-ribbon-img" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                                    <Image src={item.ribbon} alt={item.number} fill sizes="100%" style={{ objectFit: "fill" }} />
                                </div>
                                <div className="wcu-ribbon-content wcu-pad-right">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Row 2: Items Left, Photo Right ── */}
                <div className="wcu-row">
                    <div className="wcu-col">
                        {secondItems.map(item => (
                            <div key={item.number} className="wcu-ribbon-item wcu-ribbon-item-left">
                                <div className="wcu-ribbon-img" style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                                    <Image src={item.ribbon} alt={item.number} fill sizes="100%" style={{ objectFit: "fill" }} />
                                </div>
                                <div className="wcu-ribbon-content wcu-pad-left">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="wcu-photo wcu-photo-right-2">
                        <div className="wcu-photo-inner">
                            <Image src="/images/Services-2.jpg" alt="Book publishers" fill sizes="(max-width:768px) 100vw, 48vw" style={{ objectFit: "cover" }} />
                        </div>
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(13,18,64,0.25) 0%, transparent 50%)", pointerEvents: "none" }} />
                    </div>
                </div>

            </section>
        </>
    );
}