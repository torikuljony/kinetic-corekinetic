"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function createSurfaceTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  const ocean = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  ocean.addColorStop(0, "#061521");
  ocean.addColorStop(0.5, "#0e2a3f");
  ocean.addColorStop(1, "#08263d");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const landColors = ["#3cb68f", "#6cc39d", "#7ad4b5", "#6ea7c9"];
  const drawLand = (x: number, y: number, rx: number, ry: number, color: string) => {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0.65, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(x + rx * 0.2, y - ry * 0.15, rx * 0.75, ry * 0.8, 0.65, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(17, 92, 79, 0.28)";
    ctx.fill();
  };

  drawLand(430, 290, 210, 145, landColors[0]);
  drawLand(690, 350, 240, 175, landColors[1]);
  drawLand(980, 300, 250, 150, landColors[2]);
  drawLand(1380, 370, 220, 145, landColors[3]);
  drawLand(1650, 610, 180, 120, landColors[0]);

  for (let i = 0; i < 1200; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const r = Math.random() * 2.2;
    ctx.beginPath();
    ctx.fillStyle = `rgba(133, 201, 255, ${0.08 + Math.random() * 0.12})`;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

function createCloudTexture(): THREE.CanvasTexture | null {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 600;
  const ctx = canvas.getContext("2d");

  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 36; i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = 60 + Math.random() * 110;
    const cloud = ctx.createRadialGradient(x, y, 8, x, y, radius);
    cloud.addColorStop(0, "rgba(255,255,255,0.9)");
    cloud.addColorStop(0.45, "rgba(219,233,255,0.6)");
    cloud.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = cloud;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
  return texture;
}

export function MainObject() {
  const earth = useRef<THREE.Mesh>(null);
  const clouds = useRef<THREE.Mesh>(null);

  const surface = useMemo(() => createSurfaceTexture(), []);
  const cloudMap = useMemo(() => createCloudTexture(), []);

  if (!surface || !cloudMap) return null;

  useFrame((_, delta) => {
    if (earth.current) earth.current.rotation.y += delta * 0.025;
    if (clouds.current) clouds.current.rotation.y += delta * 0.031;
  });

  return (
    <group>
      <mesh ref={earth}>
        <sphereGeometry args={[0.88, 128, 96]} />
        <meshPhysicalMaterial
          map={surface}
          roughness={0.88}
          metalness={0}
          clearcoat={0.12}
          clearcoatRoughness={0.75}
          emissive="#07101b"
          emissiveIntensity={0.12}
        />
      </mesh>

      <mesh ref={clouds} scale={1.008}>
        <sphereGeometry args={[0.88, 128, 96]} />
        <meshStandardMaterial
          map={cloudMap}
          transparent
          opacity={0.72}
          roughness={1}
          depthWrite={false}
        />
      </mesh>

      {/* Thin blue atmospheric rim, seen most clearly along the planet's edge. */}
      <mesh scale={1.035}>
        <sphereGeometry args={[0.88, 96, 64]} />
        <meshBasicMaterial
          color="#4fa8ff"
          transparent
          opacity={0.14}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
