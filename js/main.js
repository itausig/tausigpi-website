/* Tausig & Associates — Minimal JS */

(function() {
  'use strict';

  /* --- Theme Toggle --- */
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  // Default to dark
  let currentTheme = 'dark';
  root.setAttribute('data-theme', currentTheme);
  updateToggleIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      themeToggle.setAttribute('aria-label', 'Switch to ' + (currentTheme === 'dark' ? 'light' : 'dark') + ' mode');
      updateToggleIcon();
    });
  }

  function updateToggleIcon() {
    if (!themeToggle) return;
    themeToggle.innerHTML = currentTheme === 'dark'
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }

  /* --- Mobile Nav Toggle --- */
  const mobileMenuBtn = document.querySelector('[data-mobile-menu]');
  const mobileNav = document.querySelector('.mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      const isOpen = mobileNav.classList.toggle('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      mobileMenuBtn.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      // Prevent body scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* --- Header scroll shadow --- */
  const header = document.querySelector('.header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const currentScroll = window.scrollY;
      if (currentScroll > 20) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* --- Contact Form (front-end only) --- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Message Sent';
      btn.disabled = true;
      btn.style.opacity = '0.6';
      setTimeout(function() {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
        contactForm.reset();
      }, 3000);
    });
  }
})();
