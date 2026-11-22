"use client";

import { useEffect, useRef } from "react";

/**
 * 3D infinity ribbon in the exact IAG logo colors (royal blue #203878 + red #E81828),
 * with a white comet tracing the loop and a sparse particle field. Fills its parent.
 */
export default function InfinityRibbon({ className }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        return; // no WebGL: the hero still works without the ribbon
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      el.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0, 9);

      const LOGO_RED = new THREE.Color("#e81828");
      const BLUE = new THREE.Color("#203878").multiplyScalar(1.15);
      const WHITE = new THREE.Color("#ffffff");
      const GOLD = new THREE.Color("#c8a96e");

      class Lemniscate extends THREE.Curve<import("three").Vector3> {
        constructor(public a = 2.2) { super(); }
        getPoint(t: number, target = new THREE.Vector3()) {
          const s = t * Math.PI * 2;
          const d = 1 + Math.sin(s) ** 2;
          return target.set((this.a * Math.cos(s)) / d, ((this.a * Math.sin(s) * Math.cos(s)) / d) * 1.15, Math.sin(s) * 0.55);
        }
      }
      const curve = new Lemniscate();
      const group = new THREE.Group();
      scene.add(group);

      const TS = 600, RS = 48;
      const geo = new THREE.TubeGeometry(curve, TS, 0.2, RS, true);
      const colors: number[] = [];
      const tmp = new THREE.Color();
      for (let i = 0; i < geo.attributes.position.count; i++) {
        const seg = Math.floor(i / (RS + 1)) / TS;
        const k = THREE.MathUtils.smoothstep(Math.cos(seg * Math.PI * 2), -0.18, 0.18);
        tmp.copy(BLUE).lerp(LOGO_RED, k);
        colors.push(tmp.r, tmp.g, tmp.b);
      }
      geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
      const mat = new THREE.MeshPhysicalMaterial({ vertexColors: true, metalness: 0.25, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 0.45 });
      group.add(new THREE.Mesh(geo, mat));

      const wireGeo = new THREE.TubeGeometry(new Lemniscate(2.75), 400, 0.012, 8, true);
      const wire = new THREE.Mesh(wireGeo, new THREE.MeshBasicMaterial({ color: GOLD, transparent: true, opacity: 0.5 }));
      wire.rotation.set(0.35, 0.2, 0.15);
      group.add(wire);
      const wire2 = new THREE.Mesh(wireGeo, new THREE.MeshBasicMaterial({ color: WHITE, transparent: true, opacity: 0.25 }));
      wire2.rotation.set(-0.3, -0.25, -0.1);
      wire2.scale.setScalar(0.92);
      group.add(wire2);

      const comet = new THREE.Mesh(new THREE.SphereGeometry(0.12, 24, 24), new THREE.MeshBasicMaterial({ color: WHITE }));
      comet.add(new THREE.PointLight(WHITE, 5, 4, 1.6));
      group.add(comet);
      const TRAIL = 46;
      const trailPos = new Float32Array(TRAIL * 3);
      const trailCol = new Float32Array(TRAIL * 3);
      for (let i = 0; i < TRAIL; i++) { const f = 1 - i / TRAIL; tmp.copy(WHITE).lerp(GOLD, 1 - f); trailCol.set([tmp.r * f, tmp.g * f, tmp.b * f], i * 3); }
      const trailGeo = new THREE.BufferGeometry();
      trailGeo.setAttribute("position", new THREE.BufferAttribute(trailPos, 3));
      trailGeo.setAttribute("color", new THREE.BufferAttribute(trailCol, 3));
      group.add(new THREE.Points(trailGeo, new THREE.PointsMaterial({ size: 0.11, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })));

      const P = window.innerWidth < 700 ? 260 : 600;
      const pPos = new Float32Array(P * 3), pCol = new Float32Array(P * 3);
      for (let i = 0; i < P; i++) {
        const r = 2 + Math.random() * 5, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
        pPos.set([r * Math.sin(ph) * Math.cos(th), r * Math.sin(ph) * Math.sin(th) * 0.7, r * Math.cos(ph) * 0.6], i * 3);
        const c = [GOLD, WHITE, BLUE, LOGO_RED][i % 4];
        pCol.set([c.r, c.g, c.b], i * 3);
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
      const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.8, depthWrite: false }));
      scene.add(particles);

      scene.add(new THREE.AmbientLight(0xffffff, 0.35));
      const key = new THREE.DirectionalLight(0xffffff, 2.2); key.position.set(3, 4, 6); scene.add(key);
      const rim = new THREE.DirectionalLight(GOLD, 2); rim.position.set(-5, -2, -3); scene.add(rim);

      const resize = () => {
        const w = el.clientWidth, h = el.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / Math.max(h, 1);
        camera.updateProjectionMatrix();
        const halfW = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * camera.aspect;
        group.scale.setScalar(Math.min(1.15, halfW / 2.7));
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(el);

      const mouse = { x: 0, y: 0 }, sm = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => { mouse.x = (e.clientX / innerWidth) * 2 - 1; mouse.y = -(e.clientY / innerHeight) * 2 + 1; };
      window.addEventListener("pointermove", onMove, { passive: true });

      let visible = true;
      const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
      io.observe(el);

      const clock = new THREE.Clock();
      const cp = new THREE.Vector3();
      const hist: number[] = [];
      let intro = reduce ? 1 : 0;

      const frame = () => {
        const t = clock.getElapsedTime();
        intro += (1 - intro) * 0.03;
        sm.x += (mouse.x - sm.x) * 0.05; sm.y += (mouse.y - sm.y) * 0.05;
        const ease = 1 - Math.pow(1 - intro, 3);
        const scrollP = Math.min(1, scrollY / Math.max(1, innerHeight));
        group.position.y = Math.sin(t * 0.8) * 0.08 - (1 - ease) * 1.2 + scrollP * 0.8;
        group.rotation.x = -0.25 + sm.y * 0.3 + scrollP * 0.6;
        group.rotation.y = 0.18 + sm.x * 0.45 + (1 - ease) * 2.5 + scrollP * 1.1;
        group.rotation.z = -0.12 + Math.sin(t * 0.3) * 0.05;
        curve.getPoint((t * 0.12) % 1, cp);
        comet.position.copy(cp);
        hist.unshift(cp.x, cp.y, cp.z);
        if (hist.length > TRAIL * 3) hist.length = TRAIL * 3;
        for (let i = 0; i < TRAIL * 3; i++) trailPos[i] = hist[i] ?? cp.getComponent(i % 3);
        trailGeo.attributes.position.needsUpdate = true;
        wire.rotation.z += 0.002; wire2.rotation.z -= 0.0016;
        particles.rotation.y = t * 0.03 + sm.x * 0.2;
        (particles.material as import("three").PointsMaterial).opacity = 0.8 * ease;
        renderer.render(scene, camera);
      };

      if (reduce) frame();
      else renderer.setAnimationLoop(() => { if (visible && !document.hidden) frame(); });

      cleanup = () => {
        renderer.setAnimationLoop(null);
        ro.disconnect(); io.disconnect();
        window.removeEventListener("pointermove", onMove);
        scene.traverse((o) => {
          const m = o as import("three").Mesh;
          m.geometry?.dispose?.();
          const mm = m.material as import("three").Material | undefined;
          mm?.dispose?.();
        });
        pmrem.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, []);

  return <div ref={host} className={className} aria-hidden />;
}
