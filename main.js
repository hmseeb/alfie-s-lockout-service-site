// Alfie's Lockout Service — Main JS

document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile Nav Toggle ----
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');

  hamburger.addEventListener('click', function () {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  mainNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close nav on outside click
  document.addEventListener('click', function (e) {
    if (!mainNav.contains(e.target) && !hamburger.contains(e.target)) {
      mainNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // ---- Sticky Header Shadow ----
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.12)';
    } else {
      header.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
    }
  }, { passive: true });

  // ---- Contact Form Submission (mock) ----
  const form        = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Basic validation
      const name    = form.querySelector('#name').value.trim();
      const phone   = form.querySelector('#phone').value.trim();
      const service = form.querySelector('#service').value;

      if (!name || !phone || !service) {
        alert('Please fill in your name, phone number, and the service you need.');
        return;
      }

      // Show success state
      form.hidden = true;
      formSuccess.hidden = false;
    });
  }

  // ---- Floating CTA visibility ----
  const floatingCta = document.querySelector('.floating-cta');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      floatingCta.style.opacity  = '1';
      floatingCta.style.pointerEvents = 'auto';
    } else {
      floatingCta.style.opacity  = '0';
      floatingCta.style.pointerEvents = 'none';
    }
  }, { passive: true });

  // Initially hide floating CTA
  floatingCta.style.opacity     = '0';
  floatingCta.style.transition  = 'opacity 0.3s ease, transform 0.22s ease, box-shadow 0.22s ease';
  floatingCta.style.pointerEvents = 'none';

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerH = document.querySelector('.site-header').offsetHeight;
        const top     = target.getBoundingClientRect().top + window.pageYOffset - headerH - 12;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---- Scroll reveal animation ----
  const revealEls = document.querySelectorAll(
    '.service-card, .review-card, .step-card, .why-list li, .contact-item'
  );

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(function (el) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});
