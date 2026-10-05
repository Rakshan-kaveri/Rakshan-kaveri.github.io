const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
const revealItems = document.querySelectorAll('.reveal');
const backToTop = document.querySelector('.back-to-top');
const yearNode = document.querySelector('[data-year]');
const skillsGrid = document.getElementById('skills-grid');

const renderSkills = () => {
  if (!skillsGrid || !window.skillGroups) return;

  skillsGrid.innerHTML = window.skillGroups
    .map(
      (group) => `
        <div class="skill-group">
          <h3>${group.title}</h3>
          <div class="skill-grid">
            ${group.skills
              .map(
                (skill) => `
                  <div class="skill-item">
                    <div class="skill-logo" aria-label="${skill.name}">${skill.short}</div>
                    <span class="skill-name">${skill.name}</span>
                  </div>
                `
              )
              .join('')}
          </div>
        </div>
      `
    )
    .join('');
};

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

renderSkills();

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => sectionObserver.observe(item));

const navLinks = document.querySelectorAll('.site-nav a');
const sections = document.querySelectorAll('main section[id]');

const updateActiveNav = () => {
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const id = section.getAttribute('id');
    const element = document.querySelector(`.site-nav a[href="#${id}"]`);

    if (!element) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPosition >= top && scrollPosition < bottom) {
      navLinks.forEach((link) => link.classList.remove('active'));
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

const loader = document.querySelector('.loader');
window.addEventListener('load', () => {
  window.setTimeout(() => {
    if (loader) {
      loader.classList.add('hidden');
    }
  }, 220);
});

window.addEventListener('scroll', () => {
  if (!backToTop) return;
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});
