import SectionReveal from "./SectionReveal.jsx";

const HIGHLIGHTS = [
  {
    title: "Strategic Launches",
    desc: "Guiding ventures from first principles to orbit with clear strategy and bold execution.",
  },
  {
    title: "Cosmic Partnerships",
    desc: "Forging alliances across technology, creative, and growth systems for lasting momentum.",
  },
  {
    title: "Product Gravity",
    desc: "Building products that pull communities in, with precision design and sharp storytelling.",
  },
];

export default function About() {
  return (
    <section className="section cosmic-section" id="about">
      <div className="section-depth" aria-hidden="true" />
      <div className="section-head">
        <SectionReveal className="section-eyebrow">ABOUT</SectionReveal>
        <SectionReveal className="section-title">Navigating the cosmos of modern ventures</SectionReveal>
        <SectionReveal className="section-subtitle">
          A founder and operator shaped by global markets, building products and communities with
          a cinematic vision and a relentless focus on execution.
        </SectionReveal>
      </div>
      <div className="highlight-grid">
        {HIGHLIGHTS.map((item) => (
          <SectionReveal key={item.title} className="glass-card">
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </SectionReveal>
        ))}
      </div>
    </section>
  );
}
