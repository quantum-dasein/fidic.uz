const canvas = document.querySelector('[data-contract-constellation]');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isDesktop = window.matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine)').matches;

if (canvas && !reduce && isDesktop) {
  import('three')
    .then((THREE) => {
      try {
        initContractConstellation(THREE);
      } catch (_) {
        canvas.style.display = 'none';
      }
    })
    .catch(() => {
      canvas.style.display = 'none';
    });
}

function initContractConstellation(THREE) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
  camera.position.set(0, 0.15, 10.5);

  const root = new THREE.Group();
  scene.add(root);

  const brass = 0xd8b35f;
  const blue = 0x6d96ff;
  const ink = 0x0b111c;

  const curvePoints = [
    new THREE.Vector3(-5.2, -1.3, 0.1),
    new THREE.Vector3(-3.8, -0.55, -0.2),
    new THREE.Vector3(-2.2, -0.35, 0.05),
    new THREE.Vector3(-0.75, -0.58, -0.05),
    new THREE.Vector3(0.85, -0.35, 0.15),
    new THREE.Vector3(2.45, 0.1, -0.05),
    new THREE.Vector3(4.1, 0.55, 0.12),
    new THREE.Vector3(5.2, 1.05, 0),
  ];
  const curve = new THREE.CatmullRomCurve3(curvePoints);
  const railGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(120));
  const rail = new THREE.Line(
    railGeometry,
    new THREE.LineBasicMaterial({ color: blue, transparent: true, opacity: 0.72 })
  );
  root.add(rail);

  const warmRail = new THREE.Line(
    railGeometry.clone(),
    new THREE.LineBasicMaterial({ color: brass, transparent: true, opacity: 0.34 })
  );
  warmRail.position.z = 0.03;
  root.add(warmRail);

  const nodeGroup = new THREE.Group();
  root.add(nodeGroup);
  const nodeGeometry = new THREE.SphereGeometry(0.085, 20, 14);
  const nodeHaloGeometry = new THREE.SphereGeometry(0.22, 28, 18);
  const nodes = [];
  for (let i = 0; i < 10; i += 1) {
    const point = curve.getPoint(i / 9);
    const material = new THREE.MeshBasicMaterial({
      color: i === 0 || i === 9 ? brass : blue,
      transparent: true,
      opacity: 0.95,
    });
    const core = new THREE.Mesh(nodeGeometry, material);
    core.position.copy(point);
    nodeGroup.add(core);

    const halo = new THREE.Mesh(
      nodeHaloGeometry,
      new THREE.MeshBasicMaterial({
        color: i === 0 || i === 9 ? brass : blue,
        transparent: true,
        opacity: i === 0 || i === 9 ? 0.16 : 0.08,
        wireframe: true,
      })
    );
    halo.position.copy(point);
    nodeGroup.add(halo);
    nodes.push({ core, halo, offset: i * 0.43 });
  }

  const docGroup = new THREE.Group();
  const page = new THREE.Mesh(
    new THREE.PlaneGeometry(1.15, 1.5, 1, 1),
    new THREE.MeshBasicMaterial({
      color: ink,
      transparent: true,
      opacity: 0.38,
      side: THREE.DoubleSide,
    })
  );
  docGroup.add(page);

  const pageOutline = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.15, 1.5)),
    new THREE.LineBasicMaterial({ color: brass, transparent: true, opacity: 0.5 })
  );
  docGroup.add(pageOutline);

  for (let i = 0; i < 5; i += 1) {
    const line = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-0.38, 0.42 - i * 0.18, 0.03),
        new THREE.Vector3(0.38, 0.42 - i * 0.18, 0.03),
      ]),
      new THREE.LineBasicMaterial({ color: i < 2 ? brass : blue, transparent: true, opacity: 0.34 })
    );
    docGroup.add(line);
  }
  docGroup.position.set(0.35, 0.75, -0.15);
  docGroup.rotation.set(-0.74, 0, -0.22);
  root.add(docGroup);

  const orbitGroup = new THREE.Group();
  root.add(orbitGroup);
  for (let i = 0; i < 4; i += 1) {
    const ring = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(makeEllipse(1.2 + i * 0.55, 0.42 + i * 0.2, 96)),
      new THREE.LineBasicMaterial({
        color: i % 2 ? blue : brass,
        transparent: true,
        opacity: i % 2 ? 0.16 : 0.22,
      })
    );
    ring.rotation.x = 1.12;
    ring.rotation.z = -0.18 + i * 0.22;
    orbitGroup.add(ring);
  }

  const particleCount = 130;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 11;
    positions[i * 3 + 1] = (Math.random() - 0.48) * 5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2.8;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({ color: brass, size: 0.025, transparent: true, opacity: 0.62 })
  );
  root.add(particles);

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
    root.rotation.y = currentX * 0.16;
    root.rotation.x = -0.08 + currentY * 0.12;
    root.position.y = Math.sin(t * 0.5) * 0.04;
    orbitGroup.rotation.z = t * 0.08;
    particles.rotation.y = -t * 0.025;

    nodes.forEach(({ core, halo, offset }) => {
      const pulse = 1 + Math.sin(t * 1.6 + offset) * 0.12;
      core.scale.setScalar(pulse);
      halo.rotation.y = t * 0.25 + offset;
      halo.rotation.x = t * 0.16;
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

function makeEllipse(rx, ry, segments) {
  const points = [];
  for (let i = 0; i <= segments; i += 1) {
    const a = (i / segments) * Math.PI * 2;
    points.push({ x: Math.cos(a) * rx, y: Math.sin(a) * ry, z: 0 });
  }
  return points;
}
