// The hero WebGL scene, in its own module so the `three` imports are STATIC.
//
// This used to be `import('three')` with a `THREE.` namespace, which Rollup
// cannot tree-shake — the dynamic namespace import pulls the whole library in,
// all 716 KB of it, to use fifteen classes. Naming the imports here and loading
// this module dynamically instead keeps the lazy behaviour and lets the bundler
// drop everything the scene never touches.
import {
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
  WireframeGeometry,
} from 'three';

export function initScene(canvas) {
  const scene = new Scene();
  const camera = new PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 9;

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const group = new Group();
  scene.add(group);

  const core = new LineSegments(
    new WireframeGeometry(new IcosahedronGeometry(3, 2)),
    new LineBasicMaterial({ color: 0xc9a45c, transparent: true, opacity: 0.5 })
  );
  group.add(core);

  const shell = new Mesh(
    new IcosahedronGeometry(2.92, 1),
    new MeshBasicMaterial({ color: 0x120f0a, transparent: true, opacity: 0.55 })
  );
  group.add(shell);

  const halo = new LineSegments(
    new WireframeGeometry(new IcosahedronGeometry(4.4, 1)),
    new LineBasicMaterial({ color: 0x5b8cff, transparent: true, opacity: 0.12 })
  );
  group.add(halo);

  const colors = [0xc0362c, 0xe0a82e, 0xb9bcc4, 0x2f8f5b, 0xd36a86, 0x0f8a6d, 0xb8902f, 0x2f6fb0, 0xe8e6e0];
  const nodes = [];
  colors.forEach((c, i) => {
    const m = new Mesh(new BoxGeometry(0.22, 0.32, 0.05), new MeshBasicMaterial({ color: c }));
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
  const pGeo = new BufferGeometry();
  pGeo.setAttribute('position', new BufferAttribute(pPos, 3));
  const points = new Points(pGeo, new PointsMaterial({ color: 0xc9a45c, size: 0.035, transparent: true, opacity: 0.6 }));
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
