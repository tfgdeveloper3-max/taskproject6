"use client";
import { useState, useEffect } from "react";
import { Mail, Phone } from "lucide-react";

const EMAIL = "info@invictuspublishings.com";
const PHONE_DISPLAY = "(279) 777-0367";
const PHONE_TEL = "2797770367";

export default function ProposalNavbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <style>{`
        .pn-nav {
          background: #fff;
          position: sticky;
          top: 0;
          z-index: 999;
          border-bottom: 2.5px solid var(--accent);
          font-family: var(--font);
          transition: box-shadow 0.3s;
        }
        .pn-nav.scrolled { box-shadow: 0 4px 32px rgba(0,0,0,0.13); }
        .pn-nav:not(.scrolled) { box-shadow: 0 2px 10px rgba(0,0,0,0.06); }

        .pn-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          gap: 16px;
        }

        /* Logo */
        .pn-logo { text-decoration: none; display: flex; align-items: center; flex-shrink: 0; }
        .pn-logo img {
          height: 80px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        /* Contact buttons */
        .pn-contacts {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .pn-contacts a {
          font-size: 13px;
          padding: 10px 20px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
        }
        .pn-contacts a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }

        /* ── Tablet: ≤ 1024px ── */
        @media (max-width: 1024px) {
          .pn-inner { padding: 0 20px; }
          .pn-logo img { height: 64px; }
          .pn-contacts a { font-size: 12px; padding: 9px 14px; }
        }

        /* ── Mobile: ≤ 640px → sirf icons ── */
        @media (max-width: 640px) {
          .pn-logo img { height: 56px; }
          .pn-contacts { gap: 8px; }
          .pn-contacts a { padding: 10px; border-radius: 50%; }
          .pn-label { display: none; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .pn-inner { padding: 0 32px; max-width: 1100px; }
          .pn-contacts a { font-size: 12px; padding: 9px 16px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .pn-inner { max-width: 1560px; height: 92px; padding: 0 64px; }
          .pn-logo img { height: 92px; }
          .pn-contacts a { font-size: 14px; padding: 11px 24px; }
          .pn-nav { border-bottom-width: 3px; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .pn-inner { max-width: 1960px; height: 108px; padding: 0 96px; }
          .pn-logo img { height: 108px; }
          .pn-contacts a { font-size: 15px; padding: 13px 28px; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .pn-inner { max-width: 2500px; height: 130px; padding: 0 140px; }
          .pn-logo img { height: 130px; }
          .pn-contacts a { font-size: 17px; padding: 15px 34px; }
        }
      `}</style>

            <nav className={`pn-nav${scrolled ? " scrolled" : ""}`}>
                <div className="pn-inner">
                    {/* Logo */}
                    <a href="/" className="pn-logo">
                        <img src="/images/logo.png" alt="Invictus Publishings" />
                    </a>

                    {/* Mail + Phone */}
                    <div className="pn-contacts">
                        <a href={`mailto:${EMAIL}`} className="btn-navy" aria-label={`Email ${EMAIL}`}>
                            <Mail size={16} aria-hidden="true" />
                            <span className="pn-label">{EMAIL}</span>
                        </a>
                        <a href={`tel:${PHONE_TEL}`} className="btn-accent" aria-label={`Call ${PHONE_DISPLAY}`}>
                            <Phone size={16} aria-hidden="true" />
                            <span className="pn-label">{PHONE_DISPLAY}</span>
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}