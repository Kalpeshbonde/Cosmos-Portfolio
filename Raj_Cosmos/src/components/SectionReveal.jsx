import { motion } from "framer-motion";
import { fadeUp, fadeIn } from "../utils/motion.js";

const VARIANTS = {
  fadeUp,
  fadeIn,
};

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  variant = "fadeUp",
}) {
  const selected = VARIANTS[variant] || fadeUp;
  return (
    <motion.div
      className={className}
      variants={selected}
      custom={delay}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      {children}
    </motion.div>
  );
}
