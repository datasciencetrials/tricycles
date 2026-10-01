/*
 * Mobile navigation toggle for TRICYCLE Nexus.
 * Purely additive: does not modify any app logic, data, or API calls.
 * Injects a hamburger button into the existing .topbar and toggles an
 * off-canvas class on .nav-links (see mobile CSS block in the stylesheet).
 * Safe to run before or after the React app mounts — it waits for the
 * elements to exist rather than assuming a fixed load order.
 */
(function () {
  'use strict';

  function waitFor(selector, callback, timeoutMs) {
    var deadline = Date.now() + (timeoutMs || 8000);
    (function poll() {
      var el = document.querySelector(selector);
      if (el) {
        callback(el);
        return;
      }
      if (Date.now() > deadline) return;
      setTimeout(poll, 50);
    })();
  }

  function closeMenu(navLinks, btn) {
    navLinks.classList.remove('mobile-open');
    btn.classList.remove('is-active');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }

  function init() {
    waitFor('.topbar', function (topbar) {
      waitFor('.nav-links', function (navLinks) {
        if (topbar.querySelector('.hamburger-toggle')) return;

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'hamburger-toggle';
        btn.setAttribute('aria-label', 'Toggle navigation menu');
        btn.setAttribute('aria-expanded', 'false');
        btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        topbar.appendChild(btn);

        btn.addEventListener('click', function () {
          var isOpen = navLinks.classList.toggle('mobile-open');
          btn.classList.toggle('is-active', isOpen);
          btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
          btn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
        });

        navLinks.addEventListener('click', function (e) {
          if (e.target.closest('.nav-item')) closeMenu(navLinks, btn);
        });

        window.addEventListener('resize', function () {
          if (window.innerWidth > 768 && navLinks.classList.contains('mobile-open')) {
            closeMenu(navLinks, btn);
          }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
