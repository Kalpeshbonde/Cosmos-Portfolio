import SectionReveal from "./SectionReveal.jsx";

export default function Contact() {
  return (
    <section className="section contact cosmic-section" id="contact">
      <div className="section-depth" aria-hidden="true" />
      <div className="contact-card">
        <SectionReveal className="section-eyebrow">CONTACT</SectionReveal>
        <SectionReveal className="section-title">Let us chart the next frontier</SectionReveal>
        <SectionReveal className="section-subtitle">
          Open to advisory, partnerships, and visionary collaborations. Reach out to
          begin the voyage.
        </SectionReveal>
        <div className="contact-actions">
          <a className="button-primary magnetic" href="mailto:hello@rajcosmos.com">Launch a Signal</a>
          <a className="button-ghost magnetic" href="#top">Back to Orbit</a>
        </div>
      </div>
    </section>
  );
}
