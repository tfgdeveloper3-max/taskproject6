"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, User, Mail, Phone, Send, Lock, Clock, Star, AlertCircle, CheckCircle } from "lucide-react";

const services = [
  "Ghostwriting Services",
  "Book Editing Services",
  "Book Cover Design Services",
  "Book Publishing Services",
  "Video Trailer Services",
  "Book Marketing Services",
  "Illustration Design Services",
  "Book Events Participation",
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) {
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleSubmit = async () => {
    if (!form.name) { setError("Name required hai."); return; }
    if (!form.email || !form.email.includes("@")) { setError("Valid email address daalo."); return; }
    if (!form.phone) { setError("Phone number required hai."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://leads.authorpublishers.us/api/lead/QoihAxdBb1nYBCKZ28lYvey1wJgbJELf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: form.name,
          Email: form.email,
          "Phone Number": form.phone,
          "Service Name": form.service,
          Message: form.message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          router.push("/thank-you");
        }, 2500);
      } else {
        setError(data?.message || "Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .cm-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.6);
          z-index: 9999; display: flex; align-items: center;
          justify-content: center; padding: 16px;
          animation: cm-fade-in 0.2s ease;
        }
        @keyframes cm-fade-in { from { opacity: 0; } to { opacity: 1; } }
        .cm-modal {
          background: #fff; border-radius: 16px; border-top: 4px solid #f0a500;
          width: 100%; max-width: 500px; max-height: 92vh; overflow-y: auto;
          padding: 28px 28px 24px; position: relative;
          animation: cm-slide-up 0.25s ease;
        }
        @keyframes cm-slide-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cm-spin { to { transform: rotate(360deg); } }
        .cm-close {
          position: absolute; top: 12px; right: 14px; background: none;
          border: 1px solid #e0e0e0; border-radius: 8px; cursor: pointer;
          width: 30px; height: 30px; display: flex; align-items: center;
          justify-content: center; color: #888;
        }
        .cm-close:hover { background: #f5f5f5; color: #222; }
        .cm-head { text-align: center; margin-bottom: 20px; }
        .cm-logo-wrap {
          display: flex; justify-content: center; align-items: center;
          margin: 0 auto 10px;
        }
        .cm-logo-wrap img {
          height: 70px; width: auto; object-fit: contain;
        }
        .cm-title { font-size: 17px; font-weight: 700; color: #0d1240; margin: 0 0 4px; }
        .cm-sub { font-size: 12px; color: #888; margin: 0; }
        .cm-divider { border: none; border-top: 1px solid #f0f0f0; margin: 0 0 18px; }
        .cm-label {
          display: block; font-size: 11px; font-weight: 700; color: #666;
          text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 5px;
        }
        .cm-input-wrap { position: relative; margin-bottom: 12px; }
        .cm-input-icon {
          position: absolute; left: 11px; top: 50%; transform: translateY(-50%);
          color: #aab0bc; pointer-events: none; display: flex; align-items: center;
        }
        .cm-input {
          width: 100%; box-sizing: border-box; border: 1.5px solid #dde1e7;
          border-radius: 8px; padding: 10px 12px 10px 34px; font-size: 13px;
          color: #222; background: #f8fafc; outline: none;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
          font-family: inherit;
        }
        .cm-input:focus {
          border-color: #f0a500; background: #fff;
          box-shadow: 0 0 0 3px rgba(240,165,0,0.14);
        }
        .cm-input::placeholder { color: #aab0bc; font-size: 12px; }
        .cm-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; }
        .cm-row .cm-input-wrap { margin-bottom: 0; }
        .cm-select-wrap { position: relative; margin-bottom: 12px; }
        .cm-select {
          width: 100%; box-sizing: border-box; border: 1.5px solid #dde1e7;
          border-radius: 8px; padding: 10px 32px 10px 12px; font-size: 13px;
          color: #222; background: #f8fafc; outline: none; appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23aab0bc' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat; background-position: right 12px center;
          background-size: 10px; cursor: pointer; font-family: inherit;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .cm-select:focus {
          border-color: #f0a500; background-color: #fff;
          box-shadow: 0 0 0 3px rgba(240,165,0,0.14);
        }
        .cm-textarea {
          width: 100%; box-sizing: border-box; border: 1.5px solid #dde1e7;
          border-radius: 8px; padding: 10px 12px; font-size: 13px; color: #222;
          background: #f8fafc; outline: none; resize: vertical;
          min-height: 82px; font-family: inherit; margin-bottom: 12px;
          transition: border-color 0.15s, box-shadow 0.15s, background 0.15s;
        }
        .cm-textarea:focus {
          border-color: #f0a500; background: #fff;
          box-shadow: 0 0 0 3px rgba(240,165,0,0.14);
        }
        .cm-textarea::placeholder { color: #aab0bc; font-size: 12px; }
        .cm-error {
          background: #fff5f5; border: 1px solid #f44336; border-radius: 8px;
          padding: 9px 12px; color: #c62828; font-size: 12px; margin-bottom: 10px;
          display: flex; align-items: center; gap: 8px;
        }
        .cm-success {
          background: #f0faf4; border: 1px solid #4caf50; border-radius: 8px;
          padding: 12px; color: #2e7d32; font-size: 13px; font-weight: 600;
          text-align: center; margin-bottom: 12px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .cm-submit {
          width: 100%; padding: 13px; background: #f0a500; color: #fff;
          font-size: 13px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 1.2px; border: none; border-radius: 10px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          margin-top: 4px; transition: background 0.15s;
        }
        .cm-submit:hover:not(:disabled) { background: #d99400; }
        .cm-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .cm-spinner {
          width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.4);
          border-top-color: #fff; border-radius: 50%;
          animation: cm-spin 0.7s linear infinite; display: inline-block;
        }
        .cm-trust {
          display: flex; align-items: center; justify-content: center;
          gap: 18px; margin-top: 14px; flex-wrap: wrap;
        }
        .cm-trust-item {
          display: flex; align-items: center; gap: 5px; font-size: 11px; color: #888;
        }
        @media (max-width: 480px) {
          .cm-row { grid-template-columns: 1fr; }
          .cm-modal { padding: 22px 18px 20px; }
        }
      `}</style>

      <div className="cm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <div className="cm-modal" role="dialog" aria-modal="true" aria-labelledby="cm-title">

          <button className="cm-close" onClick={onClose} aria-label="Close modal">
            <X size={14} />
          </button>

          <div className="cm-head">
            <div className="cm-logo-wrap">
              <img src="/images/logo.png" alt="Invictus Publishing" />
            </div>
            <p className="cm-title" id="cm-title">Book Your Free Consultation</p>
          </div>

          <hr className="cm-divider" />

          {success && (
            <div className="cm-success">
              <CheckCircle size={18} />
              Thank you! Hamari team jald hi aapse contact karegi.
            </div>
          )}
          {error && (
            <div className="cm-error">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <label className="cm-label">Full Name <span style={{ color: "#f0a500" }}>*</span></label>
          <div className="cm-input-wrap">
            <span className="cm-input-icon"><User size={15} /></span>
            <input className="cm-input" name="name" type="text" placeholder="Enter your full name" value={form.name} onChange={handle} />
          </div>

          <div className="cm-row">
            <div>
              <label className="cm-label">Email <span style={{ color: "#f0a500" }}>*</span></label>
              <div className="cm-input-wrap">
                <span className="cm-input-icon"><Mail size={15} /></span>
                <input className="cm-input" name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handle} />
              </div>
            </div>
            <div>
              <label className="cm-label">Phone <span style={{ color: "#f0a500" }}>*</span></label>
              <div className="cm-input-wrap">
                <span className="cm-input-icon"><Phone size={15} /></span>
                <input className="cm-input" name="phone" type="tel" placeholder="(000) 000-0000" value={form.phone} onChange={handle} />
              </div>
            </div>
          </div>

          <label className="cm-label">Select Service</label>
          <div className="cm-select-wrap">
            <select className="cm-select" name="service" value={form.service} onChange={handle}>
              <option value="">— Choose a service —</option>
              {services.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <label className="cm-label">Your Message</label>
          <textarea className="cm-textarea" name="message" placeholder="Tell us about your book project..." value={form.message} onChange={handle} />

          <button className="cm-submit" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <><span className="cm-spinner" /> Sending...</>
            ) : (
              <><Send size={15} /> Get Started</>
            )}
          </button>

          <div className="cm-trust">
            <div className="cm-trust-item"><Lock size={12} /> Secure &amp; Private</div>
            <div className="cm-trust-item"><Clock size={12} /> Reply within 24hrs</div>
            <div className="cm-trust-item"><Star size={12} /> 100% Free</div>
          </div>

        </div>
      </div>
    </>
  );
}