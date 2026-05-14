export const easeOutExpo = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: easeOutExpo, delay },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, ease: easeOutExpo, delay },
  }),
};

export const stagger = {
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.12,
    },
  },
};
