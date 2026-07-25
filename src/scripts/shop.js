import { SHOP_DATA } from '../data/shopData.js';
import { showToast } from './main.js';

export function initShop() {
  const shopGrid = document.getElementById('shop-grid');
  const shopModal = document.getElementById('shop-modal');
  const shopModalClose = document.getElementById('shop-modal-close');
  const shopModalBody = document.getElementById('shop-modal-body');

  if (!shopGrid) return;

  // Render Shop Product Cards
  shopGrid.innerHTML = SHOP_DATA.map(item => `
    <div class="shop-card" data-id="${item.id}">
      <div>
        <span class="shop-tag">${item.tag}</span>
        <h3 class="shop-item-title">${item.title}</h3>
        <p class="shop-item-desc">${item.description}</p>
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
          ${item.formats.map(f => `<span style="font-size: 0.75rem; padding: 0.2rem 0.6rem; background: rgba(255,255,255,0.06); border-radius: 4px; color: var(--text-muted);">${f}</span>`).join('')}
        </div>
      </div>
      <div class="shop-footer">
        <span class="shop-price">${item.price}</span>
        <button class="btn btn-primary btn-sm buy-btn" data-id="${item.id}">
          Get Template
        </button>
      </div>
    </div>
  `).join('');

  // Click handler for product modal
  shopGrid.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      openShopModal(id);
    });
  });

  function openShopModal(itemId) {
    const item = SHOP_DATA.find(i => i.id === itemId);
    if (!item) return;

    shopModalBody.innerHTML = `
      <div style="text-align: center;">
        <span class="section-tag">${item.category} • ${item.tag}</span>
        <h2 style="font-size: 2.2rem; margin-top: 0.4rem; font-family: var(--font-heading);">${item.title}</h2>
        <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 1.05rem;">${item.description}</p>
        
        <div style="background: rgba(22, 19, 46, 0.7); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 1.75rem; margin-bottom: 2rem; text-align: left;">
          <h4 style="font-size: 1.1rem; color: var(--pink-glow); margin-bottom: 1rem;">What's Included:</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem;">
            ${item.features.map(feat => `
              <li style="display: flex; align-items: center; gap: 0.6rem; color: var(--text-main); font-weight: 500;">
                <span style="color: #10B981; font-weight: 800;">✓</span> ${feat}
              </li>
            `).join('')}
          </ul>
          <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-glass); display: flex; align-items: center; justify-content: space-between;">
            <span style="color: var(--text-muted); font-size: 0.9rem;">File Formats:</span>
            <span style="font-weight: 700; color: #fff;">${item.formats.join(', ')}</span>
          </div>
        </div>

        <div style="display: flex; items-center; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap;">
          <div style="text-align: left;">
            <span style="font-size: 0.85rem; color: var(--text-muted); display: block;">Instant Download Price</span>
            <span style="font-size: 2.2rem; font-weight: 800; color: #fff; font-family: var(--font-heading);">${item.price}</span>
          </div>
          <button class="btn btn-primary" id="confirm-purchase-btn" style="flex-grow: 1; max-width: 320px;">
            🛒 Download / Buy via WhatsApp
          </button>
        </div>
      </div>
    `;

    shopModal.classList.add('active');

    const confirmBtn = shopModalBody.querySelector('#confirm-purchase-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        const message = encodeURIComponent(`Hi Bose AM! I want to purchase the digital product: "${item.title}" (${item.price}). Please share instant download & payment details.`);
        window.open(`https://wa.me/?text=${message}`, '_blank');
        shopModal.classList.remove('active');
        showToast(`Redirecting to WhatsApp for "${item.title}" instant access!`);
      });
    }
  }

  if (shopModalClose) {
    shopModalClose.addEventListener('click', () => shopModal.classList.remove('active'));
  }

  if (shopModal) {
    shopModal.addEventListener('click', (e) => {
      if (e.target === shopModal) shopModal.classList.remove('active');
    });
  }
}
