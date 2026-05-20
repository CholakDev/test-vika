import { useEffect, useRef, useState } from "react";
import "@/App.css";
import { translations } from "@/i18n";
import axios from "axios";

const TG_URL = "https://t.me/cholak_viktoriia";
const IG_URL = "https://instagram.com/cholak_viktoriia";
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

/* ---------- Reveal on scroll ---------- */
function Reveal({ children, as = "div", className = "", delay = 0 }) {
  const ref = useRef(null);
  const Tag = as;
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let fired = false;
    const fire = () => { if (!fired) { fired = true; setTimeout(() => node.classList.add("in"), delay); } };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { fire(); io.unobserve(node); } });
    }, { threshold: 0.06, rootMargin: "0px 0px -8% 0px" });
    io.observe(node);
    const fb = setTimeout(fire, 1200 + delay);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`}>{children}</Tag>;
}

/* ---------- Counter ---------- */
function Counter({ to, decimals = 0, duration = 1600 }) {
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
            if (p < 1) requestAnimationFrame(tick); else setVal(to);
          };
          requestAnimationFrame(tick);
          io.unobserve(node);
        }
      });
    }, { threshold: 0.3 });
    io.observe(node);
    return () => io.disconnect();
  }, [to, duration]);
  const display = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("uk-UA");
  return <span ref={ref}>{display}</span>;
}

/* ============ Nav ============ */
function Nav({ lang, setLang, t }) {
  return (
    <div className="nav-bar">
      <nav className="nav" data-testid="top-nav">
        <span className="brand"><span className="dot" />Чолак · V</span>
        <a href="#problems" className="desktop-only" data-testid="nav-problems">{t.nav.problems}</a>
        <a href="#services" className="desktop-only" data-testid="nav-services">{t.nav.services}</a>
        <a href="#cases" className="desktop-only" data-testid="nav-cases">{t.nav.cases}</a>
        <a href="#about" className="desktop-only" data-testid="nav-about">{t.nav.about}</a>
        <span className="lang" data-testid="lang-switch">
          <button className={lang === "uk" ? "on" : ""} onClick={() => setLang("uk")} data-testid="lang-uk">UA</button>
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")} data-testid="lang-en">EN</button>
        </span>
        <a href="#form" className="nav-cta" data-testid="nav-cta">{t.nav.cta}</a>
      </nav>
    </div>
  );
}

/* ============ Hero ============ */
function Hero({ t }) {
  return (
    <section className="hero" data-testid="hero">
      <div className="hero-glow" />
      <div className="container">
        <Reveal>
          <div className="font-mono" style={{ fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 24 }}>
            <span style={{ color: "var(--accent)" }}>● </span>{t.hero.eyebrow}
          </div>
        </Reveal>
        <div className="hero-grid">
          <div>
            <Reveal>
              <h1 className="h-display" data-testid="hero-headline">{t.hero.h1}</h1>
            </Reveal>
            <Reveal delay={150}>
              <p className="lede" style={{ marginTop: 24 }} data-testid="hero-sub">{t.hero.sub}</p>
            </Reveal>
            <Reveal delay={250}>
              <div className="hero-cta-row">
                <a href="#form" className="btn btn-primary" data-testid="hero-cta-primary">{t.hero.ctaPrimary}<span className="arr">→</span></a>
                <a href="#cases" className="btn btn-ghost" data-testid="hero-cta-secondary">{t.hero.ctaSecondary}<span className="arr">→</span></a>
              </div>
            </Reveal>
            <Reveal delay={350}>
              <div className="hero-tags">
                <span className="tag">{t.hero.tag1}</span>
                <span className="tag">{t.hero.tag2}</span>
                <span className="tag">{t.hero.tag3}</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <div className="hero-photo-wrap" data-testid="hero-photo">
              <img src="/hero.webp" alt="Чолак Вікторія" />
              <div className="hero-mini-card">
                <span style={{ color: "var(--muted)" }}>AVG ROAS</span>
                <span className="roas">×4.2</span>
              </div>
              <div className="hero-photo-meta">
                <div>
                  <p className="hero-photo-name">{translations.uk.about.name}</p>
                  <span>{t.hero.eyebrow.split("·")[0].trim()}</span>
                </div>
                <span>KYIV / 2025</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============ Live counter ============ */
function Live({ t }) {
  return (
    <section data-testid="live">
      <div className="container">
        <Reveal>
          <div className="live-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
              <span className="live-pulse" data-testid="live-pulse"><span className="dot" />{t.live.kicker}</span>
              <span className="font-mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "var(--muted)" }}>{t.live.pulse}</span>
            </div>
            <h2 className="h-section" style={{ marginTop: 22, maxWidth: 760 }} data-testid="live-title">{t.live.title}</h2>
            <p className="lede" style={{ marginTop: 14 }}>{t.live.sub}</p>
            <div className="live-grid">
              {t.live.stats.map((s, i) => (
                <div key={i} className="live-stat" data-testid={`live-stat-${i}`}>
                  <div className={`live-num ${i === 0 ? "up" : ""}`}>
                    <Counter to={s.n} decimals={s.decimals || 0} />
                  </div>
                  <div className="live-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ Problems ============ */
function Problems({ t }) {
  const icons = ["✕", "⏱", "?", "↓"];
  return (
    <section id="problems" data-testid="problems">
      <div className="container">
        <Reveal><div className="kicker">{t.problems.kicker}</div></Reveal>
        <Reveal delay={80}><h2 className="h-section" style={{ maxWidth: 800 }} data-testid="problems-title">{t.problems.title}</h2></Reveal>
        <div style={{ marginTop: 40 }} className="problems">
          {t.problems.items.map((p, i) => (
            <Reveal key={i} delay={100 + i * 80}>
              <div className="problem" data-testid={`problem-${i}`}>
                <div className="ico">{icons[i]}</div>
                <h3 className="problem-title">{p.t}</h3>
                <p className="problem-desc">{p.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Services ============ */
function Services({ t }) {
  return (
    <section id="services" data-testid="services">
      <div className="container">
        <Reveal><div className="kicker">{t.services.kicker}</div></Reveal>
        <Reveal delay={80}><h2 className="h-section" data-testid="services-title">{t.services.title}</h2></Reveal>
        <div style={{ marginTop: 40 }} className="services">
          {t.services.items.map((s, i) => (
            <Reveal key={i} delay={100 + i * 80}>
              <div className="svc-card" data-testid={`svc-${i}`}>
                <span className="svc-tag">{s.tag}</span>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-text">{s.text}</p>
                <div className="svc-foot"><span>TIMELINE</span><span>{s.time}</span></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ ROI Calculator ============ */
function Roi({ t }) {
  const [budget, setBudget] = useState(50000);
  const [cpl, setCpl] = useState(220);
  const [conv, setConv] = useState(15);
  const [check, setCheck] = useState(2500);

  const fmt = (n) => Math.round(n).toLocaleString("uk-UA");
  const nowLeads = budget / Math.max(cpl, 1);
  const nowSales = nowLeads * (conv / 100);
  const nowRev = nowSales * check;
  const nowRoas = nowRev / Math.max(budget, 1);

  // With me: -38% CPL, +20% conversion uplift
  const newCpl = cpl * 0.62;
  const newConv = Math.min(conv * 1.2, 100);
  const newLeads = budget / Math.max(newCpl, 1);
  const newSales = newLeads * (newConv / 100);
  const newRev = newSales * check;
  const newRoas = newRev / Math.max(budget, 1);
  const diff = Math.max(0, newRev - nowRev);

  return (
    <section data-testid="roi">
      <div className="container">
        <Reveal><div className="kicker">{t.roi.kicker}</div></Reveal>
        <Reveal delay={80}><h2 className="h-section" style={{ maxWidth: 880 }} data-testid="roi-title">{t.roi.title}</h2></Reveal>
        <Reveal delay={150}><p className="lede" style={{ marginTop: 14 }}>{t.roi.sub}</p></Reveal>

        <Reveal delay={200}>
          <div className="roi-card" style={{ marginTop: 32 }}>
            <div className="roi-grid">
              <div>
                <div className="roi-input">
                  <label>{t.roi.budget}</label>
                  <input data-testid="roi-budget" type="number" value={budget} onChange={(e) => setBudget(+e.target.value || 0)} />
                </div>
                <div className="roi-input">
                  <label>{t.roi.cpl}</label>
                  <input data-testid="roi-cpl" type="number" value={cpl} onChange={(e) => setCpl(+e.target.value || 0)} />
                </div>
                <div className="roi-input">
                  <label>{t.roi.conv}</label>
                  <input data-testid="roi-conv" type="number" value={conv} onChange={(e) => setConv(+e.target.value || 0)} />
                </div>
                <div className="roi-input">
                  <label>{t.roi.check}</label>
                  <input data-testid="roi-check" type="number" value={check} onChange={(e) => setCheck(+e.target.value || 0)} />
                </div>
              </div>

              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="roi-result">
                    <div className="roi-result-title">{t.roi.now}</div>
                    <div style={{ marginTop: 10 }}>
                      <div className="roi-row"><span>{t.roi.leadsLabel}</span><span className="v">{fmt(nowLeads)}</span></div>
                      <div className="roi-row"><span>{t.roi.revLabel}</span><span className="v">{fmt(nowRev)}₴</span></div>
                      <div className="roi-row"><span>{t.roi.roasLabel}</span><span className="v">×{nowRoas.toFixed(1)}</span></div>
                    </div>
                  </div>
                  <div className="roi-result" data-testid="roi-result-with">
                    <div className="roi-result-title up">{t.roi.with}</div>
                    <div style={{ marginTop: 10 }}>
                      <div className="roi-row"><span>{t.roi.leadsLabel}</span><span className="v accent">{fmt(newLeads)}</span></div>
                      <div className="roi-row"><span>{t.roi.revLabel}</span><span className="v accent">{fmt(newRev)}₴</span></div>
                      <div className="roi-row"><span>{t.roi.roasLabel}</span><span className="v accent">×{newRoas.toFixed(1)}</span></div>
                    </div>
                  </div>
                </div>

                <div className="roi-diff" data-testid="roi-diff">
                  <div className="roi-diff-label">{t.roi.diffLabel}</div>
                  <div className="roi-diff-value">+ {fmt(diff)} ₴</div>
                </div>
                <a href="#form" className="btn btn-primary" style={{ marginTop: 18, width: "100%", justifyContent: "center" }} data-testid="roi-cta">{t.roi.cta}<span className="arr">→</span></a>
                <p style={{ marginTop: 14, fontSize: 12, color: "var(--muted)", lineHeight: 1.55 }}>{t.roi.note}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ Cases ============ */
function Cases({ t }) {
  return (
    <section id="cases" data-testid="cases">
      <div className="container">
        <Reveal><div className="kicker">{t.cases.kicker}</div></Reveal>
        <Reveal delay={80}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 20 }}>
            <h2 className="h-section" data-testid="cases-title">{t.cases.title}</h2>
            <p className="lede" style={{ maxWidth: 360 }}>{t.cases.sub}</p>
          </div>
        </Reveal>
        <div style={{ marginTop: 40 }} className="cases">
          {t.cases.items.map((c, i) => (
            <Reveal key={i} delay={100 + i * 80}>
              <div className="case" data-testid={`case-${i}`}>
                <div className="case-niche">{c.niche}</div>
                <div className="case-row">
                  <span className="case-strike">{c.before}</span>
                  <span style={{ color: "var(--muted)" }}>→</span>
                  <span className="case-after">{c.after}</span>
                </div>
                <div className="case-roas">{c.roas}</div>
                <p className="case-note">{c.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Process ============ */
function Process({ t }) {
  return (
    <section data-testid="process">
      <div className="container">
        <Reveal><div className="kicker">{t.process.kicker}</div></Reveal>
        <Reveal delay={80}><h2 className="h-section" data-testid="process-title">{t.process.title}</h2></Reveal>
        <div style={{ marginTop: 40 }} className="process">
          {t.process.steps.map((s, i) => (
            <Reveal key={i} delay={100 + i * 80}>
              <div className="step" data-testid={`step-${i}`}>
                <div className="step-n">{s.n}</div>
                <div className="step-t">{s.t}</div>
                <p className="step-d">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ About ============ */
function About({ t }) {
  return (
    <section id="about" data-testid="about">
      <div className="container">
        <Reveal><div className="kicker">{t.about.kicker}</div></Reveal>
        <div className="about-grid" style={{ marginTop: 24 }}>
          <Reveal>
            <div className="about-photo" data-testid="about-photo">
              <img src="/hero.webp" alt={t.about.name} />
            </div>
            <h3 className="about-name" data-testid="about-name">{t.about.name}</h3>
            <div className="about-role">{t.about.role}</div>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="h-section" data-testid="about-title">{t.about.title}</h2>
            <p className="lede" style={{ marginTop: 22 }}>{t.about.body}</p>
            <div className="about-stats">
              {t.about.stats.map((s, i) => (
                <div key={i} className="about-stat" data-testid={`about-stat-${i}`}>
                  <div className="about-stat-num">
                    <Counter to={s.n} decimals={s.decimals || 0} /><em>{s.suffix}</em>
                  </div>
                  <div className="about-stat-lbl">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
function Faq({ t }) {
  const [open, setOpen] = useState(-1);
  return (
    <section data-testid="faq">
      <div className="container">
        <Reveal><div className="kicker">{t.faq.kicker}</div></Reveal>
        <Reveal delay={80}><h2 className="h-section" data-testid="faq-title">{t.faq.title}</h2></Reveal>
        <div style={{ marginTop: 40 }} className="faq-list">
          {t.faq.items.map((it, i) => (
            <Reveal key={i} delay={60 * i}>
              <div className={`faq-item ${open === i ? "open" : ""}`} onClick={() => setOpen(open === i ? -1 : i)} data-testid={`faq-${i}`}>
                <div className="faq-q">
                  <span>{it.q}</span>
                  <span className="faq-toggle">+</span>
                </div>
                <div className="faq-a">{it.a}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Form ============ */
function Form({ t }) {
  const [data, setData] = useState({ name: "", contact: "", budget: t.form.budgets[1], niche: "" });
  const [status, setStatus] = useState({ state: "idle", msg: "" });
  const [busy, setBusy] = useState(false);

  // keep budget label in sync when language switches
  useEffect(() => { setData((d) => ({ ...d, budget: t.form.budgets.includes(d.budget) ? d.budget : t.form.budgets[1] })); }, [t]);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setStatus({ state: "idle", msg: "" });
    try {
      await axios.post(`${API}/leads`, data);
      setStatus({ state: "ok", msg: t.form.success });
      setData({ name: "", contact: "", budget: t.form.budgets[1], niche: "" });
    } catch (err) {
      setStatus({ state: "err", msg: t.form.error });
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="form" data-testid="form-section">
      <div className="container">
        <Reveal><div className="kicker">{t.form.kicker}</div></Reveal>
        <Reveal delay={80}><h2 className="h-section" style={{ maxWidth: 820 }} data-testid="form-title">{t.form.title}</h2></Reveal>
        <Reveal delay={150}><p className="lede" style={{ marginTop: 14 }}>{t.form.sub}</p></Reveal>

        <Reveal delay={200}>
          <form className="form-card" style={{ marginTop: 32 }} onSubmit={submit} data-testid="lead-form">
            <div className="form-grid">
              <div className="field">
                <label>{t.form.name}</label>
                <input required value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} placeholder={t.form.name} data-testid="form-name" />
              </div>
              <div className="field">
                <label>{t.form.contact}</label>
                <input required value={data.contact} onChange={(e) => setData({ ...data, contact: e.target.value })} placeholder={t.form.contactPh} data-testid="form-contact" />
              </div>
              <div className="field">
                <label>{t.form.budget}</label>
                <select value={data.budget} onChange={(e) => setData({ ...data, budget: e.target.value })} data-testid="form-budget">
                  {t.form.budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="field">
                <label>{t.form.niche}</label>
                <input required value={data.niche} onChange={(e) => setData({ ...data, niche: e.target.value })} placeholder={t.form.nichePh} data-testid="form-niche" />
              </div>
              <div className="full" style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
                <button type="submit" className="btn btn-primary" disabled={busy} data-testid="form-submit">
                  {busy ? "..." : t.form.submit}<span className="arr">→</span>
                </button>
                {status.msg && <span className={`form-msg ${status.state}`} data-testid="form-msg">{status.msg}</span>}
              </div>
              <p className="form-privacy full">{t.form.privacy}</p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ Footer ============ */
function Footer({ t }) {
  return (
    <footer className="footer" data-testid="footer">
      <div className="container">
        <div className="footer-row">
          <div>
            <div className="font-mono" style={{ fontSize: 12, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)" }}>● {t.footer.tagline}</div>
            <div className="footer-links">
              <a className="footer-link" href={TG_URL} target="_blank" rel="noopener noreferrer" data-testid="footer-tg">↗ {t.footer.tg}</a>
              <a className="footer-link" href={IG_URL} target="_blank" rel="noopener noreferrer" data-testid="footer-ig">↗ {t.footer.ig}</a>
              <a className="footer-link" href="mailto:hello@cholak.victoria" data-testid="footer-mail">↗ {t.footer.mail}</a>
            </div>
          </div>
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="font-mono" style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted-2)", borderBottom: "1px solid var(--line-2)", paddingBottom: 4 }} data-testid="back-top">↑ Back to top</a>
        </div>
      </div>
      <h2 className="footer-brand" data-testid="footer-brand">VIKTORIIA</h2>
      <div className="container">
        <div className="footer-meta">
          <span>{t.footer.copy}</span>
          <span>Made in Kyiv · 2025</span>
        </div>
      </div>
    </footer>
  );
}

/* ============ App ============ */
export default function App() {
  const [lang, setLang] = useState("uk");
  const t = translations[lang];
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return (
    <div id="top">
      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <Live t={t} />
      <Problems t={t} />
      <Services t={t} />
      <Roi t={t} />
      <Cases t={t} />
      <Process t={t} />
      <About t={t} />
      <Faq t={t} />
      <Form t={t} />
      <Footer t={t} />
    </div>
  );
}
