"use client";
import { useEffect, useRef } from "react";

export default function LightningCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: -200, y: -200 });
    const ringPos = useRef({ x: -200, y: -200 });
    const rafRef = useRef<number>(0);
    const frameRef = useRef(0);

    useEffect(() => {
        const cursor = cursorRef.current;
        const ring = ringRef.current;
        if (!cursor || !ring) return;

        /* ── lerp ring ── */
        const animate = () => {
            const { x: mx, y: my } = mouseRef.current;
            ringPos.current.x += (mx - ringPos.current.x) * 0.1;
            ringPos.current.y += (my - ringPos.current.y) * 0.1;
            ring.style.left = ringPos.current.x + "px";
            ring.style.top = ringPos.current.y + "px";
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);

        /* ── track mouse ── */
        const onMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";

            frameRef.current++;

            /* sparks every 2 frames */
            if (frameRef.current % 2 === 0) spawnSpark(e.clientX, e.clientY);

            /* smoke every 5 frames */
            if (frameRef.current % 5 === 0) spawnSmoke(e.clientX, e.clientY);

            /* lightning bolt every 8 frames */
            if (frameRef.current % 8 === 0) spawnBolt(e.clientX, e.clientY);
        };

        /* ── hover state ── */
        const addHover = () => document.body.classList.add("cursor-hover");
        const rmHover = () => document.body.classList.remove("cursor-hover");
        document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
            el.addEventListener("mouseenter", addHover);
            el.addEventListener("mouseleave", rmHover);
        });

        document.addEventListener("mousemove", onMove);
        return () => {
            document.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <>
            <div id="nybp-cursor" ref={cursorRef} />
            <div id="nybp-cursor-ring" ref={ringRef} />
        </>
    );
}

/* ── helpers ── */
function spawnSpark(x: number, y: number) {
    const el = document.createElement("div");
    el.className = "nybp-spark";
    const size = Math.random() * 5 + 3;
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 28 + 8;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const colors = ["#F0A500", "#ffc13d", "#fff8e0", "#ffe066"];
    const c = colors[Math.floor(Math.random() * colors.length)];
    el.style.cssText = `
    left:${x}px; top:${y}px;
    width:${size}px; height:${size}px;
    background:${c};
    box-shadow: 0 0 ${size * 2}px ${c};
    --dx:${dx}px; --dy:${dy}px;
    --dur:${(Math.random() * 0.3 + 0.25).toFixed(2)}s;
  `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 700);
}

function spawnSmoke(x: number, y: number) {
    const el = document.createElement("div");
    el.className = "nybp-smoke";
    const size = Math.random() * 14 + 6;
    const dx = (Math.random() - 0.5) * 40;
    const cols = [
        "rgba(240,165,0,0.35)",
        "rgba(255,193,61,0.25)",
        "rgba(255,255,255,0.12)",
        "rgba(26,31,94,0.2)",
    ];
    const c = cols[Math.floor(Math.random() * cols.length)];
    el.style.cssText = `
    left:${x}px; top:${y}px;
    width:${size}px; height:${size}px;
    background:${c};
    --dx:${dx}px;
    --dur:${(Math.random() * 0.4 + 0.7).toFixed(2)}s;
  `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1300);
}

function spawnBolt(x: number, y: number) {
    /* tiny SVG lightning bolt */
    const el = document.createElement("div");
    el.style.cssText = `
    position:fixed; left:${x}px; top:${y}px;
    pointer-events:none; z-index:999995;
    transform:translate(-50%,-50%);
    animation:sparkFade 0.35s ease-out forwards;
    --dx:${(Math.random() - 0.5) * 20}px;
    --dy:${(Math.random() - 0.5) * 20}px;
    --dur:0.35s;
  `;
    const sz = Math.random() * 10 + 8;
    el.innerHTML = `
    <svg width="${sz}" height="${sz * 1.6}" viewBox="0 0 10 16" fill="none">
      <polygon points="6,0 0,9 5,9 4,16 10,7 5,7" fill="#F0A500" opacity="0.9"/>
    </svg>`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 500);
}