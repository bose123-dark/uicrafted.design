import { showToast } from './main.js';

// Default Initial Reviews
const DEFAULT_REVIEWS = [
  {
    id: "def-1",
    name: "Arjun Kumar",
    role: "Founder, Apex Tech",
    avatar: "AK",
    rating: 5,
    text: "Amazing work. Bose AM delivered our brand identity within 48 hours and exceeded all expectations. Highly recommended!"
  },
  {
    id: "def-2",
    name: "Sneha Patel",
    role: "Owner, Bloom Cafe",
    avatar: "SP",
    rating: 5,
    text: "Very professional design process. The Instagram templates increased our engagement rate by over 150% in the first week."
  },
  {
    id: "def-3",
    name: "Rohan Mehta",
    role: "CEO, Urban Wear",
    avatar: "RM",
    rating: 5,
    text: "The case study approach UICRAFTED DESIGN uses showed us the exact logic behind our logo and packaging design."
  }
];

export function initReviews() {
  const gridContainer = document.getElementById('testimonials-grid');
  const reviewForm = document.getElementById('review-form');

  if (!gridContainer) return;

  // Load reviews from localStorage or default
  function getStoredReviews() {
    try {
      const saved = localStorage.getItem('uicrafted_client_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        return [...parsed, ...DEFAULT_REVIEWS];
      }
    } catch (e) {
      console.error("Error loading stored reviews:", e);
    }
    return DEFAULT_REVIEWS;
  }

  function renderReviews() {
    const reviews = getStoredReviews();
    gridContainer.innerHTML = reviews.map(r => {
      const starsStr = '⭐'.repeat(r.rating || 5);
      return `
        <div class="testimonial-card">
          <div class="stars">${starsStr}</div>
          <p class="testimonial-text">"${r.text}"</p>
          <div class="client-info">
            <div class="client-avatar">${r.avatar}</div>
            <div>
              <div class="client-name">${r.name}</div>
              <div class="client-role">${r.role || 'Client'}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Handle Review Form Submission
  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('review-name').value.trim();
      const role = document.getElementById('review-role').value.trim() || 'Client';
      const rating = parseInt(document.getElementById('review-rating').value, 10) || 5;
      const text = document.getElementById('review-text').value.trim();

      if (!name || !text) return;

      // Generate Initials Avatar
      const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2) || 'CL';

      const newReview = {
        id: 'rev-' + Date.now(),
        name,
        role,
        avatar: initials,
        rating,
        text,
        date: new Date().toISOString()
      };

      // Save user review to localStorage
      try {
        const saved = localStorage.getItem('uicrafted_client_reviews');
        const customReviews = saved ? JSON.parse(saved) : [];
        customReviews.unshift(newReview);
        localStorage.setItem('uicrafted_client_reviews', JSON.stringify(customReviews));
      } catch (e) {
        console.error("Error saving review:", e);
      }

      // Re-render reviews grid instantly
      renderReviews();

      // Show Toast Notification
      showToast(`Thank you ${name}! Your review is now live!`);

      // Open WhatsApp notification to notify Bose AM
      const waMsg = encodeURIComponent(`Hi Bose AM! I left a ${rating}-Star Review on UICRAFTED DESIGN!\n\nName: ${name}\nRole: ${role}\nRating: ${'⭐'.repeat(rating)}\nReview: "${text}"`);
      window.open(`https://wa.me/919003712986?text=${waMsg}`, '_blank');

      // Reset form
      reviewForm.reset();
    });
  }

  // Initial render
  renderReviews();
}
