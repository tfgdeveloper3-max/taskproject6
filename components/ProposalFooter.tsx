"use client";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const CONTACT = {
    phone: "(279) 777-0367",
    phoneHref: "tel:2797770367",
    email: "info@invictuspublishings.com",
};

const strategyLinks = [
    { label: "Email Marketing", id: "email-marketing" },
    { label: "Book Signing Events", id: "book-signing" },
    { label: "Author Branding", id: "author-branding" },
    { label: "Times Square", id: "times-square" },
    { label: "Influencer Marketing", id: "influencer-marketing" },
    { label: "Author of the Month", id: "author-of-the-month" },
    { label: "Book to Screen", id: "book-to-screen" },
    { label: "BookTalk", id: "booktalk" },
];

const mailListLinks = [
    { label: "Romance", id: "romance" },
    { label: "Fantasy / Horror / Sci-Fi", id: "speculative" },
    { label: "Literature / Religion / Travel", id: "literature" },
    { label: "Nonfiction", id: "nonfiction" },
    { label: "Kids & Teens", id: "kids" },
    { label: "Mystery", id: "mystery" },
];

const helpLinks = [
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
];

export function ProposalFooter() {
    const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        e.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
    };

    return (
        <>
            <style>{`
        .pf-root { font-family: var(--font); }

        /* ══ TOP ══ */
        .pf-top {
          background: var(--gradient-dark);
          padding: 48px 40px;
        }
        .pf-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.1fr 1.1fr 0.8fr;
          gap: 32px;
        }
        .pf-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--accent);
          margin: 0 0 18px;
          font-family: var(--font2);
        }
        .pf-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .pf-list.two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 11px 20px;
        }
        .pf-link {
          font-size: 0.95rem;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          transition: color 0.2s;
        }
        .pf-link:hover { color: var(--accent); }
        .pf-link:focus-visible,
        .pf-contact a:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
          border-radius: 4px;
        }

        /* ══ MID ══ */
        .pf-mid {
          background: #fef8ec;
          padding: 22px 40px;
          border-top: 3px solid var(--accent);
        }
        .pf-mid-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 40px;
          flex-wrap: wrap;
        }
        .pf-logo img { height: 70px; width: auto; object-fit: contain; display: block; }
        .pf-contact {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 10px 32px;
          margin-left: auto;
        }
        .pf-contact a,
        .pf-contact span {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          font-weight: 700;
          color: var(--navy);
          text-decoration: none;
          transition: color 0.2s;
        }
        .pf-contact a:hover { color: var(--accent); }
        .pf-contact svg { color: var(--accent); flex-shrink: 0; }

        /* ══ BOTTOM ══ */
        .pf-bottom {
          background: #07091e;
          padding: 14px 20px;
          text-align: center;
        }
        .pf-bottom p { font-size: 13px; color: rgba(255,255,255,0.5); margin: 0; }

        /* ═══ RESPONSIVE ═══ */
        @media (max-width: 1024px) {
          .pf-grid { grid-template-columns: 1fr 1fr; }
          .pf-help { grid-column: 1 / -1; }
          .pf-help .pf-list { flex-direction: row; flex-wrap: wrap; gap: 11px 24px; }
          .pf-contact { margin-left: 0; }
        }
        @media (max-width: 640px) {
          .pf-top { padding: 40px 18px; }
          .pf-grid { grid-template-columns: 1fr; gap: 28px; }
          .pf-mid { padding: 20px 18px; }
          .pf-mid-inner { flex-direction: column; align-items: flex-start; gap: 16px; }
          .pf-contact { flex-direction: column; align-items: flex-start; }
          .pf-logo img { height: 56px; }
        }
        @media (min-width: 1800px) {
          .pf-grid, .pf-mid-inner { max-width: 1600px; }
          .pf-title { font-size: 18px; }
          .pf-link, .pf-contact a, .pf-contact span { font-size: 1.1rem; }
          .pf-bottom p { font-size: 14px; }
        }
        @media (min-width: 2400px) {
          .pf-grid, .pf-mid-inner { max-width: 2100px; }
          .pf-title { font-size: 22px; }
          .pf-link, .pf-contact a, .pf-contact span { font-size: 1.25rem; }
          .pf-logo img { height: 96px; }
          .pf-bottom p { font-size: 16px; }
        }
      `}</style>

            <footer className="pf-root">
                {/* ══ TOP ══ */}
                <div className="pf-top">
                    <div className="pf-grid">
                        <div>
                            <h4 className="pf-title">Marketing Strategies</h4>
                            <ul className="pf-list two-col">
                                {strategyLinks.map((l) => (
                                    <li key={l.id}>
                                        <a href={`#${l.id}`} className="pf-link" onClick={(e) => scrollTo(e, l.id)}>
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="pf-title">Our Mailing Lists</h4>
                            <ul className="pf-list two-col">
                                {mailListLinks.map((l) => (
                                    <li key={l.id}>
                                        <a href={`#mailing-list-${l.id}`} className="pf-link">
                                            {l.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pf-help">
                            <h4 className="pf-title">Help</h4>
                            <ul className="pf-list">
                                {helpLinks.map((l) => (
                                    <li key={l.href}>
                                        <Link href={l.href} className="pf-link">
                                            {l.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* ══ MID ══ */}
                <div className="pf-mid">
                    <div className="pf-mid-inner">
                        <a href="/" className="pf-logo">
                            <img src="/images/logo.png" alt="Invictus Publishings" />
                        </a>
                        <div className="pf-contact">
                            <span>
                                <MapPin size={16} aria-hidden="true" /> 3575 Arden Way, Sacramento, CA 95864
                            </span>
                            <a href={`mailto:${CONTACT.email}`}>
                                <Mail size={16} aria-hidden="true" /> {CONTACT.email}
                            </a>
                            <a href={CONTACT.phoneHref}>
                                <Phone size={16} aria-hidden="true" /> {CONTACT.phone}
                            </a>
                        </div>
                    </div>
                </div>

                {/* ══ BOTTOM ══ */}
                <div className="pf-bottom">
                    <p>Copyright &copy; {new Date().getFullYear()} Invictus Publishings Group LLC All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
}