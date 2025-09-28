

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Check saved preference and apply dark mode if enabled
  if (localStorage.getItem('dark-mode') === 'enabled') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️'; // Change icon to sun
  }

  // Toggle dark mode on button click
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
      toggleBtn.textContent = '☀️';
    } else {
      localStorage.setItem('dark-mode', 'disabled');
      toggleBtn.textContent = '🌙';
    }
  });
});




// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});




// Contact form validation and feedback
const contactForm = document.querySelector('form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (name === '' || email === '' || message === '') {
    alert('Please fill in all fields.');
    return;
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  alert(`Thank you for your message, ${name}! I will get back to you soon.`);
  contactForm.reset();
});







