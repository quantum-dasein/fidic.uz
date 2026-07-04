const canvas = document.querySelector('[data-not-found-3d]');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)').matches;

if (canvas && !reduce && isDesktop) {
  import('three')
    .then((THREE) => {
      try {
        initNotFoundScene(THREE);
      } catch (_) {
        canvas.hidden = true;
      }
    })
    .catch(() => {
      canvas.hidden = true;
    });
}

function initNotFoundScene(THREE) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.15, 11);

  const root = new THREE.Group();
  scene.add(root);

  const brass = 0xd8b35f;
  const blue = 0x6d96ff;
  const red = 0xc0362c;
  const ink = 0x10141d;

  scene.add(new THREE.AmbientLight(0xf7efe0, 0.72));
  const key = new THREE.DirectionalLight(0xf2d48a, 1.35);
  key.position.set(4, 5, 6);
  scene.add(key);
  const rim = new THREE.PointLight(0x6d96ff, 1.3, 14);
  rim.position.set(-4, -2.5, 4);
  scene.add(rim);

  const bridge = new THREE.Group();
  const deck = new THREE.Mesh(
    new THREE.BoxGeometry(6.8, 0.12, 0.18),
    new THREE.MeshStandardMaterial({ color: brass, metalness: 0.55, roughness: 0.3, transparent: true, opacity: 0.82 })
  );
  deck.position.y = -1.35;
  bridge.add(deck);

  for (let i = 0; i < 9; i += 1) {
    const x = -3.05 + i * 0.76;
    const p = new THREE.Mesh(
      new THREE.BoxGeometry(0.045, 0.95 + Math.sin(i * 0.7) * 0.16, 0.08),
      new THREE.MeshStandardMaterial({ color: brass, metalness: 0.35, roughness: 0.4, transparent: true, opacity: 0.55 })
    );
    p.position.set(x, -1.88, 0);
    bridge.add(p);
  }

  const archPoints = [];
  for (let i = 0; i <= 96; i += 1) {
    const t = i / 96;
    const x = (t - 0.5) * 7.2;
    const y = -1.28 + Math.sin(t * Math.PI) * 2.05;
    archPoints.push(new THREE.Vector3(x, y, 0.02));
  }
  const arch = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(archPoints),
    new THREE.LineBasicMaterial({ color: brass, transparent: true, opacity: 0.74 })
  );
  bridge.add(arch);
  root.add(bridge);

  const numberGroup = new THREE.Group();
  numberGroup.position.set(0, 0.22, -0.12);
  root.add(numberGroup);

  const digitMaterial = new THREE.MeshStandardMaterial({
    color: ink,
    metalness: 0.5,
    roughness: 0.34,
    transparent: true,
    opacity: 0.92,
  });
  const edgeMaterial = new THREE.LineBasicMaterial({ color: brass, transparent: true, opacity: 0.76 });

  [
    { type: 'four', x: -2.1 },
    { type: 'zero', x: 0 },
    { type: 'four', x: 2.1 },
  ].forEach((spec) => numberGroup.add(makeDigit(THREE, spec.type, spec.x, digitMaterial, edgeMaterial)));

  const pages = [];
  const pageGeo = new THREE.PlaneGeometry(0.62, 0.84);
  const pageMat = new THREE.MeshStandardMaterial({
    color: 0xf4ead8,
    metalness: 0.08,
    roughness: 0.72,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.68,
  });
  for (let i = 0; i < 18; i += 1) {
    const page = new THREE.Mesh(pageGeo, pageMat.clone());
    page.material.opacity = 0.36 + (i % 4) * 0.08;
    page.userData = {
      radius: 3.05 + (i % 3) * 0.46,
      angle: i * 0.55,
      speed: 0.0016 + (i % 5) * 0.00025,
      height: -0.18 + Math.sin(i) * 1.12,
    };
    pages.push(page);
    root.add(page);
  }

  const ringGroup = new THREE.Group();
  root.add(ringGroup);
  for (let i = 0; i < 5; i += 1) {
    const ring = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(makeEllipse(2.35 + i * 0.55, 0.76 + i * 0.16, 120)),
      new THREE.LineBasicMaterial({ color: i % 2 ? blue : brass, transparent: true, opacity: i % 2 ? 0.17 : 0.2 })
    );
    ring.rotation.x = 1.16;
    ring.rotation.z = -0.22 + i * 0.18;
    ringGroup.add(ring);
  }

  const warning = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.18, 0),
    new THREE.MeshStandardMaterial({ color: red, metalness: 0.3, roughness: 0.36 })
  );
  warning.position.set(3.58, 1.12, 0.26);
  root.add(warning);

  const particleCount = 220;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6.4;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5.4;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({ color: brass, size: 0.024, transparent: true, opacity: 0.5 })
  );
  scene.add(particles);

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  window.addEventListener('mousemove', (event) => {
    targetX = event.clientX / window.innerWidth - 0.5;
    targetY = event.clientY / window.innerHeight - 0.5;
  }, { passive: true });

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, rect.width || canvas.clientWidth);
    const height = Math.max(1, rect.height || canvas.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  let running = true;
  let frame = 0;
  const started = performance.now();
  function animate() {
    if (!running) return;
    frame = requestAnimationFrame(animate);
    const t = (performance.now() - started) * 0.001;

    currentX += (targetX - currentX) * 0.035;
    currentY += (targetY - currentY) * 0.035;
    root.rotation.y = currentX * 0.22;
    root.rotation.x = -0.04 + currentY * 0.14;
    bridge.rotation.z = Math.sin(t * 0.42) * 0.018;
    numberGroup.position.y = 0.22 + Math.sin(t * 0.72) * 0.055;
    ringGroup.rotation.z = t * 0.075;
    warning.rotation.x = t * 0.78;
    warning.rotation.y = t * 0.52;
    particles.rotation.y = -t * 0.02;

    pages.forEach((page, index) => {
      page.userData.angle += page.userData.speed;
      const a = page.userData.angle;
      const r = page.userData.radius;
      page.position.set(Math.cos(a) * r, page.userData.height + Math.sin(t + index) * 0.06, Math.sin(a) * r);
      page.rotation.set(Math.sin(a) * 0.28, -a + Math.PI / 2, Math.cos(a) * 0.12);
    });

    renderer.render(scene, camera);
  }
  animate();

  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) animate();
    else cancelAnimationFrame(frame);
  });
}

function makeDigit(THREE, type, x, material, edgeMaterial) {
  const group = new THREE.Group();
  const bar = (w, h, px, py, rot = 0) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.18), material);
    mesh.position.set(px, py, 0);
    mesh.rotation.z = rot;
    group.add(mesh);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), edgeMaterial);
    edges.position.copy(mesh.position);
    edges.rotation.copy(mesh.rotation);
    group.add(edges);
  };

  if (type === 'zero') {
    const curve = new THREE.EllipseCurve(0, 0, 0.72, 1.12, 0, Math.PI * 2);
    const points = curve.getPoints(96).map((p) => new THREE.Vector3(p.x, p.y, 0.11));
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), edgeMaterial);
    group.add(line);
    const inner = new THREE.Mesh(
      new THREE.TorusGeometry(0.72, 0.055, 10, 96),
      material
    );
    inner.scale.y = 1.55;
    inner.rotation.x = Math.PI / 2;
    group.add(inner);
  } else {
    bar(0.18, 2.08, -0.36, 0);
    bar(0.18, 1.22, 0.34, 0.45, -0.72);
    bar(1.08, 0.18, 0.03, -0.22);
    bar(0.18, 0.86, 0.49, -0.72);
  }
  group.position.x = x;
  return group;
}

function makeEllipse(rx, ry, segments) {
  const points = [];
  for (let i = 0; i <= segments; i += 1) {
    const a = (i / segments) * Math.PI * 2;
    points.push({ x: Math.cos(a) * rx, y: Math.sin(a) * ry, z: 0 });
  }
  return points;
}
