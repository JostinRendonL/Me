/**
 * ════════════════════════════════════════════════════
 * JOSTIN RENDÓN — Portfolio · script.js
 *
 * Modules:
 *  1. i18n System       — JSON translations + DOM update
 *  2. Loader            — Page entry animation
 *  3. Custom Cursor     — Magnetic cursor effect
 *  4. Navbar            — Scroll state + active link
 *  5. Mobile Menu       — Hamburger toggle
 *  6. Hero Typing       — Typewriter effect
 *  7. Scroll Reveal     — IntersectionObserver
 *  8. Contact Form      — Validation + submission
 *  9. Back to Top       — Show/hide button
 * ════════════════════════════════════════════════════
 */

'use strict';

/* ══════════════════════════════════════════════════════
   1. i18n SYSTEM
   ──────────────────────────────────────────────────────
   Uses data-i18n attributes to identify translatable nodes.
   Translations are stored in a nested JSON object below.
   applyLang() walks the DOM and updates innerHTML / placeholder
   without a page reload. Language preference is saved to
   localStorage for persistence.
══════════════════════════════════════════════════════ */
const i18n = {
  en: {
    'nav.about':        'About',
    'nav.skills':       'Skills',
    'nav.experience':   'Experience',
    'nav.projects':     'Projects',
    'nav.contact':      'Contact',

    'hero.eyebrow':     'Guayaquil, Ecuador · Available for Remote Work',
    'hero.roleStatic':  'I build',
    'hero.desc':        "Systems Engineering student with real-world experience in web development, IT support, and AI-powered automation. I don't just learn — I deliver.",
    'hero.cta1':        'View My Work',
    'hero.cta2':        "Let's Talk",
    'hero.stat1':       'Real Projects',
    'hero.stat2':       'IBM Certifications',
    'hero.stat3':       'English Level',
    'hero.scroll':      'scroll',

    'about.tag':        'About Me',
    'about.title':      'More than a student —<br /><em>a professional</em>',
    'about.p1':         "I'm a Systems Engineering student at the University of Guayaquil (evening program), which means I'm fully available during business hours. I've worked in real corporate environments — not just studied about them.",
    'about.p2':         "At RUBASA I led a full payroll data migration with zero errors. At QUIMPAC S.A. I independently maintained 30+ workstations. I use AI tools daily to automate workflows and build efficient solutions.",
    'about.p3':         "I'm bilingual (Cambridge B2 English), IBM-certified in Cybersecurity & Networking, and currently expanding into WordPress development and freelance consulting.",
    'about.badge':      'Open to Work',
    'about.cta':        'Download CV',

    'chip.engineering': 'Systems Engineering',
    'chip.bilingual':   'Bilingual EN/ES',
    'chip.ibm':         'IBM Certified',
    'chip.available':   'US Hours Available',
    'chip.ai':          'AI-Powered Workflows',

    'skills.tag':       'Technical Stack',
    'skills.title':     'What I Work With',
    'skill.web':        'Web Development',
    'skill.it':         'IT Support',
    'skill.cyber':      'Cybersecurity',
    'skill.admin':      'Administration',
    'skill.ai':         'AI & Automation',
    'skill.lang':       'Languages',

    'exp.tag':          'Experience & Education',
    'exp.title':        'My Journey',
    'exp.role1':        'Virtual Assistant & HR Administrative',
    'exp.r1b1':         'Led full payroll data migration (IESS & SUT) — 100% of records, zero errors, on schedule.',
    'exp.r1b2':         'Managed complete employee file system: contracts, compliance, audit-ready documentation.',
    'exp.r1b3':         'Automated recurring admin tasks using AI tools, reducing manual effort across the team.',
    'exp.r1b4':         'Provided remote technical support via AnyDesk & TeamViewer to multi-location staff.',
    'exp.role2':        'IT Support Intern',
    'exp.r2b1':         'Independently maintained 30+ workstations with preventive & corrective maintenance.',
    'exp.r2b2':         'Deployed OS installations and software updates across the company network.',
    'exp.r2b3':         'Resolved Tier-1 support requests independently, escalating only complex cases.',
    'exp.r2b4':         'Documented all incidents using ServiceDesk/Freshdesk-style workflows.',
    'exp.role3':        'Customer Service & Sales Agent',
    'exp.r3b1':         'Handled high-volume inbound calls for technical and administrative resolution.',
    'exp.r3b2':         'Consistently exceeded monthly sales targets: 15–20 closings vs. a baseline of 10.',
    'exp.r3b3':         'Developed strong objection handling and CRM documentation skills.',
    'exp.role4':        'Systems Engineering',
    'exp.r4b1':         'Evening program — 100% available during US business hours (ET/CT/PT).',
    'exp.r4b2':         'Focus areas: software development, networking, databases, and information systems.',
    'exp.role5':        'IBM Cybersecurity & Networking Certifications',
    'tl.work':          'Work',
    'tl.edu':           'Education',
    'tl.cert':          'Certifications',

    'proj.tag':         'Selected Work',
    'proj.title':       'Projects That Exist',
    'proj.sub':         'Not mockups. Not course exercises. Real pages, real code.',
    'proj.demo':        'Live Demo',
    'proj.code':        'Source Code',
    'proj.request':     'Request Details',
    'proj.viewing':     "You're Here",
    'proj.cat.web':     'Web Design',
    'proj.cat.ecommerce':'E-Commerce',
    'proj.cat.hr':      'HR Operations',
    'proj.cat.it':      'IT Infrastructure',
    'proj.cat.portfolio':'Portfolio',
    'proj.desc1':       'Full restaurant website with hero animations, interactive menu with filter tabs, gallery, reservations form, and full responsive design. Ecuadorian cuisine concept.',
    'proj.desc2':       'Premium barbershop landing page with full-screen hero, animated service cards, team section, gallery mosaic, and booking form. Dark luxury aesthetic.',
    'proj.desc3':       'Full e-commerce fashion store with EN/ES i18n system, functional cart drawer with qty management, product filters, hero slider, newsletter form, and checkout flow.',
    'proj.name4':       'Payroll Migration',
    'proj.desc4':       'Led a full payroll system migration at RUBASA — transferred 100% of employee records to IESS & SUT with zero errors, under tight deadline during a company-wide transition.',
    'proj.name5':       '30+ Workstations',
    'proj.desc5':       'Independently managed preventive & corrective maintenance for 30+ workstations at QUIMPAC S.A. Standardized OS configurations and resolved Tier-1 support autonomously.',
    'proj.name6':       'This Portfolio',
    'proj.desc6':       'Built from scratch — custom cursor, typing animation, floating tags, scroll reveal, bilingual i18n, contact form validation, and full mobile-first responsive layout. No frameworks.',

    'certs.tag':        'Certifications',
    'certs.title':      'Verified Credentials',
    'cert.google':      'Google IT Support Professional',
    'cert.net':         'Computer Networks & Network Security',
    'cert.cyber1':      'Cybersecurity Tools & Cyberattacks',
    'cert.cyber2':      'Cybersecurity Essentials',
    'cert.os':          'OS Overview, Administration & Security',
    'cert.cambridge':   'Cambridge English B2',
    'cert.careers':     'Cybersecurity Careers',
    'cert.verified':    'Verified',

    'contact.tag':      'Get In Touch',
    'contact.title':    "Let's build<br /><em>something real</em>",
    'contact.desc':     'Available for freelance projects, remote positions, and long-term collaborations. Response within 24 hours — guaranteed.',
    'contact.emailLabel':'Email',
    'contact.phoneLabel':'Phone / WhatsApp',
    'contact.available':'Available for new projects',

    'form.name':        'Name',
    'form.namePh':      'Your full name',
    'form.nameErr':     'Please enter your name.',
    'form.email':       'Email',
    'form.emailPh':     'your@email.com',
    'form.emailErr':    'Please enter a valid email.',
    'form.subject':     'Subject',
    'form.subjectPlaceholder': 'Select a subject',
    'form.subjectErr':  'Please select a subject.',
    'form.opt.web':     'Web Development Project',
    'form.opt.it':      'IT Support',
    'form.opt.va':      'Virtual Assistant',
    'form.opt.freelance':'Freelance Collaboration',
    'form.opt.other':   'Other',
    'form.message':     'Message',
    'form.messagePh':   'Tell me about your project or opportunity...',
    'form.msgErr':      'Please enter a message.',
    'form.send':        'Send Message',
    'form.success':     "Message sent! I'll get back to you within 24 hours.",

    'footer.tagline':   'Built from scratch. No templates. No frameworks.',
    'footer.copy':      '© 2025 Jostin Rendón. All rights reserved.',
    'footer.made':      'Designed & coded with intention.',
  },

  es: {
    'nav.about':        'Sobre mí',
    'nav.skills':       'Habilidades',
    'nav.experience':   'Experiencia',
    'nav.projects':     'Proyectos',
    'nav.contact':      'Contacto',

    'hero.eyebrow':     'Guayaquil, Ecuador · Disponible para Trabajo Remoto',
    'hero.roleStatic':  'Yo construyo',
    'hero.desc':        "Estudiante de Ingeniería en Sistemas con experiencia real en desarrollo web, soporte TI y automatización con IA. No solo aprendo — entrego resultados.",
    'hero.cta1':        'Ver Mi Trabajo',
    'hero.cta2':        'Hablemos',
    'hero.stat1':       'Proyectos Reales',
    'hero.stat2':       'Certificaciones IBM',
    'hero.stat3':       'Nivel de Inglés',
    'hero.scroll':      'deslizar',

    'about.tag':        'Sobre Mí',
    'about.title':      'Más que un estudiante —<br /><em>un profesional</em>',
    'about.p1':         "Soy estudiante de Ingeniería en Sistemas en la Universidad de Guayaquil (turno nocturno), lo que significa que estoy completamente disponible en horario laboral. He trabajado en entornos corporativos reales, no solo los he estudiado.",
    'about.p2':         "En RUBASA lideré una migración completa de datos de nómina sin errores. En QUIMPAC S.A. mantuve de forma independiente más de 30 estaciones de trabajo. Uso herramientas de IA diariamente para automatizar flujos y construir soluciones eficientes.",
    'about.p3':         "Soy bilingüe (Cambridge B2 en inglés), certificado por IBM en Ciberseguridad y Redes, y actualmente me expando hacia el desarrollo WordPress y consultoría freelance.",
    'about.badge':      'Disponible',
    'about.cta':        'Descargar CV',

    'chip.engineering': 'Ingeniería en Sistemas',
    'chip.bilingual':   'Bilingüe EN/ES',
    'chip.ibm':         'Certificado IBM',
    'chip.available':   'Horario EE.UU.',
    'chip.ai':          'Automatización con IA',

    'skills.tag':       'Stack Técnico',
    'skills.title':     'Con Qué Trabajo',
    'skill.web':        'Desarrollo Web',
    'skill.it':         'Soporte TI',
    'skill.cyber':      'Ciberseguridad',
    'skill.admin':      'Administración',
    'skill.ai':         'IA y Automatización',
    'skill.lang':       'Idiomas',

    'exp.tag':          'Experiencia y Educación',
    'exp.title':        'Mi Trayectoria',
    'exp.role1':        'Asistente Virtual y Administrativo RRHH',
    'exp.r1b1':         'Lideré migración completa de nómina (IESS & SUT) — 100% de registros, sin errores, en plazo.',
    'exp.r1b2':         'Administré sistema completo de expedientes: contratos, cumplimiento, documentación lista para auditoría.',
    'exp.r1b3':         'Automaticé tareas administrativas recurrentes con IA, reduciendo el trabajo manual del equipo.',
    'exp.r1b4':         'Brindé soporte técnico remoto vía AnyDesk & TeamViewer a personal en múltiples ubicaciones.',
    'exp.role2':        'Practicante de Soporte TI',
    'exp.r2b1':         'Mantuve de forma independiente 30+ estaciones de trabajo con mantenimiento preventivo y correctivo.',
    'exp.r2b2':         'Desplegué instalaciones de SO y actualizaciones de software en la red empresarial.',
    'exp.r2b3':         'Resolví solicitudes de soporte Tier-1 de forma autónoma, escalando solo casos complejos.',
    'exp.r2b4':         'Documenté todas las incidencias con flujos estilo ServiceDesk/Freshdesk.',
    'exp.role3':        'Agente de Atención al Cliente y Ventas',
    'exp.r3b1':         'Atendí alto volumen de llamadas entrantes para resolución técnica y administrativa.',
    'exp.r3b2':         'Superé consistentemente las metas mensuales: 15-20 cierres frente a una base de 10.',
    'exp.r3b3':         'Desarrollé habilidades sólidas en manejo de objeciones y documentación en CRM.',
    'exp.role4':        'Ingeniería en Sistemas',
    'exp.r4b1':         'Turno nocturno — 100% disponible en horario laboral de EE.UU. (ET/CT/PT).',
    'exp.r4b2':         'Áreas de enfoque: desarrollo de software, redes, bases de datos y sistemas de información.',
    'exp.role5':        'Certificaciones IBM en Ciberseguridad y Redes',
    'tl.work':          'Trabajo',
    'tl.edu':           'Educación',
    'tl.cert':          'Certificaciones',

    'proj.tag':         'Trabajo Seleccionado',
    'proj.title':       'Proyectos Reales',
    'proj.sub':         'No son mockups. No son ejercicios de curso. Páginas reales, código real.',
    'proj.demo':        'Demo en Vivo',
    'proj.code':        'Código Fuente',
    'proj.request':     'Solicitar Detalles',
    'proj.viewing':     'Estás Aquí',
    'proj.cat.web':     'Diseño Web',
    'proj.cat.ecommerce':'E-Commerce',
    'proj.cat.hr':      'RRHH',
    'proj.cat.it':      'Infraestructura TI',
    'proj.cat.portfolio':'Portafolio',
    'proj.desc1':       'Sitio web completo de restaurante con animaciones, menú interactivo con filtros, galería, formulario de reservas y diseño responsive. Concepto de cocina ecuatoriana.',
    'proj.desc2':       'Landing page de barbería premium con hero full-screen, tarjetas de servicio animadas, sección de equipo, galería mosaico y formulario de citas.',
    'proj.desc3':       'Tienda e-commerce de moda con sistema i18n EN/ES, carrito funcional con gestión de cantidades, filtros de productos, slider hero y flujo de checkout.',
    'proj.name4':       'Migración de Nómina',
    'proj.desc4':       'Lideré la migración completa del sistema de nómina en RUBASA — transferí el 100% de registros a IESS & SUT sin errores, bajo plazo ajustado durante una transición empresarial.',
    'proj.name5':       '30+ Estaciones',
    'proj.desc5':       'Gestioné de forma independiente el mantenimiento de 30+ estaciones en QUIMPAC S.A. Estandaricé configuraciones de SO y resolví soporte Tier-1 autónomamente.',
    'proj.name6':       'Este Portafolio',
    'proj.desc6':       'Construido desde cero — cursor personalizado, animación de tipeo, etiquetas flotantes, scroll reveal, i18n bilingüe, validación de formulario y diseño mobile-first. Sin frameworks.',

    'certs.tag':        'Certificaciones',
    'certs.title':      'Credenciales Verificadas',
    'cert.google':      'Profesional de Soporte de TI de Google',
    'cert.net':         'Redes y Seguridad de Red',
    'cert.cyber1':      'Herramientas y Ciberataques',
    'cert.cyber2':      'Fundamentos de Ciberseguridad',
    'cert.os':          'Sistemas Operativos: Admin & Seguridad',
    'cert.cambridge':   'Cambridge Inglés B2',
    'cert.careers':     'Carreras en Ciberseguridad',
    'cert.verified':    'Verificado',

    'contact.tag':      'Contacto',
    'contact.title':    'Construyamos<br /><em>algo real</em>',
    'contact.desc':     'Disponible para proyectos freelance, posiciones remotas y colaboraciones a largo plazo. Respuesta en menos de 24 horas — garantizado.',
    'contact.emailLabel':'Correo',
    'contact.phoneLabel':'Teléfono / WhatsApp',
    'contact.available':'Disponible para nuevos proyectos',

    'form.name':        'Nombre',
    'form.namePh':      'Tu nombre completo',
    'form.nameErr':     'Por favor ingresa tu nombre.',
    'form.email':       'Correo',
    'form.emailPh':     'tu@correo.com',
    'form.emailErr':    'Por favor ingresa un correo válido.',
    'form.subject':     'Asunto',
    'form.subjectPlaceholder': 'Selecciona un asunto',
    'form.subjectErr':  'Por favor selecciona un asunto.',
    'form.opt.web':     'Proyecto de Desarrollo Web',
    'form.opt.it':      'Soporte TI',
    'form.opt.va':      'Asistente Virtual',
    'form.opt.freelance':'Colaboración Freelance',
    'form.opt.other':   'Otro',
    'form.message':     'Mensaje',
    'form.messagePh':   'Cuéntame sobre tu proyecto u oportunidad...',
    'form.msgErr':      'Por favor ingresa un mensaje.',
    'form.send':        'Enviar Mensaje',
    'form.success':     '¡Mensaje enviado! Te respondo en menos de 24 horas.',

    'footer.tagline':   'Construido desde cero. Sin plantillas. Sin frameworks.',
    'footer.copy':      '© 2025 Jostin Rendón. Todos los derechos reservados.',
    'footer.made':      'Diseñado y codificado con intención.',
  }
};

/* Initialize EmailJS */
emailjs.init("RxtPZYij4D3MxKDPj");

/* Current language state — persisted to localStorage */
let currentLang = localStorage.getItem('jr-lang') || 'en';

/**
 * applyLang()
 * Walks the DOM for every [data-i18n] element and sets innerHTML.
 * Placeholders are handled via [data-i18n-placeholder].
 * Select option text is handled via [data-i18n] on <option> elements.
 */
function applyLang() {
  const dict = i18n[currentLang];

  /* 1. Regular text nodes */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });

  /* 2. Input / textarea placeholders */
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key] !== undefined) el.placeholder = dict[key];
  });

  /* 3. Update lang-opt active state */
  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.classList.toggle('active', opt.dataset.lang === currentLang);
  });

  /* 4. Update typing words array */
  if (typeof initTyping === 'function') initTyping();
}

function switchLang(lang) {
  if (lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem('jr-lang', lang);
  applyLang();
}

/* Attach lang-opt click listeners (works for both nav & mobile) */
function initLang() {
  document.querySelectorAll('.lang-opt').forEach(opt => {
    opt.addEventListener('click', () => switchLang(opt.dataset.lang));
  });
  /* Also attach to the lang-toggle wrapper for UX */
  document.querySelectorAll('.lang-toggle, .mobile-lang').forEach(wrap => {
    wrap.addEventListener('click', () => {
      const next = currentLang === 'en' ? 'es' : 'en';
      switchLang(next);
    });
  });
}

/* ══════════════════════════════════════════════════════
   2. PAGE LOADER
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
   3. CUSTOM CURSOR
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
   4. NAVBAR
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
   5. MOBILE MENU
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
   6. HERO TYPING EFFECT
   Cycles through role strings with typewriter animation.
   Words change based on currentLang.
══════════════════════════════════════════════════════ */
const typingWords = {
  en: [
    'websites that convert.',
    'IT solutions that work.',
    'automation that saves time.',
    'bilingual digital experiences.',
    'clean, maintainable code.',
  ],
  es: [
    'sitios web que convierten.',
    'soluciones TI que funcionan.',
    'automatización que ahorra tiempo.',
    'experiencias digitales bilingües.',
    'código limpio y mantenible.',
  ]
};

let typingTimer = null;

function initTyping() {
  const el = document.getElementById('typingEl');
  if (!el) return;

  clearTimeout(typingTimer);
  el.textContent = '';

  const words = typingWords[currentLang] || typingWords.en;
  let wordIdx = 0;
  let charIdx = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIdx];

    if (!deleting) {
      charIdx++;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === word.length) {
        deleting = true;
        typingTimer = setTimeout(tick, 1800);
        return;
      }
    } else {
      charIdx--;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx  = (wordIdx + 1) % words.length;
      }
    }

    const speed = deleting ? 40 : 65;
    typingTimer = setTimeout(tick, speed);
  }

  typingTimer = setTimeout(tick, 600);
}

/* ══════════════════════════════════════════════════════
   7. SCROLL REVEAL — IntersectionObserver
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
   8. CONTACT FORM — Validation + Submission
══════════════════════════════════════════════════════ */
function initContactForm() {
  const form      = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('fname');
  const emailInput= document.getElementById('femail');
  const subjectInput = document.getElementById('fsubject');
  const msgInput  = document.getElementById('fmessage');
  const submitBtn = document.getElementById('submitBtn');
  const successEl = document.getElementById('formSuccess');

  const EMAIL_RE  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(input, errId, show) {
    const group = input.closest('.form-group');
    const err   = document.getElementById(errId);
    group.classList.toggle('error', show);
    if (err) err.style.display = show ? 'block' : 'none';
  }

  function validate() {
    let valid = true;

    if (!nameInput.value.trim()) {
      setError(nameInput, 'nameErr', true); valid = false;
    } else {
      setError(nameInput, 'nameErr', false);
    }

    if (!EMAIL_RE.test(emailInput.value.trim())) {
      setError(emailInput, 'emailErr', true); valid = false;
    } else {
      setError(emailInput, 'emailErr', false);
    }

    if (!subjectInput.value) {
      setError(subjectInput, 'subjectErr', true); valid = false;
    } else {
      setError(subjectInput, 'subjectErr', false);
    }

    if (!msgInput.value.trim()) {
      setError(msgInput, 'msgErr', true); valid = false;
    } else {
      setError(msgInput, 'msgErr', false);
    }

    return valid;
  }

  /* Clear errors on input */
  [nameInput, emailInput, subjectInput, msgInput].forEach(input => {
    input.addEventListener('input', () => {
      const errId = input.id === 'fname' ? 'nameErr'
                  : input.id === 'femail' ? 'emailErr'
                  : input.id === 'fsubject' ? 'subjectErr' : 'msgErr';
      setError(input, errId, false);
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate()) return;

    /* Loading state */
    submitBtn.disabled = true;
    const btnText = submitBtn.querySelector('span');
    if (btnText) btnText.textContent = currentLang === 'es' ? 'Enviando...' : 'Sending...';

    try {
      await emailjs.sendForm('service_sisi0ft', 'template_bw81pge', form);
      
      /* Success state */
      successEl.classList.add('show');
      successEl.querySelector('p').innerHTML = i18n[currentLang]['form.success'];
      
      /* Hide form elements except success message */
      Array.from(form.children).forEach(child => {
        if (child.id !== 'formSuccess') child.style.display = 'none';
      });
    } catch (error) {
      console.log(error);
      console.error('EmailJS Error:', error);
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = i18n[currentLang]['form.send'];
      alert(currentLang === 'es' ? 'Hubo un error al enviar el mensaje.' : 'There was an error sending the message.');
    }
  });
}

/* ══════════════════════════════════════════════════════
   9. BACK TO TOP
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
