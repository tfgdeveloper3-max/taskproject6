"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ContentBlock, LegalLayoutProps } from "./types";
import "./legal.css";

// Agar Navbar / Footer root layout mein nahi lage, to yahan import karein
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// "**bold**" wale text ko <strong> mein convert karta hai
function Rich({ text }: { text: string }) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return (
        <>
            {parts.map((part, i) =>
                part.startsWith("**") && part.endsWith("**") ? (
                    <strong key={i}>{part.slice(2, -2)}</strong>
                ) : (
                    <span key={i}>{part}</span>
                )
            )}
        </>
    );
}

function Block({ block }: { block: ContentBlock }) {
    switch (block.type) {
        case "list":
            return (
                <ul className="lg-list">
                    {block.items.map((item, i) =>
                        typeof item === "string" ? (
                            <li key={i}>
                                <Rich text={item} />
                            </li>
                        ) : (
                            <li key={i}>
                                <strong>{item.title}</strong> <Rich text={item.text} />
                            </li>
                        )
                    )}
                </ul>
            );
        case "note":
            return (
                <p className="lg-note">
                    <Rich text={block.text} />
                </p>
            );
        default:
            return (
                <p className="lg-p">
                    <Rich text={block.text} />
                </p>
            );
    }
}

export default function LegalLayout({
    title,
    intro,
    updated,
    highlights,
    sections,
}: LegalLayoutProps) {
    const [active, setActive] = useState<string | undefined>(sections[0]?.id);

    // Scroll ke saath sidebar mein active section highlight
    useEffect(() => {
        const els = sections
            .map((s) => document.getElementById(s.id))
            .filter((el): el is HTMLElement => el !== null);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { rootMargin: "-120px 0px -65% 0px" }
        );

        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [sections]);

    return (
        <>
            {/* <Navbar /> */}

            <main className="lg-page">
                <header className="lg-hero">
                    <div className="lg-hero-inner">

                        <h1 className="lg-title">{title}</h1>
                        <p className="lg-intro">
                            <Rich text={intro} />
                        </p>
                        {updated && <p className="lg-updated">Last updated: {updated}</p>}
                    </div>
                </header>

                {highlights && highlights.length > 0 && (
                    <section className="lg-glance" aria-label="Key points">
                        <div className="lg-glance-inner">
                            {highlights.map((h, i) => (
                                <div className="lg-glance-item" key={i}>
                                    <span className="lg-glance-value">{h.value}</span>
                                    <span className="lg-glance-label">{h.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <div className="lg-body">
                    <aside className="lg-toc">
                        <p className="lg-toc-heading">On this page</p>
                        <ul>
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a
                                        href={`#${s.id}`}
                                        className={active === s.id ? "is-active" : ""}
                                    >
                                        {s.heading}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    <article className="lg-content">
                        {sections.map((s) => (
                            <section id={s.id} key={s.id} className="lg-section">
                                <h2 className="lg-h2">{s.heading}</h2>
                                {s.blocks.map((b, i) => (
                                    <Block block={b} key={i} />
                                ))}
                            </section>
                        ))}

                        <div className="lg-contact">
                            <div>
                                <h3>Questions about this policy?</h3>
                                <p>
                                    Our support team can walk you through how it applies to your
                                    order.
                                </p>
                            </div>
                            <Link href="/#contact" className="btn-accent">
                                Contact support
                            </Link>
                        </div>
                    </article>
                </div>
            </main>

            {/* <Footer /> */}
        </>
    );
}