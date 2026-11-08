"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MainObject } from "./MainObject";
import { Particles } from "./Particles";

function SpaceStars() {
  const geometry = useMemo(() => {
    const points = new Float32Array(1800 * 3);
    let seed = 173;
    const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
    for (let i = 0; i < 1800; i++) {
      points[i * 3] = (random() - 0.5) * 34;
      points[i * 3 + 1] = (random() - 0.5) * 22;
      points[i * 3 + 2] = -8 - random() * 10;
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(points, 3));
    return result;
  }, []);
  return <points geometry={geometry} renderOrder={-2}>
    <pointsMaterial color="#d9e9ff" size={0.025} sizeAttenuation transparent opacity={0.82} depthWrite={false} />
  </points>;
}

function Choreography({ target }: { target: React.RefObject<THREE.Group | null> }) {
  const { camera } = useThree();
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const group = target.current;
    if (!group) return;
    const media = gsap.matchMedia();
    media.add({ mobile: "(max-width: 640px)", tablet: "(min-width: 641px) and (max-width: 980px)", desktop: "(min-width: 981px)" }, (context) => {
      const { mobile, tablet } = context.conditions as { mobile: boolean; tablet: boolean; desktop: boolean };
      const x = mobile ? [1.5, 1.15, 1.4, 1.1, 1.5] : tablet ? [1.05, 0.75, 0.3, 0.9, 1.3] : [1.58, 1.25, 0.1, 1.55, 2.15];
      const size = mobile ? [0.58, 0.5, 0.62, 0.55, 0.62] : tablet ? [0.76, 0.62, 0.76, 0.68, 0.8] : [0.84, 0.68, 0.82, 0.76, 0.88];
      const cameraDepth = mobile ? [6.25, 6.5, 6, 6.3, 6.1] : tablet ? [5.7, 6.1, 5.4, 5.9, 5.5] : [5.1, 5.9, 5.1, 5.75, 5.2];
      gsap.set(group.position, { x: x[0] });
      gsap.set(group.scale, { x: size[0], y: size[0], z: size[0] });
      const timeline = gsap.timeline({ scrollTrigger: { trigger: ".experience", start: "top top", end: "bottom bottom", scrub: 1.25 } });
      timeline
        .to(group.position, { x: x[1], y: -0.1, z: -0.25, duration: 0.19, ease: "none" }, 0.15)
        .to(group.scale, { x: size[1], y: size[1], z: size[1], duration: 0.19, ease: "none" }, 0.15)
        .to(group.rotation, { y: Math.PI * 1.45, x: 0.3, duration: 0.19, ease: "none" }, 0.15)
        .to(camera.position, { x: mobile ? -0.04 : -0.1, z: cameraDepth[1], duration: 0.19, ease: "none" }, 0.15)
        .to(group.position, { x: x[2], y: 0.05, z: 0.1, duration: 0.19, ease: "none" }, 0.37)
        .to(group.scale, { x: size[2], y: size[2], z: size[2], duration: 0.19, ease: "none" }, 0.37)
        .to(group.rotation, { y: Math.PI * 2.9, x: -0.2, duration: 0.19, ease: "none" }, 0.37)
        .to(camera.position, { x: 0.12, z: cameraDepth[2], duration: 0.19, ease: "none" }, 0.37)
        .to(group.position, { x: x[3], y: -0.03, z: 0.05, duration: 0.19, ease: "none" }, 0.60)
        .to(group.scale, { x: size[3], y: size[3], z: size[3], duration: 0.19, ease: "none" }, 0.60)
        .to(group.rotation, { y: Math.PI * 4.3, x: 0.16, duration: 0.19, ease: "none" }, 0.60)
        .to(camera.position, { x: -0.06, z: cameraDepth[3], duration: 0.19, ease: "none" }, 0.60)
        .to(group.position, { x: x[4], y: 0, z: 0.08, duration: 0.18, ease: "none" }, 0.82)
        .to(group.scale, { x: size[4], y: size[4], z: size[4], duration: 0.18, ease: "none" }, 0.82)
        .to(group.rotation, { y: Math.PI * 5.8, x: 0, duration: 0.18, ease: "none" }, 0.82)
        .to(camera.position, { x: 0.04, z: cameraDepth[4], duration: 0.18, ease: "none" }, 0.82);
      ScrollTrigger.refresh();
      return () => timeline.scrollTrigger?.kill();
    });
    return () => media.revert();
  }, [camera, target]);
  return null;
}

export function Scene() {
  const object = useRef<THREE.Group>(null);
  return <div className="scene" aria-label="A procedural 3D kinetic energy core">
    <Canvas camera={{ position: [0, 0, 5.1], fov: 35 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
      <fog attach="fog" args={["#02030a", 9, 22]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[-3, 2.5, 4]} intensity={3.1} color="#fff1d7" />
      <pointLight position={[-4, 1, -2]} intensity={12} color="#40dcb2" />
      <pointLight position={[4, -2, 2]} intensity={8} color="#497fff" />
      <SpaceStars />
      <Suspense fallback={null}><group ref={object}><MainObject /></group><Particles count={typeof window !== "undefined" && window.innerWidth < 700 ? 55 : 140} /></Suspense>
      <Choreography target={object} />
    </Canvas>
    <div className="scene-vignette" aria-hidden="true" />
  </div>;
}
