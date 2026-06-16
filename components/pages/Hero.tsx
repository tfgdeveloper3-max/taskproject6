"use client";
import { useEffect, useRef } from "react";
import { MessageCircle, CalendarCheck } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = canvas.offsetWidth, h = canvas.offsetHeight;
    canvas.width = w; canvas.height = h;

    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random(),
      delta: (Math.random() - 0.5) * 0.02,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        s.opacity += s.delta;
        if (s.opacity <= 0 || s.opacity >= 1) s.delta *= -1;
        s.y -= s.speed;
        if (s.y < 0) { s.y = h; s.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,165,0,${s.opacity.toFixed(2)})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const resize = () => {
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w; canvas.height = h;
    };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <>
      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(240,165,0,0), 0 32px 80px rgba(0,0,0,0.35); }
          50%       { box-shadow: 0 0 0 6px rgba(240,165,0,0.12), 0 32px 80px rgba(0,0,0,0.35); }
        }
        @keyframes cornerAnim {
          0%,100% { width: 28px; height: 28px; opacity: 0.7; }
          50%     { width: 38px; height: 38px; opacity: 1; }
        }
        @keyframes shimmerLine {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        @keyframes floatForm {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeLeft {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(0.95); opacity: 0.6; }
          70%  { transform: scale(1.05); opacity: 0; }
          100% { transform: scale(1.05); opacity: 0; }
        }

        .hero-section {
          background: var(--gradient-dark);
          min-height: 80vh;
          position: relative;
          overflow: hidden;
          font-family: var(--font);
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1320px;
          margin: 0 auto;
          padding: 40px 20px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
          flex-wrap: wrap;
        }

        .hero-left {
          flex: 1;
          min-width: 280px;
        }

        .hero-eyebrow {
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 6px;
          animation: fadeUp 0.6s ease both;
        }

        .hero-title {
          font-family: var(--font2);
          font-size: clamp(52px, 8.5vw, 76px);
          font-weight: 900;
          color: var(--accent);
          line-height: 0.88;
          text-transform: uppercase;
          margin: 0 0 24px 0;
          letter-spacing: -2px;
          animation: fadeUp 0.7s 0.1s ease both;
          text-shadow: 0 0 60px rgba(240,165,0,0.3);
        }

        .hero-subtitle {
          font-size: clamp(0.75rem, 1.7vw, 1rem);
          font-weight: 700;
          color: var(--white);
          text-transform: uppercase;
          margin: 0 0 20px;
          letter-spacing: 0.5px;
          animation: fadeUp 0.7s 0.2s ease both;
        }

        .hero-desc {
          font-size: 1.1rem;
          color: var(--text-muted);
          line-height: 1.85;
          margin-bottom: 32px;
          max-width: 500px;
          animation: fadeUp 0.7s 0.3s ease both;
        }

        .hero-badges {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
          flex-wrap: wrap;
          animation: fadeUp 0.7s 0.4s ease both;
        }
        .hero-badge {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(240,165,0,0.3);
          border-radius: 10px;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, transform 0.2s;
        }
        .hero-badge:hover {
          background: rgba(255,255,255,0.1);
          transform: scale(1.04);
        }
        .hero-badge img {
          height: 40px;
          width: auto;
          object-fit: contain;
          display: block;
        }

        .hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          animation: fadeUp 0.7s 0.5s ease both;
        }

        .hero-right {
          flex-shrink: 0;
          width: 440px;
          animation: fadeLeft 0.9s 0.2s ease both;
          position: relative;
        }

        .corner {
          position: absolute;
          width: 32px;
          height: 32px;
          animation: cornerAnim 2.5s ease-in-out infinite;
          z-index: 2;
        }
        .corner-tl { top: -10px; left: -10px;  border-top: 3px solid var(--accent); border-left: 3px solid var(--accent);  border-radius: 4px 0 0 0; animation-delay: 0s; }
        .corner-tr { top: -10px; right: -10px; border-top: 3px solid var(--accent); border-right: 3px solid var(--accent); border-radius: 0 4px 0 0; animation-delay: 0.4s; }
        .corner-bl { bottom: -10px; left: -10px;  border-bottom: 3px solid var(--accent); border-left: 3px solid var(--accent);  border-radius: 0 0 0 4px; animation-delay: 0.8s; }
        .corner-br { bottom: -10px; right: -10px; border-bottom: 3px solid var(--accent); border-right: 3px solid var(--accent); border-radius: 0 0 4px 0; animation-delay: 1.2s; }

        .form-glow {
          position: absolute;
          inset: -20px;
          background: radial-gradient(ellipse at center, rgba(240,165,0,0.13) 0%, transparent 70%);
          border-radius: 24px;
          pointer-events: none;
          z-index: 0;
        }

        .form-card {
          background: var(--white);
          border-radius: 16px;
          padding: 36px 32px 32px;
          border-top: 5px solid var(--accent);
          position: relative;
          z-index: 1;
          animation: glowPulse 3s ease-in-out infinite, floatForm 5s ease-in-out infinite;
        }

        .form-shimmer-wrap {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 5px;
          border-radius: 16px 16px 0 0;
          overflow: hidden;
        }
        .form-shimmer {
          position: absolute;
          top: 0; left: 0;
          width: 25%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent);
          animation: shimmerLine 2.5s ease-in-out infinite;
        }

        .form-logo-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 4px;
        }
        .form-logo-wrap img {
          height: 75px;
          width: auto;
          object-fit: contain;
        }

        .form-heading {
          font-size: 12px;
          font-weight: 700;
          color: var(--navy);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 22px;
          text-align: center;
        }

        .form-desc {
          font-size: 1.1rem;
        }

        .nybp-input {
          display: block;
          width: 100%;
          box-sizing: border-box;
          margin-bottom: 12px;
        }

        .form-captcha {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1.5px solid #dde1e7;
          border-radius: 10px;
          padding: 12px 16px;
          margin-bottom: 14px;
          background: #f8fafc;
        }
        .form-captcha input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: var(--accent);
        }
        .form-captcha label {
          font-size: 1.1rem;
          color: #555;
          flex: 1;
        }
        .form-captcha-recaptcha {
          font-size: 9px;
          color: #aaa;
          text-align: center;
          line-height: 1.5;
        }

        .form-submit {
          width: 100%;
          justify-content: center;
          border-radius: 10px;
          padding: 15px;
          font-size: 15px;
          letter-spacing: 1px;
          text-transform: uppercase;
          border: none;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        @media (max-width: 480px) {
          .hero-section { min-height: auto; }
          .hero-inner { flex-direction: column; padding: 24px 16px 48px; gap: 32px; }
          .hero-left { min-width: 100%; }
          .hero-title { font-size: clamp(40px, 12vw, 52px); letter-spacing: -1px; }
          .hero-desc { font-size: 1rem; }
          .hero-right { width: 100%; }
          .form-card { padding: 24px 20px 24px; }
          .hero-ctas { flex-direction: column; }
          .hero-ctas a { width: 100%; text-align: center; justify-content: center; }
        }

        @media (max-width: 375px) {
          .hero-title { font-size: 36px; }
          .hero-inner { padding: 20px 14px 40px; }
          .form-card { padding: 20px 16px; }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          .hero-inner { flex-direction: column; padding: 32px 24px 64px; gap: 40px; }
          .hero-right { width: 100%; max-width: 480px; margin: 0 auto; }
          .hero-title { font-size: clamp(48px, 10vw, 64px); }
          .hero-desc { font-size: 1rem; max-width: 100%; }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-inner { padding: 36px 32px 72px; gap: 36px; }
          .hero-right { width: 380px; }
          .hero-title { font-size: clamp(48px, 7vw, 64px); }
          .hero-desc { font-size: 1rem; }
        }

        @media (min-width: 1025px) and (max-width: 1280px) {
          .hero-inner { padding: 36px 40px 80px; max-width: 1100px; }
          .hero-right { width: 400px; }
          .hero-desc { font-size: 1rem; }
        }

        @media (min-width: 1281px) and (max-width: 1600px) {
          .hero-inner { padding: 40px 48px 88px; max-width: 1320px; }
          .hero-right { width: 440px; }
        }

        @media (min-width: 1601px) and (max-width: 1920px) {
          .hero-inner { max-width: 1560px; padding: 52px 64px 100px; gap: 60px; }
          .hero-right { width: 500px; }
          .hero-title { font-size: clamp(76px, 5.5vw, 96px); }
          .hero-desc { font-size: 1.1rem; max-width: 580px; }
          .hero-eyebrow { font-size: 0.85rem; }
          .form-card { padding: 44px 40px 40px; }
          .form-logo-wrap img { height: 88px; }
        }

        @media (min-width: 1921px) and (max-width: 2560px) {
          .hero-section { min-height: 75vh; }
          .hero-inner { max-width: 1900px; padding: 64px 80px 120px; gap: 80px; }
          .hero-right { width: 580px; }
          .hero-title { font-size: clamp(96px, 5.8vw, 120px); }
          .hero-desc { font-size: 1.15rem; max-width: 680px; }
          .hero-eyebrow { font-size: 0.9rem; letter-spacing: 2.5px; }
          .hero-subtitle { font-size: clamp(1rem, 1.2vw, 1.2rem); }
          .form-card { padding: 52px 48px 48px; }
          .form-logo-wrap img { height: 100px; }
          .form-heading { font-size: 14px; }
        }

        @media (min-width: 2561px) {
          .hero-section { min-height: 70vh; }
          .hero-inner { max-width: 2400px; padding: 80px 120px 160px; gap: 100px; }
          .hero-right { width: 700px; }
          .hero-title { font-size: clamp(120px, 5.5vw, 160px); letter-spacing: -4px; }
          .hero-desc { font-size: 1.2rem; max-width: 820px; }
          .hero-eyebrow { font-size: 1rem; letter-spacing: 3px; }
          .hero-subtitle { font-size: clamp(1.1rem, 1.1vw, 1.4rem); }
          .form-card { padding: 64px 56px 56px; }
          .form-logo-wrap img { height: 120px; }
          .form-heading { font-size: 16px; letter-spacing: 3px; }
          .corner { width: 40px; height: 40px; }
        }
      `}</style>

      <section className="hero-section">
        <canvas
          ref={canvasRef}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        />

        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url('/images/home-books.png')",
          backgroundRepeat: "no-repeat", backgroundPosition: "bottom center", backgroundSize: "contain",
          opacity: 0.05, pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{ position: "absolute", top: -140, right: -140, width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(240,165,0,0.1)", pointerEvents: "none", zIndex: 0, animation: "pulse-ring 4s ease-out infinite" }} />
        <div style={{ position: "absolute", top: -80, right: -80, width: 360, height: 360, borderRadius: "50%", border: "1px solid rgba(240,165,0,0.15)", pointerEvents: "none", zIndex: 0, animation: "pulse-ring 4s 1s ease-out infinite" }} />

        <div className="hero-inner">

          <div className="hero-left">
            <p className="hero-eyebrow">
              Invictus - Your Partner In Professional
            </p><br /><br />
            <h1 className="hero-title">
              Book <br />Publishing
            </h1>
            <p className="hero-subtitle">
              THE MOMENT YOUR MANUSCRIPT BECOMES A BOOK BEGINS HERE
            </p>
            <p className="hero-desc">
              Your creativity stays at the center. We handle the process behind the success. From the first sentence to the final release, we provide the support needed to turn your writing into a professionally published work. Start the journey now!
            </p>

            <div className="hero-badges">
              <div className="hero-badge">
                <img src="/images/google3.png" alt="Google Reviews" />
              </div>
              <div className="hero-badge">
                <img src="/images/footer-icon1.webp" alt="Trustpilot" />
              </div>
            </div>

            <div className="hero-ctas">
              <a href="#" className="btn-outline-white" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <MessageCircle size={16} aria-hidden="true" /> Chat with us
              </a>
              <a href="#" className="btn-accent" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <CalendarCheck size={16} aria-hidden="true" /> Book Free Consultation
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="corner corner-tl" />
            <div className="corner corner-tr" />
            <div className="corner corner-bl" />
            <div className="corner corner-br" />

            <div className="form-glow" />

            <div className="form-card">
              <div className="form-shimmer-wrap">
                <div className="form-shimmer" />
              </div>

              <div className="form-logo-wrap">
                <img src="/images/logo.png" alt="NY Book Publishers" />
              </div>
              <p className="form-heading">Become A Published Author</p>

              {[
                { type: "text", ph: "Enter Your Name" },
                { type: "email", ph: "Enter Your Email" },
                { type: "tel", ph: "+1 (555) 000-0000" },
              ].map(({ type, ph }) => (
                <input key={ph} className="nybp-input" type={type} placeholder={ph} />
              ))}
              <textarea className="nybp-input" placeholder="Type Your Message..." />

              <div className="form-captcha">
                <input type="checkbox" id="robot" />
                <label htmlFor="robot" className="form-desc">I&apos;m not a robot</label>
                <span className="form-captcha-recaptcha">🔒<br />reCAPTCHA</span>
              </div>

              <button className="btn-accent form-submit">
                Contact Us
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}