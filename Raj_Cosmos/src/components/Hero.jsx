import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal.jsx";
import { fadeUp, stagger } from "../utils/motion.js";

export default function Hero() {
  return (
    <section className="hero cosmic-section" id="top">
      <div className="hero-grid">
        <div className="hero-constellation" aria-hidden="true" />
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
          <SectionReveal className="hero-eyebrow">COSMOS PORTFOLIO</SectionReveal>
          <SectionReveal className="hero-title">
            Raj. Founder. Builder. Explorer of bold ventures.
          </SectionReveal>
          <SectionReveal className="hero-subtitle">
            A cinematic journey through ventures, strategy, and emerging tech. Step into a
            premium universe of ambition, leadership, and cosmic-scale execution.
          </SectionReveal>
          <motion.div className="hero-actions" variants={fadeUp}>
            <a className="button-primary magnetic" href="#ventures">Enter the Cosmos</a>
            <a className="button-ghost magnetic" href="#contact">Initiate Contact</a>
          </motion.div>
          <motion.div className="hero-metrics" variants={fadeUp}>
            <div>
              <p className="metric-value">9+</p>
              <p className="metric-label">Ventures led</p>
            </div>
            <div>
              <p className="metric-value">15</p>
              <p className="metric-label">Markets explored</p>
            </div>
            <div>
              <p className="metric-value">100+</p>
              <p className="metric-label">Teams aligned</p>
            </div>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-orb"
          animate={{ y: [0, -18, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="orb-core" />
          <div className="orb-ring" />
          <div className="orb-ring ring-secondary" />
          <div className="hero-orbit-lines" />
        </motion.div>
      </div>
    </section>
  );
}
