/* FIDIC.uz — global interactions (no framework, ~3kb) */
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
      btn.classList.toggle('is-open', open);
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
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var delay = e.target.getAttribute('data-delay') || 0;
          e.target.style.transitionDelay = delay + 'ms';
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

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
