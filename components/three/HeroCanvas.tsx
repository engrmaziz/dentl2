"use client";

import { useEffect, useRef } from "react";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animFrameId = 0;

    async function init() {
      // Dynamic import to avoid SSR issues
      const THREE = await import("three");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        canvas!.offsetWidth / canvas!.offsetHeight,
        0.1,
        100
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas!,
        alpha: true,
        antialias: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(canvas!.offsetWidth, canvas!.offsetHeight);

      // ── Particle geometry (loose tooth/molar shape) ────────────────────
      const COUNT = 800;
      const positions = new Float32Array(COUNT * 3);
      const colors = new Float32Array(COUNT * 3);

      const goldColor = new THREE.Color("#B8956A");
      const ivoryColor = new THREE.Color("#F7F3EE");

      // Molar cross-section shape using parametric distribution
      for (let i = 0; i < COUNT; i++) {
        const t = (i / COUNT) * Math.PI * 2;
        const layer = Math.floor(i / (COUNT / 5)); // 5 vertical layers
        const layerT = layer / 4; // 0 to 1 top to bottom

        // Crown radius narrows toward top and bottom
        const crownRadius = 0.8 + Math.sin(layerT * Math.PI) * 0.6;
        // Slight multi-lobe shape (molar cusps)
        const lobeOffset = 0.2 * Math.sin(t * 4);
        const r = crownRadius + lobeOffset + (Math.random() - 0.5) * 0.5;

        positions[i * 3] = Math.cos(t) * r + (Math.random() - 0.5) * 0.3;
        positions[i * 3 + 1] = (layerT - 0.5) * 3 + (Math.random() - 0.5) * 0.2;
        positions[i * 3 + 2] = Math.sin(t) * r * 0.6 + (Math.random() - 0.5) * 0.3;

        // Mix gold and ivory
        const color = Math.random() > 0.45 ? goldColor : ivoryColor;
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // Store original positions for repulsion spring-back
      const origPositions = positions.slice();

      const material = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      // ── Mouse repulsion ─────────────────────────────────────────────────
      const mouse = new THREE.Vector2(9999, 9999);
      const repulsionRadius = 120; // px
      const maxDisplacement = 30; // px
      const springStrength = 0.05;

      function onMouseMove(e: MouseEvent) {
        // Normalize to -1..1
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }
      window.addEventListener("mousemove", onMouseMove, { passive: true });

      // ── Scroll fade ─────────────────────────────────────────────────────
      let scrollProgress = 0;
      function onScroll() {
        scrollProgress = window.scrollY / (window.innerHeight * 0.8);
      }
      window.addEventListener("scroll", onScroll, { passive: true });

      // ── Resize handler ──────────────────────────────────────────────────
      function onResize() {
        if (!canvas) return;
        const w = canvas.offsetWidth;
        const h = canvas.offsetHeight;
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
      window.addEventListener("resize", onResize);

      // ── Animate ─────────────────────────────────────────────────────────
      const clock = new THREE.Clock();

      function animate() {
        animFrameId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        // Auto rotate
        particles.rotation.y += 0.0003;
        particles.rotation.x = Math.sin(elapsed * 0.1) * 0.05;

        // Scroll: stretch & fade
        const sp = Math.min(scrollProgress, 1);
        particles.scale.y = 1 + sp * 0.8;
        material.opacity = 0.85 * (1 - sp);

        // Mouse repulsion
        const posArr = geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < COUNT; i++) {
          const ix = i * 3;
          const ox = origPositions[ix];
          const oy = origPositions[ix + 1];
          const oz = origPositions[ix + 2];

          // Project particle to screen space
          const vec = new THREE.Vector3(posArr[ix], posArr[ix + 1], posArr[ix + 2]);
          vec.applyMatrix4(particles.matrixWorld);
          vec.project(camera);

          const sx = (vec.x * 0.5 + 0.5) * window.innerWidth;
          const sy = (1 - (vec.y * 0.5 + 0.5)) * window.innerHeight;
          const mx = (mouse.x * 0.5 + 0.5) * window.innerWidth;
          const my = (1 - (mouse.y * 0.5 + 0.5)) * window.innerHeight;

          const dist = Math.sqrt((sx - mx) ** 2 + (sy - my) ** 2);

          if (dist < repulsionRadius) {
            const force = (1 - dist / repulsionRadius) * maxDisplacement * 0.01;
            const angle = Math.atan2(sy - my, sx - mx);
            posArr[ix] += Math.cos(angle) * force;
            posArr[ix + 1] += Math.sin(angle) * force;
          }

          // Spring back toward original
          posArr[ix] += (ox - posArr[ix]) * springStrength;
          posArr[ix + 1] += (oy - posArr[ix + 1]) * springStrength;
          posArr[ix + 2] += (oz - posArr[ix + 2]) * springStrength;
        }

        geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      }

      animate();

      // ── Cleanup ─────────────────────────────────────────────────────────
      return () => {
        cancelAnimationFrame(animFrameId);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    }

    let cleanup: (() => void) | undefined;
    init().then((fn) => {
      cleanup = fn;
    });

    return () => {
      cancelAnimationFrame(animFrameId);
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
