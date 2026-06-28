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

  /* ---------- Branded PDF report export ----------
     Opens a polished printable report. Users can save it as PDF from the browser. */
  window.FidicReportExport = function (options) {
    var data = options || {};
    var title = data.title || document.title || 'FIDIC.uz report';
    var subtitle = data.subtitle || window.location.href;
    var sourceUrl = data.sourceUrl || window.location.href;
    var generatedAt = new Date();
    var sections = Array.isArray(data.sections) ? data.sections : [];
    var lang = document.documentElement.lang || 'en';
    var summary = data.summary || '';
    var status = data.status || '';
    var nextActions = Array.isArray(data.nextActions) ? data.nextActions : [];
    var labels = {
      ru: {
        screening: 'практический report',
        openSource: 'Открыть страницу',
        summary: 'Краткий вывод',
        actions: 'Следующие действия',
        notAdvice: 'не юридическое заключение',
        print: 'Печать / Сохранить PDF',
        generated: 'Сформировано на FIDIC.uz. Это практический предварительный отчёт, а не юридическое заключение.',
        defaultSummary: 'Практический отчёт FIDIC.uz по результатам проверки.',
        defaultActions: [
          'Проверьте применимую редакцию контракта и Particular Conditions.',
          'Зафиксируйте assumptions, документы и последующие действия с датами.',
          'Перед использованием результата запросите экспертную проверку.'
        ]
      },
      en: {
        screening: 'screening report',
        openSource: 'Open source page',
        summary: 'Executive summary',
        actions: 'Recommended next actions',
        notAdvice: 'not legal advice',
        print: 'Print / Save PDF',
        generated: 'Generated on FIDIC.uz. This report is a practical screening output and is not legal advice.',
        defaultSummary: 'Generated FIDIC.uz screening report.',
        defaultActions: [
          'Check the applicable contract wording and Particular Conditions.',
          'Keep a dated record of assumptions, documents and follow-up actions.',
          'Request expert review before relying on this screening output.'
        ]
      },
      uz: {
        screening: 'screening report',
        openSource: 'Manba sahifani ochish',
        summary: 'Qisqa xulosa',
        actions: 'Keyingi amallar',
        notAdvice: 'legal advice emas',
        print: 'Chop etish / PDF saqlash',
        generated: 'FIDIC.uz orqali yaratildi. Bu amaliy screening natijasi, yuridik xulosa emas.',
        defaultSummary: 'FIDIC.uz screening report yaratildi.',
        defaultActions: [
          'Applicable contract wording va Particular Conditionsni tekshiring.',
          'Assumptions, documents va follow-up actionsni sana bilan yozib boring.',
          'Natijaga tayanishdan oldin ekspert review so‘rang.'
        ]
      }
    };
    var l = labels[lang] || labels.en;

    function esc(value) {
      return String(value || '').replace(/[&<>"']/g, function (char) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
      });
    }

    function list(items) {
      if (!items || !items.length) return '<p class="muted">No items selected.</p>';
      return '<ul>' + items.map(function (item) { return '<li>' + esc(item) + '</li>'; }).join('') + '</ul>';
    }

    function qrUrl(value) {
      return 'https://api.qrserver.com/v1/create-qr-code/?size=132x132&margin=8&data=' + encodeURIComponent(value);
    }

    function inferSummary() {
      if (summary) return summary;
      if (!sections.length) return l.defaultSummary;
      var first = sections[0];
      if (first.text) return first.text;
      if (first.rows && first.rows.length) {
        return first.rows.slice(0, 2).map(function (row) {
          return row[0] + ': ' + row[1];
        }).join(' · ');
      }
      if (first.items && first.items.length) return first.items.slice(0, 3).join(' · ');
      return l.defaultSummary;
    }

    function inferNextActions() {
      if (nextActions.length) return nextActions;
      var found = sections.find(function (section) {
        return /next|action|след|действ|key|recommend/i.test(section.heading || '');
      });
      if (found && found.items && found.items.length) return found.items.slice(0, 5);
      return l.defaultActions;
    }

    var body = sections.map(function (section) {
      var rows = '';
      if (section.rows && section.rows.length) {
        rows = '<table>' + section.rows.map(function (row) {
          return '<tr><th>' + esc(row[0]) + '</th><td>' + esc(row[1]) + '</td></tr>';
        }).join('') + '</table>';
      }
      return '<section class="report-section"><h2>' + esc(section.heading || '') + '</h2>' +
        (section.text ? '<p>' + esc(section.text) + '</p>' : '') +
        rows +
        (section.items ? list(section.items) : '') +
      '</section>';
    }).join('');

    var inferredSummary = inferSummary();
    var inferredActions = inferNextActions();
    var statusHtml = status ? '<span class="status-pill">' + esc(status) + '</span>' : '';
    var actionsHtml = list(inferredActions);
    var host = '';
    try { host = new URL(sourceUrl).host; } catch (_) { host = 'fidic.uz'; }

    var html = '<!doctype html><html lang="' + esc(lang) + '"><head><meta charset="utf-8">' +
      '<title>' + esc(title) + '</title>' +
      '<style>' +
      '@page{margin:14mm}*{box-sizing:border-box}body{font-family:Inter,Arial,Helvetica,sans-serif;color:#111827;line-height:1.48;margin:0;background:#eef2f7;padding:24px}.report-shell{max-width:1120px;margin:0 auto}.report-paper{position:relative;background:#fff;border:1px solid #dbe2ee;border-radius:24px;box-shadow:0 28px 80px rgba(15,23,42,.16);padding:24px}.cover{position:relative;overflow:hidden;border:1px solid #d8c38c;border-radius:20px;background:radial-gradient(circle at 86% 10%,rgba(201,164,92,.24),transparent 34%),linear-gradient(135deg,#07101f,#101827 58%,#17120a);color:#f8f5ec;padding:30px 32px 26px;margin-bottom:18px}.cover:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.055) 1px,transparent 1px);background-size:34px 34px;opacity:.35}.cover>*{position:relative}.brand{display:flex;align-items:center;justify-content:space-between;gap:16px;font-size:12px;letter-spacing:.19em;text-transform:uppercase;color:#d8bd72;font-weight:800}.brand-mark{display:inline-flex;align-items:center;gap:10px}.brand-mark:before{content:"";width:28px;height:28px;border:1px solid #d8bd72;border-radius:8px;background:linear-gradient(135deg,rgba(216,189,114,.22),rgba(255,255,255,.04))}.date{color:#b7c0d1;font-size:12px;margin-top:12px}.source{word-break:break-word;color:#cfd6e5;font-size:12px}.cover-grid{display:grid;grid-template-columns:minmax(0,1fr) 154px;gap:24px;align-items:end;margin-top:14px}h1{font-family:Georgia,Times,serif;font-size:clamp(32px,5vw,50px);line-height:1.02;margin:10px 0 12px;letter-spacing:-.01em}.summary{max-width:720px;color:#dde3ef;font-size:15px}.qr-card{border:1px solid rgba(216,189,114,.35);border-radius:16px;background:rgba(255,255,255,.07);padding:12px;text-align:center}.qr-card img{width:116px;height:116px;border-radius:10px;background:#fff}.qr-card span{display:block;margin-top:8px;color:#d8bd72;font-size:10px;letter-spacing:.14em;text-transform:uppercase}.meta-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}.status-pill,.meta-pill{display:inline-flex;align-items:center;border:1px solid rgba(216,189,114,.36);border-radius:999px;background:rgba(216,189,114,.12);padding:6px 10px;color:#f7e6ae;font-size:12px;font-weight:800}.meta-pill{color:#dce4f3;border-color:rgba(255,255,255,.2);background:rgba(255,255,255,.06)}.report-top{display:grid;grid-template-columns:1.05fr .95fr;gap:14px;margin-bottom:18px}.panel{border:1px solid #e3e8f0;border-radius:16px;background:linear-gradient(180deg,#fbfcff,#f7f9fd);padding:18px 20px}.panel h2,.report-section h2{font-family:Georgia,Times,serif;font-size:21px;line-height:1.15;margin:0 0 10px;color:#0b1220}.panel p,.report-section p{margin:8px 0;color:#374151}.report-section{break-inside:avoid;border:1px solid #e3e8f0;border-radius:16px;padding:18px 20px;margin:14px 0;background:#fff}table{width:100%;border-collapse:separate;border-spacing:0;margin:10px 0 2px;overflow:hidden;border:1px solid #e5e7eb;border-radius:12px}th,td{border-bottom:1px solid #e5e7eb;padding:11px 12px;text-align:left;vertical-align:top;font-size:13px}tr:last-child th,tr:last-child td{border-bottom:0}th{width:34%;background:#f6f7fb;color:#374151;font-weight:800}td{color:#111827}ul{padding-left:20px;margin:8px 0}li{margin:6px 0;color:#1f2937}.footer{display:flex;justify-content:space-between;gap:16px;border-top:2px solid #c9a45c;margin-top:24px;padding-top:12px;color:#6b7280;font-size:11px}.print-bar{position:fixed;top:18px;right:24px;z-index:10;display:flex;justify-content:flex-end;gap:8px}.print-bar button{border:1px solid #c9a45c;border-radius:999px;background:#111827;color:#fff;padding:10px 16px;font-weight:800;cursor:pointer;box-shadow:0 12px 30px rgba(15,23,42,.22)}@media(max-width:760px){@page{margin:10mm}body{padding:12px}.report-paper{padding:12px;border-radius:16px}.cover{border-radius:14px;padding:22px 18px}.cover-grid,.report-top{grid-template-columns:1fr}.qr-card{display:none}h1{font-size:30px}.footer{display:block}.print-bar{position:static;justify-content:center;margin-bottom:12px}}@media print{body{background:#fff;padding:0}.report-paper{border:0;border-radius:0;box-shadow:none;padding:0}.print-bar{display:none}.cover{print-color-adjust:exact;-webkit-print-color-adjust:exact}.report-section,.panel{break-inside:avoid}}' +
      '</style></head><body><div class="print-bar"><button onclick="window.print()">' + esc(l.print) + '</button></div><main class="report-shell"><div class="report-paper">' +
      '<div class="cover"><div class="brand"><span class="brand-mark">FIDIC.uz / Bridge Consult</span><span>' + esc(l.screening) + '</span></div>' +
      '<div class="cover-grid"><div><h1>' + esc(title) + '</h1><p class="summary">' + esc(inferredSummary) + '</p><p class="source">' + esc(subtitle) + '</p><div class="date">' + generatedAt.toLocaleString(lang) + '</div><div class="meta-row">' + statusHtml + '<span class="meta-pill">' + esc(host) + '</span><span class="meta-pill">' + esc(l.notAdvice) + '</span></div></div>' +
      '<div class="qr-card"><img src="' + esc(qrUrl(sourceUrl)) + '" alt="QR code"><span>' + esc(l.openSource) + '</span></div></div></div>' +
      '<div class="report-top"><section class="panel"><h2>' + esc(l.summary) + '</h2><p>' + esc(inferredSummary) + '</p></section><section class="panel"><h2>' + esc(l.actions) + '</h2>' + actionsHtml + '</section></div>' +
      body +
      '<div class="footer"><span>' + esc(l.generated) + '</span><span>' + esc(sourceUrl) + '</span></div>' +
      '<script>setTimeout(function(){window.print()},250)<\/script>' +
      '</div></main></body></html>';

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

        function fallbackMailto() {
          var subject = 'FIDIC.uz request: ' + clean(sourceInput && sourceInput.value || document.title);
          var href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(buildBody());
          if (status) status.hidden = false;
          window.location.href = href;
        }

        track('lead_capture_submit', {
          event_category: 'lead',
          method: 'email',
          lead_source: clean(lastContext.source || sourceInput && sourceInput.value),
        });

        var payload = {
          name: clean(nameInput && nameInput.value),
          contact: clean(contactInput && contactInput.value),
          topic: clean(lastContext.title || lastContext.source || ''),
          message: clean(messageInput && messageInput.value),
          source: clean(sourceInput && sourceInput.value),
        };

        // Try the server (forwards to Telegram). On any failure — incl. the
        // 503 "channel-unconfigured" — fall back to a pre-filled mailto so the
        // lead is never lost.
        if (!payload.name || !payload.contact) { fallbackMailto(); return; }
        fetch('/api/lead', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        })
          .then(function (r) {
            if (r.ok) {
              if (status) status.hidden = false;
              track('lead_capture_sent', { event_category: 'lead', method: 'api' });
            } else {
              fallbackMailto();
            }
          })
          .catch(fallbackMailto);
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
