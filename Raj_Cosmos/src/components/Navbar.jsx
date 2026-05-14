import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion.js";

const NAV_ITEMS = [
  { label: "Home", href: "#top" },
  { label: "Life", href: "#life" },
  { label: "Books", href: "#books" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("#top");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (sections.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActive(id === "top" ? "#top" : `#${id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      className="navbar"
      variants={fadeIn}
      initial="hidden"
      animate="show"
    >
      <div className="nav-inner">
        <span className="nav-sheen" aria-hidden="true" />
        <div className="brand">
          <span className="brand-mark" />
          Raj Cosmos
        </div>
        <nav className="nav-links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link${active === item.href ? " active" : ""}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="nav-cta magnetic" href="#contact">
            Orbit Together
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={`nav-mobile${menuOpen ? " open" : ""}`}>
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="nav-mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </motion.header>
  );
}
