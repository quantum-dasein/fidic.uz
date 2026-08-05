// Bundled client enhancements (Astro bundles this; npm imports allowed).
import Lenis from 'lenis';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------------- Smooth scroll (Lenis, desktop) ----------------
   This import stays static, and the 17kB it costs a phone that will never
   construct Lenis is a deliberate price.
   Making it dynamic to save those bytes broke scrolling on the desktop. The
   stylesheet cancels the page's own `scroll-behavior: smooth` through
   `.lenis.lenis-smooth { scroll-behavior: auto !important }` — a rule that
   only applies once Lenis has attached and added those classes. With a
   dynamic import there is a window after first paint where it has not, so a
   wheel in that window starts a native smooth scroll that Lenis then seizes
   mid-flight: the page visibly pulls back. It is worst at the top of a page,
   which is exactly where a visitor scrolls first.
   The bytes are worth recovering, but not this way. */
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

/* ---------------- Smart cursor (desktop only, transform-only) ---------------- */
if (finePointer && !reduceMotion) {
  const cursor = document.createElement('div');
  cursor.className = 'fidic-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = '<span class="fidic-cursor__ring"></span><span class="fidic-cursor__dot"></span>';
  document.body.appendChild(cursor);
  document.body.classList.add('fidic-cursor-ready');

  let cx = -100;
  let cy = -100;
  let tx = cx;
  let ty = cy;
  let visible = false;

  function classify(target) {
    if (!target || !target.closest) return '';
    if (target.closest('input, textarea, [contenteditable="true"]')) return 'is-text';
    if (target.closest('a, button, summary, label, [role="button"], [role="tab"], .card, .chip, .btn')) return 'is-link';
    return '';
  }

  function tick() {
    cx += (tx - cx) * 0.24;
    cy += (ty - cy) * 0.24;
    cursor.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
    requestAnimationFrame(tick);
  }

  /*
   * The cursor ring has three states — 1.25rem blue over a text field, 2.35rem
   * brass by default, 3.15rem bright brass over anything clickable — and each
   * transitions over 0.22s.
   *
   * A browser fires `pointermove` on every frame that the page scrolls under a
   * stationary cursor, so that :hover stays correct. The coordinates are
   * unchanged but `event.target` is not: different elements pass underneath.
   * Over the assistant card that means the log, the prompt chips and the input
   * in turn — so the ring pulsed between all three sizes and colours, several
   * times a second, while the pointer sat still. The same scroll-fires-mousemove
   * problem the tilt and pointer-light effects were fixed for; this listener was
   * missed because it reads `event.target` rather than the coordinates.
   *
   * Classification is therefore skipped unless the pointer actually moved, and
   * re-run once from `elementFromPoint` after scrolling settles — by then what
   * is under the cursor really has changed and the ring should say so.
   */
  let lastClassX = NaN;
  let lastClassY = NaN;

  function applyState(target) {
    const kind = classify(target);
    cursor.classList.toggle('is-link', kind === 'is-link');
    cursor.classList.toggle('is-text', kind === 'is-text');
  }

  window.addEventListener('pointermove', function (event) {
    tx = event.clientX;
    ty = event.clientY;
    if (!visible) {
      visible = true;
      cursor.classList.add('is-visible');
    }
    if (event.clientX === lastClassX && event.clientY === lastClassY) return;
    lastClassX = event.clientX;
    lastClassY = event.clientY;
    applyState(event.target);
  }, { passive: true });

  let settleTimer = 0;
  window.addEventListener('scroll', function () {
    window.clearTimeout(settleTimer);
    settleTimer = window.setTimeout(function () {
      if (!visible || Number.isNaN(lastClassX)) return;
      applyState(document.elementFromPoint(lastClassX, lastClassY));
    }, 150);
  }, { passive: true });

  window.addEventListener('pointerdown', function () { cursor.classList.add('is-down'); }, { passive: true });
  window.addEventListener('pointerup', function () { cursor.classList.remove('is-down'); }, { passive: true });
  document.addEventListener('mouseleave', function () {
    visible = false;
    cursor.classList.remove('is-visible');
  });

  requestAnimationFrame(tick);
}

/* ---------------- Pointer-driven effects ---------------- */
/*
 * Browsers fire `mousemove` while the page scrolls under a stationary cursor,
 * so that :hover stays correct. The event carries the SAME clientX/clientY —
 * but getBoundingClientRect() has moved, so any handler deriving a position
 * from the two recomputes on every scroll frame.
 *
 * That is what made the cards strobe: the pointer light repainted its radial
 * gradient across the whole card on each frame, and the tilt cards visibly
 * rolled while the user was only scrolling. Nothing was actually moving the
 * mouse.
 *
 * The filter below drops those: if the viewport coordinates are unchanged since
 * this listener last saw them, the pointer did not move and there is nothing to
 * update. Updates are also coalesced into one animation frame, so a fast mouse
 * cannot queue up more repaints than the display can show.
 *
 * The last-seen position is kept PER LISTENER, not globally. The hero card
 * carries both `.tilt` and `.card`, so one mousemove legitimately drives two
 * effects — with shared state the first would consume the movement and the
 * second would see a stale coordinate and skip.
 */
function onPointerMove(el, update) {
  let frame = 0;
  let lastX = NaN;
  let lastY = NaN;
  el.addEventListener(
    'mousemove',
    function (e) {
      if (e.clientX === lastX && e.clientY === lastY) return;
      lastX = e.clientX;
      lastY = e.clientY;
      if (frame) return;
      frame = requestAnimationFrame(function () {
        frame = 0;
        update(lastX, lastY, el.getBoundingClientRect());
      });
    },
    { passive: true },
  );
  el.addEventListener('mouseleave', function () {
    if (frame) { cancelAnimationFrame(frame); frame = 0; }
    // Forget the position, or re-entering at the same spot would be ignored.
    lastX = NaN;
    lastY = NaN;
  });
}

/* ---------------- Magnetic buttons ---------------- */
if (finePointer && !reduceMotion) {
  document.querySelectorAll('.magnetic').forEach(function (el) {
    const strength = parseFloat(el.getAttribute('data-strength') || '0.35');
    // Same scroll problem as the cards below: without the filter these buttons
    // drift away from the cursor as the page moves under it.
    onPointerMove(el, function (cx, cy, r) {
      const x = cx - r.left - r.width / 2;
      const y = cy - r.top - r.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    el.addEventListener('mouseleave', function () { el.style.transform = ''; });
  });
}

/* ---------------- 3D tilt cards ---------------- */
if (finePointer && !reduceMotion) {
  document.querySelectorAll('.tilt').forEach(function (el) {
    const max = 9;
    onPointerMove(el, function (cx, cy, r) {
      const px = (cx - r.left) / r.width - 0.5;
      const py = (cy - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
    });
    el.addEventListener('mouseleave', function () { el.style.transform = ''; });
  });
}

/* ---------------- Scrolling state ----------------
   The card sheen and light are pointer effects, but a scroll drags cards under
   a stationary cursor, so each one enters and leaves :hover in turn and runs
   its transition — a full-card composited layer, clipped to a rounded corner,
   created and thrown away several times a second. Measured over the assistant
   card, three runs: five frames past 32ms with the light on, one with it off.
   `html.is-scrolling` suppresses them for as long as the page is moving; the
   light returns under the cursor 140ms after it settles. Nothing is lost — the
   effect answers the pointer, which is not what was moving. */
if (finePointer && !reduceMotion) {
  let scrollingTimer = 0;
  window.addEventListener('scroll', function () {
    document.documentElement.classList.add('is-scrolling');
    window.clearTimeout(scrollingTimer);
    scrollingTimer = window.setTimeout(function () {
      document.documentElement.classList.remove('is-scrolling');
    }, 140);
  }, { passive: true });
}

/* ---------------- Card light follows pointer ----------------
   Pixels, not percentages: the light is a fixed-size layer that gets moved by
   `translate3d`, so this is a compositor transform rather than the full-card
   gradient re-rasterization the percentage version forced on every move. */
if (finePointer && !reduceMotion) {
  document.querySelectorAll('.card').forEach(function (el) {
    onPointerMove(el, function (cx, cy, r) {
      el.style.setProperty('--lx', (cx - r.left).toFixed(0) + 'px');
      el.style.setProperty('--ly', (cy - r.top).toFixed(0) + 'px');
    });
    el.addEventListener('mouseleave', function () {
      el.style.removeProperty('--lx');
      el.style.removeProperty('--ly');
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
