"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";

/**
 * Inside the root zone.
 *
 * Everything else on this site is a real picture of a real thing — the estate,
 * the hall, the fermenters, the pack. What lives in the soil around a root is
 * the one subject there is no honest photograph of, so this is the one place
 * 3D earns its place (§21): it shows what the pack contains rather than
 * decorating a section a photograph could have carried.
 *
 * It is not a particle field in empty space. The brief is a camera *inside a
 * medium*, and three things sell that and nothing else does:
 *
 *   · two populations, not one — warm mineral grains carrying most of the
 *     frame, with the biology as smaller, brighter bodies among them. All
 *     green reads as bokeh; grit and ochre read as soil.
 *   · the medium itself — everything fades into a warm brown murk with
 *     distance, because you are looking *through* something, not across a void.
 *   · debris close to the lens — a few grains sit almost on the glass, huge and
 *     completely out of focus, drifting across. This is the cue that says
 *     "inside" rather than "looking at", and it is why the z coordinate
 *     streams and wraps instead of holding still.
 *
 * Reference is a wet-mount under a microscope, not science fiction: no additive
 * bloom, no flare, nothing pulsing.
 */

const VERT = /* glsl */ `
  attribute float aSeed;
  attribute float aSize;
  attribute float aKind;   // 0 mineral grain, 1 organism
  varying float vSeed;
  varying float vKind;
  varying float vDepth;
  uniform float uTime;
  uniform float uSpread;
  uniform float uRange;

  void main() {
    vSeed = aSeed;
    vKind = aKind;
    vec3 p = position;

    // The camera is travelling through the medium, so the medium streams past
    // it. Wrapping in z keeps the column endless without more particles.
    float speed = mix(0.42, 0.62, aSeed);
    p.z = mod(p.z + uTime * speed + uRange * 0.5, uRange) - uRange * 0.5;

    // Three incommensurate periods, so no drift ever visibly loops. Organisms
    // are lighter than grains and wander more.
    float wander = mix(0.30, 0.85, aKind);
    p.x += sin(uTime * 0.17 + aSeed * 6.283) * 0.42 * wander;
    p.y += cos(uTime * 0.13 + aSeed * 4.117) * 0.36 * wander;

    p.xy *= uSpread;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = -mv.z;
    // Grains near the lens blow up enormously — that is the point of them.
    gl_PointSize = aSize * (300.0 / max(vDepth, 0.35));
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  varying float vSeed;
  varying float vKind;
  varying float vDepth;
  uniform vec3 uGrainA;
  uniform vec3 uGrainB;
  uniform vec3 uLifeA;
  uniform vec3 uLifeB;
  uniform vec3 uMedium;
  uniform float uOpacity;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;

    // How sharply this body is resolved. Anything very close to the lens or
    // far back in the murk is soft; only the middle distance is in focus.
    float near = 1.0 - smoothstep(0.4, 3.0, vDepth);
    float far = smoothstep(4.0, 12.0, vDepth);
    float blur = clamp(near + far, 0.0, 1.0);

    float edge = smoothstep(0.5, mix(0.14, 0.48, blur), d);
    float core = smoothstep(mix(0.26, 0.5, blur), 0.0, d);

    vec3 grain = mix(uGrainA, uGrainB, vSeed);
    vec3 life = mix(uLifeA, uLifeB, vSeed);
    vec3 col = mix(grain, life, vKind);
    col += core * mix(0.06, 0.22, vKind) * (1.0 - blur);

    // The medium. Distance does not just dim a body, it tints it toward the
    // colour of the soil you are looking through.
    col = mix(col, uMedium, far * 0.66);

    // Grains carry the frame but must never compete with the organisms.
    float weight = mix(0.78, 1.0, vKind);
    float a = edge * uOpacity * weight * (0.24 + core * 0.58) * (1.0 - far * 0.38);
    // The lens debris is a shadow, not a subject — present, never readable.
    a *= mix(1.0, 0.44, near);

    gl_FragColor = vec4(col, a);
  }
`;

/**
 * A fixed-seed PRNG rather than Math.random, for two reasons: the soil is then
 * identical on every load and between server and client, and building the
 * geometry stays a pure function of `count`, which is what useMemo is allowed
 * to be.
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

/** The depth of the column the camera travels through, in world units. */
const RANGE = 16;

function Soil({ progress, count }: { progress: RefObject<number>; count: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const points = useRef<THREE.Points>(null);
  const { camera } = useThree();

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const size = new Float32Array(count);
    const kind = new Float32Array(count);
    const rand = mulberry32(0x1f0f2b1d);

    for (let i = 0; i < count; i++) {
      // A third of the bodies are the biology; the rest is the soil it lives
      // in. Weighted this way the frame reads as earth with life in it rather
      // than as a cloud of green.
      const organism = rand() < 0.34 ? 1 : 0;

      pos[i * 3] = (rand() - 0.5) * 15;
      pos[i * 3 + 1] = (rand() - 0.5) * 15;
      pos[i * 3 + 2] = (rand() - 0.5) * RANGE;
      seed[i] = rand();
      kind[i] = organism;
      // Mostly fine material with a few coarse grains, as in real soil.
      size[i] = organism
        ? 0.4 + Math.pow(rand(), 2.2) * 1.5
        : 0.7 + Math.pow(rand(), 3) * 4.2;
    }

    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    g.setAttribute("aKind", new THREE.BufferAttribute(kind, 1));
    return g;
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpread: { value: 1 },
      uOpacity: { value: 0 },
      uRange: { value: RANGE },
      // Wet mineral grit and organic matter.
      uGrainA: { value: new THREE.Color("#8a6f45") },
      uGrainB: { value: new THREE.Color("#ac8d5c") },
      // The consortium.
      uLifeA: { value: new THREE.Color("#6aa63c") },
      uLifeB: { value: new THREE.Color("#a6d45b") },
      // What the far distance turns into.
      uMedium: { value: new THREE.Color("#1d1609") },
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
    /* Never fully absent. On a wide screen the medium fills the column beside
       the photograph from the moment the section arrives, so the ground there
       is soil rather than flat black — then it comes forward at the handover.
       Behind a full-bleed photograph, as on a phone, the floor is unseen. */
    u.uOpacity.value = Math.max(
      0.3,
      THREE.MathUtils.clamp((p - 0.42) / 0.3, 0, 1),
    );
    u.uSpread.value = 1.18 - THREE.MathUtils.clamp(p, 0, 1) * 0.22;

    // One slow descent into the medium, never two moves at once.
    camera.position.z = 7.2 - THREE.MathUtils.clamp(p, 0, 1) * 2.8;
    if (points.current) points.current.rotation.z = p * 0.1;
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
      camera={{ fov: 48, position: [0, 0, 7.2] }}
    >
      <Soil progress={progress} count={dense ? 2400 : 760} />
    </Canvas>
  );
}
