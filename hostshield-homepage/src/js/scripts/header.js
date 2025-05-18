const header = () => {
  const headerDiv = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      headerDiv.classList.add('not-top');
    } else {
      headerDiv.classList.remove('not-top');
    }
  });
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.navigation');
  const close = document.querySelector('.close');

  hamburger.addEventListener('click', () => {
    nav.classList.add('open');
  });

  close.addEventListener('click', () => {
    nav.classList.remove('open');
  });
};

export default header;
