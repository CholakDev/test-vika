import { useEffect, useState } from "react";
import "@/App.css";
import { translations } from "@/i18n";
import { Cursor, Reveal, SplitText, Magnetic, Scramble, Counter, Marquee } from "@/components/fx";

const TG_URL = "https://t.me/cholak_viktoriia";
const IG_URL = "https://instagram.com/cholak_viktoriia";

/* ============== Top nav ============== */
function Nav({ lang, setLang, t }) {
  return (
    <div className="nav-wrap">
      <nav className="nav" data-testid="top-nav">
        <span className="brand">Чолак · V</span>
        <a href="#services" className="desktop-only" data-testid="nav-services">{t.nav.services}</a>
        <a href="#process" className="desktop-only" data-testid="nav-process">{t.nav.process}</a>
        <a href="#cases" className="desktop-only" data-testid="nav-cases">{t.nav.cases}</a>
        <a href="#faq" className="desktop-only" data-testid="nav-faq">{t.nav.faq}</a>
        <span className="lang-switch" data-testid="lang-switch" style={{ marginLeft: 8 }}>
          <button className={lang === "uk" ? "on" : ""} onClick={() => setLang("uk")} data-testid="lang-uk">UA</button>
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")} data-testid="lang-en">EN</button>
        </span>
      </nav>
    </div>
  );
}

/* ============== Hero ============== */
function Hero({ t }) {
  const [parY, setParY] = useState(0);
  useEffect(() => {
    const onScroll = () => setParY(window.scrollY * 0.15);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section style={{ padding: "120px 20px 40px", maxWidth: 1280, margin: "0 auto" }} data-testid="hero">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <span className="year-mark">— Est. 2019 / Kyiv</span>
        <span className="year-mark">{t.hero.eyebrow}</span>
      </div>

      <h1 className="hero-headline" data-testid="hero-headline" style={{ maxWidth: "11ch" }}>
        <SplitText text={t.hero.h1Top} as="span" stagger={70} /><br />
        <em><SplitText text={t.hero.h1Mid} as="span" stagger={70} /></em><br />
        <SplitText text={t.hero.h1Bot} as="span" stagger={70} />
      </h1>

      <div className="hero-grid" style={{
        display: "grid",
        gap: 32,
        marginTop: 44,
      }}>
        <div className="hero-photo" style={{ aspectRatio: "4 / 5", maxWidth: 520, position: "relative" }}>
          <img
            src="/hero.webp"
            alt="Чолак Вікторія — таргетолог"
            style={{ transform: `translateY(${parY * 0.6}px) scale(1.06)` }}
            data-testid="hero-photo"
          />
          <div className="sticker" style={{ right: -34, top: -34 }} data-testid="hero-sticker">
            <div>
              <div style={{ fontSize: 22, fontFamily: "Fraunces, serif", fontWeight: 600 }}>×4.2</div>
              <div style={{ fontSize: 9, letterSpacing: "0.18em", marginTop: 4 }}>AVG ROAS</div>
            </div>
          </div>
        </div>

        <div>
          <Reveal>
            <p style={{ fontSize: 17, lineHeight: 1.55, maxWidth: 540, opacity: 0.82 }} data-testid="hero-sub">
              {t.hero.sub}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 14 }}>
              <Magnetic>
                <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="btn" data-testid="hero-cta-primary">
                  {t.hero.ctaPrimary}<span className="arrow-line" />
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#cases" className="btn btn-ghost" data-testid="hero-cta-secondary">
                  {t.hero.ctaSecondary}<span className="arrow-line" />
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="hero-tape" style={{ marginTop: 36 }} data-testid="hero-tape">
              <span><span className="dot" style={{ display: "inline-block", marginRight: 8 }} />{t.hero.meta1}</span>
              <span>·</span>
              <span>{t.hero.meta2}</span>
              <span>·</span>
              <span>{t.hero.meta3}</span>
            </div>
          </Reveal>

          <div style={{ marginTop: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="font-display" style={{ fontStyle: "italic", fontSize: 28, lineHeight: 1 }} data-testid="hero-name">
                {t.hero.name}
              </div>
              <div className="year-mark" style={{ marginTop: 6 }}>{t.hero.role}</div>
            </div>
            <div className="year-mark">↳ scroll</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Stats ============== */
function Stats({ t }) {
  return (
    <section style={{ padding: "80px 20px", maxWidth: 1280, margin: "0 auto" }} data-testid="stats">
      <Reveal>
        <span className="kicker">— {t.stats.title}</span>
      </Reveal>
      <Reveal delay={100}>
        <p style={{ fontSize: 16, lineHeight: 1.55, opacity: 0.78, marginTop: 14, maxWidth: 540 }}>{t.stats.sub}</p>
      </Reveal>

      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {t.stats.items.map((s, i) => (
          <Reveal key={i} delay={i * 100}>
            <div data-testid={`stat-${i}`}>
              <div className="stat-num">
                <Counter to={s.n} suffix={s.suffix} decimals={s.n % 1 !== 0 ? 1 : 0} />
              </div>
              <div className="year-mark" style={{ marginTop: 10, opacity: 0.8 }}>{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============== About ============== */
function About({ t }) {
  return (
    <section style={{ padding: "80px 20px", maxWidth: 1280, margin: "0 auto" }} data-testid="about">
      <Reveal><span className="kicker">{t.about.kicker}</span></Reveal>
      <h2 className="section-title" style={{ marginTop: 18, maxWidth: 920 }} data-testid="about-title">
        <SplitText text={t.about.title.split("\n")[0]} stagger={50} />
        <br />
        <em><SplitText text={t.about.title.split("\n")[1]} stagger={50} /></em>
      </h2>
      <Reveal delay={150}>
        <p style={{ marginTop: 28, fontSize: 17, lineHeight: 1.6, opacity: 0.82, maxWidth: 620 }}>{t.about.body}</p>
      </Reveal>
      <ul style={{ marginTop: 32, padding: 0, listStyle: "none", display: "grid", gap: 12, maxWidth: 620 }}>
        {t.about.points.map((p, i) => (
          <Reveal as="li" key={i} delay={i * 80} style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
            <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.5 }}>0{i + 1}</span>
            <span style={{ fontSize: 15, lineHeight: 1.55 }}>{p}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/* ============== Services (accordion) ============== */
function Services({ t }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="services" style={{ padding: "80px 20px", maxWidth: 1280, margin: "0 auto" }} data-testid="services">
      <Reveal><span className="kicker">{t.services.kicker}</span></Reveal>
      <h2 className="section-title" style={{ marginTop: 18 }} data-testid="services-title">
        <em>{t.services.title}</em>
      </h2>
      <Reveal delay={120}>
        <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.55, opacity: 0.78, maxWidth: 540 }}>{t.services.sub}</p>
      </Reveal>

      <div style={{ marginTop: 36 }}>
        {t.services.items.map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <div
              className={`svc ${open === i ? "open" : ""}`}
              onClick={() => setOpen(open === i ? -1 : i)}
              data-testid={`svc-${i}`}
            >
              <div className="svc-tag">{s.tag}</div>
              <div>
                <div className="svc-title">{s.title}</div>
                <div className="svc-text">{s.text}</div>
              </div>
              <div className="svc-plus" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============== Process ============== */
function Process({ t }) {
  return (
    <section id="process" style={{ padding: "80px 20px", maxWidth: 1280, margin: "0 auto" }} data-testid="process">
      <Reveal><span className="kicker">{t.process.kicker}</span></Reveal>
      <h2 className="section-title" style={{ marginTop: 18 }} data-testid="process-title">
        <Scramble text={t.process.title} />
      </h2>

      <div style={{ marginTop: 36 }}>
        {t.process.steps.map((s, i) => (
          <Reveal key={i} delay={i * 90}>
            <div className="tl" data-testid={`tl-${i}`}>
              <div className="tl-num">{s.n}</div>
              <div>
                <div className="tl-t">{s.t}</div>
                <div className="tl-d">{s.d}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============== Cases ============== */
function Cases({ t }) {
  return (
    <section id="cases" style={{ padding: "80px 20px", maxWidth: 1280, margin: "0 auto" }} data-testid="cases">
      <Reveal><span className="kicker">{t.cases.kicker}</span></Reveal>
      <h2 className="section-title" style={{ marginTop: 18 }} data-testid="cases-title">{t.cases.title}</h2>
      <Reveal delay={120}>
        <p style={{ marginTop: 18, fontSize: 15, opacity: 0.7, maxWidth: 540 }}>{t.cases.sub}</p>
      </Reveal>
      <div style={{ marginTop: 36, display: "grid", gap: 20 }}>
        {t.cases.items.map((c, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="case" data-testid={`case-${i}`}>
              <div className="case-niche">{c.niche}</div>
              <div className="case-row">
                <span className="case-strike">{c.before}</span>
                <span style={{ opacity: 0.4 }}>→</span>
                <span className="case-after">{c.after}</span>
              </div>
              <div className="case-roas">{c.roas}</div>
              <div className="case-note">{c.note}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============== Testimonials ============== */
function Testimonials({ t }) {
  return (
    <section style={{ padding: "80px 20px", maxWidth: 1280, margin: "0 auto" }} data-testid="testimonials">
      <Reveal><span className="kicker">{t.testimonials.kicker}</span></Reveal>
      <h2 className="section-title" style={{ marginTop: 18 }} data-testid="tst-title">
        <em>{t.testimonials.title}</em>
      </h2>
      <div style={{ marginTop: 40, display: "grid", gap: 28 }}>
        {t.testimonials.items.map((it, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="tst" data-testid={`tst-${i}`}>
              <div className="tst-text">«{it.text}»</div>
              <div className="tst-name">{it.name} · {it.role}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============== FAQ ============== */
function Faq({ t }) {
  const [open, setOpen] = useState(-1);
  return (
    <section id="faq" style={{ padding: "80px 20px", maxWidth: 1280, margin: "0 auto" }} data-testid="faq">
      <Reveal><span className="kicker">{t.faq.kicker}</span></Reveal>
      <h2 className="section-title" style={{ marginTop: 18 }} data-testid="faq-title">{t.faq.title}</h2>
      <div style={{ marginTop: 36 }}>
        {t.faq.items.map((it, i) => (
          <Reveal key={i} delay={i * 60}>
            <div
              className={`faq-item ${open === i ? "open" : ""}`}
              onClick={() => setOpen(open === i ? -1 : i)}
              data-testid={`faq-${i}`}
            >
              <div className="faq-q">
                <span>{it.q}</span>
                <span className="faq-toggle">+</span>
              </div>
              <div className="faq-a">{it.a}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============== CTA ============== */
function Cta({ t }) {
  return (
    <section style={{ padding: "60px 20px", maxWidth: 1280, margin: "0 auto" }} data-testid="cta-section">
      <div className="cta-block">
        <div className="cta-orb" style={{ top: -120, right: -120 }} />
        <div className="cta-orb" style={{ bottom: -160, left: -120, animationDelay: "2s" }} />
        <Reveal><span className="kicker" style={{ color: "#f3ede2", opacity: 0.7 }}>— {t.cta.kicker}</span></Reveal>
        <h2 className="section-title" style={{ marginTop: 16 }} data-testid="cta-title">
          {t.cta.title.split("\n")[0]}<br /><em>{t.cta.title.split("\n")[1]}</em>
        </h2>
        <Reveal delay={150}>
          <p style={{ marginTop: 24, fontSize: 16, lineHeight: 1.6, opacity: 0.8, maxWidth: 480 }}>{t.cta.sub}</p>
        </Reveal>

        <div style={{ marginTop: 40, display: "grid", gap: 14 }}>
          <Reveal delay={200}>
            <a href={TG_URL} target="_blank" rel="noopener noreferrer" className="contact-pill" data-testid="cta-tg">
              <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, letterSpacing: "0.2em", opacity: 0.6 }}>01</span>
                <span>{t.cta.tg} — @cholak_viktoriia</span>
              </span>
              <span className="arrow-line" />
            </a>
          </Reveal>
          <Reveal delay={280}>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="contact-pill" data-testid="cta-ig">
              <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <span style={{ fontFamily: "JetBrains Mono", fontSize: 11, letterSpacing: "0.2em", opacity: 0.6 }}>02</span>
                <span>{t.cta.ig} — @cholak_viktoriia</span>
              </span>
              <span className="arrow-line" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={360}>
          <div style={{ marginTop: 32, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", opacity: 0.6, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: 999, background: "#7ad27a", boxShadow: "0 0 12px #7ad27a" }} />
            {t.cta.response}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============== Footer ============== */
function Footer({ t }) {
  return (
    <footer style={{ padding: "60px 20px 80px", maxWidth: 1280, margin: "0 auto" }} data-testid="footer">
      <div style={{ borderTop: "1px solid var(--line-strong)", paddingTop: 32, display: "grid", gap: 18 }}>
        <div className="font-display" style={{ fontSize: "clamp(56px, 16vw, 160px)", fontStyle: "italic", lineHeight: 0.9, letterSpacing: "-0.04em" }}>
          Чолак · V
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20, alignItems: "flex-end" }}>
          <div>
            <div className="year-mark">{t.footer.tagline}</div>
            <div className="year-mark" style={{ marginTop: 6 }}>{t.footer.copy}</div>
          </div>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="year-mark" style={{ textDecoration: "none", color: "var(--ink)", borderBottom: "1px solid var(--ink)", paddingBottom: 2 }} data-testid="back-top">
            ↑ {t.footer.back}
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ============== App ============== */
export default function App() {
  const [lang, setLang] = useState("uk");
  const t = translations[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div id="top">
      <div className="grain" />
      <Cursor />
      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <Marquee items={t.marquee} />
      <Stats t={t} />
      <About t={t} />
      <Services t={t} />
      <Process t={t} />
      <Cases t={t} />
      <Testimonials t={t} />
      <Faq t={t} />
      <Cta t={t} />
      <Footer t={t} />
    </div>
  );
}
