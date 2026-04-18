(function () {
  'use strict';

  /* ---- Nav scroll effect ---- */
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ---- Mobile nav ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');

  function openMobile() {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  window.closeMobile = function () {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', openMobile);
  hamburger.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') openMobile();
  });
  mobileClose.addEventListener('click', window.closeMobile);

  /* ---- Scroll reveal ---- */
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => io.observe(el));

  /* ---- Skill bar animation ---- */
  const skillFills = document.querySelectorAll('.skill-bar-fill');
  const skillIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const pct = fill.getAttribute('data-width');
        setTimeout(() => { fill.style.width = pct + '%'; }, 200);
        skillIO.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

  skillFills.forEach(fill => skillIO.observe(fill));

  /* ---- Typewriter effect on hero title ---- */
  const nameEl = document.querySelector('.hero-title .name');
  if (nameEl) {
    const text = nameEl.textContent;
    nameEl.textContent = '';
    let i = 0;
    const type = () => {
      if (i < text.length) {
        nameEl.textContent += text[i++];
        setTimeout(type, 55);
      }
    };
    setTimeout(type, 400);
  }

  /* ---- Active nav link highlight ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) cur = sec.id;
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === '#' + cur
        ? 'var(--purple-300)'
        : '';
    });
  }, { passive: true });

  /* ---- Smooth parallax on bg orbs ---- */
  const orbs = document.querySelectorAll('.bg-orb');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = 0.04 + i * 0.015;
      orb.style.transform = `translateY(${y * speed}px)`;
    });
  }, { passive: true });

  /* ---- Project card glow on mouse ---- */
  document.querySelectorAll('.project-card, .reality-card, .skill-group, .learning-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

})();
