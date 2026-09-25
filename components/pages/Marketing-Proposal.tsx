"use client";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import {
    ArrowRight,
    Check,
    ExternalLink,
    Mail,
    Phone,
    PlayCircle,
    Users,
} from "lucide-react";
import { ConsultationModal } from "@/components/pages/ConsultationModal";

const CONTACT = {
    phone: "(279) 777-0367",
    phoneHref: "tel:2797770367",
    email: "info@invictuspublishings.com",
};

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Point = { title?: string; text: string };
type LinkItem = { label: string; href: string };
type VideoItem = { label: string; src: string; poster: string };

type Strategy = {
    id: string;
    nav: string;
    title: string;
    summary?: string;
    image?: string;
    alt: string;
    ratio: string;
    points: Point[];
    link?: LinkItem;
    videos?: VideoItem[];
    collaborator?: LinkItem;
};

const STRATEGIES: Strategy[] = [
    {
        id: "email-marketing",
        nav: "Email Marketing",
        title: "Email Marketing",
        image: "/images/marketing/Email-Marketing.jpg",
        alt: "Email marketing campaign for a book",
        ratio: "2000 / 1333",
        points: [
            { text: "Our email campaigns reach subscribers interested in your book's specific genre, ensuring your work is introduced to a relevant audience rather than sent to random recipients." },
            { text: "Create email content that highlights your book's unique story, key themes, and value to potential readers." },
            { text: "Strengthen your online presence by introducing your book to relevant audiences and building recognition for your author brand." },
        ],
        link: { label: "A glimpse of our mail list", href: "#mailing-list" },
    },
    {
        id: "book-signing",
        nav: "Book Signing Events",
        title: "Book Signing Events",
        image: "/images/marketing/Book-Signing-Event.jpg",
        alt: "Author signing books and greeting readers in a bookstore",
        ratio: "3504 / 2336",
        points: [
            { text: "Connect with readers in person, build meaningful relationships, and create memorable experiences around your book." },
            { text: "Support the organization of book signing events at suitable venues, helping you engage with your target audience." },
            { text: "Showcase your book through physical promotional materials and event-based marketing to increase awareness among potential readers." },
            { text: "Strengthen your reputation as an author through in-person interactions, networking opportunities, and community engagement." },
        ],
        collaborator: { label: "Global Book Exhibit", href: "https://globalbookfairs.com/" },
    },
    {
        id: "author-branding",
        nav: "Author Branding",
        title: "Author Branding & Promotional Materials",
        image: "/images/marketing/Author-Branding.jpg",
        alt: "Branded author gift box with book, bookmark, pen, and business card",
        ratio: "1 / 1",
        points: [
            { text: "Elevate your author brand with professionally designed stationery that reflects your unique identity and creates a consistent, recognizable image." },
            { text: "Incorporate your book cover, author logo, and brand elements into business cards, letterheads, bookmarks, and other promotional stationery." },
            { text: "Turn everyday interactions into opportunities to showcase your author identity and keep your book in the minds of potential readers." },
            { text: "Create polished, memorable stationery that reinforces your professionalism, supports networking, and helps you build meaningful connections with readers and industry professionals." },
        ],
    },
    {
        id: "times-square",
        nav: "Times Square",
        title: "Times Square Video Promotion",
        alt: "Book promotion on a Times Square digital billboard",
        ratio: "16 / 9",
        points: [
            { text: "Showcase your book and author brand on the digital billboards of Times Square, one of the world's most recognizable advertising destinations." },
            { text: "Present your book cover, author name, and promotional visuals through an engaging video designed to capture attention in a high-traffic environment." },
            { text: "Associate your author brand with a prominent public display, creating a memorable promotional experience and a shareable milestone." },
            { text: "Capture the moment and share your Times Square promotion across social media and digital platforms to extend its reach beyond the physical display." },
        ],
        videos: [
            { label: "Video 1", src: "/video/time-square-1.mp4", poster: "/video/time-square-1-poster.jpg" },
            { label: "Video 2", src: "/video/time-square-2.mp4", poster: "/video/time-square-2-poster.jpg" },
        ],
        collaborator: { label: "Glastonbury Publications", href: "https://glastonburypublications.com/" },
    },
    {
        id: "influencer-marketing",
        nav: "Influencer Marketing",
        title: "Influencer Marketing & Shark Tank Network Exposure",
        image: "/images/marketing/Influencer-Marketing.jpg",
        alt: "Influencer marketing on a laptop and phone",
        ratio: "1000 / 667",
        points: [
            { text: "Leverage promotional opportunities with influencers associated with Shark Tank to introduce your book and author brand to engaged audiences." },
            { text: "Present your book through carefully selected influencer collaborations designed to create awareness and spark interest among potential readers." },
            { text: "Utilize influencer-driven content, recommendations, and promotional features to showcase your book's unique message and connect with new audiences." },
            { text: "Extend your visibility beyond traditional marketing channels through strategic influencer exposure, helping you build awareness and strengthen your presence in the literary marketplace." },
        ],
    },
    {
        id: "author-of-the-month",
        nav: "Author of the Month",
        title: "Author of the Month Nominations on Global Platforms",
        image: "/images/marketing/Author-Month.jpg",
        alt: "Author proudly holding her published children's book",
        ratio: "1200 / 896",
        points: [
            { text: "Position your author brand for international recognition through Author of the Month nomination opportunities, helping showcase your literary work and connect with audiences beyond your local market." },
            { text: "Present your book for consideration in international Author of the Month nomination programs and literary recognition initiatives, subject to the platform's eligibility and selection process." },
            { text: "Support your author branding through nomination-related profiles, promotional features, or digital recognition where offered by the selected platform." },
            { text: "Use recognition opportunities as part of your broader marketing strategy to build awareness, share your literary journey, and connect with potential readers." },
        ],
        collaborator: { label: "Glastonbury Publications", href: "https://glastonburypublications.com/" },
    },
    {
        id: "book-to-screen",
        nav: "Book to Screen",
        title: "Book to Screen: Bringing Your Story to Life",
        summary:
            "Our Book-to-Screen services are designed to help authors explore the pathway from the written page to visual storytelling, from screenplay development to professional industry presentation.",
        image: "/images/marketing/Book-to-Screen.jpg",
        alt: "Reader turning the page of a digital book on a tablet",
        ratio: "612 / 407",
        points: [
            { title: "Book-to-Screen Adaptation", text: "Transform your published book into a professionally structured screenplay, adapting its characters, plot, dialogue, and narrative for film or television while preserving the heart of your original story." },
            { title: "Media Kit & Industry Presentation", text: "Develop a professional media kit featuring your book, author profile, story synopsis, character details, and adaptation concept to help present your project in a clear and compelling format." },
            { title: "Media House Submission & Outreach", text: "Assist in preparing and presenting your screenplay or adaptation proposal to relevant production companies, media houses, and industry contacts, subject to available opportunities and submission requirements." },
        ],
        collaborator: { label: "Glastonbury Publications", href: "https://glastonburypublications.com/" },
    },
    {
        id: "booktalk",
        nav: "BookTalk",
        title: "BookTalk",
        summary:
            "An opportunity to bring your story to life through meaningful conversations, author insights, and audience engagement.",
        image: "/images/marketing/BookTalk.jpg",
        alt: "Group of readers discussing books around a table",
        ratio: "612 / 408",
        points: [
            { title: "Author Storytelling & Live Discussions", text: "Present your book through engaging book talks, author discussions, and literary conversations that highlight your story, inspiration, and creative journey." },
            { text: "Create opportunities to interact with readers, answer questions, and build meaningful connections around your book and its message." },
            { text: "Use book talks as a platform to strengthen your public presence, showcase your expertise, and establish a recognizable identity within literary communities." },
        ],
    },
];

type ListRow = { genre: string; size: string; price?: string };
type ListGroup = { id: string; label: string; rows: ListRow[] };

const MAIL_LISTS: ListGroup[] = [
    {
        id: "romance",
        label: "Romance",
        rows: [
            { genre: "Romance Deal of the Day", size: "501,000–1,085,000", price: "$240" },
            { genre: "Steamy Contemporary Romance", size: "473,000", price: "$90" },
            { genre: "Romantic Comedy", size: "154,000", price: "$60" },
            { genre: "Sweet Contemporary Romance", size: "490,000", price: "$80" },
            { genre: "Romantic Suspense", size: "379,000", price: "$80" },
            { genre: "Historical Romance", size: "322,000", price: "$75" },
            { genre: "Paranormal Romance", size: "290,000", price: "$80" },
            { genre: "Erotic Romance", size: "243,000", price: "$80" },
        ],
    },
    {
        id: "speculative",
        label: "Fantasy / Horror / Science Fiction",
        rows: [
            { genre: "Fantasy / Paranormal Deal of the Day", size: "1,059,000" },
            { genre: "Fantasy / Paranormal", size: "498,000" },
            { genre: "LitRPG", size: "66,000" },
            { genre: "Science Fiction Deal of the Day", size: "842,000" },
            { genre: "Science Fiction", size: "427,000" },
            { genre: "Horror", size: "191,000" },
        ],
    },
    {
        id: "literature",
        label: "Literature / Religion / Travel",
        rows: [
            { genre: "Literary Fiction", size: "460,000" },
            { genre: "Women's Fiction", size: "348,000" },
            { genre: "Christian Fiction", size: "153,000" },
            { genre: "Historical Fiction", size: "197,000" },
            { genre: "Western", size: "94,000" },
            { genre: "Black Literature", size: "99,000" },
            { genre: "Travel", size: "200,000" },
            { genre: "Religion / Spirituality", size: "201,000" },
            { genre: "LGBTQ", size: "89,000" },
        ],
    },
    {
        id: "nonfiction",
        label: "Nonfiction",
        rows: [
            { genre: "Nonfiction", size: "247,000" },
            { genre: "History", size: "121,000" },
            { genre: "Self Help & How-to", size: "239,000" },
            { genre: "Cookbooks and Nutrition", size: "249,000" },
        ],
    },
    {
        id: "kids",
        label: "Kids & Teens",
        rows: [
            { genre: "Young Adult", size: "227,000" },
            { genre: "Children's", size: "113,000" },
        ],
    },
    {
        id: "mystery",
        label: "Mystery",
        rows: [
            { genre: "Mystery / Thriller / Cozy Deal of the Day", size: "1,037,000–1,522,000" },
            { genre: "Cozy Mystery", size: "380,000" },
            { genre: "Mystery", size: "636,000" },
            { genre: "Thriller", size: "575,000" },
        ],
    },
];

const QUESTIONS = [
    "Your publishing company may have provided you with marketing strategies, but have those efforts translated into meaningful book sales?",
    "Have they helped your book stand out in an increasingly competitive marketplace?",
    "More importantly, have they strengthened your visibility and connected your work with the right audience?",
];

function StrategyPanel({ s, reduce }: { s: Strategy; reduce: boolean }) {
    const [videoIndex, setVideoIndex] = useState(0);
    const video = s.videos?.[videoIndex];

    return (
        <article id={s.id} className="ip-panel" aria-labelledby={`${s.id}-title`}>
            <div className="ip-panel-media-col">
                <div
                    className="ip-panel-media"
                    style={{
                        aspectRatio: s.ratio,
                        maxWidth: `calc(var(--ip-media-max-h) * (${s.ratio}))`,
                    }}
                >
                    {video ? (
                        <video
                            key={video.src}
                            src={video.src}
                            poster={video.poster}
                            autoPlay={!reduce}
                            muted
                            loop
                            playsInline
                            controls
                            preload="metadata"
                            aria-label={`${s.alt} (${video.label})`}
                        />
                    ) : (
                        <img src={s.image} alt={s.alt} loading="lazy" />
                    )}
                </div>

                {s.videos && s.videos.length > 1 && (
                    <div className="ip-vtabs" role="group" aria-label="Choose video">
                        {s.videos.map((v, i) => (
                            <button
                                key={v.src}
                                type="button"
                                aria-pressed={videoIndex === i}
                                onClick={() => setVideoIndex(i)}
                            >
                                <PlayCircle size={16} />
                                {v.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="ip-panel-body">
                <h3 id={`${s.id}-title`} className="ip-panel-title">
                    {s.title}
                </h3>
                {s.summary && <p className="ip-panel-summary">{s.summary}</p>}

                <ul className="ip-points">
                    {s.points.map((p, i) => (
                        <li key={i}>
                            <span className="ip-check" aria-hidden="true">
                                <Check size={13} strokeWidth={3} />
                            </span>
                            <span>
                                {p.title && <strong>{p.title}</strong>}
                                {p.text}
                            </span>
                        </li>
                    ))}
                </ul>

                {(s.link || s.collaborator) && (
                    <div className="ip-panel-extras">
                        {s.link && (
                            <a href={s.link.href} className="nybp-link-accent ip-inline-link">
                                {s.link.label}
                                <ArrowRight size={15} />
                            </a>
                        )}
                        {s.collaborator && (
                            <p className="ip-collab">
                                <Users size={15} aria-hidden="true" />
                                Our collaborator:
                                <a href={s.collaborator.href} target="_blank" rel="noopener noreferrer">
                                    {s.collaborator.label}
                                    <ExternalLink size={13} />
                                </a>
                            </p>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}

export default function MarketingProposal() {
    const reduce = useReducedMotion() ?? false;
    const [consultOpen, setConsultOpen] = useState(false);
    const openConsult = () => setConsultOpen(true);
    const closeConsult = useCallback(() => setConsultOpen(false), []);

    const [activeStrategy, setActiveStrategy] = useState(STRATEGIES[0].id);
    const [activeList, setActiveList] = useState(MAIL_LISTS[0].id);

    const strategyTabs = useRef<Record<string, HTMLButtonElement | null>>({});
    const progressBars = useRef<Record<string, HTMLSpanElement | null>>({});
    const listTabs = useRef<Record<string, HTMLButtonElement | null>>({});
    const tabBarRef = useRef<HTMLDivElement>(null);
 
    const clickLock = useRef<number | null>(null);

    const scrollToId = useCallback(
        (id: string) =>
            document
                .getElementById(id)
                ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }),
        [reduce]
    );
 
    useEffect(() => {
        const openFromHash = () => {
            const match = window.location.hash.match(/^#mailing-list-(.+)$/);
            if (!match) return;
            const group = MAIL_LISTS.find((l) => l.id === match[1]);
            if (!group) return;
            setActiveList(group.id);
            scrollToId("mailing-list");
        };
        openFromHash();
        window.addEventListener("hashchange", openFromHash);
        return () => window.removeEventListener("hashchange", openFromHash);
    }, [scrollToId]);
 
    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const line = window.innerHeight * 0.35;
            let current = STRATEGIES[0].id;

            STRATEGIES.forEach((s) => {
                const el = document.getElementById(s.id);
                if (!el) return;
                const rect = el.getBoundingClientRect();
                if (rect.top <= line) current = s.id;

                const progress = Math.min(1, Math.max(0, (line - rect.top) / rect.height));
                const bar = progressBars.current[s.id];
                if (bar) bar.style.transform = `scaleX(${progress})`;
            });

            if (clickLock.current === null) setActiveStrategy(current);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);
 
    useEffect(() => {
        const bar = tabBarRef.current;
        const tab = strategyTabs.current[activeStrategy];
        if (!bar || !tab || bar.scrollWidth <= bar.clientWidth) return;
        const left = tab.offsetLeft - bar.clientWidth / 2 + tab.offsetWidth / 2;
        bar.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
    }, [activeStrategy, reduce]);

    const goToStrategy = (id: string) => {
        setActiveStrategy(id);
        if (clickLock.current !== null) window.clearTimeout(clickLock.current);
        clickLock.current = window.setTimeout(() => {
            clickLock.current = null;
        }, reduce ? 50 : 900);
        scrollToId(id);
        history.replaceState(null, "", `#${id}`);
    };
 
    const onListKey = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const ids = MAIL_LISTS.map((l) => l.id);
        let n = -1;
        if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (index + 1) % ids.length;
        if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = (index - 1 + ids.length) % ids.length;
        if (e.key === "Home") n = 0;
        if (e.key === "End") n = ids.length - 1;
        if (n < 0) return;
        e.preventDefault();
        setActiveList(ids[n]);
        listTabs.current[ids[n]]?.focus();
    };

    const currentList = MAIL_LISTS.find((l) => l.id === activeList)!;
    const missingPrice = currentList.rows.some((r) => !r.price);

    const heroSeq: Variants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
    };
    const heroItem: Variants = {
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
    };

    return (
        <>
            <style>{`
                /* Fonts, colors, buttons and eyebrow/title styles come from globals.css
                   (--font: Montserrat, --font2: Playfair Display, --navy, --accent …).
                   Fallbacks keep the page intact if a variable is missing. */
                .ip {
                    --ip-navy: var(--navy, #0d1240);
                    --ip-navy2: var(--navy2, #1a1f5e);
                    --ip-navy3: var(--navy3, #070a28);
                    --ip-gold: var(--accent, #f0a500);
                    --ip-gold2: var(--accent2, #ffc13d);
                    --ip-dark: var(--gradient-dark, linear-gradient(135deg, #07091e 0%, #0d1240 50%, #1a1f5e 100%));
                    --ip-text: var(--text-dark, #333);
                    --ip-mid: var(--text-mid, #555);
                    --ip-soft-bg: #f5f6fb;
                    --ip-line: #e4e7f0;
                    --ip-sans: var(--font, 'Montserrat', Arial, sans-serif);
                    --ip-serif: var(--font2, 'Playfair Display', Georgia, serif);
                    --ip-r-md: var(--radius-md, 10px);
                    --ip-r-lg: var(--radius-lg, 16px);

                    /* Height of your fixed navbar */
                    --ip-navbar-height: 88px;
                    --ip-media-max-h: 520px;

                    font-family: var(--ip-sans);
                    color: var(--ip-text);
                    background: #fff;
                    width: 100%;
                    overflow-x: clip;
                }
                .ip *:focus-visible {
                    outline: 3px solid var(--ip-gold);
                    outline-offset: 3px;
                    border-radius: 6px;
                }
                .ip-container {
                    max-width: 1240px;
                    margin: 0 auto;
                    padding: 0 40px;
                }
                .ip .section-title { margin-bottom: 18px; }
                .ip-lede {
                    font-size: clamp(15px, 1.15vw, 17px);
                    line-height: 1.8;
                    color: var(--ip-mid);
                    max-width: 62ch;
                    margin: 0;
                }

                /* ═══ HERO ═══ */
                .ip-hero {
                    position: relative;
                    background: var(--ip-dark);
                    color: #fff;
                    padding-top: var(--ip-navbar-height);
                    overflow: hidden;
                }
                .ip-hero::after {
                    content: "";
                    position: absolute;
                    right: -180px;
                    top: -120px;
                    width: 560px;
                    height: 560px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(240,165,0,0.16) 0%, rgba(240,165,0,0) 70%);
                    pointer-events: none;
                }
                .ip-hero-grid {
                    position: relative;
                    z-index: 1;
                    display: grid;
                    grid-template-columns: 1.1fr 0.9fr;
                    gap: 64px;
                    align-items: center;
                    padding-top: 96px;
                    padding-bottom: 96px;
                }
                .ip-hero h1 {
                    font-family: var(--ip-serif);
                    font-weight: 900;
                    font-size: clamp(38px, 5.4vw, 72px);
                    line-height: 1.05;
                    margin: 0 0 24px;
                }
                .ip-hero h1 span { color: var(--ip-gold); display: block; }
                .ip-hero .ip-lede { color: rgba(255,255,255,0.78); }
                .ip-hero-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 14px;
                    margin-top: 36px;
                }

                .ip-hero-visual { position: relative; }
                .ip-hero-frame {
                    position: relative;
                    border-radius: 20px;
                    padding: 12px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(240,165,0,0.35);
                    box-shadow: var(--shadow-lg, 0 24px 80px rgba(0,0,0,0.35));
                }
                .ip-hero-frame img {
                    display: block;
                    width: 100%;
                    aspect-ratio: 4 / 4.4;
                    object-fit: contain;
                    border-radius: 12px;
                    background: var(--ip-navy3);
                }
                .ip-hero-chip {
                    position: absolute;
                    left: -22px;
                    bottom: 36px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: #fff;
                    color: var(--ip-navy);
                    padding: 14px 20px;
                    border-radius: 14px;
                    box-shadow: 0 16px 40px rgba(0,0,0,0.25);
                    max-width: 250px;
                }
                .ip-hero-chip b {
                    font-family: var(--ip-serif);
                    font-weight: 900;
                    font-size: 34px;
                    line-height: 1;
                    color: var(--ip-gold);
                }
                .ip-hero-chip span { font-size: 13px; font-weight: 700; line-height: 1.35; }

                /* ═══ CHANNEL MARQUEE ═══ */
                .ip-marquee {
                    background: var(--ip-gold);
                    color: var(--ip-navy);
                    overflow: hidden;
                    padding: 16px 0;
                }
                .ip-marquee-track {
                    display: flex;
                    width: max-content;
                    animation: ip-marquee 38s linear infinite;
                }
                .ip-marquee:hover .ip-marquee-track { animation-play-state: paused; }
                .ip-marquee-track span {
                    display: inline-flex;
                    align-items: center;
                    gap: 28px;
                    padding-right: 28px;
                    font-weight: 800;
                    font-size: 14px;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    white-space: nowrap;
                }
                .ip-marquee-track span::after { content: "✦"; font-size: 12px; }
                @keyframes ip-marquee { to { transform: translateX(-50%); } }

                /* ═══ INTRO ═══ */
                .ip-intro { padding: 110px 0 100px; }
                .ip-intro-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 72px;
                    align-items: start;
                }
                .ip-questions {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: grid;
                    gap: 14px;
                }
                .ip-questions li {
                    display: grid;
                    grid-template-columns: 44px 1fr;
                    gap: 16px;
                    align-items: start;
                    padding: 22px 24px;
                    background: var(--ip-soft-bg);
                    border: 1px solid var(--ip-line);
                    border-radius: var(--ip-r-lg);
                    font-weight: 600;
                    font-size: clamp(15px, 1.2vw, 17px);
                    line-height: 1.6;
                    color: var(--ip-navy);
                }
                .ip-questions li::before {
                    content: "?";
                    display: grid;
                    place-items: center;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: var(--ip-navy);
                    color: var(--ip-gold);
                    font-family: var(--ip-serif);
                    font-weight: 900;
                    font-size: 22px;
                }
                .ip-fusion {
                    margin-top: 64px;
                    padding: 36px 44px;
                    border-radius: 20px;
                    background: var(--ip-dark);
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
                    gap: 20px 40px;
                }
                .ip-fusion p {
                    margin: 0;
                    font-family: var(--ip-serif);
                    font-weight: 700;
                    font-size: clamp(20px, 2.2vw, 30px);
                    line-height: 1.3;
                    color: #fff;
                    max-width: 30ch;
                }
                .ip-fusion p em { color: var(--ip-gold); font-style: italic; }

                /* ═══ STRATEGY EXPLORER ═══ */
                .ip-strategies {
                    background: var(--ip-soft-bg);
                    padding: 110px 0;
                    scroll-margin-top: var(--ip-navbar-height);
                }
                .ip-strategies-head {
                    text-align: center;
                    max-width: 760px;
                    margin: 0 auto 56px;
                }
                .ip-strategies-head .ip-lede { margin: 0 auto; }
                .ip-explorer {
                    display: grid;
                    grid-template-columns: 300px 1fr;
                    gap: 28px;
                    align-items: start;
                    scroll-margin-top: calc(var(--ip-navbar-height) + 20px);
                }
                .ip-stabs {
                    position: sticky;
                    top: calc(var(--ip-navbar-height) + 20px);
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    padding: 14px;
                    background: var(--ip-navy);
                    border-radius: 20px;
                }
                .ip-stab {
                    display: block;
                    width: 100%;
                    text-align: left;
                    font-family: var(--ip-sans);
                    font-weight: 700;
                    font-size: 14px;
                    color: rgba(255,255,255,0.72);
                    background: transparent;
                    border: 0;
                    border-radius: 12px;
                    padding: 14px 16px 12px;
                    transition: background var(--transition, 0.25s ease), color var(--transition, 0.25s ease);
                }
                .ip-stab-label {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 10px;
                }
                .ip-stab-label svg { opacity: 0; transition: opacity 0.2s ease; flex-shrink: 0; }
                .ip-stab:hover { color: #fff; background: rgba(255,255,255,0.06); }
                .ip-stab[aria-current="true"] { background: var(--ip-gold); color: var(--ip-navy); }
                .ip-stab[aria-current="true"] .ip-stab-label svg { opacity: 1; }
                /* How far the reader is through this section */
                .ip-stab-track {
                    display: block;
                    height: 3px;
                    margin-top: 10px;
                    border-radius: 3px;
                    background: rgba(255,255,255,0.12);
                    overflow: hidden;
                }
                .ip-stab[aria-current="true"] .ip-stab-track { background: rgba(13,18,64,0.18); }
                .ip-stab-progress {
                    display: block;
                    height: 100%;
                    background: var(--ip-gold);
                    transform: scaleX(0);
                    transform-origin: left center;
                    will-change: transform;
                }
                .ip-stab[aria-current="true"] .ip-stab-progress { background: var(--ip-navy); }

                .ip-panels { display: grid; gap: 28px; min-width: 0; }
                .ip-panel {
                    background: #fff;
                    border-radius: 20px;
                    border: 1px solid var(--ip-line);
                    box-shadow: 0 20px 60px rgba(13,18,64,0.08);
                    overflow: hidden;
                    scroll-margin-top: calc(var(--ip-navbar-height) + 20px);
                }
                .ip-panel-media-col {
                    background: var(--ip-navy3);
                    padding: 24px 24px 20px;
                }
                .ip-panel-media {
                    position: relative;
                    width: 100%;
                    margin: 0 auto;
                    border-radius: 12px;
                    overflow: hidden;
                    background: #000;
                }
                .ip-panel-media img,
                .ip-panel-media video {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
                .ip-vtabs {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 8px;
                    margin-top: 16px;
                }
                .ip-vtabs button {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-family: var(--ip-sans);
                    font-weight: 700;
                    font-size: 13px;
                    padding: 9px 18px;
                    border-radius: var(--radius-pill, 50px);
                    border: 1.5px solid rgba(255,255,255,0.3);
                    background: transparent;
                    color: #fff;
                }
                .ip-vtabs button[aria-pressed="true"] {
                    background: var(--ip-gold);
                    border-color: var(--ip-gold);
                    color: var(--ip-navy);
                }

                .ip-panel-body { padding: 40px 44px 32px; }
                .ip-panel-title {
                    font-family: var(--ip-serif);
                    font-weight: 900;
                    font-size: clamp(24px, 2.4vw, 34px);
                    line-height: 1.2;
                    color: var(--ip-navy);
                    margin: 0 0 14px;
                }
                .ip-panel-summary {
                    font-size: 16px;
                    line-height: 1.75;
                    color: var(--ip-mid);
                    margin: 0 0 8px;
                    max-width: 70ch;
                }
                .ip-points {
                    list-style: none;
                    margin: 24px 0 0;
                    padding: 0;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 18px 32px;
                }
                .ip-points li {
                    display: flex;
                    gap: 14px;
                    font-size: 15px;
                    line-height: 1.7;
                    color: var(--ip-text);
                }
                .ip-points strong {
                    display: block;
                    color: var(--ip-navy);
                    font-weight: 800;
                    margin-bottom: 2px;
                }
                .ip-check {
                    flex-shrink: 0;
                    display: grid;
                    place-items: center;
                    width: 24px;
                    height: 24px;
                    margin-top: 2px;
                    border-radius: 50%;
                    background: rgba(240,165,0,0.15);
                    color: var(--ip-gold);
                }
                .ip-panel-extras {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 14px 28px;
                    margin-top: 30px;
                    padding-top: 22px;
                    border-top: 1px solid var(--ip-line);
                }
                .ip-inline-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    text-decoration: underline;
                    font-size: 15px;
                }
                .ip-collab {
                    display: inline-flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 8px;
                    margin: 0;
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--ip-mid);
                }
                .ip-collab svg:first-child { color: var(--ip-gold); }
                .ip-collab a {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-weight: 800;
                    color: var(--ip-navy);
                    background: rgba(240,165,0,0.14);
                    padding: 6px 14px;
                    border-radius: var(--radius-pill, 50px);
                    transition: background var(--transition, 0.25s ease);
                }
                .ip-collab a:hover { background: var(--ip-gold); }

                /* ═══ MAILING LISTS ═══ */
                .ip-lists {
                    padding: 110px 0;
                    scroll-margin-top: var(--ip-navbar-height);
                }
                .ip-lists-head {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-items: flex-end;
                    gap: 24px 48px;
                    margin-bottom: 36px;
                }
                .ip-ltabs {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-bottom: 32px;
                }
                .ip-ltab {
                    font-family: var(--ip-sans);
                    font-weight: 700;
                    font-size: 14px;
                    color: var(--ip-navy);
                    background: #fff;
                    border: 1.5px solid var(--ip-line);
                    border-radius: var(--radius-pill, 50px);
                    padding: 11px 20px;
                    transition: border-color var(--transition, 0.25s ease), background var(--transition, 0.25s ease);
                }
                .ip-ltab:hover { border-color: var(--ip-gold); }
                .ip-ltab[aria-selected="true"] {
                    background: var(--ip-navy);
                    border-color: var(--ip-navy);
                    color: #fff;
                }
                .ip-cards {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 16px;
                }
                .ip-card {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    padding: 24px 24px 22px;
                    border: 1.5px solid var(--ip-line);
                    border-radius: var(--ip-r-lg);
                    background: #fff;
                    transition: border-color var(--transition, 0.25s ease), transform 0.3s ease;
                }
                .ip-card:hover { border-color: var(--ip-gold); transform: translateY(-3px); }
                .ip-card-genre {
                    font-weight: 700;
                    font-size: 14px;
                    line-height: 1.4;
                    color: var(--ip-mid);
                    padding-right: 64px;
                }
                .ip-card-size {
                    font-family: var(--ip-serif);
                    font-weight: 900;
                    font-size: clamp(22px, 2vw, 28px);
                    line-height: 1.15;
                    color: var(--ip-navy);
                    font-variant-numeric: lining-nums;
                }
                .ip-card-unit { font-size: 12px; font-weight: 600; color: #8a90a2; }
                .ip-card-price {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: var(--ip-gold);
                    color: var(--ip-navy);
                    font-weight: 800;
                    font-size: 13px;
                    padding: 5px 12px;
                    border-radius: var(--radius-pill, 50px);
                }
                .ip-note {
                    margin: 24px 0 0;
                    font-size: 14px;
                    color: var(--ip-mid);
                }

                /* ═══ CLOSING CTA ═══ */
                .ip-cta { padding: 0 0 110px; }
                .ip-cta-box {
                    position: relative;
                    overflow: hidden;
                    background: var(--ip-dark);
                    border-radius: 28px;
                    padding: 80px 72px;
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    gap: 56px;
                    align-items: center;
                    color: #fff;
                }
                .ip-cta-box::before {
                    content: "";
                    position: absolute;
                    left: -140px;
                    bottom: -200px;
                    width: 460px;
                    height: 460px;
                    border-radius: 50%;
                    border: 2px solid rgba(240,165,0,0.25);
                    pointer-events: none;
                }
                .ip-cta-box h2 { position: relative; margin: 0 0 18px; }
                .ip-cta-lead {
                    position: relative;
                    margin: 0;
                    font-size: clamp(16px, 1.4vw, 19px);
                    line-height: 1.6;
                    color: var(--ip-gold2);
                    font-weight: 600;
                }
                .ip-cta-side { position: relative; display: grid; gap: 14px; }
                .ip-cta-side > p {
                    margin: 0 0 8px;
                    line-height: 1.8;
                    color: rgba(255,255,255,0.85);
                    font-size: 15px;
                }
                .ip-cta-tile {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    padding: 16px 18px;
                    border-radius: 14px;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid rgba(255,255,255,0.12);
                    color: #fff;
                    transition: border-color var(--transition, 0.25s ease), background var(--transition, 0.25s ease);
                }
                .ip-cta-tile:hover { border-color: var(--ip-gold); background: rgba(255,255,255,0.1); }
                .ip-cta-tile .ico {
                    display: grid;
                    place-items: center;
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    background: var(--ip-gold);
                    color: var(--ip-navy);
                    flex-shrink: 0;
                }
                .ip-cta-tile small {
                    display: block;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.6);
                }
                .ip-cta-tile b { font-size: 15px; font-weight: 700; word-break: break-word; }
                .ip-cta-side .btn-accent { justify-content: center; margin-top: 6px; }

                /* ═══ LARGE SCREENS ═══ */
                @media (min-width: 1800px) {
                    .ip { --ip-media-max-h: 640px; }
                    .ip-container { max-width: 1600px; padding: 0 80px; }
                    .ip-explorer { grid-template-columns: 360px 1fr; }
                    .ip-stab { font-size: 16px; padding: 16px 20px; }
                    .ip-points li { font-size: 17px; }
                    .ip-panel-summary { font-size: 18px; }
                }
                @media (min-width: 2400px) {
                    .ip { --ip-media-max-h: 820px; }
                    .ip-container { max-width: 2100px; padding: 0 140px; }
                    .ip-hero h1 { font-size: 104px; }
                    .ip-lede { font-size: 22px; }
                    .ip-explorer { grid-template-columns: 440px 1fr; }
                    .ip-stab { font-size: 20px; }
                    .ip-panel-title { font-size: 48px; }
                    .ip-points li { font-size: 21px; }
                    .ip-card-size { font-size: 38px; }
                    .ip-card-genre { font-size: 18px; }
                }

                /* ═══ SMALL LAPTOP ═══ */
                @media (max-width: 1199px) {
                    .ip-explorer { grid-template-columns: 250px 1fr; }
                    .ip-points { grid-template-columns: 1fr; }
                    .ip-cta-box { padding: 64px 48px; }
                }
                @media (max-width: 1023px) {
                    .ip { --ip-navbar-height: 72px; }
                }

                /* ═══ TABLET ═══ */
                @media (max-width: 900px) {
                    .ip-container { padding: 0 28px; }
                    .ip-hero-grid,
                    .ip-intro-grid,
                    .ip-cta-box { grid-template-columns: 1fr; }
                    .ip-hero-grid { gap: 48px; padding-top: 64px; padding-bottom: 80px; }
                    .ip-hero-visual { max-width: 520px; }
                    .ip-intro { padding: 80px 0; }
                    .ip-intro-grid { gap: 40px; }
                    .ip-fusion { margin-top: 48px; padding: 28px; }

                    .ip-strategies { padding: 80px 0; }
                    .ip-strategies-head { margin-bottom: 36px; }
                    .ip-explorer { grid-template-columns: 1fr; gap: 16px; }
                    /* Strategy tabs become a sticky, sideways-scrolling chip bar */
                    .ip-stabs {
                        top: var(--ip-navbar-height);
                        z-index: 20;
                        flex-direction: row;
                        overflow-x: auto;
                        scrollbar-width: none;
                        padding: 10px;
                        border-radius: 16px;
                    }
                    .ip-stabs::-webkit-scrollbar { display: none; }
                    .ip-stab { width: auto; flex-shrink: 0; padding: 10px 16px 8px; font-size: 13px; border-radius: 12px; }
                    .ip-stab-label svg { display: none; }
                    .ip-stab-track { margin-top: 6px; }
                    /* Leave room for the sticky chip bar above each section */
                    .ip-panel { scroll-margin-top: calc(var(--ip-navbar-height) + 84px); }
                    .ip-panel-body { padding: 30px 28px 26px; }

                    .ip-lists { padding: 80px 0; }
                    .ip-ltabs { flex-wrap: nowrap; overflow-x: auto; scrollbar-width: none; margin-left: -28px; margin-right: -28px; padding: 0 28px; }
                    .ip-ltabs::-webkit-scrollbar { display: none; }
                    .ip-ltab { flex-shrink: 0; }
                    .ip-cta { padding-bottom: 80px; }
                    .ip-cta-box { gap: 36px; }
                }

                /* ═══ MOBILE ═══ */
                @media (max-width: 640px) {
                    .ip-container { padding: 0 18px; }
                    .ip-hero-actions { flex-direction: column; align-items: stretch; }
                    .ip-hero-actions > * { justify-content: center; }
                    .ip-hero-chip { left: 12px; bottom: 12px; padding: 10px 14px; }
                    .ip-hero-chip b { font-size: 26px; }
                    .ip-questions li { grid-template-columns: 36px 1fr; padding: 18px; gap: 12px; }
                    .ip-questions li::before { width: 36px; height: 36px; font-size: 18px; }
                    .ip-fusion .btn-accent { width: 100%; justify-content: center; }
                    .ip-panel-media-col { padding: 14px; }
                    .ip-panel-body { padding: 24px 20px 22px; }
                    .ip-ltabs { margin-left: -18px; margin-right: -18px; padding: 0 18px; }
                    .ip-cards { grid-template-columns: 1fr; }
                    .ip-cta-box { padding: 44px 22px; border-radius: 20px; }
                }
                @media (max-width: 380px) {
                    .ip-container { padding: 0 14px; }
                    .ip-hero h1 { font-size: 32px; }
                    .ip-points li { font-size: 14px; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .ip-marquee-track { animation: none; }
                    .ip *, .ip *::before, .ip *::after {
                        transition-duration: 0.01ms !important;
                        scroll-behavior: auto !important;
                    }
                }
            `}</style>

            <main className="ip">
                {/* ─── HERO ─── */}
                <section className="ip-hero">
                    <div className="ip-container ip-hero-grid">
                        <motion.div
                            variants={heroSeq}
                            initial={reduce ? "visible" : "hidden"}
                            animate="visible"
                        >
                            <motion.p variants={heroItem} className="section-eyebrow">
                                Marketing Solutions
                            </motion.p>
                            <motion.h1 variants={heroItem}>
                                Marketing &amp; Promotional
                                <span>Campaigns</span>
                            </motion.h1>
                            <motion.p variants={heroItem} className="ip-lede">
                                Publishing your book is the first chapter. Our marketing team builds a
                                campaign around your story, combining email, events, influencers,
                                branding, and big-screen exposure, so the right readers find it.
                            </motion.p>
                            <motion.div variants={heroItem} className="ip-hero-actions">
                                <button type="button" className="btn-accent" onClick={openConsult}>
                                    Get Your Proposal
                                    <ArrowRight size={16} />
                                </button>
                                <a href={CONTACT.phoneHref} className="btn-outline-white">
                                    <Phone size={15} />
                                    {CONTACT.phone}
                                </a>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="ip-hero-visual"
                            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3, ease }}
                        >
                            <div className="ip-hero-frame">
                                <img src="/images/marketing/Hero.png" alt="Author holding a newly published book" />
                            </div>
                            <div className="ip-hero-chip">
                                <b>{STRATEGIES.length}</b>
                                <span>marketing channels working together for your book</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ─── CHANNEL STRIP ─── */}
                <div className="ip-marquee" aria-hidden="true">
                    <div className="ip-marquee-track">
                        {[...STRATEGIES, ...STRATEGIES].map((s, i) => (
                            <span key={`${s.id}-${i}`}>{s.nav}</span>
                        ))}
                    </div>
                </div>

                {/* ─── INTRO ─── */}
                <section className="ip-intro">
                    <div className="ip-container">
                        <div className="ip-intro-grid">
                            <div>
                                <p className="section-eyebrow">Why It Matters</p>
                                <h2 className="section-title">Book Marketing That Makes a Difference</h2>
                                <p className="ip-lede">
                                    At Invictus Publishings, we understand the power of the digital world
                                    and the opportunities it offers authors to expand their reach. However,
                                    at the same time, we recognize that traditional marketing strategies
                                    continue to play an important role in building brand awareness and
                                    creating lasting visibility.
                                </p>
                            </div>
                            <ul className="ip-questions">
                                {QUESTIONS.map((q) => (
                                    <li key={q}>{q}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="ip-fusion">
                            <p>
                                That&apos;s why we propose a strategic fusion of <em>digital</em> and{" "}
                                <em>traditional</em> marketing.
                            </p>
                            <button type="button" className="btn-accent" onClick={openConsult}>
                                Get Your Proposal
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* ─── STRATEGY EXPLORER ─── */}
                <section id="strategies" className="ip-strategies">
                    <div className="ip-container">
                        <div className="ip-strategies-head">
                            <p className="section-eyebrow">Your Campaign</p>
                            <h2 className="section-title">A Tried-and-Tested Strategic Combination</h2>
                            <p className="ip-lede">
                                Here is a tried-and-tested, strategic combination to create a
                                well-rounded marketing approach for your utmost visibility and promotion.
                            </p>
                        </div>

                        <div id="ip-explorer" className="ip-explorer">
                            <nav ref={tabBarRef} className="ip-stabs" aria-label="Marketing strategies">
                                {STRATEGIES.map((s) => (
                                    <button
                                        key={s.id}
                                        ref={(el) => {
                                            strategyTabs.current[s.id] = el;
                                        }}
                                        type="button"
                                        aria-current={activeStrategy === s.id ? "true" : undefined}
                                        className="ip-stab"
                                        onClick={() => goToStrategy(s.id)}
                                    >
                                        <span className="ip-stab-label">
                                            {s.nav}
                                            <ArrowRight size={15} />
                                        </span>
                                        <span className="ip-stab-track" aria-hidden="true">
                                            <span
                                                ref={(el) => {
                                                    progressBars.current[s.id] = el;
                                                }}
                                                className="ip-stab-progress"
                                            />
                                        </span>
                                    </button>
                                ))}
                            </nav>

                            <div className="ip-panels">
                                {STRATEGIES.map((s) => (
                                    <StrategyPanel key={s.id} s={s} reduce={reduce} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── MAILING LISTS ─── */}
                <section id="mailing-list" className="ip-lists">
                    <div className="ip-container">
                        <div className="ip-lists-head">
                            <div>
                                <p className="section-eyebrow">Our Mailing Lists</p>
                                <h2 className="section-title" style={{ marginBottom: 0 }}>
                                    A Glimpse of Our Mail List
                                </h2>
                            </div>
                            <p className="ip-lede" style={{ maxWidth: 420 }}>
                                Choose a genre to see the size of each subscriber list.
                            </p>
                        </div>

                        <div className="ip-ltabs" role="tablist" aria-label="Genres">
                            {MAIL_LISTS.map((l, i) => (
                                <button
                                    key={l.id}
                                    ref={(el) => {
                                        listTabs.current[l.id] = el;
                                    }}
                                    type="button"
                                    role="tab"
                                    id={`ltab-${l.id}`}
                                    aria-selected={activeList === l.id}
                                    aria-controls="ip-list-panel"
                                    tabIndex={activeList === l.id ? 0 : -1}
                                    className="ip-ltab"
                                    onClick={() => setActiveList(l.id)}
                                    onKeyDown={(e) => onListKey(e, i)}
                                >
                                    {l.label}
                                </button>
                            ))}
                        </div>

                        <div id="ip-list-panel" role="tabpanel" aria-labelledby={`ltab-${activeList}`}>
                            <motion.ul
                                key={activeList}
                                className="ip-cards"
                                initial={reduce ? false : { opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35, ease }}
                            >
                                {currentList.rows.map((r) => (
                                    <li key={r.genre} className="ip-card">
                                        {r.price && <span className="ip-card-price">{r.price}</span>}
                                        <span className="ip-card-genre">{r.genre}</span>
                                        <span className="ip-card-size">{r.size}</span>
                                        <span className="ip-card-unit">subscribers</span>
                                    </li>
                                ))}
                            </motion.ul>
                            {missingPrice && (
                                <p className="ip-note">Contact us for pricing on lists without a listed price.</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* ─── CLOSING CTA ─── */}
                <section className="ip-cta">
                    <div className="ip-container">
                        <div className="ip-cta-box">
                            <div>
                                <h2 className="section-title-white">
                                    Your Story Deserves More Than a Place on the Shelf.
                                </h2>
                                <p className="ip-cta-lead">
                                    It deserves opportunities to be discovered, shared, and remembered.
                                </p>
                            </div>
                            <div className="ip-cta-side">
                                <p>
                                    Let&apos;s work together to expand your reach, strengthen your author
                                    brand, and explore the possibilities that lie beyond the page.
                                </p>
                                <a href={CONTACT.phoneHref} className="ip-cta-tile">
                                    <span className="ico"><Phone size={18} /></span>
                                    <span>
                                        <small>Call us</small>
                                        <b>{CONTACT.phone}</b>
                                    </span>
                                </a>
                                <a href={`mailto:${CONTACT.email}`} className="ip-cta-tile">
                                    <span className="ico"><Mail size={18} /></span>
                                    <span>
                                        <small>Email us</small>
                                        <b>{CONTACT.email}</b>
                                    </span>
                                </a>
                                <button type="button" className="btn-accent" onClick={openConsult}>
                                    Get Your Proposal
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <ConsultationModal isOpen={consultOpen} onClose={closeConsult} />
            </main>
        </>
    );
}