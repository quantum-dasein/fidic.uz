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
  if (btn && menu && btn.dataset.menuBound !== 'true') {
    btn.dataset.menuBound = 'true';
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

  /* ---------- GA4 event tracking for marked CTA links ---------- */
  document.addEventListener('click', function (e) {
    var target = e.target;
    if (target && target.nodeType === 3) target = target.parentElement;
    if (!target || !target.closest) return;
    var el = target.closest('[data-analytics-event]');
    if (!el || typeof window.gtag !== 'function') return;

    var eventName = el.getAttribute('data-analytics-event');
    if (!eventName) return;

    var params = {
      event_category: 'cta',
      event_label: el.getAttribute('data-analytics-label') || el.textContent.trim(),
      cta_type: el.getAttribute('data-analytics-cta-type'),
      cta_rank: el.getAttribute('data-analytics-cta-rank'),
      cta_destination: el.getAttribute('data-analytics-destination') || el.getAttribute('href'),
      article_slug: el.getAttribute('data-analytics-article-slug'),
      article_category: el.getAttribute('data-analytics-article-category'),
      language: el.getAttribute('data-analytics-lang'),
      link_url: el.href || el.getAttribute('href'),
      source_path: window.location.pathname
    };

    Object.keys(params).forEach(function (key) {
      if (params[key] === null || params[key] === undefined || params[key] === '') delete params[key];
    });

    window.gtag('event', eventName, params);
  });

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

  /* ---------- Lightweight PDF report export ----------
     Opens a clean printable report. Users can save it as PDF from the browser. */
  window.FidicReportExport = function (options) {
    var data = options || {};
    var title = data.title || document.title || 'FIDIC.uz report';
    var subtitle = data.subtitle || window.location.href;
    var sections = Array.isArray(data.sections) ? data.sections : [];
    var lang = document.documentElement.lang || 'en';

    function esc(value) {
      return String(value || '').replace(/[&<>"']/g, function (char) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
      });
    }

    function list(items) {
      if (!items || !items.length) return '<p class="muted">No items selected.</p>';
      return '<ul>' + items.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join('') + '</ul>';
    }

    var body = sections.map(function (section) {
      var rows = '';
      if (section.rows && section.rows.length) {
        rows = '<table>' + section.rows.map(function (row) {
          return '<tr><th>' + esc(row[0]) + '</th><td>' + esc(row[1]) + '</td></tr>';
        }).join('') + '</table>';
      }
      return '<section><h2>' + esc(section.heading || '') + '</h2>' +
        (section.text ? '<p>' + esc(section.text) + '</p>' : '') +
        rows +
        (section.items ? list(section.items) : '') +
      '</section>';
    }).join('');

    var html = '<!doctype html><html lang="' + esc(lang) + '"><head><meta charset="utf-8">' +
      '<title>' + esc(title) + '</title>' +
      '<style>' +
      '@page{margin:18mm}*{box-sizing:border-box}body{font-family:Arial,Helvetica,sans-serif;color:#111827;line-height:1.45;margin:0}.cover{border-bottom:3px solid #c9a45c;padding-bottom:18px;margin-bottom:22px}.brand{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#8a6a25;font-weight:700}.date{color:#6b7280;font-size:12px;margin-top:8px}h1{font-family:Georgia,serif;font-size:34px;line-height:1.05;margin:10px 0 8px}h2{font-family:Georgia,serif;font-size:20px;margin:22px 0 8px}p{margin:8px 0}.muted{color:#6b7280}table{width:100%;border-collapse:collapse;margin:10px 0 6px}th,td{border:1px solid #e5e7eb;padding:9px 10px;text-align:left;vertical-align:top}th{width:34%;background:#f9fafb;color:#374151}ul{padding-left:20px;margin:8px 0}li{margin:5px 0}.footer{border-top:1px solid #e5e7eb;margin-top:28px;padding-top:12px;color:#6b7280;font-size:12px}@media print{button{display:none}}' +
      '</style></head><body>' +
      '<div class="cover"><div class="brand">FIDIC.uz / Bridge Consult</div><h1>' + esc(title) + '</h1><p class="muted">' + esc(subtitle) + '</p><div class="date">' + new Date().toLocaleString(lang) + '</div></div>' +
      body +
      '<div class="footer">Generated on FIDIC.uz. This report is a practical screening output and is not legal advice.</div>' +
      '<script>setTimeout(function(){window.print()},250)<\/script>' +
      '</body></html>';

    var win = window.open('', '_blank');
    if (!win) {
      window.print();
      return;
    }
    win.opener = null;
    win.document.open();
    win.document.write(html);
    win.document.close();

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'tool_report_export', {
        event_category: 'tool',
        report_title: title,
        source_path: window.location.pathname,
        language: lang
      });
    }

    setTimeout(function () {
      window.dispatchEvent(new CustomEvent('fidic:lead-capture', {
        detail: {
          source: 'report_export',
          title: title,
          message: 'Please review this generated FIDIC.uz report and advise on next steps.'
        }
      }));
    }, 900);
  };

  /* ---------- Lead capture panel ----------
     Static-site friendly: prepares a structured email/Telegram brief with context. */
  (function bindLeadCapture() {
    var root = document.getElementById('lead-capture');
    if (!root || root.dataset.bound === 'true') return;
    root.dataset.bound = 'true';

    var form = document.getElementById('lead-capture-form');
    var nameInput = document.getElementById('lead-capture-name');
    var contactInput = document.getElementById('lead-capture-contact');
    var messageInput = document.getElementById('lead-capture-message');
    var sourceInput = document.getElementById('lead-capture-source');
    var status = document.getElementById('lead-capture-status');
    var telegramLink = document.getElementById('lead-capture-telegram');
    var email = root.getAttribute('data-email') || 'info@bridgeconsult.uz';
    var telegram = root.getAttribute('data-telegram') || 'https://t.me/fidicuzb';
    var lang = root.getAttribute('data-lang') || document.documentElement.lang || 'ru';
    var lastContext = {};

    function clean(value) {
      return String(value || '').replace(/\s+/g, ' ').trim();
    }

    function track(eventName, params) {
      if (typeof window.gtag !== 'function') return;
      var payload = params || {};
      payload.language = payload.language || lang;
      payload.source_path = window.location.pathname;
      window.gtag('event', eventName, payload);
    }

    function buildBody() {
      var lines = [
        'FIDIC.uz lead brief',
        '',
        'Name: ' + clean(nameInput && nameInput.value),
        'Contact: ' + clean(contactInput && contactInput.value),
        'Page: ' + window.location.href,
        'Source: ' + clean(sourceInput && sourceInput.value),
        '',
        'Task:',
        clean(messageInput && messageInput.value),
      ];
      return lines.join('\n');
    }

    function updateTelegram() {
      if (!telegramLink) return;
      var text = buildBody();
      telegramLink.href = telegram;
      telegramLink.setAttribute('data-telegram-text', text);
    }

    function setOpen(open, detail) {
      root.classList.toggle('is-open', open);
      root.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.documentElement.classList.toggle('lead-capture-lock', open);
      document.body.classList.toggle('lead-capture-lock', open);

      if (!open) return;
      lastContext = detail || {};
      var source = clean(lastContext.title || lastContext.source || document.title);
      if (sourceInput) sourceInput.value = source + ' / ' + window.location.pathname;
      if (messageInput && lastContext.message && !messageInput.value) messageInput.value = lastContext.message;
      updateTelegram();
      setTimeout(function () {
        if (nameInput) nameInput.focus();
      }, 60);
      track('lead_capture_open', {
        event_category: 'lead',
        lead_source: clean(lastContext.source || 'manual'),
        lead_title: clean(lastContext.title || document.title),
      });
    }

    document.addEventListener('click', function (event) {
      var close = event.target.closest('[data-lead-capture-close]');
      if (close) {
        event.preventDefault();
        setOpen(false);
        return;
      }

      var opener = event.target.closest('[data-lead-capture-open]');
      if (!opener) return;
      event.preventDefault();
      setOpen(true, {
        source: opener.getAttribute('data-lead-source') || opener.getAttribute('href') || 'cta',
        title: opener.getAttribute('data-lead-title') || opener.getAttribute('data-analytics-label') || opener.textContent,
      });
    });

    window.addEventListener('fidic:lead-capture', function (event) {
      setOpen(true, event.detail || {});
    });

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && root.classList.contains('is-open')) setOpen(false);
    });

    ['input', 'change'].forEach(function (eventName) {
      if (form) form.addEventListener(eventName, updateTelegram);
    });

    if (telegramLink) {
      telegramLink.addEventListener('click', function () {
        updateTelegram();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(buildBody()).catch(function () {});
        }
        track('lead_capture_submit', {
          event_category: 'lead',
          method: 'telegram',
          lead_source: clean(lastContext.source || sourceInput && sourceInput.value),
        });
      });
    }

    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var subject = 'FIDIC.uz request: ' + clean(sourceInput && sourceInput.value || document.title);
        var href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(buildBody());
        if (status) status.hidden = false;
        track('lead_capture_submit', {
          event_category: 'lead',
          method: 'email',
          lead_source: clean(lastContext.source || sourceInput && sourceInput.value),
        });
        window.location.href = href;
      });
    }
  })();

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
