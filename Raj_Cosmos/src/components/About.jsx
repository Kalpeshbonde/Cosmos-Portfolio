import SectionReveal from "./SectionReveal.jsx";

export default function About() {
  return (
    <section className="relative flex flex-col gap-16 py-8" id="about">
      <div className="absolute inset-x-[-10%] top-[10%] h-[200px] bg-[radial-gradient(circle_at_20%_40%,rgba(90,140,255,0.15),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(160,90,255,0.12),transparent_50%)] blur-[22px] opacity-70 pointer-events-none" aria-hidden="true" />

      {/* Header */}
      <div className="max-w-2xl relative z-10">
        <SectionReveal>
          <p className="text-[13px] tracking-[3px] uppercase text-white/40">About</p>
        </SectionReveal>
        <SectionReveal>
          <h2 className="font-['Sora'] text-[clamp(2rem,3vw,3rem)] text-white mt-4 leading-tight">
            The story behind the cosmos
          </h2>
        </SectionReveal>
      </div>

      {/* Main content — image + story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">

        {/* Photo */}
        <SectionReveal>
          <div className="relative mx-auto lg:mx-0 w-full max-w-sm">
            {/* Glow behind image */}
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_50%_50%,rgba(120,80,255,0.35),transparent_70%)] blur-2xl scale-110 pointer-events-none" />
            {/* Orbit ring decoration */}
            <div className="absolute -inset-4 rounded-full border border-[rgba(120,170,255,0.15)] pointer-events-none" />
            <div className="absolute -inset-8 rounded-full border border-dashed border-[rgba(120,170,255,0.08)] pointer-events-none" />
            <img
              src="/IMG_20240630_164031_edited.avif"
              alt="Raj Cosmos at MIT"
              className="relative z-10 w-full rounded-3xl object-cover grayscale hover:grayscale-0 transition-all duration-700 border border-[rgba(120,170,255,0.2)] shadow-[0_32px_80px_rgba(5,8,20,0.6)]"
            />
            
          </div>
        </SectionReveal>

        {/* Story */}
        <div className="flex flex-col gap-6 relative z-10">
          <SectionReveal>
            <p className="text-white/60 leading-[1.9] text-[15px]">
              Since <span className="text-white font-medium">2018</span>, I've been grinding in the entrepreneurship universe. After dropping out of college, I moved to Bangalore and started working on early-stage startups — that's when I discovered the massive gap between theory and practical knowledge.
            </p>
          </SectionReveal>
          <SectionReveal>
            <p className="text-white/60 leading-[1.9] text-[15px]">
              Half a dozen ventures. Most failed. But each one gave me experience no university in the world could offer. In Silicon Valley, <span className="text-white font-medium">failure is a badge of honor</span> — and I wear mine proudly. One of those ventures, <span className="text-white font-medium">Lastmoon Inc.</span>, earned us recognition as a <span className="text-[#9fc7ff] font-medium">Top 100 E-Learning Startup</span> of the country.
            </p>
          </SectionReveal>
          <SectionReveal>
            <p className="text-white/60 leading-[1.9] text-[15px]">
              As an official participant of <span className="text-white font-medium">World Expo 2020 Dubai</span>, I witnessed the future of innovation firsthand. That sparked a deeper dive — connecting with mega entrepreneurs, getting selected at <span className="text-white font-medium">Harvard University</span>, and spending time in the heart of Silicon Valley, California.
            </p>
          </SectionReveal>
          <SectionReveal>
            <p className="text-white/60 leading-[1.9] text-[15px]">
              The conclusion? Start the next one. My current venture is in <span className="text-[#9fc7ff] font-medium">stealth mode</span> — but soon it will make a dent in the multiverse.
            </p>
          </SectionReveal>

          {/* Stats row */}
          <SectionReveal>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {[
                { value: "2018", label: "Started" },
                { value: "Top 100", label: "Startup Award" },
                { value: "Harvard", label: "AI Program" },
              ].map(({ value, label }) => (
                <div key={label} className="p-4 rounded-2xl bg-[rgba(15,20,36,0.65)] border border-[rgba(125,170,255,0.15)] backdrop-blur-lg text-center">
                  <p className="font-['Sora'] text-white font-semibold text-lg">{value}</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider mt-1">{label}</p>
                </div>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}