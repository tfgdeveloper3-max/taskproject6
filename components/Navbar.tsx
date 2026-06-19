"use client";
import { useState, useEffect } from "react";
import { BookOpen, Mail, Phone } from "lucide-react";
import { ConsultationModal } from "./pages/ConsultationModal";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About Us", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const el = document.getElementById(href.slice(1));
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = navLinks.map(l => l.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) { setActive(ids[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    scrollTo(e, href);
    setMobileOpen(false);
  };

  return (
    <>
      <style>{`
        /* ── Topbar ── */
        .nb-topbar {
          background: var(--gradient-dark);
          padding: 8px 0;
          border-bottom: 1px solid rgba(240,165,0,0.18);
          font-family: var(--font);
        }
        .nb-topbar-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 28px;
        }
        .nb-topbar a {
          color: rgba(255,255,255,0.85);
          font-size: 13px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 7px;
          transition: color 0.2s;
          text-decoration: none;
        }
        .nb-topbar a:hover { color: var(--accent); }
        .nb-topbar a svg { color: var(--accent); }

        /* ── Main nav ── */
        .nb-nav {
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 999;
          border-bottom: 2.5px solid var(--accent);
          font-family: var(--font);
          transition: box-shadow 0.3s;
        }
        .nb-nav.scrolled { box-shadow: 0 4px 32px rgba(0,0,0,0.13); }
        .nb-nav:not(.scrolled) { box-shadow: 0 2px 10px rgba(0,0,0,0.06); }

        .nb-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        /* Logo */
        .nb-logo img {
          height: 80px;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .nb-logo { text-decoration: none; display: flex; align-items: center; }

        /* Desktop links */
        .nb-links {
          display: flex;
          align-items: center;
          list-style: none;
          gap: 2px;
          margin: 0; padding: 0;
        }
        .nb-link {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          padding: 10px 13px;
          display: block;
          border-radius: 8px;
          transition: color 0.2s, background 0.2s;
          text-decoration: none;
          position: relative;
        }
        .nb-link::after {
          content: '';
          position: absolute;
          bottom: 4px; left: 13px; right: 13px;
          height: 2px;
          background: var(--accent);
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform 0.2s;
        }
        .nb-link:hover,
        .nb-link.active {
          color: var(--accent);
          background: rgba(240,165,0,0.06);
        }
        .nb-link.active::after,
        .nb-link:hover::after { transform: scaleX(1); }

        /* CTA buttons */
        .nb-ctas {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .nb-ctas a {
          font-size: 13px;
          padding: 10px 20px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        /* Hamburger */
        .nb-burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          padding: 6px;
          cursor: pointer;
        }
        .nb-burger span {
          display: block;
          width: 24px; height: 2.5px;
          background: var(--navy);
          border-radius: 2px;
          transition: transform 0.3s, opacity 0.3s;
        }

        /* Mobile drawer */
        .nb-mobile {
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1);
          background: #fff;
        }
        .nb-mobile-inner {
          padding: 8px 0 16px;
          display: flex;
          flex-direction: column;
        }
        .nb-mobile-link {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          padding: 13px 28px;
          border-bottom: 1px solid #f2f2f2;
          transition: color 0.2s, background 0.2s;
          text-decoration: none;
          display: block;
        }
        .nb-mobile-link:hover,
        .nb-mobile-link.active {
          color: var(--accent);
          background: rgba(240,165,0,0.04);
        }
        .nb-mobile-phone {
          color: var(--accent);
          font-weight: 800;
          padding: 13px 28px;
          font-size: 14px;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Mobile + Tablet: ≤ 1024px ── */
        @media (max-width: 1024px) {
          .nb-links { display: none; }
          .nb-ctas  { display: none; }
          .nb-burger { display: flex; }
          .nb-inner { padding: 0 20px; }
          .nb-topbar-inner { padding: 0 20px; gap: 16px; }
          .nb-topbar a { font-size: 12px; }
          .nb-logo img { height: 64px; }
        }

        /* ── Small mobile: ≤ 480px ── */
        @media (max-width: 480px) {
          .nb-topbar { display: none; }
          .nb-logo img { height: 56px; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .nb-inner { padding: 0 32px; max-width: 1100px; }
          .nb-topbar-inner { padding: 0 32px; }
          .nb-link { font-size: 13px; padding: 10px 10px; }
          .nb-ctas a { font-size: 12px; padding: 9px 16px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .nb-inner { max-width: 1320px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .nb-inner { max-width: 1560px; height: 92px; padding: 0 64px; }
          .nb-topbar-inner { max-width: 1560px; padding: 0 64px; }
          .nb-logo img { height: 92px; }
          .nb-link { font-size: 15px; padding: 11px 15px; }
          .nb-ctas a { font-size: 14px; padding: 11px 24px; }
          .nb-nav { border-bottom-width: 3px; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .nb-inner { max-width: 1960px; height: 108px; padding: 0 96px; }
          .nb-topbar-inner { max-width: 1960px; padding: 0 96px; }
          .nb-topbar { padding: 10px 0; }
          .nb-topbar a { font-size: 15px; }
          .nb-logo img { height: 108px; }
          .nb-link { font-size: 17px; padding: 12px 18px; }
          .nb-ctas a { font-size: 15px; padding: 13px 28px; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .nb-inner { max-width: 2500px; height: 130px; padding: 0 140px; }
          .nb-topbar-inner { max-width: 2500px; padding: 0 140px; }
          .nb-topbar { padding: 14px 0; }
          .nb-topbar a { font-size: 17px; gap: 10px; }
          .nb-logo img { height: 130px; }
          .nb-link { font-size: 20px; padding: 14px 22px; }
          .nb-ctas a { font-size: 17px; padding: 15px 34px; }
          .nb-links { gap: 4px; }
        }
      `}</style>

      {/* ── Topbar ── */}
      <div className="nb-topbar">
        <div className="nb-topbar-inner">
          <a href="mailto:info@invictuspublishings.com">
            <Mail size={14} /> info@invictuspublishings.com
          </a>
          <a href="tel:2797770367">
            <Phone size={14} /> (279) 777-0367
          </a>
        </div>
      </div>

      {/* ── Main Nav ── */}
      <nav className={`nb-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nb-inner">

          {/* Logo */}
          <a href="#hero" className="nb-logo" onClick={e => handleNav(e, "#hero")}>
            <img src="/images/logo.png" alt="Invictus Publishing" />
          </a>

          {/* Desktop links */}
          <ul className="nb-links">
            {navLinks.map(item => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`nb-link${active === item.href.slice(1) ? " active" : ""}`}
                  onClick={e => handleNav(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA buttons */}
          <div className="nb-ctas">
            <a href="tel:2797770367" className="btn-accent">
              <Phone size={14} aria-hidden="true" /> (279) 777-0367
            </a>
            <a href="#" className="btn-navy" onClick={(e) => { e.preventDefault(); setModalOpen(true); }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <BookOpen size={16} /> Free Consultation
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="nb-burger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                transform: mobileOpen
                  ? i === 0 ? "translateY(7.5px) rotate(45deg)"
                    : i === 1 ? "scaleX(0)"
                      : "translateY(-7.5px) rotate(-45deg)"
                  : "none",
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>

        {/* Mobile drawer */}
        <div className="nb-mobile" style={{ maxHeight: mobileOpen ? 700 : 0, borderTop: mobileOpen ? "1px solid rgba(240,165,0,0.15)" : "none" }}>
          <div className="nb-mobile-inner">
            {navLinks.map(item => (
              <a
                key={item.label}
                href={item.href}
                className={`nb-mobile-link${active === item.href.slice(1) ? " active" : ""}`}
                onClick={e => handleNav(e, item.href)}
              >
                {item.label}
              </a>
            ))}
            <a href="tel:2797770367" className="nb-mobile-phone">
              <Phone size={16} aria-hidden="true" /> (279) 777-0367
            </a>
          </div>
        </div>
        <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </nav>
    </>
  );
}