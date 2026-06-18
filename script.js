/**
 * QA Portfolio — Sadman Shakib Aungon
 * Interactive behaviors: navbar, smooth scroll, animations
 */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navAnchors = navLinks.querySelectorAll('a');
  const contactForm = document.getElementById('contactForm');
  const skillFills = document.querySelectorAll('.skill-fill');

  /* --- Sticky Navbar Shadow --- */
  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  }

  /* --- Active Nav Link Highlight --- */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navAnchors.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  /* --- Mobile Nav Toggle --- */
  function toggleNav() {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  }

  function closeNav() {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', toggleNav);

  navAnchors.forEach(function (link) {
    link.addEventListener('click', function () {
      closeNav();
    });
  });

  /* --- Smooth Scroll (fallback for browsers without CSS scroll-behavior) --- */
  navAnchors.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  document.querySelectorAll('.nav-logo').forEach(function (logo) {
    logo.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
      closeNav();
    });
  });

  /* --- Skill Bar Animation on Scroll --- */
  function animateSkillBars() {
    skillFills.forEach(function (fill) {
      const rect = fill.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight - 50;

      if (isVisible && !fill.classList.contains('animated')) {
        const width = fill.getAttribute('data-width');
        fill.style.width = width + '%';
        fill.classList.add('animated');
      }
    });
  }

  /* --- Fade-in Animation on Scroll --- */
  function initFadeIn() {
    const elements = document.querySelectorAll(
      '.project-card, .tool-card, .contact-card, .about-info-card, .bug-report-card, .skill-item'
    );

    elements.forEach(function (el) {
      el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* --- Contact Form Handler --- */
  function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent('Portfolio Contact from ' + name);
    const body = encodeURIComponent(
      'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message
    );

    window.location.href = 'mailto:sadman.shakib.aungon@gmail.com?subject=' + subject + '&body=' + body;
    contactForm.reset();
  }

  contactForm.addEventListener('submit', handleFormSubmit);

  /* --- Close mobile nav on outside click --- */
  document.addEventListener('click', function (e) {
    if (
      navLinks.classList.contains('open') &&
      !navLinks.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeNav();
    }
  });

  /* --- Close mobile nav on resize --- */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeNav();
    }
  });

  /* --- Init --- */
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('scroll', animateSkillBars, { passive: true });

  handleScroll();
  animateSkillBars();
  initFadeIn();
})();
