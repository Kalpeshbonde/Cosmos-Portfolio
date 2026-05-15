import SectionReveal from "./SectionReveal.jsx";

const socials = [
  {
    name: "Instagram",
    handle: "@rajcosmos",
    url: "https://www.instagram.com/rajcosmos",
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    handle: "raj-cosmos",
    url: "https://il.linkedin.com/in/raj-cosmos-683874176",
    icon: (
      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    handle: "@RAJCOSM0S",
    url: "https://twitter.com/RAJCOSM0S",
    icon: (
      <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <>
      <style>{`
        @keyframes contact-glow {
          0%,100% { opacity: 0.4; }
          50% { opacity: 0.75; }
        }
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ping-dot {
          0%,100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.3; }
        }
        .contact-orb { animation: contact-glow 4s ease-in-out infinite; }
        .orbit-slow { animation: orbit-spin 18s linear infinite; transform-origin: center; }
        .orbit-rev  { animation: orbit-spin 28s linear infinite reverse; transform-origin: center; }
        .ping-dot   { animation: ping-dot 2s ease-in-out infinite; }
        .social-row {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 18px; border-radius: 16px;
          border: 1px solid rgba(120,170,255,0.14);
          background: rgba(15,20,36,0.55);
          backdrop-filter: blur(14px);
          transition: border-color .3s, box-shadow .3s, transform .3s;
          text-decoration: none; color: inherit;
        }
        .social-row:hover {
          border-color: rgba(140,200,255,0.45);
          box-shadow: 0 0 20px 3px rgba(100,150,255,0.18);
          transform: translateX(6px);
        }
        .info-row {
          display: flex; align-items: flex-start; gap: 18px;
        }
        .info-icon {
          width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(100,150,255,0.12);
          border: 1px solid rgba(120,170,255,0.2);
          color: #9fc7ff;
        }
      `}</style>

      <section className="section contact cosmic-section relative" id="contact">
        <div className="section-depth" aria-hidden="true" />

        <div className="relative z-10 w-full max-w-5xl mx-auto">

          {/* Heading */}
          <SectionReveal>
            <p className="text-[12px] tracking-[4px] uppercase text-white/35 mb-3">Contact</p>
          </SectionReveal>
          <SectionReveal>
            <h2 className="font-['Sora'] text-[clamp(2rem,3.5vw,3rem)] text-white leading-tight mb-2">
              Let's chart the next frontier
            </h2>
          </SectionReveal>
          <SectionReveal>
            <p className="text-white/40 text-[15px] leading-relaxed mb-12 max-w-lg">
              Open to advisory, partnerships, and visionary collaborations. Pick your signal and reach out.
            </p>
          </SectionReveal>

          {/* Two column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* LEFT — contact info */}
            <SectionReveal>
              <div className="flex flex-col gap-6">

                {/* Address */}
                <div className="info-row">
                  <div className="info-icon">
                    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20M12 2a14.5 14.5 0 0 1 0 20M2 12h20"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/35 text-[11px] uppercase tracking-[2px] mb-1">Address</p>
                    <p className="text-white font-medium text-[16px]">Earth</p>
                    <p className="text-white/40 text-[13px] mt-0.5">Somewhere in the cosmos</p>
                  </div>
                </div>

                {/* Email */}
                <div className="info-row">
                  <div className="info-icon">
                    <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                      <rect x="2" y="4" width="20" height="16" rx="3"/><path d="m2 7 10 7 10-7"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-white/35 text-[11px] uppercase tracking-[2px] mb-1">Mail</p>
                    <a
                      href="mailto:raj@rajcosmos.com"
                      className="text-[#9fc7ff] font-medium text-[16px] hover:text-white transition-colors duration-200"
                    >
                      raj@rajcosmos.com
                    </a>
                  </div>
                </div>

                {/* Availability badge */}
                <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[rgba(15,20,36,0.6)] border border-[rgba(120,170,255,0.15)] w-fit">
                  <span className="ping-dot w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  <span className="text-white/60 text-[13px]">Open to new collaborations</span>
                </div>

              </div>
            </SectionReveal>

            {/* RIGHT — socials */}
            <SectionReveal>
              <div className="flex flex-col gap-3">
                <p className="text-white/35 text-[11px] uppercase tracking-[2px] mb-2">Social</p>

                {socials.map((s) => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="social-row">
                    <span className="text-[#9fc7ff]">{s.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[14px] font-medium">{s.name}</p>
                      <p className="text-white/40 text-[12px]">{s.handle}</p>
                    </div>
                    <svg className="text-white/20" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M7 7h10v10"/>
                    </svg>
                  </a>
                ))}

                {/* Primary CTA */}
                <a
                  href="mailto:raj@rajcosmos.com"
                  className="mt-2 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-semibold text-[14px] text-[#02040c] bg-gradient-to-r from-[#8bb2ff] to-[#6ff6ff] shadow-[0_0_24px_rgba(110,200,255,0.25)] hover:shadow-[0_0_36px_rgba(110,200,255,0.4)] transition-shadow duration-300"
                >
                  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                    <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                  Launch a Signal
                </a>
              </div>
            </SectionReveal>

          </div>
        </div>
      </section>
    </>
  );
}