import gsap, { Power1 } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const scrollTo = () => {
  const nav = document.querySelector('.navigation');
  const els = [...document.querySelectorAll('.js-scroll')];
  els.forEach((el) => {
    el.addEventListener('click', () => {
      nav.classList.remove('open');
      const target = el.getAttribute('data-target');
      let offset = el.getAttribute('data-offset') || 0;
      if (window.innerWidth <= 767) {
        offset = 0;
      }
      gsap.to(window, {
        duration: 0.5,
        scrollTo: {
          y: `#${target}`,
          offsetY: parseInt(offset),
        },
        ease: Power1.easeInOut,
      });
    });
  });
};
export default scrollTo;
