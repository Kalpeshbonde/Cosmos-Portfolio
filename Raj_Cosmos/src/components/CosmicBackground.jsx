import { motion, useScroll, useTransform } from "framer-motion";
import StarField from "./StarField.jsx";

export default function CosmicBackground() {
  const { scrollY } = useScroll();
  
  // Subtle parallax on cosmic grid - moves slower than content
  const gridY = useTransform(scrollY, [0, 2000], [0, -300]);
  const gridOpacity = useTransform(scrollY, [0, 500, 1500], [0.4, 0.15, 0.05]);

  return (
    <div className="cosmos-bg" aria-hidden="true">
      {/* Animated starfield */}
      <StarField />
      
      {/* Cosmic grid with parallax */}
      <motion.div 
        className="cosmic-grid" 
        style={{ 
          y: gridY,
          opacity: gridOpacity
        }} 
      />
      
      {/* Subtle ambient glow */}
      <div className="cosmic-glow" />
    </div>
  );
}