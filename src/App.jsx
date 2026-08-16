import { useState, useEffect, useRef } from "react";

const SERVICIOS = [
  { icon: "🌸", nombre: "Extensiones clásicas", desc: "Una extensión por pestaña natural. Efecto rímel, más o menos intenso según largo y cantidad. Duración: 3–4 semanas.", precio: "$28.000" },
  { icon: "💖", nombre: "Extensiones híbridas", desc: "Técnica clásica + abanicos de volumen. Más densidad que las clásicas, más sutil que volumen completo. Duración: 3–4 semanas.", precio: "$32.000" },
  { icon: "✨", nombre: "Mega Volumen", desc: "Abanico artesanal de 5–7 extensiones por pestaña natural. Efecto más dramático y definido. Duración: 3–4 semanas.", precio: "$35.000" },
  { icon: "🦋", nombre: "Lifting de pestañas", desc: "Look natural con arqueo desde la raíz. Incluye botox y keratina para nutrir y fortalecer tus pestañas.", precio: "$25.000" },
  { icon: "🌹", nombre: "Laminado de cejas", desc: "Alisado y fijación del vello para lograr cejas más ordenadas, definidas y con efecto de mayor volumen.", precio: "$20.000" },
  { icon: "🌺", nombre: "Diseño y perfilado de cejas", desc: "Diseño personalizado según la forma de tu rostro y tus cejas, seguido del perfilado para definir y armonizar su forma.", precio: "$15.000" },
  { icon: "🌷", nombre: "Perfilado de cejas", desc: "Eliminación del excedente de vello alrededor de la ceja, respetando su diseño y forma actual.", precio: "$10.000" },
  { icon: "💗", nombre: "Remoción de extensiones", desc: "Retiro con gel removedor de extensiones colocadas por mí.", precio: "$4.000" },
  { icon: "🎀", nombre: "Remoción de otro estudio", desc: "Retiro con gel removedor de extensiones colocadas por una colega.", precio: "$15.000" },
];

const PRECIOS = [
  { nombre: "Extensiones clásicas", precio: "$28.000" },
  { nombre: "Extensiones híbridas", precio: "$32.000" },
  { nombre: "Mega Volumen", precio: "$35.000" },
  { nombre: "Lifting de pestañas", precio: "$25.000" },
  { nombre: "Perfilado de cejas", precio: "$10.000" },
  { nombre: "Diseño + perfilado de cejas", precio: "$15.000" },
  { nombre: "Laminado de cejas", precio: "$20.000" },
  { nombre: "Laminado + perfilado de cejas", precio: "$32.000" },
  { nombre: "Remoción de extensiones", precio: "$4.000" },
  { nombre: "Remoción de extensiones de otro estudio", precio: "$8.000" },
];

const CUIDADOS = [
  "Lavalas diariamente con agua fría",
  "No mojar las primeras 24 horas",
  "Peinadas diariamente con el cepillito",
  "Evitar productos oleosos cerca del ojo",
  "Nada de agua caliente ni vapor directo",
  "No uses máscara de pestañas",
  "Intentá no dormir boca abajo",
  "¡Y sobre todo, no las arranques!",
];

const FAQS = [
  { q: "¿Cómo reservo un turno?", a: "Mandame un mensaje directo por Instagram a @extensionesmia y coordinamos el día y horario. Una vez confirmado, se requiere una seña de $10.000 que se descuenta del total." },
  { q: "¿Qué pasa si cancelo?", a: "Si cancelás con más de 24 hs de anticipación, la seña se puede reutilizar para otro turno. Con menos de 24 hs, la seña no es reembolsable." },
  { q: "¿Cuánto tiempo dura el turno?", a: "La duración depende del servicio. El lifting y las extensiones más naturales duran aproximadamente 1 hora y media, mientras que los sets con mayor volumen pueden llevar hasta 2 horas. El perfilado de cejas demora alrededor de 30 minutos, el laminado 40 minutos y el laminado con perfilado aproximadamente 1 hora y 20 minutos. Los tiempos son aproximados y pueden variar ligeramente en cada turno." },
  { q: "¿Tolerancia de espera?", a: "La tolerancia de espera es de 10 minutos. Si llegás más tarde, el turno se considera cancelado." },
  { q: "¿Dónde están ubicadas?", a: "El estudio está en Calle 14 n°169, La Plata. Se atiende con turno previo únicamente." },
];

const STRIP_ITEMS = ["Extensiones clásicas", "✦", "Mega Volumen", "✦", "Lifting de pestañas", "✦", "Laminado de cejas", "✦", "Perfilado de cejas", "✦", "Extensiones híbridas", "✦"];
const IG = "https://www.instagram.com/extensionesmia";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.unobserve(el); }
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, style }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(28px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
      ...style
    }}>
      {children}
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={s.faqItem}>
      <button onClick={() => setOpen(!open)} style={s.faqSummary}>
        <span>{q}</span>
        <span style={{ fontSize: 22, fontWeight: 300, color: "var(--pink-dark)", transition: "transform .2s", display: "inline-block", transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      {open && <p style={s.faqBody}>{a}</p>}
    </div>
  );
}

export default function App() {
  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .strip-inner { animation: marquee 22s linear infinite; }
        .service-card { transition: box-shadow .25s, transform .2s; }
        .service-card:hover { box-shadow: 0 20px 55px rgba(0,0,0,0.09); transform: translateY(-3px); }
        .btn-primary:hover  { background: #333 !important; transform: translateY(-1px); }
        .btn-outline:hover  { background: var(--charcoal) !important; color: #fff !important; }
        .btn-pink:hover     { background: var(--pink-dark) !important; color: #fff !important; transform: translateY(-1px); }
        .nav-cta:hover      { background: var(--pink-dark) !important; color: #fff !important; }
        .footer-link:hover  { color: var(--pink) !important; }
        @media (max-width: 900px) {
          .nav-links   { display: none !important; }
          .hero        { grid-template-columns: 1fr !important; min-height: auto !important; }
          .hero-right  { height: 50vw; min-height: 260px; }
          .hero-left   { padding: 60px 28px 40px !important; }
          .services-grid   { grid-template-columns: 1fr !important; }
          .prices-layout   { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cuidados-grid   { grid-template-columns: 1fr 1fr !important; }
          .faq-layout      { grid-template-columns: 1fr !important; gap: 40px !important; }
          .sobremi-grid    { grid-template-columns: 1fr !important; }
          .sobremi-img-col { min-height: 200px !important; font-size: 40px !important; }
          .sobremi-text    { padding: 50px 28px !important; }
          .footer-inner    { flex-direction: column !important; text-align: center !important; padding: 40px 28px !important; }
          section          { padding: 70px 28px !important; }
        }
        @media (max-width: 560px) {
          .cuidados-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={s.nav}>
        <a href="#" style={s.navLogo}>Extensiones Mia</a>
        <div className="nav-links" style={s.navLinks}>
          <a href="#servicios" style={s.navLink}>Servicios</a>
          <a href="#precios"   style={s.navLink}>Precios</a>
          <a href="#faq"       style={s.navLink}>FAQ</a>
          <a href="#sobremi"   style={s.navLink}>Sobre mí</a>
          <a href={IG} target="_blank" rel="noopener" className="nav-cta" style={s.navCta}>Reservar turno</a>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero" style={s.hero}>
        <Reveal style={s.heroLeft}>
          <p style={s.heroTag}>La Plata · Desde hace 9 años</p>
          <h1 style={s.heroTitle}>
            Pestañas &amp;<br />
            Cejas <em style={{ fontStyle: "italic", color: "var(--pink-dark)" }}>perfectas</em>
          </h1>
          <p style={s.heroSub}>
            Extensiones profesionales, lifting y diseño de cejas personalizados para cada mirada. Resultados prolijos, duraderos y saludables.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href={IG} target="_blank" rel="noopener" className="btn-primary" style={s.btnPrimary}>Reservar por Instagram</a>
            <a href="#servicios" className="btn-outline" style={s.btnOutline}>Ver servicios</a>
          </div>
        </Reveal>
        <div className="hero-right" style={s.heroRight}>
          <img src="/ejemplo.jpg" alt="Extensiones de pestañas" style={s.heroImg}
            onError={e => { e.target.style.display = "none"; }} />
        </div>
      </div>

      {/* STRIP */}
      <div style={s.strip}>
        <div className="strip-inner" style={s.stripInner}>
          {[...STRIP_ITEMS, ...STRIP_ITEMS].map((item, i) => (
            <span key={i} style={s.stripSpan}>{item}</span>
          ))}
        </div>
      </div>

      {/* SERVICIOS */}
      <section id="servicios" style={{ ...s.section, background: "var(--white)" }}>
        <Reveal>
          <p style={s.sectionLabel}>Lo que ofrezco</p>
          <h2 style={s.sectionTitle}>Servicios <em style={{ fontStyle: "italic", color: "var(--pink-dark)" }}>disponibles</em></h2>
        </Reveal>
        <div className="services-grid" style={s.servicesGrid}>
          {SERVICIOS.map((srv, i) => (
            <Reveal key={i}>
              <div className="service-card" style={s.serviceCard}>
                <div style={s.serviceIcon}>{srv.icon}</div>
                <div style={s.serviceName}>{srv.nombre}</div>
                <p style={s.serviceDesc}>{srv.desc}</p>
                <span style={s.servicePrice}>{srv.precio}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" style={{ ...s.section, background: "var(--cream)" }}>
        <Reveal>
          <h2 style={s.sectionTitle}>Precios</h2>
        </Reveal>
        <div className="prices-layout" style={s.pricesLayout}>
          <Reveal>
            <ul style={{ listStyle: "none" }}>
              {PRECIOS.map((p, i) => (
                <li key={i} style={s.priceItem}>
                  <span style={s.priceName}>{p.nombre}</span>
                  <span style={s.priceDots} />
                  <span style={s.priceVal}>{p.precio}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <div style={s.pricesNote}>
              <h3 style={s.pricesNoteTitle}>¿Cómo reservar?</h3>
              <p style={s.pricesNoteP}>Los turnos se coordinan por mensaje directo en Instagram. Escribime para consultar disponibilidad y acordar día y horario.</p>
              <p style={s.pricesNoteP}>Los días de atención son de martes a viernes de 10:00 a 17:00 y sábados de 12:00 a 16:00.</p>
              <p style={s.pricesNoteP}>Cancelaciones con menos de 24 hs de anticipación pierden la seña. Tolerancia de espera: 10 minutos.</p>
              <a href={IG} target="_blank" rel="noopener" className="btn-primary" style={s.btnPrimary}>Escribime en Instagram →</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TURNOS BANNER */}
      <section id="turnos" style={s.turnosBanner}>
        <Reveal><p style={{ ...s.sectionLabel, color: "var(--pink)" }}>Turnos por Instagram</p></Reveal>
        <Reveal><h2 style={{ ...s.sectionTitle, color: "#fff" }}>Reservá tu <em style={{ fontStyle: "italic", color: "var(--pink)" }}>turno</em></h2></Reveal>
        <Reveal><p style={s.turnosBannerP}>Mandame un mensaje directo en Instagram para consultar disponibilidad y acordar el día y horario que mejor te quede.</p></Reveal>
        <Reveal>
          <a href={IG} target="_blank" rel="noopener" className="btn-pink" style={s.btnPink}>Escribime en Instagram →</a>
        </Reveal>
        <Reveal>
          <div style={s.turnosInfo}>
            {[["9", "Años de experiencia"], ["24h", "Cancelación gratuita"], ["10'", "Tolerancia de espera"]].map(([num, label]) => (
              <div key={label} style={{ textAlign: "center" }}>
                <div style={s.turnoNum}>{num}</div>
                <div style={s.turnoLabel}>{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CUIDADOS */}
      <section id="cuidados" style={{ ...s.section, background: "var(--white)" }}>
        <Reveal>
          <p style={s.sectionLabel}>Post-tratamiento</p>
          <h2 style={s.sectionTitle}>Cómo <em style={{ fontStyle: "italic", color: "var(--pink-dark)" }}>cuidarlas</em></h2>
        </Reveal>
        <div className="cuidados-grid" style={s.cuidadosGrid}>
          {CUIDADOS.map((c, i) => (
            <Reveal key={i}>
              <div style={s.cuidadoItem}>
                <div style={s.cuidadoNum}>{String(i + 1).padStart(2, "0")}</div>
                {c}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ ...s.section, background: "var(--cream)" }}>
        <Reveal>
          <p style={s.sectionLabel}>Dudas frecuentes</p>
          <h2 style={s.sectionTitle}>Preguntas <em style={{ fontStyle: "italic", color: "var(--pink-dark)" }}>frecuentes</em></h2>
        </Reveal>
        <div className="faq-layout" style={s.faqLayout}>
          <Reveal>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 300, lineHeight: 1.5, color: "var(--muted)" }}>
              ¿Tenés alguna<br />pregunta antes<br />de reservar?<br /><br />
              <a href={IG} target="_blank" rel="noopener" style={{ fontSize: 14, fontFamily: "'Jost', sans-serif", color: "var(--pink-dark)", textDecoration: "none" }}>
                Escribime en Instagram →
              </a>
            </div>
          </Reveal>
          <Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SOBRE MI */}
      <section id="sobremi" className="sobremi-grid" style={s.sobremiGrid}>
        <div className="sobremi-img-col" style={s.sobremiImgCol}>Extensiones Mia</div>
        <div className="sobremi-text" style={s.sobremiText}>
          <h2 style={s.sectionTitle}>Sobre <em style={{ fontStyle: "italic", color: "var(--pink-dark)" }}>mí</em></h2>
          <blockquote style={s.blockquote}>
            "Que salgas con pestañas hermosas y una experiencia cómoda desde el primer momento."
          </blockquote>
          <p style={s.sobremiP}>
            Hace 9 años que me dedico a realizar extensiones de pestañas con el fin de lograr resultados prolijos, personalizados y duraderos, respetando siempre la salud de las pestañas naturales.
          </p>
          <p style={{ ...s.sobremiP, marginTop: 14 }}>
            Me encanta trabajar escuchando lo que cada clienta busca y adaptando el diseño a su mirada y estilo.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner" style={s.footerInner}>
          <a href="#" style={s.footerLogo}>Extensiones Mia</a>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
            {[["#servicios", "Servicios"], ["#precios", "Precios"], [IG, "Instagram"], [IG, "Reservar"]].map(([href, label]) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener" : undefined}
                className="footer-link" style={s.footerLink}>{label}</a>
            ))}
          </div>
          <p style={s.footerCopy}>Calle 14 n°169, La Plata · @extensionesmia · 2026</p>
        </div>
      </footer>
    </>
  );
}

const s = {
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 48px", background: "rgba(249,245,240,0.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid var(--line)" },
  navLogo: { fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, letterSpacing: "0.06em", color: "var(--charcoal)", textDecoration: "none" },
  navLinks: { display: "flex", gap: 32, alignItems: "center" },
  navLink: { fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none" },
  navCta: { background: "var(--pink)", color: "var(--charcoal)", padding: "9px 20px", borderRadius: 999, fontWeight: 500, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" },

  hero: { minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: 80 },
  heroLeft: { display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 56px 80px 72px" },
  heroTag: { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--pink-dark)", marginBottom: 24 },
  heroTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 7vw, 90px)", fontWeight: 300, lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: 28 },
  heroSub: { fontSize: 14, color: "var(--muted)", lineHeight: 1.8, maxWidth: 340, marginBottom: 44 },
  heroRight: { position: "relative", overflow: "hidden", background: "linear-gradient(135deg, var(--pink-light) 0%, var(--pink) 60%, var(--pink-dark) 100%)" },
  heroImg: { width: "100%", height: "100%", objectFit: "cover", display: "block" },

  btnPrimary: { display: "inline-block", background: "var(--charcoal)", color: "#fff", textDecoration: "none", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", padding: "16px 36px", borderRadius: 999 },
  btnOutline: { display: "inline-block", border: "1px solid var(--charcoal)", color: "var(--charcoal)", textDecoration: "none", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", padding: "15px 36px", borderRadius: 999 },
  btnPink: { display: "inline-block", background: "var(--pink)", color: "var(--charcoal)", textDecoration: "none", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500, padding: "16px 40px", borderRadius: 999 },

  strip: { background: "var(--pink)", padding: "16px 0", overflow: "hidden", whiteSpace: "nowrap" },
  stripInner: { display: "inline-flex", gap: 48 },
  stripSpan: { fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontStyle: "italic", color: "var(--charcoal)", flexShrink: 0 },

  section: { padding: "100px 72px" },
  sectionLabel: { fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--pink-dark)", marginBottom: 16 },
  sectionTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 4.5vw, 60px)", fontWeight: 300, lineHeight: 1.1, marginBottom: 20 },

  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 60 },
  serviceCard: { border: "1px solid var(--line)", borderRadius: 20, padding: "36px 28px", background: "var(--cream)" },
  serviceIcon: { fontSize: 28, marginBottom: 18 },
  serviceName: { fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, marginBottom: 10 },
  serviceDesc: { fontSize: 13.5, color: "var(--muted)", lineHeight: 1.75 },
  servicePrice: { display: "inline-block", marginTop: 20, fontSize: 13, fontWeight: 500, color: "var(--pink-dark)", border: "1px solid var(--pink)", borderRadius: 999, padding: "5px 16px" },

  pricesLayout: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start", marginTop: 60 },
  priceItem: { display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "18px 0", borderBottom: "1px solid var(--line)", gap: 20 },
  priceName: { fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 400 },
  priceDots: { flex: 1, borderBottom: "1px dotted rgba(0,0,0,0.2)", margin: "0 10px 4px" },
  priceVal: { fontSize: 14, fontWeight: 500, color: "var(--pink-dark)", whiteSpace: "nowrap" },
  pricesNote: { background: "var(--pink-light)", borderRadius: 18, padding: 32 },
  pricesNoteTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, marginBottom: 14 },
  pricesNoteP: { fontSize: 13.5, color: "var(--muted)", lineHeight: 1.8, marginBottom: 14 },

  turnosBanner: { padding: "100px 72px", background: "var(--charcoal)", color: "#fff", textAlign: "center" },
  turnosBannerP: { fontSize: 14, color: "rgba(255,255,255,0.6)", maxWidth: 480, margin: "0 auto 44px", lineHeight: 1.8 },
  turnosInfo: { display: "flex", justifyContent: "center", gap: 40, marginTop: 60, flexWrap: "wrap" },
  turnoNum: { fontFamily: "'Cormorant Garamond', serif", fontSize: 52, fontWeight: 300, color: "var(--pink)", lineHeight: 1 },
  turnoLabel: { fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginTop: 8 },

  cuidadosGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginTop: 60 },
  cuidadoItem: { background: "var(--cream)", borderRadius: 16, padding: "28px 22px", fontSize: 13.5, color: "var(--muted)", lineHeight: 1.7 },
  cuidadoNum: { fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 300, color: "var(--pink-dark)", opacity: 0.4, marginBottom: 12 },

  faqLayout: { display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 80, marginTop: 60 },
  faqItem: { border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden", background: "var(--white)", marginBottom: 2 },
  faqSummary: { width: "100%", cursor: "pointer", padding: "20px 24px", fontSize: 15, fontWeight: 500, display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", textAlign: "left", fontFamily: "'Jost', sans-serif", color: "var(--charcoal)" },
  faqBody: { padding: "0 24px 20px", fontSize: 13.5, color: "var(--muted)", lineHeight: 1.8 },

  sobremiGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", padding: 0 },
  sobremiImgCol: { minHeight: 500, background: "linear-gradient(135deg, var(--pink) 0%, var(--pink-dark) 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond', serif", fontSize: 80, fontStyle: "italic", color: "rgba(255,255,255,0.4)" },
  sobremiText: { padding: "80px 64px", display: "flex", flexDirection: "column", justifyContent: "center", background: "var(--pink-light)" },
  blockquote: { fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontStyle: "italic", fontWeight: 300, color: "var(--pink-dark)", borderLeft: "2px solid var(--pink)", paddingLeft: 22, margin: "28px 0", lineHeight: 1.35 },
  sobremiP: { fontSize: 15, color: "#444", lineHeight: 1.9, marginTop: 20 },

  footerInner: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20, padding: "48px 72px", background: "var(--charcoal)" },
  footerLogo: { fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 300, color: "#fff", textDecoration: "none" },
  footerLink: { fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", textDecoration: "none" },
  footerCopy: { fontSize: 12, width: "100%", textAlign: "center", marginTop: 8, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20, color: "rgba(255,255,255,0.4)" },
};