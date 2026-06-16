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

/* ---------------- Language switch: preserve scroll across navigation ---------------- */
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// Save current scroll right before a language link navigates away.
document.addEventListener('click', function (e) {
  const s = e.target.closest('[data-lang-switch]');
  if (!s) return;
  try { sessionStorage.setItem('i18n-scroll', String(window.scrollY || window.pageYOffset || 0)); } catch (_) {}
});

// Restore scroll on the freshly loaded page (no jump to top).
(function restoreScroll() {
  let raw = null;
  try { raw = sessionStorage.getItem('i18n-scroll'); } catch (_) {}
  if (raw === null) return;
  try { sessionStorage.removeItem('i18n-scroll'); } catch (_) {}
  const top = parseInt(raw, 10) || 0;
  const apply = function () {
    window.scrollTo(0, top);
    if (lenis) lenis.scrollTo(top, { immediate: true });
  };
  apply();
  requestAnimationFrame(apply);
  setTimeout(apply, 60);
  setTimeout(apply, 220);
})();

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

/* ---------------- Custom cursor ---------------- */
if (finePointer && !reduceMotion) {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (dot && ring) {
    document.body.classList.add('has-cursor');
    let rx = window.innerWidth / 2, ry = window.innerHeight / 2;
    let mx = rx, my = ry;
    window.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    function ringRaf() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(ringRaf);
    }
    requestAnimationFrame(ringRaf);
    const hoverSel = 'a, button, .tilt, input, select, textarea, .book-spine, [data-cursor="hover"]';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(hoverSel)) ring.classList.add('is-hover');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(hoverSel)) ring.classList.remove('is-hover');
    });
  }
}

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

/* NOTE: content reveals (.reveal, .line-mask, .reveal-clip) and count-up live in
   /main.js (dependency-free) so they always run even if this module fails. */

/* Stop Lenis when tab hidden to save CPU */
document.addEventListener('visibilitychange', function () {
  if (!lenis) return;
  if (document.hidden) lenis.stop(); else lenis.start();
});
