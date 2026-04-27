/**
 * ════════════════════════════════════════════════════
 * formHandler.js — Contact Form Module
 *
 * Handles form validation, input sanitization,
 * honeypot anti-spam, and EmailJS submission.
 * ════════════════════════════════════════════════════
 */

'use strict';

import { i18n, getCurrentLang } from './i18n.js';

/* ── EmailJS Credentials ───────────────────────────────
   In a static site without a bundler, .env files cannot
   be read at runtime. These constants serve as the single
   source of truth — swap via CI/CD or a future build step.
   See .env.example for documentation.
──────────────────────────────────────────────────────── */
const EMAILJS_PUBLIC_KEY  = 'RxtPZYij4D3MxKDPj';
const EMAILJS_SERVICE_ID  = 'service_sisi0ft';
const EMAILJS_TEMPLATE_ID = 'template_bw81pge';

/**
 * Strips HTML tags and trims whitespace from user input.
 * @param {string} str - Raw user input
 * @returns {string} Sanitized string
 */
function sanitize(str) {
  return str.replace(/<[^>]*>/g, '').trim();
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  emailjs.init(EMAILJS_PUBLIC_KEY);

  const nameInput    = document.getElementById('fname');
  const emailInput   = document.getElementById('femail');
  const subjectInput = document.getElementById('fsubject');
  const msgInput     = document.getElementById('fmessage');
  const submitBtn    = document.getElementById('submitBtn');
  const successEl    = document.getElementById('formSuccess');
  const honeypot     = form.querySelector('input[name="_honey"]');

  function setError(input, errId, show) {
    const group = input.closest('.form-group');
    const err   = document.getElementById(errId);
    group.classList.toggle('error', show);
    if (err) err.style.display = show ? 'block' : 'none';
  }

  function validate() {
    let valid = true;

    if (!sanitize(nameInput.value)) {
      setError(nameInput, 'nameErr', true); valid = false;
    } else {
      setError(nameInput, 'nameErr', false);
    }

    if (!EMAIL_RE.test(sanitize(emailInput.value))) {
      setError(emailInput, 'emailErr', true); valid = false;
    } else {
      setError(emailInput, 'emailErr', false);
    }

    if (!subjectInput.value) {
      setError(subjectInput, 'subjectErr', true); valid = false;
    } else {
      setError(subjectInput, 'subjectErr', false);
    }

    if (!sanitize(msgInput.value)) {
      setError(msgInput, 'msgErr', true); valid = false;
    } else {
      setError(msgInput, 'msgErr', false);
    }

    return valid;
  }

  [nameInput, emailInput, subjectInput, msgInput].forEach(input => {
    input.addEventListener('input', () => {
      const errId = input.id === 'fname'    ? 'nameErr'
                  : input.id === 'femail'   ? 'emailErr'
                  : input.id === 'fsubject' ? 'subjectErr' : 'msgErr';
      setError(input, errId, false);
    });
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    /* Honeypot check — bots fill hidden fields */
    if (honeypot && honeypot.value) {
      /* Silently reject — don't reveal to bots */
      return;
    }

    if (!validate()) return;

    const currentLang = getCurrentLang();

    submitBtn.disabled = true;
    const btnText = submitBtn.querySelector('span');
    if (btnText) btnText.textContent = currentLang === 'es' ? 'Enviando...' : 'Sending...';

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);

      successEl.classList.add('show');
      successEl.querySelector('p').innerHTML = i18n[currentLang]['form.success'];

      Array.from(form.children).forEach(child => {
        if (child.id !== 'formSuccess') child.style.display = 'none';
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      submitBtn.disabled = false;
      if (btnText) btnText.textContent = i18n[currentLang]['form.send'];
      alert(currentLang === 'es'
        ? 'Hubo un error al enviar el mensaje.'
        : 'There was an error sending the message.');
    }
  });
}
