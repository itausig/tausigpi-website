/* Tausig & Associates — Site JS */

(function() {
  'use strict';

  /* --- Theme Toggle --- */
  var themeToggle = document.querySelector('[data-theme-toggle]');
  var root = document.documentElement;
  var stored = localStorage.getItem('tausig-theme');
  var currentTheme = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  root.setAttribute('data-theme', currentTheme);
  updateToggleIcon();

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      localStorage.setItem('tausig-theme', currentTheme);
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
  var mobileMenuBtn = document.querySelector('[data-mobile-menu]');
  var mobileNav = document.querySelector('.mobile-nav');

  function closeMobileMenu() {
    if (!mobileNav || !mobileNav.classList.contains('is-open')) return;
    mobileNav.classList.remove('is-open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileMenuBtn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    document.body.style.overflow = '';
    mobileMenuBtn.focus();
  }

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      var isOpen = mobileNav.classList.toggle('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
      mobileMenuBtn.innerHTML = isOpen
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Focus trap for mobile menu */
    mobileNav.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMobileMenu();
        return;
      }
      if (e.key !== 'Tab') return;

      var focusable = mobileNav.querySelectorAll('a[href]');
      if (focusable.length === 0) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    /* Escape key from anywhere when menu is open */
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });

    /* Auto-close mobile menu on resize past desktop breakpoint */
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 1024 && mobileNav.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
  }

  /* --- Services Dropdown Keyboard Navigation --- */
  var dropdown = document.querySelector('.nav-dropdown');
  if (dropdown) {
    var trigger = dropdown.querySelector('button.nav-link');
    var menu = dropdown.querySelector('.nav-dropdown__menu');
    var menuItems = menu ? menu.querySelectorAll('a[role="menuitem"]') : [];

    if (trigger && menu && menuItems.length > 0) {
      trigger.addEventListener('click', function(e) {
        e.preventDefault();
        var isOpen = menu.style.visibility === 'visible';
        if (isOpen) {
          closeDropdown();
        } else {
          menu.style.opacity = '1';
          menu.style.visibility = 'visible';
          trigger.setAttribute('aria-expanded', 'true');
          menuItems[0].focus();
        }
      });

      trigger.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          menu.style.opacity = '1';
          menu.style.visibility = 'visible';
          trigger.setAttribute('aria-expanded', 'true');
          menuItems[0].focus();
        }
      });

      function closeDropdown() {
        menu.style.opacity = '';
        menu.style.visibility = '';
        trigger.setAttribute('aria-expanded', 'false');
      }

      menu.addEventListener('keydown', function(e) {
        var currentIndex = Array.prototype.indexOf.call(menuItems, document.activeElement);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          var next = currentIndex + 1 < menuItems.length ? currentIndex + 1 : 0;
          menuItems[next].focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          var prev = currentIndex - 1 >= 0 ? currentIndex - 1 : menuItems.length - 1;
          menuItems[prev].focus();
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closeDropdown();
          trigger.focus();
        } else if (e.key === 'Tab') {
          closeDropdown();
        }
      });

      /* Close dropdown when focus leaves */
      dropdown.addEventListener('focusout', function(e) {
        if (!dropdown.contains(e.relatedTarget)) {
          closeDropdown();
        }
      });
    }
  }

  /* --- Header scroll shadow --- */
  var header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
    }, { passive: true });
  }

  /* --- Back to Top Button --- */
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 600) {
        backToTop.classList.add('is-visible');
      } else {
        backToTop.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* --- Scroll-triggered Reveal Animations --- */
  var revealElements = document.querySelectorAll('.card, .case-card, .capability, .practice-card, .value-item, .article-listing');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      revealElements.forEach(function(el) {
        el.classList.add('reveal');
        observer.observe(el);
      });
    }
  }

  /* --- Contact Form (Formspree) --- */
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var formStatus = document.getElementById('form-status');

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = contactForm.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Sending\u2026';
      btn.disabled = true;
      btn.style.opacity = '0.6';
      if (formStatus) formStatus.textContent = '';

      var data = new FormData(contactForm);

      fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function(response) {
        if (response.ok) {
          btn.textContent = 'Message Sent';
          if (formStatus) formStatus.textContent = 'Your message has been sent. We will respond within one business day.';
          contactForm.reset();
          setTimeout(function() {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.opacity = '1';
          }, 4000);
        } else {
          throw new Error('Form submission failed');
        }
      }).catch(function() {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.opacity = '1';
        if (formStatus) formStatus.textContent = 'There was a problem sending your message. Please try again or call us at 916-345-4430.';
      });
    });
  }
})();
