import { useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import CosmicBackground from "./components/CosmicBackground.jsx";
import RajCosmos from "./RajCosmos.jsx";

export default function App() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".magnetic"));
    if (elements.length === 0) return undefined;

    const handleMove = (event) => {
      const el = event.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      el.style.setProperty("--mx", `${x / rect.width}`);
      el.style.setProperty("--my", `${y / rect.height}`);
    };

    const handleLeave = (event) => {
      const el = event.currentTarget;
      el.style.setProperty("--mx", "0");
      el.style.setProperty("--my", "0");
    };

    elements.forEach((el) => {
      el.addEventListener("pointermove", handleMove);
      el.addEventListener("pointerleave", handleLeave);
    });

    return () => {
      elements.forEach((el) => {
        el.removeEventListener("pointermove", handleMove);
        el.removeEventListener("pointerleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <CosmicBackground />
      <div className="app-shell">
        <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
        <RajCosmos />
      </div>
    </>
  );
}
