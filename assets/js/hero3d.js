/* Infinity Athletic Group: 3D hero "Infinity Ribbon"
   A glossy, iridescent lemniscate (the infinity loop from the IAG logo) with a
   light-speed comet racing along it and a reactive particle field. */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const canvas = document.querySelector('.hero__gl');
const hero = document.querySelector('.hero');
const media = document.querySelector('.hero__media');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function supportsWebGL() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}

if (canvas && hero && supportsWebGL()) init();

function init() {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  const COBALT = new THREE.Color('#2b44ff');
  const CORAL = new THREE.Color('#ff5a36');
  const VOLT = new THREE.Color('#dcff4f');
  const SKY = new THREE.Color('#a9c4ff');

  /* ---- Infinity curve (lemniscate of Bernoulli with a 3D twist) ---- */
  class Lemniscate extends THREE.Curve {
    constructor(a = 2.2) { super(); this.a = a; }
    getPoint(t, target = new THREE.Vector3()) {
      const s = t * Math.PI * 2;
      const d = 1 + Math.sin(s) ** 2;
      const x = (this.a * Math.cos(s)) / d;
      const y = (this.a * Math.sin(s) * Math.cos(s)) / d;
      const z = Math.sin(s) * 0.55;
      return target.set(x, y * 1.15, z);
    }
  }
  const curve = new Lemniscate();
  const group = new THREE.Group();
  scene.add(group);

  // Main ribbon
  const tubularSegments = 600, radialSegments = 48;
  const tubeGeo = new THREE.TubeGeometry(curve, tubularSegments, 0.2, radialSegments, true);
  const colors = [];
  const tmp = new THREE.Color();
  const count = tubeGeo.attributes.position.count;
  for (let i = 0; i < count; i++) {
    const seg = Math.floor(i / (radialSegments + 1)) / tubularSegments;
    const k = (Math.sin(seg * Math.PI * 2) + 1) / 2;
    tmp.copy(COBALT).lerp(CORAL, k);
    const flare = Math.max(0, Math.sin(seg * Math.PI * 6)) ** 6;
    tmp.lerp(VOLT, flare * 0.55);
    colors.push(tmp.r, tmp.g, tmp.b);
  }
  tubeGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  const tubeMat = new THREE.MeshPhysicalMaterial({
    vertexColors: true, metalness: 0.55, roughness: 0.18, clearcoat: 1, clearcoatRoughness: 0.06,
    iridescence: 0.35, iridescenceIOR: 1.4, envMapIntensity: 1.1,
  });
  const ribbon = new THREE.Mesh(tubeGeo, tubeMat);
  group.add(ribbon);

  // Thin orbit wire, slightly offset, for depth
  const wire = new THREE.Mesh(
    new THREE.TubeGeometry(new Lemniscate(2.75), 400, 0.018, 8, true),
    new THREE.MeshBasicMaterial({ color: COBALT, transparent: true, opacity: 0.55 })
  );
  wire.rotation.set(0.35, 0.2, 0.15);
  group.add(wire);
  const wire2 = wire.clone();
  wire2.material = new THREE.MeshBasicMaterial({ color: CORAL, transparent: true, opacity: 0.45 });
  wire2.rotation.set(-0.3, -0.25, -0.1);
  wire2.scale.setScalar(0.92);
  group.add(wire2);

  // Comet racing along the loop + its light
  const comet = new THREE.Mesh(new THREE.SphereGeometry(0.13, 32, 32), new THREE.MeshBasicMaterial({ color: VOLT }));
  const cometLight = new THREE.PointLight(VOLT, 6, 4, 1.6);
  comet.add(cometLight);
  group.add(comet);
  // Trail
  const TRAIL = 46;
  const trailGeo = new THREE.BufferGeometry();
  const trailPos = new Float32Array(TRAIL * 3);
  const trailCol = new Float32Array(TRAIL * 3);
  for (let i = 0; i < TRAIL; i++) { const f = 1 - i / TRAIL; tmp.copy(VOLT).lerp(SKY, 1 - f); trailCol.set([tmp.r * f, tmp.g * f, tmp.b * f], i * 3); }
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3));
  trailGeo.setAttribute('color', new THREE.BufferAttribute(trailCol, 3));
  const trail = new THREE.Points(trailGeo, new THREE.PointsMaterial({ size: 0.12, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  group.add(trail);

  // Particle field
  const P = window.innerWidth < 700 ? 500 : 1100;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(P * 3), pCol = new Float32Array(P * 3), pSeed = new Float32Array(P);
  for (let i = 0; i < P; i++) {
    const r = 2 + Math.random() * 5.5, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    pPos.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th) * 0.7, r * Math.cos(ph) * 0.6], i * 3);
    const c = [COBALT, CORAL, COBALT, SKY][i % 4];
    pCol.set([c.r, c.g, c.b], i * 3);
    pSeed[i] = Math.random() * 100;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
  const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false, sizeAttenuation: true }));
  scene.add(particles);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(3, 4, 6); scene.add(key);
  const rim = new THREE.DirectionalLight(CORAL, 2.5); rim.position.set(-5, -2, -3); scene.add(rim);

  /* ---- Layout: anchor ribbon to the video frame so it "breaks out" of it ---- */
  const anchor = new THREE.Vector3();
  let baseScale = 1;
  function layout() {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  function placeFromDOM() {
    const hr = hero.getBoundingClientRect();
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const halfW = halfH * camera.aspect;
    if (media && window.innerWidth > 960) {
      const r = media.getBoundingClientRect();
      const cx = (r.left + r.width * 0.12 - hr.left) / hr.width;
      const cy = (r.top + r.height * 0.86 - hr.top) / hr.height;
      anchor.set((cx * 2 - 1) * halfW, -(cy * 2 - 1) * halfH, 0.6);
      baseScale = (r.width / hr.width) * halfW * 0.5;
    } else if (media) {
      const r = media.getBoundingClientRect();
      const cx = (r.left + r.width * 0.5 - hr.left) / hr.width;
      const cy = (r.top + r.height * 0.95 - hr.top) / hr.height;
      anchor.set((cx * 2 - 1) * halfW, -(cy * 2 - 1) * halfH, 0.6);
      baseScale = (r.width / hr.width) * halfW * 0.5;
    }
  }
  layout();
  window.addEventListener('resize', layout);

  /* ---- Interaction ---- */
  const mouse = new THREE.Vector2(0, 0), smooth = new THREE.Vector2(0, 0);
  window.addEventListener('pointermove', (e) => { mouse.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1); }, { passive: true });

  let intro = reduce ? 1 : 0, introTarget = reduce ? 1 : 0;
  window.addEventListener('iag:ready', () => { introTarget = 1; });
  setTimeout(() => { introTarget = 1; }, 4000);

  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 }).observe(hero);

  const clock = new THREE.Clock();
  const cp = new THREE.Vector3();
  const history = [];

  function frame() {
    const t = clock.getElapsedTime();
    intro += (introTarget - intro) * 0.045;
    smooth.lerp(mouse, 0.06);
    const scrollP = Math.min(1, Math.max(0, window.scrollY / Math.max(1, hero.offsetHeight)));

    placeFromDOM();
    const ease = 1 - Math.pow(1 - intro, 3);
    group.position.copy(anchor);
    group.position.y += Math.sin(t * 0.8) * 0.08 - (1 - ease) * 1.2 + scrollP * 0.6;
    group.scale.setScalar(baseScale * (0.4 + 0.6 * ease) * (1 + scrollP * 0.25));
    group.rotation.x = -0.25 + smooth.y * 0.3 + Math.sin(t * 0.5) * 0.06 + scrollP * 0.8;
    group.rotation.y = 0.18 + smooth.x * 0.45 + (1 - ease) * 2.5 + scrollP * 1.2;
    group.rotation.z = -0.12 + Math.sin(t * 0.3) * 0.05;

    // comet
    const ct = (t * 0.12) % 1;
    curve.getPoint(ct, cp);
    comet.position.copy(cp);
    history.unshift(cp.x, cp.y, cp.z);
    if (history.length > TRAIL * 3) history.length = TRAIL * 3;
    for (let i = 0; i < TRAIL * 3; i++) trailPos[i] = history[i] ?? cp.getComponent(i % 3);
    trailGeo.attributes.position.needsUpdate = true;

    wire.rotation.z += 0.0025; wire2.rotation.z -= 0.002;

    particles.rotation.y = t * 0.03 + smooth.x * 0.25;
    particles.rotation.x = smooth.y * 0.15;
    particles.position.y = scrollP * 1.5;
    particles.material.opacity = 0.85 * ease;

    renderer.render(scene, camera);
  }

  if (reduce) { placeFromDOM(); frame(); window.addEventListener('resize', () => { layout(); frame(); }); return; }
  renderer.setAnimationLoop(() => { if (visible && !document.hidden) frame(); });
}
