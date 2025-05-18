export const pageAnimation = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.75,
      when: "beforeChildren",
      staggerChildren: 0.25,
      ease: "linear",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};
export const scrollReveal = {
  hidden: { opacity: 0, transition: { duration: 0.75, ease: "easeOut" } },
  show: {
    opacity: 1,
    transition: {
      duration: 0.75,
      ease: "easeIn",
    },
  },
};
