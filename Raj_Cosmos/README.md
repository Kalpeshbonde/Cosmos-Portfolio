import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = ["About", "Ventures", "Skills", "Contact"];

const EXPERIENCES = [
  { company: "ENI6MA", role: "Advisor", period: "Aug 2024 – Present", location: "San Francisco Bay Area", tag: "Advisory" },
  { company: "Stealth Startup", role: "Founder & CEO", period: "Jul 2023 – Present", location: "San Francisco Bay Area", tag: "Current" },
  { company: "Oceanofnft (Time Machine)", role: "Founder & CEO", period: "May 2022 – Jul 2023", location: "Global", desc: "Web3 & NFTs — building at the frontier of digital ownership", tag: "Web3" },
  { company: "Richkidsdubai.com", role: "Co-Founder", period: "Jul 2019 – May 2022", location: "Dubai, UAE", desc: "Social Media Marketing Agency — acquired by a UK agency", tag: "Acquired" },
  { company: "Lastmoon Inc.", role: "Co-Founder", period: "May 2019 – Apr 2022", location: "Remote", desc: "P2P learning technology — Top 100 Notable Startups", tag: "Top 100" },
  { company: "Bookscrush.com", role: "Co-Founder & CEO", period: "Dec 2019 – Aug 2021", location: "India", desc: "Curated book recommendations from influential minds", tag: "Media" },
  { company: "MURGAJI", role: "Co-Founder & COO", period: "Dec 2018 – May 2019", location: "India", desc: "First e-learning startup — pivoted to Lastmoon Inc.", tag: "EdTech" },
];

const SKILLS = [
  "Startup Leadership", "Business Research", "Web3 & NFT", "Strategic Planning",
  "Product Development", "Team Building", "AI & Technology", "Social Media Marketing",
  "Community Building", "Business Development", "E-Learning Platforms", "Start-up Ventures",
];

const TAG_COLORS = {
  "Current": "#3b82f6",
  "Advisory": "#8b5cf6",
  "Acquired": "#10b981",
  "Web3": "#a855f7",
  "Top 100": "#f59e0b",
  "Media": "#ec4899",
  "EdTech": "#06b6d4",
};

// Cosmic particle system with Z-depth
function CosmicCanvas() {
  const canvasRef = useRef(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create 3D particle field
    const particles = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000,
      baseZ: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 2 + 0.5,
    }));

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(p => {
        // Scroll effect: move particles toward viewer
        const scrollFactor = scrollY.current * 0.3;
        p.z = p.baseZ - scrollFactor;

        // Wrap around
        if (p.z < 1) p.z = 1000;
        if (p.z > 1000) p.z = 1;

        // Drift
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // 3D projection
        const scale = 1000 / (1000 + p.z);
        const x2d = (p.x - canvas.width / 2) * scale + canvas.width / 2;
        const y2d = (p.y - canvas.height / 2) * scale + canvas.height / 2;
        const size = p.size * scale;
        const alpha = 1 - p.z / 1000;

        // Draw star
        ctx.beginPath();
        ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${alpha * 0.8})`;
        ctx.fill();

        // Glow
        if (size > 1) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, size * 3, 0, Math.PI * 2);
          const grad = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size * 3);
          grad.addColorStop(0, `rgba(150,200,255,${alpha * 0.3})`);
          grad.addColorStop(1, "rgba(150,200,255,0)");
          ctx.fillStyle = grad;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(40px)",
      transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

function GlowButton({ children, onClick, primary = false, href }) {
  const style = {
    padding: "16px 36px",
    borderRadius: 100,
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    border: "none",
    transition: "all 0.3s",
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    position: "relative",
    overflow: "hidden",
    ...(primary ? {
      background: "linear-gradient(135deg, #3b82f6, #2563eb)",
      color: "#fff",
      boxShadow: "0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(59,130,246,0.2)",
    } : {
      background: "rgba(255,255,255,0.05)",
      color: "#e2e8f0",
      border: "1px solid rgba(255,255,255,0.2)",
      backdropFilter: "blur(10px)",
    }),
  };

  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} style={style}
      onMouseEnter={e => {
        if (primary) {
          e.currentTarget.style.boxShadow = "0 0 60px rgba(59,130,246,0.6), 0 0 120px rgba(59,130,246,0.3)";
          e.currentTarget.style.transform = "scale(1.05)";
        } else {
          e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)";
          e.currentTarget.style.background = "rgba(59,130,246,0.1)";
        }
      }}
      onMouseLeave={e => {
        if (primary) {
          e.currentTarget.style.boxShadow = "0 0 40px rgba(59,130,246,0.4), 0 0 80px rgba(59,130,246,0.2)";
          e.currentTarget.style.transform = "scale(1)";
        } else {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
        }
      }}>
      {children}
    </Tag>
  );
}

function VentureCard({ exp, index }) {
  const [ref, vis] = useInView();
  const col = TAG_COLORS[exp.tag] || "#3b82f6";

  return (
    <div ref={ref} style={{
      background: "rgba(15,23,42,0.4)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 24,
      padding: "32px",
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : "translateY(40px)",
      transition: `opacity 0.7s ease ${index * 100}ms, transform 0.7s ease ${index * 100}ms, border-color 0.3s, box-shadow 0.3s`,
      cursor: "default",
      position: "relative",
      overflow: "hidden",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(59,130,246,0.2)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        e.currentTarget.style.boxShadow = "none";
      }}>
      {/* Cosmic glow overlay */}
      <div style={{
        position: "absolute",
        top: -100,
        right: -100,
        width: 200,
        height: 200,
        background: `radial-gradient(circle, ${col}20, transparent)`,
        pointerEvents: "none",
      }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap", position: "relative", zIndex: 1 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "4px 12px",
              borderRadius: 100,
              background: `${col}20`,
              color: col,
              border: `1px solid ${col}40`,
              textTransform: "uppercase",
            }}>
              {exp.tag}
            </span>
          </div>
          <h3 style={{ fontSize: 24, fontWeight: 700, color: "#f1f5f9", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
            {exp.company}
          </h3>
          <p style={{ fontSize: 16, color: "#60a5fa", margin: "0 0 10px", fontWeight: 500 }}>{exp.role}</p>
          {exp.desc && <p style={{ fontSize: 14, color: "#94a3b8", lineHeight: 1.7, margin: 0 }}>{exp.desc}</p>}
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 4px", fontWeight: 500 }}>{exp.period}</p>
          <p style={{ fontSize: 12, color: "#475569", margin: 0 }}>{exp.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { 
          background: #000 !important;
          font-family: 'Inter', system-ui, sans-serif;
          overflow-x: hidden;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0e1a; }
        ::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.4); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.6); }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes beamFlow {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes rotate { to { transform: rotate(360deg); } }

        .glow-text {
          background: linear-gradient(135deg, #60a5fa, #3b82f6, #93c5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }


        /* Space background */
        .space-bg {
          position: fixed;
          inset: 0;
          background: 
            radial-gradient(ellipse at 50% 0%, #0f172a 0%, #000 60%),
            radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.03), transparent 50%),
            radial-gradient(ellipse at 70% 60%, rgba(139,92,246,0.02), transparent 50%);
          z-index: -1;
        }

        /* Nebula clouds */
        .nebula {
          position: fixed;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
          animation: float 20s ease-in-out infinite;
        }

        .nebula-1 {
          top: 10%;
          left: 20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(59,130,246,0.3), transparent);
        }

        .nebula-2 {
          top: 50%;
          right: 10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139,92,246,0.25), transparent);
          animation-delay: -7s;
        }

        .nebula-3 {
          bottom: 10%;
          left: 30%;
          width: 700px;
          height: 700px;
          background: radial-gradient(circle, rgba(59,130,246,0.2), transparent);
          animation-delay: -14s;
        }

        /* Orbital rings */
        .orbit-ring {
          position: absolute;
          border: 1px solid rgba(59,130,246,0.2);
          border-radius: 50%;
          animation: rotate 30s linear infinite;
        }

        /* Grid */
        .cosmic-grid {
          position: fixed;
          inset: 0;
          background-image: 
            linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px);
          background-size: 100px 100px;
          z-index: 0;
          pointer-events: none;
          mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
        }
      `}</style>

      <div style={{ position: "relative", background: "#000", color: "#e2e8f0", minHeight: "100vh" }}>
        {/* Space background */}
        <div className="space-bg" />
        <div className="cosmic-grid" />

        {/* Nebula clouds */}
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />

        {/* Cosmic particles */}
        <CosmicCanvas />

        {/* Navbar */}
        <nav style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          backdropFilter: "blur(20px)",
          background: "rgba(0,0,0,0.5)",
          borderBottom: "1px solid rgba(59,130,246,0.1)",
        }}>
          <div style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 32px",
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "radial-gradient(circle, #60a5fa, #3b82f6)",
                boxShadow: "0 0 20px rgba(59,130,246,0.8)",
              }} />
              <span className="glow-text">RAJ COSMOS</span>
            </div>

            <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
              {NAV_ITEMS.map(item => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#94a3b8",
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    letterSpacing: "0.02em",
                    transition: "color 0.3s",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={e => e.target.style.color = "#60a5fa"}
                  onMouseLeave={e => e.target.style.color = "#94a3b8"}
                >
                  {item}
                </button>
              ))}
              <GlowButton primary href="mailto:raj@rajcosmos.com">Hire Me</GlowButton>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="about" style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          paddingTop: 80,
          zIndex: 2,
        }}>
          <div style={{ maxWidth: 1400, margin: "0", padding: "0 32px", width: "100%", textAlign: "left" }}>
            {/* Orbital rings around name */}
            <div style={{ position: "relative", display: "inline-block", marginBottom: 40 }}>
              <div className="orbit-ring" style={{ width: 500, height: 500, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
              <div className="orbit-ring" style={{ width: 600, height: 600, top: "50%", left: "50%", transform: "translate(-50%, -50%)", animationDuration: "40s", animationDirection: "reverse" }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 20px",
                  borderRadius: 100,
                  background: "rgba(59,130,246,0.1)",
                  border: "1px solid rgba(59,130,246,0.3)",
                  backdropFilter: "blur(10px)",
                  marginBottom: 24,
                  animation: "float 3s ease-in-out infinite",
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#60a5fa",
                    boxShadow: "0 0 20px rgba(96,165,250,0.8)",
                    animation: "pulse 2s ease-in-out infinite",
                  }} />
                  <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", color: "#60a5fa", textTransform: "uppercase" }}>
                    Serial Founder · SF Bay Area
                  </span>
                </div>

                <h1 style={{
                  fontSize: "clamp(60px, 12vw, 160px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  marginBottom: 32,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}>
                  <span style={{ display: "block", color: "#f1f5f9" }}>RAJ</span>
                  <span className="glow-text" style={{ display: "block" }}>COSMOS</span>
                </h1>

                <p style={{
                  fontSize: "clamp(18px, 2.5vw, 28px)",
                  color: "#94a3b8",
                  lineHeight: 1.6,
                  maxWidth: 800,
                  margin: "0 auto 48px",
                  fontWeight: 300,
                }}>
                  Building startups where{" "}
                  <span style={{ color: "#f1f5f9", fontWeight: 600 }}>technology</span>,{" "}
                  <span style={{ color: "#f1f5f9", fontWeight: 600 }}>community</span>, and{" "}
                  <span style={{ color: "#f1f5f9", fontWeight: 600 }}>culture</span>{" "}
                  converge across Web3, EdTech, and AI
                </p>

                <div style={{ display: "flex", gap: 20, justifyContent: "flex-start", flexWrap: "wrap" }}>
                  <GlowButton primary onClick={() => scrollTo("ventures")}>
                    View Ventures
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </GlowButton>
                  <GlowButton onClick={() => scrollTo("contact")}>Let's Talk</GlowButton>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{
              display: "flex",
              gap: 60,
              justifyContent: "flex-start",
              flexWrap: "wrap",
              marginTop: 80,
              paddingTop: 60,
              borderTop: "1px solid rgba(59,130,246,0.2)",
            }}>
              {[
                ["7+", "Startups Founded"],
                ["3", "Exits & Pivots"],
                ["Top 100", "Notable Startup"],
                ["2", "Harvard Certifications"]
              ].map(([num, label]) => (
                <div key={label} style={{ textAlign: "left", minWidth: 180 }}>
                  <div style={{
                    fontSize: "clamp(36px, 4vw, 56px)",
                    fontWeight: 900,
                    background: "linear-gradient(135deg, #60a5fa, #3b82f6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    marginBottom: 8,
                  }}>
                    {num}
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: "absolute",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            animation: "float 2s ease-in-out infinite",
          }}>
            <span style={{
              fontSize: 11,
              color: "#475569",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}>
              Scroll
            </span>
            <div style={{
              width: 2,
              height: 60,
              background: "linear-gradient(to bottom, rgba(59,130,246,0.6), transparent)",
            }} />
          </div>
        </section>

        {/* Ventures */}
        <section id="ventures" style={{
          padding: "160px 32px",
          position: "relative",
          zIndex: 2,
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ marginBottom: 80 }}>
                <span style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#60a5fa",
                  marginBottom: 16,
                  display: "block",
                }}>
                  Portfolio
                </span>
                <h2 style={{
                  fontSize: "clamp(48px, 8vw, 96px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "#f1f5f9",
                }}>
                  Ventures &<br />
                  <span className="glow-text">Exits</span>
                </h2>
                <p style={{
                  fontSize: 16,
                  color: "#64748b",
                  marginTop: 24,
                  maxWidth: 600,
                  lineHeight: 1.7,
                }}>
                  7 startups across 4 continents building the infrastructure of tomorrow
                </p>
              </div>
            </FadeIn>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {EXPERIENCES.map((exp, i) => (
                <VentureCard key={i} exp={exp} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" style={{
          padding: "160px 32px",
          position: "relative",
          zIndex: 2,
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ marginBottom: 80 }}>
                <span style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#60a5fa",
                  marginBottom: 16,
                  display: "block",
                }}>
                  Superpowers
                </span>
                <h2 style={{
                  fontSize: "clamp(48px, 8vw, 96px)",
                  fontWeight: 900,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "#f1f5f9",
                }}>
                  Skills &<br />
                  <span className="glow-text">Expertise</span>
                </h2>
              </div>
            </FadeIn>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 16,
            }}>
              {SKILLS.map((skill, i) => (
                <FadeIn key={skill} delay={i * 50}>
                  <div style={{
                    padding: "24px",
                    background: "rgba(15,23,42,0.4)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    borderRadius: 16,
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#94a3b8",
                    transition: "all 0.3s",
                    cursor: "default",
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)";
                      e.currentTarget.style.color = "#60a5fa";
                      e.currentTarget.style.background = "rgba(59,130,246,0.1)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)";
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.background = "rgba(15,23,42,0.4)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}>
                    {skill}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section style={{
          padding: "120px 32px",
          position: "relative",
          zIndex: 2,
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <FadeIn>
              <div style={{ marginBottom: 60 }}>
                <span style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#60a5fa",
                  marginBottom: 16,
                  display: "block",
                }}>
                  Academic Foundation
                </span>
                <h2 style={{
                  fontSize: "clamp(40px, 6vw, 72px)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  color: "#f1f5f9",
                }}>
                  Education
                </h2>
              </div>
            </FadeIn>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              {[
                { school: "Harvard University", degree: "Artificial Intelligence", year: "2024", icon: "🎓" },
                { school: "MATS University, Raipur", degree: "BCA — Computer Science", year: "2018", icon: "💻" }
              ].map((edu, i) => (
                <FadeIn key={i} delay={i * 100}>
                  <div style={{
                    padding: "40px",
                    background: "rgba(15,23,42,0.4)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    borderRadius: 24,
                    display: "flex",
                    gap: 24,
                    alignItems: "flex-start",
                    transition: "all 0.3s",
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)";
                      e.currentTarget.style.transform = "translateY(-4px)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "rgba(59,130,246,0.2)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}>
                    <div style={{ fontSize: 48 }}>{edu.icon}</div>
                    <div>
                      <h3 style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9", marginBottom: 6 }}>
                        {edu.school}
                      </h3>
                      <p style={{ fontSize: 16, color: "#60a5fa", fontWeight: 500, marginBottom: 6 }}>
                        {edu.degree}
                      </p>
                      <p style={{ fontSize: 14, color: "#64748b" }}>{edu.year}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" style={{
          padding: "200px 32px",
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <FadeIn>
              <span style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#60a5fa",
                marginBottom: 24,
                display: "block",
              }}>
                Open to Collaborate
              </span>

              <h2 style={{
                fontSize: "clamp(56px, 10vw, 120px)",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: "#f1f5f9",
                marginBottom: 32,
              }}>
                Let's Build<br />
                <span className="glow-text">Something Big</span>
              </h2>

              <p style={{
                fontSize: 20,
                color: "#94a3b8",
                lineHeight: 1.7,
                maxWidth: 600,
                margin: "0 auto 56px",
              }}>
                Always open to visionary founders, investors, and builders who want to shape the future
              </p>

              <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
                <GlowButton primary href="mailto:raj@rajcosmos.com">
                  raj@rajcosmos.com
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </GlowButton>
                <GlowButton href="https://www.linkedin.com/in/rajcosmos-683874176" target="_blank">
                  LinkedIn Profile
                </GlowButton>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid rgba(59,130,246,0.2)",
          padding: "40px 32px",
          position: "relative",
          zIndex: 2,
        }}>
          <div style={{
            maxWidth: 1400,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            color: "#475569",
            fontSize: 14,
          }}>
            <span style={{ fontWeight: 700 }}>
              <span className="glow-text">RAJ COSMOS</span>
            </span>
            <span>© 2025 · Entrepreneur in Every Universe</span>
            <span>San Francisco Bay Area</span>
          </div>
        </footer>
      </div>
    </>
  );
}