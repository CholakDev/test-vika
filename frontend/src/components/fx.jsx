import { useEffect, useRef, useState } from "react";

/* ---------------- Custom cursor ---------------- */
export function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(max-width: 900px)").matches) return;

    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    const onOver = (e) => {
      const interactive = e.target.closest("a, button, [data-cursor='hover']");
      if (ring.current) ring.current.classList.toggle("hov", !!interactive);
    };
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    const raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}

/* ---------------- Reveal on scroll ---------------- */
export function Reveal({ children, as = "div", className = "", delay = 0, ...rest }) {
  const ref = useRef(null);
  const Tag = as;
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let fired = false;
    const fire = () => { if (!fired) { fired = true; setTimeout(() => node.classList.add("in"), delay); } };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) { fire(); io.unobserve(node); } });
      },
      { threshold: 0.05, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(node);
    const fallback = setTimeout(fire, 900 + delay);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------------- Split-text reveal (per word) ---------------- */
export function SplitText({ text, className = "", as = "span", stagger = 60 }) {
  const ref = useRef(null);
  const Tag = as;
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    // Trigger on next frame so transition can play from initial state
    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => node.classList.add("split-in"));
    });
    return () => cancelAnimationFrame(id);
  }, [text]);

  const words = String(text).split(" ");
  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="split-word">
          <span style={{ "--d": `${i * stagger}ms` }}>{w}&nbsp;</span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------------- Magnetic wrapper ---------------- */
export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => { el.style.transform = "translate(0,0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return <span ref={ref} style={{ display: "inline-block", transition: "transform 0.5s cubic-bezier(0.2,0.8,0.2,1)" }}>{children}</span>;
}

/* ---------------- Scramble text on hover/in-view ---------------- */
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ@#$%&*0123456789";
export function Scramble({ text, className = "", trigger = "view" }) {
  const ref = useRef(null);
  const [out, setOut] = useState(text);

  useEffect(() => { setOut(text); }, [text]);

  const run = () => {
    const final = text;
    let frame = 0;
    const total = 22;
    const tick = () => {
      let s = "";
      for (let i = 0; i < final.length; i++) {
        const progress = (frame - i * 1.2) / total;
        if (progress < 0) s += CHARS[Math.floor(Math.random() * CHARS.length)];
        else if (progress < 1) s += Math.random() < 0.5 ? CHARS[Math.floor(Math.random() * CHARS.length)] : final[i];
        else s += final[i];
      }
      setOut(s);
      frame++;
      if (frame < total + final.length) requestAnimationFrame(tick);
      else setOut(final);
    };
    tick();
  };

  useEffect(() => {
    if (trigger !== "view") return;
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { run(); io.unobserve(node); }
      });
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
    // eslint-disable-next-line
  }, [text]);

  return (
    <span ref={ref} className={className} onMouseEnter={trigger === "hover" ? run : undefined} data-cursor="hover">
      {out}
    </span>
  );
}

/* ---------------- Counter on scroll ---------------- */
export function Counter({ to, suffix = "", duration = 1600, decimals = 0 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(to * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setVal(to);
          };
          requestAnimationFrame(tick);
          io.unobserve(node);
        }
      });
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [to, duration]);
  const display = decimals ? val.toFixed(decimals) : Math.round(val);
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ---------------- Marquee ---------------- */
export function Marquee({ items }) {
  const content = (
    <>
      {items.map((t, i) => (
        <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 24 }}>
          <span>{t}</span>
          <span className="marquee-dot">●</span>
        </span>
      ))}
    </>
  );
  return (
    <div className="marquee" data-testid="hero-marquee">
      <div className="marquee-track">
        {content}{content}
      </div>
    </div>
  );
}
