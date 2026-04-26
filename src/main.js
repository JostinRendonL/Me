/**
 * ════════════════════════════════════════════════════
 * main.js — Orchestrator Module
 *
 * Imports all feature modules and initializes
 * every component on DOMContentLoaded.
 *
 * Modules:
 *  1. i18n System       — ./i18n.js
 *  2. Contact Form      — ./formHandler.js
 *  3. Loader            — Page entry animation
 *  4. Custom Cursor     — Magnetic cursor effect
 *  5. Navbar            — Scroll state + active link
 *  6. Mobile Menu       — Hamburger toggle
 *  7. Scroll Reveal     — IntersectionObserver
 *  8. Back to Top       — Show/hide button
 *  9. Smooth Scroll     — Anchor link behavior
 * ════════════════════════════════════════════════════
 */

'use strict';

import { initLang, applyLang, initTyping } from './i18n.js';
import { initContactForm } from './formHandler.js';

/* ══════════════════════════════════════════════════════
   PAGE LOADER
══════════════════════════════════════════════════════ */
function initLoader() {
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('done');
      /* Trigger hero reveals after loader */
      document.querySelectorAll('.hero .reveal-up').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), 100 + i * 120);
      });
    }, 1900);
  });
}

/* ══════════════════════════════════════════════════════
   CUSTOM CURSOR
══════════════════════════════════════════════════════ */
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  /* Smooth follower via rAF */
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  /* Hover state on interactive elements */
  const hoverEls = 'a, button, .skill-card, .proj-card, .cert-card, .c-link, .lang-opt, .chip';
  document.querySelectorAll(hoverEls).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
  });
}

/* ══════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  /* Scroll state */
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    /* Back to top button */
    const backTop = document.getElementById('backTop');
    if (backTop) backTop.classList.toggle('show', window.scrollY > 600);
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  /* Active section highlight via IntersectionObserver */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObs.observe(s));
}

/* ══════════════════════════════════════════════════════
   MOBILE MENU
══════════════════════════════════════════════════════ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const overlay   = document.getElementById('mobileOverlay');

  function toggle() {
    const open = hamburger.classList.toggle('open');
    overlay.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function close() {
    hamburger.classList.remove('open');
    overlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggle);

  /* Close on mobile link click */
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', close);
  });

  /* Close on Escape */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });
}

/* ══════════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
   Adds .visible class to .reveal-* elements as they
   enter the viewport. Stagger is handled via CSS
   --delay custom property set inline on each element.
══════════════════════════════════════════════════════ */
function initScrollReveal() {
  const revealEls = document.querySelectorAll(
    '.reveal-up, .reveal-left, .reveal-right'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => {
    /* Skip hero elements — they're triggered by loader instead */
    if (!el.closest('.hero')) observer.observe(el);
  });
}

/* ══════════════════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════════════════ */
function initBackTop() {
  const btn = document.getElementById('backTop');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ══════════════════════════════════════════════════════
   SMOOTH SCROLL for all anchor links
══════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth'
      });
    });
  });
}

/* ══════════════════════════════════════════════════════
   INIT — Run everything on DOMContentLoaded
══════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initLang();
  applyLang();       // Apply saved/default language on load
  initCursor();
  initNavbar();
  initMobileMenu();
  initTyping();
  initScrollReveal();
  initContactForm();
  initBackTop();
  initSmoothScroll();
});
