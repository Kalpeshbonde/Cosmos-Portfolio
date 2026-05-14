import { useEffect, useRef } from "react";

// Responsive star count - fewer on mobile for better performance
const STAR_COUNT = typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 120;

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;
    let rafId;
    let lastFrameTime = 0;
    const targetFPS = 45; // Throttle to 45fps for smooth performance
    const frameInterval = 1000 / targetFPS;

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.8 + 0.2, // Start between 0.2-1.0
      baseSpeed: 0.0003 + Math.random() * 0.0005,
      size: 0.5 + Math.random() * 1.2,
      brightness: 0.6 + Math.random() * 0.4, // Individual star brightness
    }));

    const scroll = {
      velocity: 0,
      dampening: 0.85,
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const delta = window.scrollY - (scroll.lastY || 0);
          // Positive delta (scroll down) = stars move TOWARD viewer (z decreases)
          scroll.velocity = scroll.velocity * scroll.dampening + delta * 0.00015;
          scroll.lastY = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    const draw = (currentTime) => {
      // Throttle frame rate
      if (currentTime - lastFrameTime < frameInterval) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = currentTime;

      // Clear with deep space black
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Update and draw stars
      stars.forEach((star) => {
        // Scroll down (positive velocity) = z decreases (stars come closer)
        // Scroll up (negative velocity) = z increases (stars move away)
        star.z -= star.baseSpeed + scroll.velocity;

        // Reset stars that go too close or too far
        if (star.z <= 0.05) {
          star.z = 1;
          star.x = Math.random();
          star.y = Math.random();
        } else if (star.z > 1) {
          star.z = 0.1;
          star.x = Math.random();
          star.y = Math.random();
        }

        // Project 3D to 2D with perspective
        const depth = 1 / star.z;
        const x = (star.x - 0.5) * depth * width * 0.8 + width / 2;
        const y = (star.y - 0.5) * depth * height * 0.8 + height / 2;

        // Skip if off screen
        if (x < -50 || x > width + 50 || y < -50 || y > height + 50) return;

        // Calculate size based on depth (closer = bigger)
        const radius = Math.max(0.3, star.size * depth * 0.8);

        // Calculate opacity - closer stars are brighter
        const depthAlpha = Math.pow(1 - star.z, 1.5);
        const alpha = depthAlpha * star.brightness;

        // Draw star with bright white color
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();

        // Add glow for closer/brighter stars
        if (radius > 1.2 && alpha > 0.7) {
          ctx.beginPath();
          ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 2.5);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.3})`);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      // Dampen scroll velocity
      scroll.velocity *= scroll.dampening;

      rafId = requestAnimationFrame(draw);
    };

    resize();
    scroll.lastY = window.scrollY;
    rafId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}