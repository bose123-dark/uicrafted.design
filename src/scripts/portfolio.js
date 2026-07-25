import { PROJECTS_DATA } from '../data/projectsData.js';

export function initPortfolio() {
  const gridContainer = document.getElementById('portfolio-grid');
  const filterBtnsContainer = document.getElementById('portfolio-filters');
  const modalOverlay = document.getElementById('case-study-modal');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');

  if (!gridContainer) return;

  // Categories list from user prompt requirements
  const categories = ["ALL", "Logo", "Brand Identity", "Social Media", "Posters", "UI Design", "Packaging", "Print Design"];
  let activeCategory = "ALL";

  // Render Filter Buttons
  function renderFilters() {
    filterBtnsContainer.innerHTML = categories.map(cat => `
      <button class="filter-btn ${cat === activeCategory ? 'active' : ''}" data-cat="${cat}">
        ${cat}
      </button>
    `).join('');

    filterBtnsContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-cat');
        renderFilters();
        renderProjects();
      });
    });
  }

  // Render Projects Grid
  function renderProjects() {
    const filtered = activeCategory === "ALL" 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

    gridContainer.innerHTML = filtered.map(p => `
      <div class="project-card" data-id="${p.id}">
        <div class="project-img-wrapper">
          <img src="${p.image}" alt="${p.title}" class="project-img" loading="lazy" />
          <span class="project-badge">${p.tag}</span>
        </div>
        <div class="project-details">
          <div class="project-cat">${p.category}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-action">
            <span>Inspect Case Study</span>
            <span>→</span>
          </div>
        </div>
      </div>
    `).join('');

    // Attach click listener for Case Study Modal
    gridContainer.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        openCaseStudyModal(id);
      });
    });
  }

  // Open Interactive Case Study Modal
  function openCaseStudyModal(projectId) {
    const project = PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;

    if (!project.caseStudy) {
      // Default case study display for concept projects
      modalBody.innerHTML = `
        <div style="text-align: center; padding: 1rem;">
          <span class="section-tag">${project.category}</span>
          <h2 style="font-size: 2.2rem; margin-top: 0.5rem;">${project.title}</h2>
          <p style="color: var(--text-muted); margin-bottom: 2rem;">${project.subtitle}</p>
          <div style="width: 100%; max-height: 450px; overflow: hidden; border-radius: var(--radius-md); border: 1px solid var(--border-glass); margin-bottom: 2rem;">
            <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          <p style="font-size: 1.1rem; color: var(--text-main); margin-bottom: 2rem;">${project.description}</p>
          <button class="btn btn-primary" onclick="document.getElementById('modal-close').click(); document.getElementById('contact').scrollIntoView();">
            Hire Me For Similar Project
          </button>
        </div>
      `;
    } else {
      // Detailed Multi-step Case Study Inspector
      const steps = project.caseStudy.steps;
      let activeStepIndex = 0;

      function renderModalContent() {
        const step = steps[activeStepIndex];
        
        let stepVisual = '';
        if (step.type === 'palette' && step.colors) {
          stepVisual = `
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem;">
              ${step.colors.map(c => `
                <div style="flex: 1; min-width: 120px; background: ${c.hex}; padding: 2.5rem 1rem 1rem 1rem; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);">
                  <div style="font-weight: 700; color: #fff; font-size: 0.95rem; text-shadow: 0 1px 3px rgba(0,0,0,0.8);">${c.name}</div>
                  <div style="font-size: 0.85rem; color: rgba(255,255,255,0.85); font-family: monospace; margin-top: 0.2rem;">${c.hex}</div>
                </div>
              `).join('')}
            </div>
          `;
        } else if (step.type === 'typography') {
          stepVisual = `
            <div style="background: rgba(0,0,0,0.4); padding: 1.5rem; border-radius: 12px; margin-top: 1.5rem; border: 1px solid var(--border-glass);">
              <div style="color: var(--pink-glow); font-weight: 700; margin-bottom: 0.5rem;">Primary Font: ${step.fontPrimary}</div>
              <div style="color: var(--text-muted); margin-bottom: 1.5rem;">Secondary Font: ${step.fontSecondary}</div>
              <div style="font-size: 2rem; font-weight: 800; font-family: var(--font-heading); color: #fff; letter-spacing: 0.05em; text-align: center; padding: 1rem 0;">
                ${step.sample}
              </div>
            </div>
          `;
        } else if (step.type === 'moodboard' && step.tags) {
          stepVisual = `
            <div style="display: flex; flex-wrap: wrap; gap: 0.8rem; margin-top: 1.5rem;">
              ${step.tags.map(t => `
                <span style="padding: 0.5rem 1.2rem; background: rgba(139,92,246,0.2); border: 1px solid rgba(139,92,246,0.4); border-radius: 99px; color: #c4b5fd; font-weight: 600; font-size: 0.9rem;">
                  ${t}
                </span>
              `).join('')}
            </div>
          `;
        } else if (step.image) {
          stepVisual = `
            <div style="margin-top: 1.5rem; text-align: center;">
              <img src="${step.image}" alt="${step.title}" style="max-width: 100%; max-height: 400px; border-radius: 12px; border: 1px solid var(--border-glass); object-fit: cover;" />
              ${step.caption ? `<p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.8rem;">${step.caption}</p>` : ''}
            </div>
          `;
        }

        modalBody.innerHTML = `
          <div>
            <span class="section-tag">${project.category} Case Study</span>
            <h2 style="font-size: 2.4rem; margin-top: 0.2rem; font-family: var(--font-heading);">${project.title}</h2>
            <p style="color: var(--text-muted); font-size: 1.05rem;">${project.subtitle}</p>

            <div class="case-study-stepper">
              ${steps.map((st, idx) => `
                <button class="step-tab ${idx === activeStepIndex ? 'active' : ''}" data-step="${idx}">
                  ${st.title}
                </button>
              `).join('')}
            </div>

            <div class="case-step-content">
              <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: var(--text-main);">${step.title}</h3>
              ${step.content ? `<p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.7;">${step.content}</p>` : ''}
              ${stepVisual}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-glass);">
              <button class="btn btn-outline" id="prev-step-btn" ${activeStepIndex === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
                ← Previous Step
              </button>
              <span style="font-size: 0.9rem; color: var(--text-muted);">Step ${activeStepIndex + 1} of ${steps.length}</span>
              <button class="btn btn-primary" id="next-step-btn">
                ${activeStepIndex === steps.length - 1 ? 'Finish & Hire' : 'Next Step →'}
              </button>
            </div>
          </div>
        `;

        // Stepper tab click listeners
        modalBody.querySelectorAll('.step-tab').forEach(tab => {
          tab.addEventListener('click', () => {
            activeStepIndex = parseInt(tab.getAttribute('data-step'), 10);
            renderModalContent();
          });
        });

        const prevBtn = modalBody.querySelector('#prev-step-btn');
        if (prevBtn) {
          prevBtn.addEventListener('click', () => {
            if (activeStepIndex > 0) {
              activeStepIndex--;
              renderModalContent();
            }
          });
        }

        const nextBtn = modalBody.querySelector('#next-step-btn');
        if (nextBtn) {
          nextBtn.addEventListener('click', () => {
            if (activeStepIndex < steps.length - 1) {
              activeStepIndex++;
              renderModalContent();
            } else {
              modalOverlay.classList.remove('active');
              document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            }
          });
        }
      }

      renderModalContent();
    }

    modalOverlay.classList.add('active');
  }

  // Close Modal Listeners
  modalClose.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  });

  renderFilters();
  renderProjects();
}
