"use client";

const logos = [
  { src: "/images/logo/AppleBooks.png", alt: "Apple Books" },
  { src: "/images/logo/Amazon.png", alt: "Amazon Kindle" },
  { src: "/images/logo/Ingram.png", alt: "IngramSpark" },
  { src: "/images/logo/Barnes.png", alt: "Barnes & Noble" },
  { src: "/images/logo/Kobo.png", alt: "Kobo" },
];

const all = [...logos, ...logos, ...logos, ...logos];

export function LogoBar() {
  return (
    <>
      <style>{`
        @keyframes nybpSlide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .nybp-logobar-track {
          animation: nybpSlide 28s linear infinite;
        }
        .nybp-logobar-track:hover { animation-play-state: paused; }

        .nybp-logo-item {
          transition: transform 0.3s, opacity 0.3s;
          opacity: 0.75;
        }
        .nybp-logo-item:hover {
          opacity: 1;
          transform: scale(1.08);
        }
        .nybp-logo-item img {
          height: 36px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        /* ── Bar ── */
        .lb-bar {
          background: var(--gradient-dark);
          overflow: hidden;
          height: 88px;
          display: flex;
          align-items: center;
          border-top: 1px solid rgba(240,165,0,0.12);
          border-bottom: 1px solid rgba(240,165,0,0.12);
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        @media (max-width: 480px) {
          .lb-bar { height: 68px; }
          .nybp-logo-item img { height: 24px; }
          .nybp-logo-item { padding: 0 24px; }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .lb-bar { height: 76px; }
          .nybp-logo-item img { height: 28px; }
          .nybp-logo-item { padding: 0 28px; }
        }
        @media (min-width: 769px) and (max-width: 1280px) {
          .nybp-logo-item img { height: 32px; }
        }
        @media (min-width: 1601px) and (max-width: 1920px) {
          .lb-bar { height: 100px; }
          .nybp-logo-item img { height: 42px; }
          .nybp-logo-item { padding: 0 52px; }
        }
        @media (min-width: 1921px) and (max-width: 2560px) {
          .lb-bar { height: 120px; }
          .nybp-logo-item img { height: 52px; }
          .nybp-logo-item { padding: 0 64px; }
        }
        @media (min-width: 2561px) {
          .lb-bar { height: 150px; }
          .nybp-logo-item img { height: 68px; }
          .nybp-logo-item { padding: 0 80px; }
        }
      `}</style>

      <div className="lb-bar">
        <div className="nybp-logobar-track" style={{ display: "flex", alignItems: "center", width: "max-content" }}>
          {all.map((l, i) => (
            <div key={i} className="nybp-logo-item" style={{ padding: "0 40px", flexShrink: 0 }}>
              <img src={l.src} alt={l.alt} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}