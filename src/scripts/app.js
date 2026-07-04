// Bundled client enhancements (Astro bundles this; npm imports allowed).
import Lenis from 'lenis';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------------- Smooth scroll (Lenis, desktop) ---------------- */
let lenis = null;
if (!reduceMotion && finePointer) {
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1, lerp: 0.1 });
  function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
}

/* ---------------- Navigation scroll sanity ---------------- */
if ('scrollRestoration' in history) history.scrollRestoration = 'auto';

function scrollPageTop() {
  window.scrollTo(0, 0);
  if (lenis) lenis.scrollTo(0, { immediate: true });
}

if (!window.location.hash) {
  scrollPageTop();
  requestAnimationFrame(scrollPageTop);
  setTimeout(scrollPageTop, 80);
  setTimeout(scrollPageTop, 260);
}

document.addEventListener('astro:page-load', function () {
  if (window.location.hash) return;
  scrollPageTop();
  requestAnimationFrame(scrollPageTop);
  setTimeout(scrollPageTop, 80);
});

// In-page anchor handling (works with or without Lenis)
document.addEventListener('click', function (e) {
  const a = e.target.closest('a[href^="#"], a[href^="/#"]');
  if (!a) return;
  const hash = a.getAttribute('href').replace('/', '');
  if (hash.length < 2 || hash[0] !== '#') return;
  const target = document.querySelector(hash);
  if (!target) return;
  e.preventDefault();
  if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1.2 });
  else target.scrollIntoView({ behavior: 'smooth' });
});

/* ---------------- Scroll progress bar ---------------- */
const progress = document.getElementById('scroll-progress');
function updateProgress() {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  const p = max > 0 ? (h.scrollTop || window.scrollY) / max : 0;
  if (progress) progress.style.width = (p * 100).toFixed(2) + '%';
}
if (lenis) lenis.on('scroll', updateProgress);
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

/* ---------------- Magnetic buttons ---------------- */
if (finePointer && !reduceMotion) {
  document.querySelectorAll('.magnetic').forEach(function (el) {
    const strength = parseFloat(el.getAttribute('data-strength') || '0.35');
    el.addEventListener('mousemove', function (e) {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener('mouseleave', function () { el.style.transform = ''; });
  });
}

/* ---------------- 3D tilt cards ---------------- */
if (finePointer && !reduceMotion) {
  document.querySelectorAll('.tilt').forEach(function (el) {
    const max = 9;
    el.addEventListener('mousemove', function (e) {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
    });
    el.addEventListener('mouseleave', function () { el.style.transform = ''; });
  });
}

/* ---------------- Card light follows pointer ---------------- */
if (finePointer && !reduceMotion) {
  document.querySelectorAll('.card').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%';
      const y = ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%';
      el.style.setProperty('--mx', x);
      el.style.setProperty('--my', y);
    });
    el.addEventListener('mouseleave', function () {
      el.style.removeProperty('--mx');
      el.style.removeProperty('--my');
    });
  });
}

/* NOTE: content reveals (.reveal, .line-mask, .reveal-clip) and count-up live in
   /main.js (dependency-free) so they always run even if this module fails. */

/* Stop Lenis when tab hidden to save CPU */
document.addEventListener('visibilitychange', function () {
  if (!lenis) return;
  if (document.hidden) lenis.stop(); else lenis.start();
});
