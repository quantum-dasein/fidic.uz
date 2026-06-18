/* FIDIC.uz — core interactions (no dependencies, runs everywhere incl. mobile).
   IMPORTANT: everything that REVEALS content lives here, never in the bundled
   module (which loads Three.js/Lenis). If that module fails, content still shows. */
(function () {
  'use strict';

  /* ---------- Header: condense on scroll ---------- */
  var header = document.getElementById('site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var btn = document.getElementById('menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    var open = false;
    function toggle(state) {
      open = typeof state === 'boolean' ? state : !open;
      menu.style.transform = open ? 'translateX(0)' : 'translateX(100%)';
      if (header) header.classList.toggle('is-menu-open', open);
      btn.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.style.overflow = open ? 'hidden' : '';
      var l1 = btn.querySelector('.burger-1');
      var l2 = btn.querySelector('.burger-2');
      var l3 = btn.querySelector('.burger-3');
      if (l1 && l2 && l3) {
        l1.style.transform = open ? 'rotate(45deg) translate(2px,-1px)' : '';
        l2.style.opacity = open ? '0' : '1';
        l3.style.transform = open ? 'rotate(-45deg) translate(2px,1px)' : '';
      }
    }
    btn.addEventListener('click', function () { toggle(); });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { toggle(false); });
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') toggle(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) toggle(false);
    });
  }

  /* ---------- Count-up ---------- */
  function countUp(el) {
    if (el.getAttribute('data-counted')) return;
    el.setAttribute('data-counted', '1');
    var suffix = el.getAttribute('data-suffix') || '';
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    var dur = 1400, start = null;
    function step(now) {
      if (start === null) start = now;
      var t = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toString() + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---------- Reveal on scroll (content visibility — must never fail) ---------- */
  var revealEls = document.querySelectorAll('.reveal, .line-mask, .reveal-clip, [data-count]');

  function showAll() {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
      if (el.hasAttribute('data-count')) countUp(el);
    });
  }

  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function () {
          el.classList.add('is-visible');
          if (el.hasAttribute('data-count')) countUp(el);
        }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
    // Safety net: if anything goes wrong, never leave content hidden.
    setTimeout(showAll, 2600);
  } else {
    showAll();
  }

  /* ---------- Contact-click tracking (fires only if GA is connected) ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var method = href.indexOf('tel:') === 0 ? 'phone'
      : href.indexOf('mailto:') === 0 ? 'email'
      : /t\.me|telegram/i.test(href) ? 'telegram'
      : /linkedin/i.test(href) ? 'linkedin' : null;
    if (method && typeof window.gtag === 'function') {
      window.gtag('event', 'contact_click', { method: method });
    }
  });

  /* ---------- Hero rotating expertise ---------- */
  var typed = document.getElementById('hero-typed');
  if (typed) {
    var words = (typed.getAttribute('data-words') || '').split('|').filter(Boolean);
    if (words.length) {
      var wi = 0, ci = 0, deleting = false;
      function tick() {
        var word = words[wi];
        if (!deleting) {
          ci++;
          typed.textContent = word.slice(0, ci);
          if (ci === word.length) { deleting = true; return setTimeout(tick, 1600); }
        } else {
          ci--;
          typed.textContent = word.slice(0, ci);
          if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
        }
        setTimeout(tick, deleting ? 38 : 78);
      }
      setTimeout(tick, 700);
    }
  }
})();
