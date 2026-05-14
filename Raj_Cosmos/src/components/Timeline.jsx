import { useState } from "react";
import SectionReveal from "./SectionReveal.jsx";

const EXPERIENCES = [
  {
    company: "ENI6MA",
    role: "Advisor",
    period: "Aug 2024 – Present",
    location: "San Francisco Bay Area",
    tag: "Advisory",
    desc: "Advising on strategic direction at the frontier of identity and security technology.",
  },
  {
    company: "Stealth Startup",
    role: "Founder & CEO",
    period: "Jul 2023 – Present",
    location: "San Francisco Bay Area",
    tag: "Current",
    desc: "Building in stealth — the next chapter. Soon to make a dent in the multiverse.",
  },
  {
    company: "Oceanofnft (Time Machine)",
    role: "Founder & CEO",
    period: "May 2022 – Jul 2023",
    location: "Global",
    tag: "Web3",
    desc: "Built at the frontier of Web3 and digital ownership during the NFT era.",
  },
  {
    company: "Richkidsdubai.com",
    role: "Co-Founder",
    period: "Jul 2019 – May 2022",
    location: "Dubai, UAE",
    tag: "Acquired",
    desc: "Social media marketing agency and community — sold to a bigger UK agency.",
  },
  {
    company: "Lastmoon Inc.",
    role: "Co-Founder",
    period: "May 2019 – Apr 2022",
    location: "Remote (US Incorporated)",
    tag: "Top 100",
    desc: "P2P revolutionary learning technology — awarded Top 100 Notable Startups of the country.",
  },
  {
    company: "Bookscrush.com",
    role: "Co-Founder & CEO",
    period: "Dec 2019 – Aug 2021",
    location: "India",
    tag: "EdTech",
    desc: "Ultimate books discovery platform featuring recommendations from highly influential people.",
  },
  {
    company: "MURGAJI",
    role: "Co-Founder & COO",
    period: "Dec 2018 – May 2019",
    location: "India",
    tag: "First",
    desc: "First ever E-Learning startup — the origin story. Pivoted to become Lastmoon Inc.",
  },
];

const TAG_STYLES = {
  Current:   "bg-blue-400/20 text-blue-300 border-blue-400/30",
  Advisory:  "bg-violet-400/20 text-violet-300 border-violet-400/30",
  Acquired:  "bg-emerald-400/20 text-emerald-300 border-emerald-400/30",
  Web3:      "bg-purple-400/20 text-purple-300 border-purple-400/30",
  "Top 100": "bg-amber-400/20 text-amber-300 border-amber-400/30",
  EdTech:    "bg-cyan-400/20 text-cyan-300 border-cyan-400/30",
  First:     "bg-rose-400/20 text-rose-300 border-rose-400/30",
};

const QUOTES = [
  {
    text: "People Think It Must Be Fun To Be A Super Genius, But They Don't Realize How Hard It Is To Put Up With All The Idiots In The World.",
    author: "Calvin",
  },
  {
    text: "Knowledge Makes A Man Unfit To Be A Slave.",
    author: "Frederick Douglass",
  },
  {
    text: "The ones who are crazy enough to think they can change the world are the ones that do.",
    author: "Steve Jobs",
  },
];

function QuoteCarousel() {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((i) => (i - 1 + QUOTES.length) % QUOTES.length);
  const next = () => setCurrent((i) => (i + 1) % QUOTES.length);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[260px] px-12 md:px-20">
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/30 hover:text-white/80 transition-colors text-2xl font-light"
      >
        ‹
      </button>

      <div className="text-center max-w-2xl mx-auto transition-all duration-500">
        <p className="font-['Sora'] text-white/70 text-lg md:text-xl leading-relaxed italic">
          "{QUOTES[current].text}"
        </p>
        <p className="mt-6 text-[#9fc7ff] font-semibold tracking-wide text-sm">
          — {QUOTES[current].author}
        </p>
      </div>

      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/30 hover:text-white/80 transition-colors text-2xl font-light"
      >
        ›
      </button>

      <div className="flex gap-2 mt-10">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === current ? "bg-white scale-125" : "bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <section className="relative flex flex-col gap-12 py-8" id="ventures">
      <div className="absolute inset-x-[-10%] top-[10%] h-[200px] bg-[radial-gradient(circle_at_20%_40%,rgba(90,140,255,0.15),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(160,90,255,0.12),transparent_50%)] blur-[22px] opacity-70 pointer-events-none" aria-hidden="true" />

      {/* Header */}
      <div className="max-w-2xl relative z-10 text-center mx-auto">
        <SectionReveal>
          <p className="text-[13px] tracking-[3px] uppercase text-white/40">Companies</p>
        </SectionReveal>
        <SectionReveal>
          <h2 className="font-['Sora'] text-[clamp(2rem,3vw,3rem)] text-white mt-4 leading-tight">
            Galaxies of companies and leadership
          </h2>
        </SectionReveal>
        <SectionReveal>
          <p className="mt-4 text-white/50 leading-relaxed">
            A timeline of ambitious ventures, creative launches, and growth experiments across global markets — from India to Dubai to San Francisco.
          </p>
        </SectionReveal>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 relative z-10">
        {EXPERIENCES.map((exp) => (
          <SectionReveal key={exp.company}>
            <div className="group relative p-6 rounded-3xl bg-[rgba(10,15,30,0.75)] border border-[rgba(120,170,255,0.15)] backdrop-blur-xl shadow-[0_24px_80px_rgba(5,8,20,0.45)] hover:-translate-y-1.5 hover:border-[rgba(140,200,255,0.4)] transition-all duration-300 overflow-hidden h-full flex flex-col">
              <span className="absolute -top-16 -left-16 w-40 h-40 rounded-full border border-[rgba(120,170,255,0.1)] pointer-events-none" />
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-['Sora'] text-white text-lg font-semibold leading-tight">{exp.company}</h3>
                  <p className="text-white/40 text-sm mt-1">{exp.role}</p>
                </div>
                <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold border ${TAG_STYLES[exp.tag]}`}>
                  {exp.tag}
                </span>
              </div>
              <p className="text-white/25 text-xs mt-4 tracking-wide">{exp.period} · {exp.location}</p>
              {exp.desc && (
                <p className="text-white/50 text-sm mt-3 leading-relaxed flex-1">{exp.desc}</p>
              )}
            </div>
          </SectionReveal>
        ))}
      </div>

      {/* Quote Carousel */}
      <div className="relative z-10 mt-8" id="skills">
        <SectionReveal>
          <p className="text-[13px] tracking-[3px] uppercase text-white/40 text-center mb-12">Quote</p>
        </SectionReveal>
        <QuoteCarousel />
      </div>
    </section>
  );
}