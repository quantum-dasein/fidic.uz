// Three.js hero scene — desktop only. On mobile/tablet/touch we do NOT load
// Three.js at all (dynamic import inside the guard), because iOS Safari kills
// WebGL-heavy tabs (the page would go blank). The hero still looks good without
// it (gradient blobs + blueprint grid remain).

const canvas = document.getElementById('hero-3d');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches;

if (canvas && !reduce && isDesktop) {
  import('three')
    .then((THREE) => { try { initScene(THREE); } catch (e) { /* never break the page */ } })
    .catch(() => {});
}

function initScene(THREE) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 9;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const group = new THREE.Group();
  scene.add(group);

  const core = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(3, 2)),
    new THREE.LineBasicMaterial({ color: 0xc9a45c, transparent: true, opacity: 0.5 })
  );
  group.add(core);

  const shell = new THREE.Mesh(
    new THREE.IcosahedronGeometry(2.92, 1),
    new THREE.MeshBasicMaterial({ color: 0x120f0a, transparent: true, opacity: 0.55 })
  );
  group.add(shell);

  const halo = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(4.4, 1)),
    new THREE.LineBasicMaterial({ color: 0x5b8cff, transparent: true, opacity: 0.12 })
  );
  group.add(halo);

  const colors = [0xc0362c, 0xe0a82e, 0xb9bcc4, 0x2f8f5b, 0xd36a86, 0x0f8a6d, 0xb8902f, 0x2f6fb0, 0xe8e6e0];
  const nodes = [];
  colors.forEach((c, i) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.32, 0.05), new THREE.MeshBasicMaterial({ color: c }));
    const r = 4.6 + (i % 3) * 0.5;
    const a = (i / colors.length) * Math.PI * 2;
    const tilt = (i % 2 === 0 ? 1 : -1) * 0.5;
    m.userData = { r, a, speed: 0.0015 + i * 0.0002, tilt };
    nodes.push(m);
    group.add(m);
  });

  const pCount = 380;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const rr = 6 + Math.random() * 9;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    pPos[i * 3] = rr * Math.sin(ph) * Math.cos(th);
    pPos[i * 3 + 1] = rr * Math.sin(ph) * Math.sin(th);
    pPos[i * 3 + 2] = rr * Math.cos(ph);
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const points = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xc9a45c, size: 0.035, transparent: true, opacity: 0.6 }));
  scene.add(points);

  let tx = 0, ty = 0, cx = 0, cy = 0;
  window.addEventListener('mousemove', (e) => { tx = e.clientX / window.innerWidth - 0.5; ty = e.clientY / window.innerHeight - 0.5; });

  function size() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || canvas.clientWidth || window.innerWidth;
    const h = rect.height || canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  size();
  window.addEventListener('resize', size);

  let raf = 0, running = true;
  const start = performance.now();
  function animate() {
    if (!running) return;
    raf = requestAnimationFrame(animate);
    const t = (performance.now() - start) / 1000;
    cx += (tx - cx) * 0.04;
    cy += (ty - cy) * 0.04;
    group.rotation.y = t * 0.06 + cx * 0.6;
    group.rotation.x = cy * 0.4;
    halo.rotation.y = -t * 0.04;
    points.rotation.y = t * 0.012;
    nodes.forEach((n) => {
      n.userData.a += n.userData.speed;
      const a = n.userData.a, r = n.userData.r;
      n.position.set(Math.cos(a) * r, Math.sin(a) * n.userData.tilt * r, Math.sin(a) * r);
      n.lookAt(0, 0, 0);
    });
    renderer.render(scene, camera);
  }
  animate();

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) animate(); else cancelAnimationFrame(raf);
  });
}
