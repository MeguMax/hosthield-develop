const newsletter = () => {
  const form = document.querySelector('.js-newsletter-form');
  const email = document.querySelector('.js-newsletter-email');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(email.value);
  });
};

export default newsletter;
