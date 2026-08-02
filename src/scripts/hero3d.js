// Three.js hero scene — desktop only. On mobile/tablet/touch we do NOT load
// Three.js at all, because iOS Safari kills WebGL-heavy tabs (the page would go
// blank). The hero still looks good without it (gradient blobs + blueprint grid
// remain).
//
// The scene itself lives in ./hero3d-scene.js so its `three` imports can be
// static and therefore tree-shaken; this file only decides whether to fetch it.
// Loading is deferred to idle time as well: the canvas is decoration, and it
// has no business competing with the hero text for the main thread during LCP.

const canvas = document.getElementById('hero-3d');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches;

if (canvas && !reduce && isDesktop) {
  const load = () =>
    import('./hero3d-scene.js')
      .then((m) => { try { m.initScene(canvas); } catch (e) { /* never break the page */ } })
      .catch(() => {});

  if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 2500 });
  else setTimeout(load, 1200);
}
