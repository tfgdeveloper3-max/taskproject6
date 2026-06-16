"use client";
import { useState, useEffect, useRef } from "react";
import { Phone, MessageCircle, Lock } from "lucide-react";

export function GetInTouchSection() {
  const [checked, setChecked] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll(".reveal,.reveal-left,.reveal-right").forEach(c => c.classList.add("revealed"));
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Wrapper ── */
        .git-wrap {
          font-family: var(--font);
          background: var(--white);
        }

        /* ── Top CTA ── */
        .git-cta {
          text-align: center;
          padding: 68px 24px 52px;
          border-bottom: 1px solid #f0f0f0;
        }
        .git-cta h2 { color: var(--navy, #0d1240) !important; }
        .git-cta h3 {
          font-size: clamp(15px, 2vw, 22px);
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 16px;
          line-height: 1.4;
        }
        .git-cta p {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.85;
          max-width: 500px;
          margin: 0 auto 32px;
        }
        .git-cta-btns {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .git-cta-btns a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* ── Form section ── */
        .git-body {
          padding: 68px 48px 80px;
          display: flex;
          gap: 44px;
          align-items: flex-start;
          max-width: 1100px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        /* ── Image column ── */
        .git-img-col {
          flex: 0 0 460px;
          display: flex;
          align-items: center;
          justify-content: center;
          align-self: stretch;
          min-height: 100%;
        }
        .git-img-col img {
          width: 100%;
          height: 100%;
          min-height: 540px;
          object-fit: contain;
          filter: drop-shadow(0 12px 32px rgba(0,0,0,0.12));
        }

        /* ── Form column ── */
        .git-form-col {
          flex: 1;
          min-width: 280px;
        }
        .git-form-col h3 {
          color: var(--navy, #0d1240) !important;
          margin-bottom: 28px;
        }
        .git-fields {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .git-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        /* ── Captcha row ── */
        .git-captcha {
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1.5px solid #d0d0d0;
          border-radius: 10px;
          padding: 14px 18px;
          background: #f8fafc;
          cursor: pointer;
        }
        .git-captcha-box {
          width: 22px; height: 22px;
          border-radius: 5px;
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-size: 13px;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .git-captcha-label {
          font-size: 1.1rem;
          color: #555;
          flex: 1;
        }
        .git-captcha-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          font-size: 9px;
          color: #aaa;
          line-height: 1.4;
        }

        .git-submit {
          align-self: flex-start;
          border-radius: var(--radius-pill);
          padding: 14px 48px;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* ═══════════════════════════════
           RESPONSIVE BREAKPOINTS
        ═══════════════════════════════ */

        /* ── Small mobile: ≤ 375px ── */
        @media (max-width: 375px) {
          .git-cta { padding: 44px 16px 36px; }
          .git-cta-btns { flex-direction: column; align-items: center; }
          .git-cta-btns a { width: 100%; justify-content: center; }
          .git-body { padding: 40px 16px 56px; gap: 28px; flex-direction: column; }
          .git-img-col { flex: none; width: 100%; }
          .git-img-col img { height: 260px; max-width: 260px; margin: 0 auto; display: block; }
          .git-grid { grid-template-columns: 1fr; }
          .git-submit { width: 100%; justify-content: center; }
        }

        /* ── Mobile: 376px – 480px ── */
        @media (min-width: 376px) and (max-width: 480px) {
          .git-cta { padding: 48px 18px 40px; }
          .git-cta-btns { flex-direction: column; align-items: center; }
          .git-cta-btns a { width: 100%; justify-content: center; }
          .git-body { padding: 44px 18px 60px; gap: 28px; flex-direction: column; }
          .git-img-col { flex: none; width: 100%; }
          .git-img-col img { height: 300px; max-width: 300px; margin: 0 auto; display: block; }
          .git-grid { grid-template-columns: 1fr; }
          .git-submit { width: 100%; justify-content: center; }
        }

        /* ── Tablet: 481px – 768px ── */
        @media (min-width: 481px) and (max-width: 768px) {
          .git-cta { padding: 52px 24px 44px; }
          .git-body { padding: 52px 28px 68px; flex-direction: column; gap: 32px; }
          .git-img-col { flex: none; width: 100%; }
          .git-img-col img { height: 360px; max-width: 360px; margin: 0 auto; display: block; }
        }

        /* ── Small laptop: 769px – 1024px ── */
        @media (min-width: 769px) and (max-width: 1024px) {
          .git-body { padding: 56px 36px 72px; max-width: 900px; gap: 36px; }
          .git-img-col { flex: 0 0 340px; }
          .git-img-col img { min-height: 460px; }
        }

        /* ── Laptop: 1025px – 1280px ── */
        @media (min-width: 1025px) and (max-width: 1280px) {
          .git-body { padding: 60px 44px 76px; max-width: 1000px; }
          .git-img-col { flex: 0 0 400px; }
          .git-img-col img { min-height: 500px; }
        }

        /* ── Desktop: 1281px – 1600px ── */
        @media (min-width: 1281px) and (max-width: 1600px) {
          .git-body { max-width: 1100px; }
          .git-img-col { flex: 0 0 460px; }
          .git-img-col img { min-height: 540px; }
        }

        /* ── Large Desktop: 1601px – 1920px ── */
        @media (min-width: 1601px) and (max-width: 1920px) {
          .git-cta { padding: 80px 32px 64px; }
          .git-cta p { font-size: 1.15rem; max-width: 620px; }
          .git-body { padding: 80px 60px 96px; max-width: 1380px; gap: 56px; }
          .git-img-col { flex: 0 0 560px; }
          .git-img-col img { min-height: 640px; }
          .git-captcha-label { font-size: 1.1rem; }
        }

        /* ── Ultra-wide: 1921px – 2560px ── */
        @media (min-width: 1921px) and (max-width: 2560px) {
          .git-cta { padding: 96px 40px 80px; }
          .git-cta p { font-size: 1.2rem; max-width: 760px; }
          .git-body { padding: 96px 80px 120px; max-width: 1760px; gap: 72px; }
          .git-img-col { flex: 0 0 700px; }
          .git-img-col img { min-height: 800px; }
          .git-captcha-label { font-size: 1.15rem; }
          .git-fields { gap: 18px; }
        }

        /* ── 4K / 2561px+ ── */
        @media (min-width: 2561px) {
          .git-cta { padding: 120px 60px 100px; }
          .git-cta p { font-size: 1.35rem; max-width: 960px; }
          .git-body { padding: 120px 120px 160px; max-width: 2300px; gap: 96px; }
          .git-img-col { flex: 0 0 900px; }
          .git-img-col img { min-height: 1000px; }
          .git-captcha-label { font-size: 1.2rem; }
          .git-fields { gap: 22px; }
          .git-submit { padding: 18px 64px; font-size: 16px; }
        }
      `}</style>

      <div ref={ref} className="git-wrap" id="contact">

        {/* ── Top CTA ── */}
        <div className="git-cta reveal">
          <p className="section-eyebrow">Contact Us</p>
          <h2 className="section-title">Let&apos;s Talk About Your Book</h2>
          <h3>Reach Out to Invictus Publishing for Professional Author Solutions</h3>
          <p>Get in touch and start building your path toward professional publishing success.</p>
          <div className="git-cta-btns">
            <a href="#" className="btn-accent">
              <MessageCircle size={16} aria-hidden="true" /> Chat With Experts
            </a>
            <a href="tel:8553847020" className="btn-navy">
              <Phone size={16} aria-hidden="true" /> (855) 384-7020
            </a>
          </div>
        </div>

        {/* ── Form body ── */}
        <div className="git-body">

          {/* image */}
          <div className="git-img-col reveal-left">
            <img src="/images/StepInto.png" alt="Books" />
          </div>

          {/* form */}
          <div className="git-form-col reveal-right">
            <h3 className="section-title">Ready To Discuss Your Story?</h3>
            <div className="git-fields">
              <input className="nybp-input" name="name" placeholder="Enter Your Name" value={form.name} onChange={handle} />
              <div className="git-grid">
                <input className="nybp-input" name="email" type="email" placeholder="Enter Your Email" value={form.email} onChange={handle} />
                <input className="nybp-input" name="phone" type="tel" placeholder="Enter Phone Number" value={form.phone} onChange={handle} />
              </div>
              <textarea className="nybp-input" name="message" placeholder="Enter Message" value={form.message} onChange={handle} style={{ minHeight: 130 }} />

              {/* captcha */}
              <div className="git-captcha" onClick={() => setChecked(!checked)}>
                <div
                  className="git-captcha-box"
                  style={{
                    border: `2px solid ${checked ? "#4caf50" : "#aaa"}`,
                    background: checked ? "#4caf50" : "#fff",
                  }}
                >
                  {checked ? "✓" : ""}
                </div>
                <span className="git-captcha-label">I&apos;m not a robot</span>
                <div className="git-captcha-badge">
                  <Lock size={14} aria-hidden="true" />
                  <span>reCAPTCHA</span>
                </div>
              </div>

              <a href="#" className="btn-navy git-submit">Get Started</a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}