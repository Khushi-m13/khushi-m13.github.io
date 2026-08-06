/* =========================================================
   SCRIPT.JS
   Core site behaviour: navigation, third-party library
   initialisation, project filtering, and misc UI interactions.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Scroll reveal (self-contained, no external library) ----------
     Replaces AOS: adds .in-view to any [data-aos] element once it scrolls
     into the viewport, honoring optional data-aos-delay (ms). This has no
     external dependency, so it can never leave content permanently hidden
     if a CDN script fails to load. */
  const revealEls = document.querySelectorAll('[data-aos]');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.getAttribute('data-aos-delay'), 10) || 0;
            setTimeout(function () {
              entry.target.classList.add('in-view');
            }, delay);
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

      revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
      // Very old browsers without IntersectionObserver: just show everything
      revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }
  }

  /* ---------- Typed.js init (rotating role text) ---------- */
  if (typeof Typed !== 'undefined' && document.getElementById('typed')) {
    new Typed('#typed', {
      strings: ['Data.', 'Python.', 'Java.', 'Models.', 'Purpose.'],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1400,
      loop: true,
      smartBackspace: true
    });
  }

  /* ---------- Vanilla-Tilt init ---------- */
  if (typeof VanillaTilt !== 'undefined') {
    const tiltEls = document.querySelectorAll('[data-tilt]');
    if (tiltEls.length) VanillaTilt.init(tiltEls);
  }

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a link is tapped
    navLinks.querySelectorAll('.nav__link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll-spy: highlight active nav link ---------- */
  const sections = document.querySelectorAll('main section[id], .hero[id]');
  const navLinkEls = document.querySelectorAll('.nav__link');

  function updateActiveLink() {
    let currentId = '';
    sections.forEach(function (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) {
        currentId = section.id;
      }
    });
    navLinkEls.forEach(function (link) {
      link.classList.toggle('active-link', link.getAttribute('href') === '#' + currentId);
    });
  }
  updateActiveLink();
  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* ---------- Project filter tabs ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(function (card) {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ---------- Back to top button ---------- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('is-visible', window.scrollY > 500);
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
