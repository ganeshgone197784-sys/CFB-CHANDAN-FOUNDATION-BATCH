// =========================================================
// CFB — Chandan Foundation Batch — site behaviour
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('is-hidden'), 400);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader && loader.classList.add('is-hidden'), 2500);

  /* ---------- Theme toggle (persists only for this session, no storage APIs needed beyond simple class) ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  let theme = 'dark';
  try {
    const saved = window.localStorage ? localStorage.getItem('cfb-theme') : null;
    if (saved) theme = saved;
  } catch (e) { /* localStorage unavailable, default to dark */ }
  body.setAttribute('data-theme', theme);
  themeToggle.setAttribute('aria-pressed', theme === 'light');

  themeToggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-pressed', theme === 'light');
    try { localStorage.setItem('cfb-theme', theme); } catch (e) {}
  });

  /* ---------- Mobile nav ---------- */
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      burger.setAttribute('aria-expanded', false);
      burger.setAttribute('aria-label', 'Open menu');
    });
  });

  /* ---------- Sticky nav background + active link ---------- */
  const nav = document.getElementById('nav');
  const sections = document.querySelectorAll('main section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[data-nav]');

  function onScroll() {
    nav.classList.toggle('is-scrolled', window.scrollY > 20);

    let currentId = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) currentId = section.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('is-active', a.getAttribute('href') === `#${currentId}`);
    });

    const backToTop = document.getElementById('backToTop');
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Back to top ---------- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.leader-card, .mission-card, .program-card, .resource-card, .why-card, .testi-card, .dash-card, .about-lead, .about-side, .section-title, .section-sub'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealTargets.forEach(el => io.observe(el));

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // close others
      document.querySelectorAll('.faq-q').forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          other.closest('.faq-item').querySelector('.faq-a').style.maxHeight = null;
        }
      });

      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = isOpen ? null : answer.scrollHeight + 'px';
    });
  });

  /* ---------- Programs (placeholder data, easy to replace) ---------- */
  const programs = [
    {
      name: 'Foundation Builder — Placeholder',
      description: 'Core-concept program covering fundamentals across key subjects.',
      duration: '12 Weeks',
      level: 'Beginner',
      instructor: 'Instructor TBA'
    },
    {
      name: 'Structured Practice Track — Placeholder',
      description: 'Guided practice and problem-solving to reinforce fundamentals.',
      duration: '8 Weeks',
      level: 'Intermediate',
      instructor: 'Instructor TBA'
    },
    {
      name: 'Mastery & Mentorship — Placeholder',
      description: 'Advanced problem sets with mentorship and doubt-solving support.',
      duration: '10 Weeks',
      level: 'Advanced',
      instructor: 'Instructor TBA'
    }
  ];

  const programGrid = document.getElementById('programGrid');
  if (programGrid) {
    programGrid.innerHTML = programs.map(p => `
      <article class="program-card">
        <span class="program-level">${p.level}</span>
        <h3 class="program-name">${p.name}</h3>
        <p class="program-desc">${p.description}</p>
        <div class="program-meta">
          <span>${p.duration}</span>
          <span>${p.instructor}</span>
        </div>
        <a href="#contact" class="program-btn">View Details</a>
      </article>
    `).join('');

    // Re-observe newly created cards for reveal animation
    programGrid.querySelectorAll('.program-card').forEach(el => {
      el.classList.add('reveal');
      io.observe(el);
    });
  }

  /* ---------- Contact form (front-end only, no backend wired up) ---------- */
  const form = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        formNote.textContent = 'Please fill in all required fields.';
        formNote.style.color = '#e08a8a';
        return;
      }
      formNote.style.color = '';
      formNote.textContent = 'Thanks — this form is a prototype and is not yet connected to an inbox.';
      form.reset();
    });
  }

});
