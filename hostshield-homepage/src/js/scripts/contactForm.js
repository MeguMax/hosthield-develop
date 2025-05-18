const contactForm = () => {
  const form = document.querySelector('.js-contact-form');
  const name = document.querySelector('.js-form-name');
  const email = document.querySelector('.js-form-email');
  const message = document.querySelector('.js-form-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(name.value, email.value, message.value);
  });
};

export default contactForm;
