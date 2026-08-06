/* =========================================================
   ANIMATION.JS
   Loading screen, cursor glow, animated counters, and
   scroll-triggered skill bar fills.
   ========================================================= */

/* ---------- Loading screen ----------
   Hides on DOMContentLoaded (only needs our own HTML/CSS/JS, not any
   external CDN resource) with a short minimum-display delay for the
   fill animation. A hard fallback timeout guarantees the loader can
   never get stuck on screen even in the worst case. */
(function () {
  const loader = document.getElementById('loader');
  if (!loader) return;

  function hideLoader() {
    loader.classList.add('is-hidden');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setTimeout(hideLoader, 700);
    });
  } else {
    // DOM already parsed by the time this script runs
    setTimeout(hideLoader, 700);
  }

  // Absolute safety net: never let the loader stay up longer than this,
  // no matter what else happens on the page.
  setTimeout(hideLoader, 3000);
})();

/* ---------- Cursor glow (desktop only) ---------- */
(function () {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.matchMedia('(hover: none)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    // Ease toward the mouse position for a soft trailing effect
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.transform = 'translate(' + currentX + 'px, ' + currentY + 'px) translate(-50%, -50%)';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
})();

/* ---------- Animated statistic counters ---------- */
(function () {
  const counters = document.querySelectorAll('.stat-card__num');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { counterObserver.observe(el); });
})();

/* ---------- Skill bar fill on scroll into view ---------- */
(function () {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;

  const barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const percent = entry.target.getAttribute('data-percent') || '0';
        const fill = entry.target.querySelector('.skill-bar__fill');
        if (fill) fill.style.width = percent + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(function (bar) { barObserver.observe(bar); });
})();
