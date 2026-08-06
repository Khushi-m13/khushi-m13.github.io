/* =========================================================
   PARTICLES.JS CONFIGURATION
   Sets up the ambient animated background particle field.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {
  // Guard: only run if particlesJS library loaded and target exists
  if (typeof particlesJS === 'undefined' || !document.getElementById('particles-js')) return;

  particlesJS('particles-js', {
    particles: {
      number: {
        value: 55,
        density: { enable: true, value_area: 900 }
      },
      color: { value: ['#8B5CF6', '#3B82F6', '#06B6D4'] },
      shape: { type: 'circle' },
      opacity: {
        value: 0.35,
        random: true,
        anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false }
      },
      size: {
        value: 2.5,
        random: true,
        anim: { enable: false }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#3B82F6',
        opacity: 0.15,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.9,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.4 } },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });
});
