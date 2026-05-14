import SectionReveal from "./SectionReveal.jsx";

const EXPERIENCES = [
  {
    company: "ENI6MA",
    role: "Advisor",
    period: "Aug 2024 – Present",
    location: "San Francisco Bay Area",
    tag: "Advisory",
  },
  {
    company: "Stealth Startup",
    role: "Founder & CEO",
    period: "Jul 2023 – Present",
    location: "San Francisco Bay Area",
    tag: "Current",
  },
  {
    company: "Oceanofnft (Time Machine)",
    role: "Founder & CEO",
    period: "May 2022 – Jul 2023",
    location: "Global",
    tag: "Web3",
    desc: "Web3 & NFTs — building at the frontier of digital ownership",
  },
  {
    company: "Richkidsdubai.com",
    role: "Co-Founder",
    period: "Jul 2019 – May 2022",
    location: "Dubai, UAE",
    tag: "Acquired",
    desc: "Social Media Marketing Agency — acquired by a UK agency",
  },
  {
    company: "Lastmoon Inc.",
    role: "Co-Founder",
    period: "May 2019 – Apr 2022",
    location: "Remote",
    tag: "Top 100",
    desc: "P2P learning technology — Top 100 Notable Startups",
  },
];

const TAG_COLORS = {
  Current: "#60a5fa",
  Advisory: "#a78bfa",
  Acquired: "#34d399",
  Web3: "#c084fc",
  "Top 100": "#fbbf24",
};

export default function Timeline() {
  return (
    <section className="section cosmic-section" id="ventures">
      <div className="section-depth" aria-hidden="true" />
      <div className="section-head">
        <SectionReveal className="section-eyebrow">VENTURES</SectionReveal>
        <SectionReveal className="section-title">Galaxies of ventures and leadership</SectionReveal>
        <SectionReveal className="section-subtitle">
          A timeline of ambitious ventures, creative launches, and growth experiments across
          global markets.
        </SectionReveal>
      </div>
      <div className="timeline">
        {EXPERIENCES.map((exp) => (
          <SectionReveal key={exp.company} className="timeline-card">
            <span className="timeline-orbit" aria-hidden="true" />
            <div className="timeline-head">
              <div>
                <h3>{exp.company}</h3>
                <p className="timeline-role">{exp.role}</p>
              </div>
              <span className="timeline-tag" style={{ backgroundColor: TAG_COLORS[exp.tag] }}>
                {exp.tag}
              </span>
            </div>
            <p className="timeline-meta">{exp.period} · {exp.location}</p>
            {exp.desc ? <p className="timeline-desc">{exp.desc}</p> : null}
          </SectionReveal>
        ))}
      </div>
      <div className="skills" id="skills">
        <SectionReveal className="skills-title">Capabilities in orbit</SectionReveal>
        <div className="skills-grid">
          {[
            "Startup Leadership",
            "Business Research",
            "Web3 & NFT",
            "Strategic Planning",
            "Product Development",
            "Team Building",
            "AI & Technology",
            "Social Media Marketing",
            "Community Building",
            "Business Development",
            "E-Learning Platforms",
            "Start-up Ventures",
          ].map((skill) => (
            <SectionReveal key={skill} className="skill-chip">
              {skill}
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
