"use client";
import Link from "next/link";
import { CheckCircle2, Phone, MessageCircle, Home } from "lucide-react";

export default function ThankYouPage() {
    return (
        <>
            <style>{`
        .ty-wrap {
          font-family: var(--font);
          background: var(--white);
          min-height: 70vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          cursor: none;
        }
        .ty-wrap * {
          cursor: none;
        }
        .ty-card {
          max-width: 560px;
          text-align: center;
        }
        .ty-icon {
          width: 84px;
          height: 84px;
          border-radius: 50%;
          background: #f0faf4;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 28px;
        }
        .ty-icon svg {
          color: #4caf50;
          width: 44px;
          height: 44px;
        }
        .ty-card h1 {
          font-size: clamp(24px, 4vw, 34px);
          font-weight: 800;
          color: var(--navy, #0d1240);
          margin-bottom: 14px;
          line-height: 1.3;
        }
        .ty-card p {
          font-size: 1rem;
          color: #666;
          line-height: 1.85;
          margin-bottom: 36px;
        }
        .ty-btns {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .ty-btns a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        @media (max-width: 480px) {
          .ty-wrap { padding: 56px 18px; }
          .ty-btns { flex-direction: column; align-items: center; }
          .ty-btns a { width: 100%; justify-content: center; }
        }
      `}</style>

            <div className="ty-wrap">
                <div className="ty-card">
                    <div className="ty-icon">
                        <CheckCircle2 strokeWidth={2} aria-hidden="true" />
                    </div>
                    <h1>Thank You for Reaching Out!</h1>
                    <p>
                        We&apos;ve received your message and one of our publishing experts will
                        get back to you shortly. We&apos;re excited to help bring your story to life.
                    </p>
                    <div className="ty-btns">
                        <Link href="/" className="btn-navy">
                            <Home size={16} aria-hidden="true" /> Back to Home
                        </Link>
                        <a href="tel:2797770367" className="btn-accent">
                            <Phone size={16} aria-hidden="true" /> (279) 777-0367
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}