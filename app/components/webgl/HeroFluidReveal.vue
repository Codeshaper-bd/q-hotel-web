<template>
  <!--
    Cursor fluid reveal — a WebGL layer over the hero's golden stage. Moving
    the pointer injects soft "ink" splats into a low-res GPU trail field that
    wanders with curl noise and decays away; the composite pass draws the hero
    footage only where the field is dense, so the cursor appears to melt
    liquid windows through the stage (alongside the Q letterform).

    Purely decorative and additive:
    - Parent mounts it only for fine pointers with motion allowed; a failed
      WebGL context is a silent no-op (the DOM hero is the fallback).
    - The layer fades as the stage dissolve begins (progress 0.3-0.45) and
      the sim retires entirely past progress 0.5.
    - The RAF loop runs only while there is live ink: it stops when the field
      has decayed, the hero is offscreen, or the tab is hidden.
    - Samples the SAME <video> element as the DOM reveal and mirrors its
      parallax scale (heroVideoScale), so revealed patches line up exactly
      with the footage inside the Q window.
  -->
  <canvas
    ref="canvasRef"
    class="pointer-events-none absolute inset-0 h-full w-full"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  /** The hero footage element the composite pass samples as a texture */
  videoEl?: HTMLVideoElement | null
  /** Scroll journey progress (same 0-1 the DOM reveal receives) */
  progress?: number
}>(), {
  videoEl: null,
  progress: 0,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)
const { addCleanup } = useAnimationCleanup()
const preloaderComplete = useState('preloader-complete', () => false)

/** Fixed sim resolution — the field is soft by nature, more pixels buy nothing */
const SIM_SIZE = 256
/** Composite DPR cap: the effect reads soft, so 1.5 is visually free */
const MAX_DPR = 1.5
/** RAF retires this long after the last splat — the field has fully decayed */
const IDLE_STOP_MS = 2200
/** Scroll progress past which the stage is dissolving and the sim retires */
const RETIRE_PROGRESS = 0.5
/** Max splats folded into one sim pass (fast strokes get interpolated) */
const MAX_SPLATS = 4
/** Duration of the one-shot "teaching" pulse that circles the Q on arrival */
const INTRO_MS = 1500

/*
 * Feel knobs — how much stage the cursor melts and for how long. Kept
 * deliberately restrained: the fluid is an accent, the Q stays the hero.
 */
/** Per-frame field retention: higher = longer liquid tail */
const FIELD_DECAY = 0.952
/** Splat radius in viewport-height units at rest / at max stroke speed */
const SPLAT_RADIUS_BASE = 0.036
const SPLAT_RADIUS_MAX = 0.062
/** Ink strength injected per frame at rest / at max stroke speed */
const SPLAT_STRENGTH_BASE = 0.15
const SPLAT_STRENGTH_MAX = 0.55

const VERTEX_SOURCE = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

/* Trail field: previous frame advected along a curl-noise flow (organic
   liquid wander), decayed toward zero, plus this frame's pointer splats.
   The constant bleed term keeps byte textures from stalling at low values. */
const SIM_FRAGMENT_SOURCE = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uField;
uniform float uTime;
uniform float uAspect;
uniform vec4 uSplats[${MAX_SPLATS}];

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

vec2 curl(vec2 p) {
  float e = 0.02;
  float dx = noise(p + vec2(e, 0.0)) - noise(p - vec2(e, 0.0));
  float dy = noise(p + vec2(0.0, e)) - noise(p - vec2(0.0, e));
  return vec2(dy, -dx) / (2.0 * e);
}

void main() {
  vec2 flow = (curl(vUv * 3.0 + uTime * 0.08) * 0.7 + curl(vUv * 9.0 - uTime * 0.05) * 0.3) * 0.0018;
  float field = texture2D(uField, vUv - flow).r;
  field = max(field * ${FIELD_DECAY.toFixed(4)} - 0.002, 0.0);
  for (int i = 0; i < ${MAX_SPLATS}; i++) {
    vec4 splat = uSplats[i];
    if (splat.w > 0.0) {
      vec2 d = vUv - splat.xy;
      d.x *= uAspect;
      field += splat.w * exp(-dot(d, d) / (splat.z * splat.z));
    }
  }
  gl_FragColor = vec4(min(field, 1.0), 0.0, 0.0, 1.0);
}
`

/* Composite: gooey-thresholded field masks the cover-fit video (with the DOM
   reveal's parallax scale), the field gradient bends the sample like a liquid
   lens, blob edges catch a faint gold rim, and the DOM vignette is mirrored
   so edge blobs don't punch bright holes through it. Premultiplied output. */
const DRAW_FRAGMENT_SOURCE = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D uField;
uniform sampler2D uVideo;
uniform float uCanvasAspect;
uniform float uVideoAspect;
uniform float uVideoScale;
uniform float uGlobalAlpha;
uniform vec3 uGold;
uniform vec3 uNight;

void main() {
  float field = texture2D(uField, vUv).r;
  float alpha = smoothstep(0.18, 0.55, field) * uGlobalAlpha;
  if (alpha < 0.004) {
    gl_FragColor = vec4(0.0);
    return;
  }

  vec2 texel = vec2(1.0 / ${SIM_SIZE}.0);
  vec2 grad = vec2(
    texture2D(uField, vUv + vec2(texel.x, 0.0)).r - texture2D(uField, vUv - vec2(texel.x, 0.0)).r,
    texture2D(uField, vUv + vec2(0.0, texel.y)).r - texture2D(uField, vUv - vec2(0.0, texel.y)).r
  );

  vec2 st = vUv - 0.5;
  vec2 coverFit = uCanvasAspect > uVideoAspect
    ? vec2(1.0, uVideoAspect / uCanvasAspect)
    : vec2(uCanvasAspect / uVideoAspect, 1.0);
  vec2 videoUv = st * coverFit / uVideoScale + 0.5 - grad * 0.05;
  vec3 color = texture2D(uVideo, videoUv).rgb;

  float edge = smoothstep(0.1, 0.26, field) * (1.0 - smoothstep(0.3, 0.6, field));
  color += uGold * edge * 0.35;

  vec2 vignettePos = (vUv - vec2(0.5, 0.55)) / vec2(1.2, 0.9);
  color = mix(color, uNight, smoothstep(0.55, 1.0, length(vignettePos)) * 0.55);

  gl_FragColor = vec4(color * alpha, alpha);
}
`

interface FieldTarget {
  texture: WebGLTexture
  framebuffer: WebGLFramebuffer
}

type UniformMap<Name extends string> = Record<Name, WebGLUniformLocation | null>

let gl: WebGLRenderingContext | null = null
let simProgram: WebGLProgram | null = null
let drawProgram: WebGLProgram | null = null
let simUniforms: UniformMap<'field' | 'time' | 'aspect' | 'splats'> | null = null
let drawUniforms: UniformMap<
  'field' | 'video' | 'canvasAspect' | 'videoAspect' | 'videoScale' | 'globalAlpha' | 'gold' | 'night'
> | null = null
let simPositionLocation = -1
let drawPositionLocation = -1
let quadBuffer: WebGLBuffer | null = null
let videoTexture: WebGLTexture | null = null
let fieldTargets: FieldTarget[] = []
let readIndex = 0
let canvasAspect = 1
let rafId = 0
let running = false
let dead = false
let heroVisible = true
let lastActivityAt = 0
let lastPointer: { x: number, y: number, time: number } | null = null
let pendingSplats: Array<[number, number, number, number]> = []
let introStartAt = 0
let introPlayed = false
let pulseTimeout = 0
let goldColor: [number, number, number] = [0.79, 0.64, 0.36]
let nightColor: [number, number, number] = [0, 0.06, 0.11]

function compileShader(context: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = context.createShader(type)
  if (!shader) {
    return null
  }
  context.shaderSource(shader, source)
  context.compileShader(shader)
  if (!context.getShaderParameter(shader, context.COMPILE_STATUS)) {
    context.deleteShader(shader)
    return null
  }
  return shader
}

function createProgram(context: WebGLRenderingContext, fragmentSource: string): WebGLProgram | null {
  const vertexShader = compileShader(context, context.VERTEX_SHADER, VERTEX_SOURCE)
  const fragmentShader = compileShader(context, context.FRAGMENT_SHADER, fragmentSource)
  if (!vertexShader || !fragmentShader) {
    return null
  }
  const program = context.createProgram()
  if (!program) {
    return null
  }
  context.attachShader(program, vertexShader)
  context.attachShader(program, fragmentShader)
  context.linkProgram(program)
  // Shaders are owned by the program after linking; flag them for deletion
  context.deleteShader(vertexShader)
  context.deleteShader(fragmentShader)
  if (!context.getProgramParameter(program, context.LINK_STATUS)) {
    context.deleteProgram(program)
    return null
  }
  return program
}

function createFieldTarget(context: WebGLRenderingContext): FieldTarget | null {
  const texture = context.createTexture()
  const framebuffer = context.createFramebuffer()
  if (!texture || !framebuffer) {
    return null
  }
  context.bindTexture(context.TEXTURE_2D, texture)
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR)
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR)
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE)
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE)
  context.texImage2D(
    context.TEXTURE_2D,
    0,
    context.RGBA,
    SIM_SIZE,
    SIM_SIZE,
    0,
    context.RGBA,
    context.UNSIGNED_BYTE,
    new Uint8Array(SIM_SIZE * SIM_SIZE * 4),
  )
  context.bindFramebuffer(context.FRAMEBUFFER, framebuffer)
  context.framebufferTexture2D(context.FRAMEBUFFER, context.COLOR_ATTACHMENT0, context.TEXTURE_2D, texture, 0)
  const complete = context.checkFramebufferStatus(context.FRAMEBUFFER) === context.FRAMEBUFFER_COMPLETE
  context.bindFramebuffer(context.FRAMEBUFFER, null)
  if (!complete) {
    context.deleteTexture(texture)
    context.deleteFramebuffer(framebuffer)
    return null
  }
  return { texture, framebuffer }
}

/** Design tokens are space-separated RGB triples ("201 164 92") */
function readTokenColor(name: string, fallback: [number, number, number]): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  const [r, g, b] = raw.split(/\s+/).map(Number)
  if (r === undefined || g === undefined || b === undefined || [r, g, b].some(value => !Number.isFinite(value))) {
    return fallback
  }
  return [r / 255, g / 255, b / 255]
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) {
    return
  }
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
  const width = Math.round(canvas.clientWidth * dpr)
  const height = Math.round(canvas.clientHeight * dpr)
  if (width > 0 && height > 0 && (canvas.width !== width || canvas.height !== height)) {
    canvas.width = width
    canvas.height = height
  }
  canvasAspect = canvas.height > 0 ? canvas.width / canvas.height : 1
}

function queueSplat(x: number, y: number, radius: number, strength: number) {
  if (pendingSplats.length < 12) {
    pendingSplats.push([x, y, radius, strength])
  }
}

/** Fold the one-shot intro arc + queued pointer splats into one uniform array */
function collectSplats(now: number): Float32Array {
  const data = new Float32Array(MAX_SPLATS * 4)
  let count = 0

  if (introStartAt > 0) {
    const t = (now - introStartAt) / INTRO_MS
    if (t >= 1) {
      introStartAt = 0
    }
    else if (t >= 0) {
      // A gentle arc circling the Q: reveals a halo of footage around the
      // letter, teaching "your cursor melts the stage" without words
      const eased = t * t * (3 - 2 * t)
      const angle = -Math.PI * 0.7 + eased * Math.PI * 1.7
      const orbit = 0.17 + 0.04 * Math.sin(eased * Math.PI)
      data[0] = 0.5 + (Math.cos(angle) * orbit) / Math.max(canvasAspect, 0.001)
      data[1] = 0.5 + Math.sin(angle) * orbit
      data[2] = 0.05
      data[3] = 0.04 + 0.26 * Math.sin(Math.min(t, 1) * Math.PI)
      count = 1
      lastActivityAt = now
    }
  }

  while (count < MAX_SPLATS && pendingSplats.length > 0) {
    const splat = pendingSplats.shift()
    if (splat) {
      data.set(splat, count * 4)
      count += 1
    }
  }
  return data
}

function drawQuad(context: WebGLRenderingContext, positionLocation: number) {
  context.bindBuffer(context.ARRAY_BUFFER, quadBuffer)
  context.enableVertexAttribArray(positionLocation)
  context.vertexAttribPointer(positionLocation, 2, context.FLOAT, false, 0, 0)
  context.drawArrays(context.TRIANGLE_STRIP, 0, 4)
}

function runSimPass(now: number) {
  const read = fieldTargets[readIndex]
  const write = fieldTargets[1 - readIndex]
  if (!gl || !simProgram || !simUniforms || !read || !write) {
    return
  }
  gl.useProgram(simProgram)
  gl.viewport(0, 0, SIM_SIZE, SIM_SIZE)
  gl.bindFramebuffer(gl.FRAMEBUFFER, write.framebuffer)
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, read.texture)
  gl.uniform1i(simUniforms.field, 0)
  gl.uniform1f(simUniforms.time, now * 0.001)
  gl.uniform1f(simUniforms.aspect, canvasAspect)
  gl.uniform4fv(simUniforms.splats, collectSplats(now))
  drawQuad(gl, simPositionLocation)
  readIndex = 1 - readIndex
}

function runCompositePass() {
  const canvas = canvasRef.value
  const read = fieldTargets[readIndex]
  if (!gl || !canvas || !read) {
    return
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.viewport(0, 0, canvas.width, canvas.height)
  gl.clearColor(0, 0, 0, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  const video = props.videoEl
  if (!drawProgram || !drawUniforms || !video || video.readyState < 2 || video.videoWidth === 0) {
    return
  }

  gl.useProgram(drawProgram)
  gl.activeTexture(gl.TEXTURE1)
  gl.bindTexture(gl.TEXTURE_2D, videoTexture)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
  gl.activeTexture(gl.TEXTURE0)
  gl.bindTexture(gl.TEXTURE_2D, read.texture)
  gl.uniform1i(drawUniforms.field, 0)
  gl.uniform1i(drawUniforms.video, 1)
  gl.uniform1f(drawUniforms.canvasAspect, canvasAspect)
  gl.uniform1f(drawUniforms.videoAspect, video.videoWidth / video.videoHeight)
  gl.uniform1f(drawUniforms.videoScale, heroVideoScale(props.progress))
  gl.uniform1f(drawUniforms.globalAlpha, 1 - ramp(props.progress, 0.3, 0.45))
  gl.uniform3f(drawUniforms.gold, goldColor[0], goldColor[1], goldColor[2])
  gl.uniform3f(drawUniforms.night, nightColor[0], nightColor[1], nightColor[2])
  drawQuad(gl, drawPositionLocation)
}

function frame(now: number) {
  if (dead || !gl) {
    running = false
    return
  }
  if (now - lastActivityAt > IDLE_STOP_MS && introStartAt === 0) {
    stopLoop(true)
    return
  }
  rafId = requestAnimationFrame(frame)
  runSimPass(now)
  runCompositePass()
}

function startLoop() {
  if (running || dead || !gl || document.hidden || !heroVisible || props.progress > RETIRE_PROGRESS) {
    return
  }
  running = true
  rafId = requestAnimationFrame(frame)
}

function stopLoop(clearInk: boolean) {
  if (rafId !== 0) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
  running = false
  if (!clearInk || !gl) {
    return
  }
  // Wipe both the screen and the field so stale ink never reappears on resume
  gl.clearColor(0, 0, 0, 0)
  for (const target of fieldTargets) {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer)
    gl.viewport(0, 0, SIM_SIZE, SIM_SIZE)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  const canvas = canvasRef.value
  if (canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.clear(gl.COLOR_BUFFER_BIT)
  }
}

function handlePointerMove(event: PointerEvent) {
  const canvas = canvasRef.value
  if (!canvas || dead || props.progress > RETIRE_PROGRESS) {
    return
  }
  const rect = canvas.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) {
    return
  }
  const x = (event.clientX - rect.left) / rect.width
  const y = 1 - (event.clientY - rect.top) / rect.height
  if (x < 0 || x > 1 || y < 0 || y > 1) {
    return
  }

  const now = performance.now()
  let radius = SPLAT_RADIUS_BASE + 0.006
  let strength = SPLAT_STRENGTH_BASE + 0.07
  if (lastPointer) {
    const elapsed = Math.max(now - lastPointer.time, 8)
    const distance = Math.hypot(x - lastPointer.x, y - lastPointer.y)
    const speed = (distance / elapsed) * 1000
    strength = Math.min(SPLAT_STRENGTH_BASE + speed * 0.22, SPLAT_STRENGTH_MAX)
    radius = Math.min(SPLAT_RADIUS_BASE + speed * 0.012, SPLAT_RADIUS_MAX)
    // Fast strokes leave gaps between frames — bridge them with midpoints
    const bridgeSteps = Math.min(Math.floor(distance / 0.028), 3)
    for (let i = 1; i <= bridgeSteps; i++) {
      const mix = i / (bridgeSteps + 1)
      queueSplat(
        lastPointer.x + (x - lastPointer.x) * mix,
        lastPointer.y + (y - lastPointer.y) * mix,
        radius,
        strength * 0.8,
      )
    }
  }
  queueSplat(x, y, radius, strength)
  lastPointer = { x, y, time: now }
  lastActivityAt = now
  startLoop()
}

watch(() => props.progress, (value) => {
  if (value > RETIRE_PROGRESS && running) {
    stopLoop(true)
  }
})

watch(preloaderComplete, (isComplete) => {
  if (!isComplete || introPlayed || dead) {
    return
  }
  introPlayed = true
  // A breath after the curtain parts, so the pulse reads as an invitation
  pulseTimeout = window.setTimeout(() => {
    introStartAt = performance.now()
    lastActivityAt = introStartAt
    startLoop()
  }, 900)
}, { immediate: true })

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) {
    return
  }

  gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: true,
    powerPreference: 'low-power',
  })
  if (!gl) {
    return
  }
  const context = gl

  simProgram = createProgram(context, SIM_FRAGMENT_SOURCE)
  drawProgram = createProgram(context, DRAW_FRAGMENT_SOURCE)
  quadBuffer = context.createBuffer()
  videoTexture = context.createTexture()
  const fieldA = createFieldTarget(context)
  const fieldB = createFieldTarget(context)
  if (!simProgram || !drawProgram || !quadBuffer || !videoTexture || !fieldA || !fieldB) {
    dead = true
    return
  }
  fieldTargets = [fieldA, fieldB]

  context.bindBuffer(context.ARRAY_BUFFER, quadBuffer)
  context.bufferData(context.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), context.STATIC_DRAW)

  context.bindTexture(context.TEXTURE_2D, videoTexture)
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MIN_FILTER, context.LINEAR)
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_MAG_FILTER, context.LINEAR)
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_S, context.CLAMP_TO_EDGE)
  context.texParameteri(context.TEXTURE_2D, context.TEXTURE_WRAP_T, context.CLAMP_TO_EDGE)

  simPositionLocation = context.getAttribLocation(simProgram, 'aPosition')
  drawPositionLocation = context.getAttribLocation(drawProgram, 'aPosition')
  simUniforms = {
    field: context.getUniformLocation(simProgram, 'uField'),
    time: context.getUniformLocation(simProgram, 'uTime'),
    aspect: context.getUniformLocation(simProgram, 'uAspect'),
    splats: context.getUniformLocation(simProgram, 'uSplats[0]'),
  }
  drawUniforms = {
    field: context.getUniformLocation(drawProgram, 'uField'),
    video: context.getUniformLocation(drawProgram, 'uVideo'),
    canvasAspect: context.getUniformLocation(drawProgram, 'uCanvasAspect'),
    videoAspect: context.getUniformLocation(drawProgram, 'uVideoAspect'),
    videoScale: context.getUniformLocation(drawProgram, 'uVideoScale'),
    globalAlpha: context.getUniformLocation(drawProgram, 'uGlobalAlpha'),
    gold: context.getUniformLocation(drawProgram, 'uGold'),
    night: context.getUniformLocation(drawProgram, 'uNight'),
  }

  goldColor = readTokenColor('--color-gold', goldColor)
  nightColor = readTokenColor('--color-night', nightColor)
  resizeCanvas()

  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  window.addEventListener('resize', resizeCanvas)
  addCleanup(() => window.removeEventListener('pointermove', handlePointerMove))
  addCleanup(() => window.removeEventListener('resize', resizeCanvas))

  const handleVisibilityChange = () => {
    if (document.hidden) {
      stopLoop(false)
    }
  }
  document.addEventListener('visibilitychange', handleVisibilityChange)
  addCleanup(() => document.removeEventListener('visibilitychange', handleVisibilityChange))

  // The effect is decorative, so a lost context simply retires it for good
  const handleContextLost = (event: Event) => {
    event.preventDefault()
    dead = true
    stopLoop(false)
  }
  canvas.addEventListener('webglcontextlost', handleContextLost)
  addCleanup(() => canvas.removeEventListener('webglcontextlost', handleContextLost))

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      heroVisible = Boolean(entry?.isIntersecting)
      if (!heroVisible) {
        stopLoop(false)
      }
    })
    observer.observe(canvas)
    addCleanup(() => observer.disconnect())
  }

  addCleanup(() => {
    window.clearTimeout(pulseTimeout)
    stopLoop(false)
    for (const target of fieldTargets) {
      context.deleteFramebuffer(target.framebuffer)
      context.deleteTexture(target.texture)
    }
    fieldTargets = []
    context.deleteTexture(videoTexture)
    context.deleteBuffer(quadBuffer)
    context.deleteProgram(simProgram)
    context.deleteProgram(drawProgram)
    context.getExtension('WEBGL_lose_context')?.loseContext()
    gl = null
  })
})
</script>
