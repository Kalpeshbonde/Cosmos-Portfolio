import { useEffect, useRef } from "react";

const STAR_COUNT = 300;
const SPEED_MULTIPLIER = 2.0;
const SHOOTING_STAR_COUNT = 5;

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
    const targetFPS = 45;
    const frameInterval = 1000 / targetFPS;

    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.8 + 0.2,
      baseSpeed: (0.0003 + Math.random() * 0.0005) * SPEED_MULTIPLIER,
      size: 0.5 + Math.random() * 1.2,
      brightness: 0.6 + Math.random() * 0.4,
    }));

    const createShootingStar = () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.5,
      length: 80 + Math.random() * 120,
      speed: 6 + Math.random() * 8,
      angle: Math.PI / 6 + (Math.random() * Math.PI) / 8,
      opacity: 0,
      state: "fadein", // fadein | travel | fadeout | dead
      progress: 0,
      color: ["#ffffff", "#ccddff", "#ffdddd"][Math.floor(Math.random() * 3)],
      delay: Math.random() * 8000,
      width: 1 + Math.random() * 0.8,
    });

    const shootingStars = Array.from({ length: SHOOTING_STAR_COUNT }, () => {
      const s = createShootingStar();
      s.delay = Math.random() * 12000; // stagger initial appearances
      return s;
    });

    const scroll = { velocity: 0, dampening: 0.85 };
    let lastTime = performance.now();

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
          scroll.velocity = scroll.velocity * scroll.dampening + delta * 0.00015;
          scroll.lastY = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    const draw = (currentTime) => {
      if (currentTime - lastFrameTime < frameInterval) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      const delta = currentTime - lastTime;
      lastTime = currentTime;
      lastFrameTime = currentTime;

      ctx.clearRect(0, 0, width, height);

      // Background stars
      stars.forEach((star) => {
        star.z -= star.baseSpeed + scroll.velocity;
        if (star.z <= 0.05) { star.z = 1; star.x = Math.random(); star.y = Math.random(); }
        else if (star.z > 1) { star.z = 0.1; star.x = Math.random(); star.y = Math.random(); }

        const depth = 1 / star.z;
        const x = (star.x - 0.5) * depth * width * 0.8 + width / 2;
        const y = (star.y - 0.5) * depth * height * 0.8 + height / 2;
        if (x < -50 || x > width + 50 || y < -50 || y > height + 50) return;

        const radius = Math.max(0.3, star.size * depth * 0.8);
        const depthAlpha = Math.pow(1 - star.z, 1.5);
        const alpha = Math.min(1, depthAlpha * star.brightness * 3.0);

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();

        if (radius > 0.7 && alpha > 0.35) {
          const grad = ctx.createRadialGradient(x, y, 0, x, y, radius * 5.0);
          grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.75})`);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.beginPath();
          ctx.arc(x, y, radius * 5.0, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      });

      // Shooting stars
      shootingStars.forEach((ss, i) => {
        if (ss.delay > 0) {
          ss.delay -= delta;
          return;
        }

        const dx = Math.cos(ss.angle) * ss.speed;
        const dy = Math.sin(ss.angle) * ss.speed;

        ss.progress += ss.speed;

        if (ss.state === "fadein") {
          ss.opacity = Math.min(1, ss.opacity + 0.06);
          if (ss.opacity >= 1) ss.state = "travel";
        } else if (ss.state === "travel") {
          if (ss.progress > ss.length * 3) ss.state = "fadeout";
        } else if (ss.state === "fadeout") {
          ss.opacity = Math.max(0, ss.opacity - 0.04);
          if (ss.opacity <= 0) ss.state = "dead";
        } else if (ss.state === "dead") {
          shootingStars[i] = createShootingStar();
          return;
        }

        ss.x += dx;
        ss.y += dy;

        // Draw trail
        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.7, `rgba(255,255,255,${ss.opacity * 0.3})`);
        grad.addColorStop(1, `rgba(255,255,255,${ss.opacity})`);

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = ss.width;
        ctx.lineCap = "round";
        ctx.stroke();

        // Bright head
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, ss.width * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${ss.opacity})`;
        ctx.fill();
      });

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