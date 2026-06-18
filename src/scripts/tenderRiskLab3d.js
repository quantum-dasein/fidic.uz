// Tender Risk Lab 3D scene. Desktop-only and defensive: if WebGL or Three.js
// fails, the assessment still works as a normal static page.

const canvas = document.getElementById('risk-lab-3d');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)').matches;

if (canvas && !reduce && isDesktop) {
  import('three')
    .then((THREE) => { try { initRiskLab(THREE); } catch (_) {} })
    .catch(() => {});
}

function initRiskLab(THREE) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0.4, 9.5);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const root = new THREE.Group();
  root.position.set(2.45, -0.12, 0);
  scene.add(root);

  const ambient = new THREE.AmbientLight(0xf4f1ea, 0.72);
  scene.add(ambient);
  const key = new THREE.DirectionalLight(0xe3c987, 1.1);
  key.position.set(4, 6, 5);
  scene.add(key);
  const blue = new THREE.PointLight(0x5b8cff, 1.8, 14);
  blue.position.set(-4, -2, 4);
  scene.add(blue);

  const shell = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.65, 2)),
    new THREE.LineBasicMaterial({ color: 0xc9a45c, transparent: true, opacity: 0.42 })
  );
  root.add(shell);

  const core = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.95, 0.08, 120, 12),
    new THREE.MeshStandardMaterial({ color: 0xe3c987, metalness: 0.65, roughness: 0.32, transparent: true, opacity: 0.88 })
  );
  root.add(core);

  const ring = new THREE.LineSegments(
    new THREE.WireframeGeometry(new THREE.TorusGeometry(3.35, 0.04, 12, 96)),
    new THREE.LineBasicMaterial({ color: 0x5b8cff, transparent: true, opacity: 0.18 })
  );
  ring.rotation.x = Math.PI / 2.6;
  root.add(ring);

  const barColors = [0xc9a45c, 0x5b8cff, 0xe0a82e, 0xc0362c];
  const bars = [];
  for (let i = 0; i < 4; i++) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 1, 0.34),
      new THREE.MeshStandardMaterial({ color: barColors[i], metalness: 0.35, roughness: 0.28, transparent: true, opacity: 0.78 })
    );
    mesh.position.set(-1.35 + i * 0.9, -2.25, 0.38);
    mesh.scale.y = 0.38;
    mesh.userData.target = 0.38;
    bars.push(mesh);
    root.add(mesh);
  }

  const nodeGroup = new THREE.Group();
  const nodeColors = [0xc0362c, 0xe0a82e, 0xb9bcc4, 0x2f8f5b, 0xd36a86, 0x0f8a6d, 0x5b8cff];
  nodeColors.forEach((color, i) => {
    const node = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.12, 0),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 })
    );
    node.userData = { angle: i * 0.92, radius: 3.1 + (i % 2) * 0.55, speed: 0.003 + i * 0.00025 };
    nodeGroup.add(node);
  });
  root.add(nodeGroup);

  const particleCount = 260;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 11;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 7;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({ color: 0xc9a45c, size: 0.026, transparent: true, opacity: 0.52 })
  );
  scene.add(particles);

  let overallTarget = 0.18;
  let tx = 0;
  let ty = 0;
  let cx = 0;
  let cy = 0;
  window.addEventListener('mousemove', (e) => {
    tx = e.clientX / window.innerWidth - 0.5;
    ty = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  window.addEventListener('risk-lab:update', (e) => {
    const detail = e.detail || {};
    overallTarget = Math.max(0.1, Math.min(1, (detail.overall || 0) / 100));
    const values = detail.categories || [];
    bars.forEach((bar, i) => {
      const v = Math.max(0, Math.min(100, values[i] || 0));
      bar.userData.target = 0.32 + (v / 100) * 2.35;
    });
  });

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || canvas.clientWidth || window.innerWidth;
    const h = rect.height || canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  let raf = 0;
  let running = true;
  const start = performance.now();
  function animate() {
    if (!running) return;
    raf = requestAnimationFrame(animate);
    const t = (performance.now() - start) / 1000;
    cx += (tx - cx) * 0.04;
    cy += (ty - cy) * 0.04;

    root.rotation.y = -0.26 + t * 0.06 + cx * 0.34;
    root.rotation.x = -0.06 + cy * 0.22;
    shell.rotation.y = t * 0.12;
    core.rotation.x = t * 0.36;
    core.rotation.y = -t * 0.28;
    ring.rotation.z = -t * 0.18;
    particles.rotation.y = t * 0.011;
    particles.rotation.x = Math.sin(t * 0.2) * 0.05;

    bars.forEach((bar) => {
      bar.scale.y += (bar.userData.target - bar.scale.y) * 0.08;
      bar.position.y = -2.65 + bar.scale.y / 2;
    });

    nodeGroup.children.forEach((node) => {
      node.userData.angle += node.userData.speed * (1 + overallTarget);
      const a = node.userData.angle;
      const r = node.userData.radius + overallTarget * 0.8;
      node.position.set(Math.cos(a) * r, Math.sin(a * 1.3) * 1.35, Math.sin(a) * r);
    });

    renderer.render(scene, camera);
  }
  animate();

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) animate();
    else cancelAnimationFrame(raf);
  });
}

