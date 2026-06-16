"use client";
import Link from "next/link";
import { HelpCircle, Mail, Phone } from "lucide-react";
import { Facebook, Linkedin, Twitter } from "./SocialIcons";

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const footerServices = [
  {
    title: "Writing Services",
    links: [
      "Ghostwriting Services", "Children's Book Writing", "Memoir Writing",
      "Fiction Writing", "Non-Fiction Writing", "Script Writing",
      "Horror Writing", "Fantasy Writing", "Mystery Writing",
      "Historical Writing", "Sci-Fi Writing", "SEO Content Writing",
    ],
  },
  {
    title: "Editing & Publishing",
    links: [
      "Book Editing Services", "Book Proofreading", "Book Formatting",
      "Ebook Publishing Services", "Audiobook Narration",
      "Book Coaching Services", "Beta Reader Services",
    ],
  },
  {
    title: "Design & Marketing",
    links: [
      "Book Cover Design Services", "Illustration Design Services",
      "Author Website Design", "Book Marketing Services", "Book Printing",
    ],
  },
];

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "About Us", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Reviews", href: "#reviews" },
  { label: "Blogs", href: "#blogs" },
  { label: "Contact Us", href: "#contact" },
];

const helpLinks = [
  { label: "Terms And Conditions", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
];

const socialLinks = [
  { icon: <Facebook size={18} />, href: "#" },
  { icon: <Linkedin size={18} />, href: "#" },
  { icon: <Twitter size={18} />, href: "#" },
];

/* smooth scroll handler for single-page */
const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export function FooterSection() {
  return (
    <>
      <style>{`
        /* ── Footer base ── */
        .ft-root { font-family: var(--font); }

        /* ══ TOP NAV ══ */
        .ft-top {
          background: var(--gradient-dark);
          padding: 60px 60px 64px;
        }
        .ft-top-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.2fr 1.2fr 1fr 1fr;
          gap: 32px;
        }
        .ft-col-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 22px;
          font-family: var(--font2);
        }
        .ft-link-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 13px;
        }
        .ft-link {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.75);
          transition: color 0.2s, padding-left 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .ft-link:hover {
          color: var(--accent);
          padding-left: 6px;
        }

        /* badges */
        .ft-badges { display: flex; flex-direction: column; gap: 14px; margin-top: 24px; }
        .ft-badge {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(240,165,0,0.25);
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.2s;
        }
        .ft-badge:hover { background: rgba(255,255,255,0.1); transform: scale(1.04); }
        .ft-badge img {
          height: 32px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        /* ══ MID ══ */
        .ft-mid {
          background: #fef8ec;
          padding: 34px 60px;
          border-top: 3px solid var(--accent);
        }
        .ft-mid-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        .ft-mid-logo img { height: 75px; width: auto; object-fit: contain; }
        .ft-mid-address { flex: 1; }
        .ft-mid-address p { font-size: 1.1rem; font-weight: 700; color: var(--navy); line-height: 1.75; margin: 0; }
        .ft-mid-contact { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .ft-mid-contact a {
          display: flex; align-items: center; gap: 8px;
          font-size: 1.1rem; font-weight: 700; color: var(--navy);
          line-height: 1.8; transition: color 0.2s; text-decoration: none;
        }
        .ft-mid-contact a:hover { color: var(--accent); }
        .ft-socials { display: flex; gap: 14px; margin-left: auto; }
        .ft-social-btn {
          width: 42px; height: 42px; border-radius: 50%;
          background: var(--accent);
          display: flex; align-items: center; justify-content: center;
          color: var(--navy);
          transition: transform 0.2s, background 0.2s;
          text-decoration: none;
        }
        .ft-social-btn:hover { transform: translateY(-3px); background: var(--accent-hover); }

        /* ══ BOTTOM ══ */
        .ft-bottom {
          background: #07091e;
          padding: 18px 24px;
          text-align: center;
          position: relative;
        }
        .ft-bottom p { font-size: 13px; color: rgba(255,255,255,0.5); margin: 0; }
        .ft-help-btn {
          position: absolute;
          right: 24px; top: 50%;
          transform: translateY(-50%);
          padding: 8px 22px;
          font-size: 13px;
          border-radius: var(--radius-pill);
          border: none;
          text-decoration: none;
          display: flex; align-items: center; gap: 6px;
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Small mobile: ≤ 375px ── */
        @media (max-width: 375px) {
          .ft-top { padding: 44px 16px 48px; }
          .ft-top-grid { grid-template-columns: 1fr; gap: 32px; }
          .ft-mid { padding: 28px 16px; }
          .ft-mid-inner { flex-direction: column; align-items: flex-start; gap: 20px; }
          .ft-mid-address, .ft-mid-contact { flex: none; width: 100%; }
          .ft-socials { margin-left: 0; }
          .ft-bottom { padding: 52px 16px 18px; }
          .ft-help-btn { position: static; transform: none; margin: 10px auto 0; display: inline-flex; }
          .ft-bottom { text-align: center; display: flex; flex-direction: column; align-items: center; }
        }

        /* ── Mobile: 376px – 480px ── */
        @media (min-width: 376px) and (max-width: 480px) {
          .ft-top { padding: 48px 18px 52px; }
          .ft-top-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
          .ft-mid { padding: 28px 18px; }
          .ft-mid-inner { flex-direction: column; align-items: flex-start; gap: 20px; }
          .ft-mid-address, .ft-mid-contact { flex: none; width: 100%; }
          .ft-socials { margin-left: 0; }
          .ft-bottom { padding: 52px 18px 18px; display: flex; flex-direction: column; align-items: center; }
          .ft-help-btn { position: static; transform: none; margin: 10px auto 0; display: inline-flex; }
        }

        /* ── Tablet: 481px – 768px ── */
        @media (min-width: 481px) and (max-width: 768px) {
          .ft-top { padding: 52px 28px 56px; }
          .ft-top-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
          .ft-mid { padding: 28px 28px; }
          .ft-mid-inner { gap: 24px; }
          .ft-mid-address, .ft-mid-contact { flex: none; }
          .ft-bottom { padding: 48px 20px 18px; display: flex; flex-direction: column; align-items: center; }
          .ft-help-btn { position: static; transform: none; margin: 10px auto 0; display: inline-flex; }
        }

        /* ── Small laptop: 769px – 1024px ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .ft-top { padding: 56px 36px 60px; }
          .ft-top-grid { grid-template-columns: 1fr 1fr 1fr; gap: 28px; max-width: 900px; }
          .ft-mid { padding: 30px 36px; }
          .ft-mid-inner { max-width: 900px; gap: 28px; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .ft-top { padding: 56px 44px 60px; }
          .ft-top-grid { grid-template-columns: 1fr 1.1fr 1.1fr 0.9fr 0.9fr; max-width: 1100px; gap: 28px; }
          .ft-mid { padding: 32px 44px; }
          .ft-mid-inner { max-width: 1100px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .ft-top-grid { max-width: 1200px; }
          .ft-mid-inner { max-width: 1200px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .ft-top { padding: 72px 80px 76px; }
          .ft-top-grid { max-width: 1480px; gap: 40px; }
          .ft-col-title { font-size: 18px; }
          .ft-link { font-size: 1.1rem; }
          .ft-mid { padding: 40px 80px; }
          .ft-mid-inner { max-width: 1480px; gap: 48px; }
          .ft-mid-logo img { height: 88px; }
          .ft-social-btn { width: 48px; height: 48px; }
          .ft-bottom { padding: 22px 32px; }
          .ft-bottom p { font-size: 14px; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .ft-top { padding: 88px 120px 96px; }
          .ft-top-grid { max-width: 1900px; gap: 52px; }
          .ft-col-title { font-size: 20px; margin-bottom: 28px; }
          .ft-link { font-size: 1.1rem; }
          .ft-link-list { gap: 16px; }
          .ft-mid { padding: 48px 120px; }
          .ft-mid-inner { max-width: 1900px; gap: 60px; }
          .ft-mid-logo img { height: 100px; }
          .ft-mid-address p { font-size: 1.15rem; }
          .ft-mid-contact a { font-size: 1.15rem; }
          .ft-social-btn { width: 54px; height: 54px; }
          .ft-bottom { padding: 26px 40px; }
          .ft-bottom p { font-size: 15px; }
          .ft-badge-label { font-size: 12px; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .ft-top { padding: 110px 160px 120px; }
          .ft-top-grid { max-width: 2400px; gap: 64px; }
          .ft-col-title { font-size: 24px; margin-bottom: 32px; }
          .ft-link { font-size: 1.2rem; }
          .ft-link-list { gap: 20px; }
          .ft-mid { padding: 60px 160px; }
          .ft-mid-inner { max-width: 2400px; gap: 80px; }
          .ft-mid-logo img { height: 120px; }
          .ft-mid-address p { font-size: 1.3rem; }
          .ft-mid-contact a { font-size: 1.3rem; }
          .ft-social-btn { width: 64px; height: 64px; }
          .ft-bottom { padding: 32px 60px; }
          .ft-bottom p { font-size: 17px; }
          .ft-badge { padding: 18px 22px; }
          .ft-badge-label { font-size: 14px; }
        }
      `}</style>

      <footer className="ft-root">

        {/* ══ TOP NAV ══ */}
        <div className="ft-top">
          <div className="ft-top-grid">

            {/* Quick Links */}
            <div>
              <h4 className="ft-col-title">Quick Links</h4>
              <ul className="ft-link-list">
                {quickLinks.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="ft-link" onClick={e => scrollTo(e, l.href)}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service columns */}
            {footerServices.map(col => (
              <div key={col.title}>
                <h4 className="ft-col-title">{col.title}</h4>
                <ul className="ft-link-list">
                  {col.links.map(l => (
                    <li key={l}>
                      <Link href={`/services/${slugify(l)}`} className="ft-link">{l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Help + Badges */}
            <div>
              <h4 className="ft-col-title">Help</h4>
              <ul className="ft-link-list">
                {helpLinks.map(l => (
                  <li key={l.label}>
                    <a href={l.href} className="ft-link" onClick={e => scrollTo(e, l.href)}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="ft-badges">
                <div className="ft-badge">
                  <img src="/images/google3.png" alt="Google Reviews" />
                </div>
                <div className="ft-badge">
                  <img src="/images/footer-icon1.webp" alt="Trustpilot" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ══ MID ══ */}
        <div className="ft-mid">
          <div className="ft-mid-inner">

            <a href="#hero" className="ft-mid-logo" onClick={e => scrollTo(e, "#hero")} style={{ textDecoration: "none" }}>
              <img src="/images/logo.png" alt="Invictus Publishing" />
            </a>

            <div className="ft-mid-address">
              <p>Mailing Address:<br />42 Broadway 12th floor, New York, NY 10004</p>
            </div>

            <div className="ft-mid-contact">
              <a href="mailto:info@nybookpublishers.com">
                <Mail size={16} aria-hidden="true" /> info@nybookpublishers.com
              </a>
              <a href="tel:8553847020">
                <Phone size={16} aria-hidden="true" /> (855) 384-7020
              </a>
            </div>

            <div className="ft-socials">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} className="ft-social-btn" aria-label={`Social link ${i + 1}`}>
                  {s.icon}
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* ══ BOTTOM ══ */}
        <div className="ft-bottom">
          <p>Copyright &copy; 2026 Invictus Publishing Group LLC All Rights Reserved.</p>
          <a href="#contact" className="btn-accent ft-help-btn" onClick={e => scrollTo(e, "#contact")}>
            <HelpCircle size={16} aria-hidden="true" /> Help
          </a>
        </div>

      </footer>
    </>
  );
}