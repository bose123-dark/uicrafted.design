import { showToast } from './main.js';

// Default Initial Reviews (Empty so only real client reviews display)
const DEFAULT_REVIEWS = [];

export function initReviews() {
  const gridContainer = document.getElementById('testimonials-grid');
  const reviewForm = document.getElementById('review-form');

  if (!gridContainer) return;

  // Clear old test entries if present
  try {
    const saved = localStorage.getItem('uicrafted_client_reviews');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Filter out test reviews like "yoga", "yogu", or dummy data
      const cleaned = parsed.filter(r => r.name && !['yoga', 'yogu', 'test'].includes(r.name.toLowerCase().trim()));
      localStorage.setItem('uiccrafted_client_reviews', JSON.stringify(cleaned));
    }
  } catch (e) {}

  // Load reviews from localStorage or default
  function getStoredReviews() {
    try {
      const saved = localStorage.getItem('uiccrafted_client_reviews');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error loading stored reviews:", e);
    }
    return DEFAULT_REVIEWS;
  }

  function renderReviews() {
    const reviews = getStoredReviews();
    if (reviews.length === 0) {
      gridContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; color: var(--text-muted); padding: 3rem 2rem; background: var(--bg-card); border: 1px dashed var(--border-glass); border-radius: var(--radius-lg); backdrop-filter: blur(16px);">
          ✨ No client reviews yet. Be the first to submit your feedback below!
        </div>
      `;
      return;
    }

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
