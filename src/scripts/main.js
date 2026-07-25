import { initCursorGlow } from './cursor.js';
import { initFAQ } from './faq.js';
import { initReviews } from './reviews.js';

// Global Toast Notification Helper
export function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Subsystems
  initCursorGlow();
  initFAQ();
  initReviews();

  // Sticky Header Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile Navigation Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Active Section Navigation Indicator
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      if (window.scrollY >= secTop) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Contact Form Submission Handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const service = document.getElementById('form-service').value;
      const messageText = document.getElementById('form-message').value;

      const waMsg = encodeURIComponent(`Hi Bose AM! My name is ${name}. I am interested in ${service}. Message: ${messageText}`);
      window.open(`https://wa.me/919003712986?text=${waMsg}`, '_blank');

      showToast(`Thank you ${name}! Opening WhatsApp to connect directly with Bose AM.`);
      contactForm.reset();
    });
  }

  // Order Buttons Handler (Pricing Cards)
  document.querySelectorAll('.order-plan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth' });
        const select = document.getElementById('form-service');
        if (select) {
          select.value = plan || select.options[0].value;
        }
        showToast(`Selected "${plan}". Fill the form or click WhatsApp to get started!`);
      }
    });
  });
});
