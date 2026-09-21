"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

/**
 * The part of the product you cannot photograph.
 *
 * Everything else on this site is a real picture of a real thing — the estate,
 * the hall, the fermenters, the pack. The organisms inside the pack are the one
 * subject there is no honest photograph of, so this is the one place 3D earns
 * its place (§21): it visualises what the pack contains rather than decorating
 * a section that a photograph could have carried.
 *
 * It is deliberately not a sci-fi particle field. The reference is darkfield
 * microscopy of a liquid culture — bodies of slightly different sizes drifting
 * at different depths, most of them out of focus, a few catching the light.
 * Muted greens, no additive bloom, no lens flare, nothing pulsing.
 *
 * Scroll drives it through a ref rather than React state: the value changes on
 * every frame of a scroll and re-rendering the tree that often would be wasted
 * work. `useFrame` reads the ref directly.
 */

const VERT = /* glsl */ `
  attribute float aSeed;
  attribute float aSize;
  varying float vSeed;
  varying float vDepth;
  uniform float uTime;
  uniform float uSpread;

  void main() {
    vSeed = aSeed;
    vec3 p = position;

    // Three incommensurate periods, so the field never visibly loops.
    float t = uTime;
    p.x += sin(t * 0.17 + aSeed * 6.283) * 0.42;
    p.y += cos(t * 0.13 + aSeed * 4.117) * 0.36;
    p.z += sin(t * 0.11 + aSeed * 3.301) * 0.30;

    // The field opens out as the section is entered.
    p.xy *= uSpread;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    gl_PointSize = aSize * (260.0 / max(vDepth, 0.1));
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  varying float vSeed;
  varying float vDepth;
  uniform vec3 uNear;
  uniform vec3 uFar;
  uniform float uOpacity;

  void main() {
    // A soft round body with a slightly brighter centre — a cell under a
    // microscope, not a glowing dot.
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.18, d);
    float core = smoothstep(0.30, 0.02, d);

    vec3 col = mix(uNear, uFar, vSeed);
    col += core * 0.18;

    // Anything far from the lens falls out of focus and loses contrast.
    float focus = 1.0 - smoothstep(3.5, 11.0, vDepth);
    float a = edge * uOpacity * (0.20 + core * 0.55) * (0.30 + focus * 0.70);

    gl_FragColor = vec4(col, a);
  }
`;

/**
 * A fixed-seed PRNG rather than Math.random, for two reasons: the layout of
 * the culture is then identical on every load and between server and client,
 * and building the geometry stays a pure function of `count`, which is what
 * useMemo is allowed to be.
 */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Culture({ progress, count }: { progress: RefObject<number>; count: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const points = useRef<THREE.Points>(null);
  const { camera } = useThree();

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const size = new Float32Array(count);
    const rand = mulberry32(0x1f0f2b1d);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand() - 0.5) * 13;
      pos[i * 3 + 1] = (rand() - 0.5) * 13;
      pos[i * 3 + 2] = (rand() - 0.5) * 11 - 1;
      seed[i] = rand();
      // Mostly small bodies with a few larger ones, as in a real culture.
      size[i] = 0.5 + Math.pow(rand(), 3) * 2.6;
    }

    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpread: { value: 1 },
      uOpacity: { value: 0 },
      uNear: { value: new THREE.Color("#5f9c35") },
      uFar: { value: new THREE.Color("#a6d45b") },
    }),
    [],
  );

  /* eslint-disable react-hooks/immutability -- useFrame runs on the render
     loop, not during React render. Writing uniforms and the camera in place is
     how three.js is driven; copying them per frame would allocate 60 times a
     second to no benefit. */
  useFrame((_, delta) => {
    const p = progress.current ?? 0;
    const u = mat.current?.uniforms;
    if (!u) return;

    u.uTime.value += delta;
    // Holds back while the photography is still on screen, then takes over.
    u.uOpacity.value = THREE.MathUtils.clamp((p - 0.42) / 0.3, 0, 1);
    u.uSpread.value = 1.18 - THREE.MathUtils.clamp(p, 0, 1) * 0.22;

    // One slow push toward the culture, never two moves at once.
    camera.position.z = 9.4 - THREE.MathUtils.clamp(p, 0, 1) * 3.6;
    if (points.current) points.current.rotation.z = p * 0.12;
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={mat}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

export default function MicrobialField({
  progress,
  dense,
}: {
  progress: RefObject<number>;
  /** Phones carry a third of the bodies and a lower pixel ratio. */
  dense: boolean;
}) {
  return (
    <Canvas
      className="bio-canvas"
      dpr={dense ? [1, 1.75] : [1, 1.25]}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      camera={{ fov: 42, position: [0, 0, 9.4] }}
    >
      <Culture progress={progress} count={dense ? 1400 : 460} />
    </Canvas>
  );
}
