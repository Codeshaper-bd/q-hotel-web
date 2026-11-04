<template>
  <!--
    Interactive location map (MapLibre GL, vector tiles). The library is loaded
    lazily — only once the frame nears the viewport — so it never touches the
    homepage's initial payload. The frame keeps its size at every stage, so
    nothing here can cost CLS. Before the map is ready (and if it fails to
    load) the frame holds a real, readable address card with a link out to
    Google Maps, so the location is never JS-only content.
  -->
  <!-- No position utility of its own: the PARENT positions this (here, as the
       section's `absolute inset-0` backdrop). -->
  <div
    ref="rootRef"
    class="location-map isolate"
    @pointermove="onPointerMove"
    @pointerleave="hideHint"
  >
    <!-- MapLibre mounts here; its classes are added imperatively, so this
         element's class attribute stays static -->
    <!-- Wrapper owns the absolute fill: MapLibre sets `position: relative` on
         its container, which would collapse an `absolute inset-0` one. It also
         owns the clipping, so the overlay below can reach up over the heading. -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        ref="mapContainerRef"
        class="h-full w-full"
        role="application"
        :aria-label="`Map of ${hotel.name} and nearby attractions`"
      />
    </div>

    <!-- Edge feather: top and bottom dissolve into the section's own colour so
         the map reads as part of the section, not a panel dropped onto it -->
    <div class="map-fade pointer-events-none absolute inset-0 z-[5]" aria-hidden="true" />

    <!-- Figma "Rectangle 7137": 583px dark overlay, #060C14 100% -> 0%. It
         starts above the map (behind the section heading, which is z-10, and
         clipped by the section) and sits below the hover card (z-10), so the
         card is never dimmed. -->
    <div
      class="pointer-events-none absolute inset-x-0 -top-[140px] z-[5] h-[583px] bg-gradient-to-b from-[#060C14] to-[#060C14]/0"
      aria-hidden="true"
    />
    <!-- Cursor hint: follows a mouse over the map so visitors know the pins
         are clickable. Mouse-only (touch has no cursor to follow) and retired
         for good once a pin has been used. Decorative: the pins carry their
         own accessible names. -->
    <div
      v-if="isMapReady"
      ref="hintRef"
      class="pointer-events-none absolute left-0 top-0 z-[11] hidden [@media(hover:hover)_and_(pointer:fine)]:block"
      aria-hidden="true"
    >
      <span
        :class="[
          'ml-4 mt-5 flex w-max items-center gap-1.5 bg-night/85 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-champagne backdrop-blur-sm transition-opacity duration-fast',
          isHintVisible && !hasUsedPin ? 'opacity-100' : 'opacity-0',
        ]"
      >
        <svg class="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        Click a pin to get more info
      </span>
    </div>

    <!-- Pre-map / failed state: real content, not a spinner -->
    <div
      v-if="!isMapReady"
      class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-8 text-center"
    >
      <svg class="h-7 w-7 text-champagne" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
      <p class="font-display text-xl text-paper">{{ hotel.name }}</p>
      <p class="max-w-xs text-sm leading-6 text-paper/65">{{ hotel.address }}</p>
      <a
        :href="hotel.directionsUrl"
        target="_blank"
        rel="noopener"
        class="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-champagne underline-offset-4 hover:underline"
      >
        Open in Google Maps
      </a>
    </div>

    <!-- Recentre + zoom. Real buttons: keyboard-reachable. -->
    <div
      v-if="isMapReady"
      class="map-controls pointer-events-none absolute bottom-8 left-5 z-10 flex flex-wrap items-center gap-x-5 gap-y-2 sm:left-6 lg:left-8"
    >
      <button
        type="button"
        class="pointer-events-auto flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-paper/60 transition-colors duration-fast hover:text-champagne"
        @click="focusHotel"
      >
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="3.25" />
          <path stroke-linecap="round" d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
        </svg>
        The Hotel
      </button>

      <div class="pointer-events-auto flex items-center gap-1">
        <button
          type="button"
          class="flex h-7 w-7 items-center justify-center text-paper/60 transition-colors duration-fast hover:text-champagne"
          aria-label="Zoom in"
          @click="zoomBy(1)"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path stroke-linecap="round" d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <button
          type="button"
          class="flex h-7 w-7 items-center justify-center text-paper/60 transition-colors duration-fast hover:text-champagne"
          aria-label="Zoom out"
          @click="zoomBy(-1)"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path stroke-linecap="round" d="M5 12h14" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  LayerSpecification,
  Map as MapLibreMap,
  Marker,
  Popup,
  StyleSpecification,
} from 'maplibre-gl'
import type { HotelLocation, LatLngTuple, NearbyAttraction } from '~/types/location'

const props = defineProps<{
  hotel: HotelLocation
  attractions: NearbyAttraction[]
}>()

/** Free OpenMapTiles vector style; recoloured below to the Figma night palette */
const BASE_STYLE_URL = 'https://tiles.openfreemap.org/styles/dark'

const HOTEL_ZOOM = 14
const HIDE_DELAY_MS = 220

const mapContainerRef = ref<HTMLElement | null>(null)
const isMapReady = ref(false)

const rootRef = ref<HTMLElement | null>(null)
const hintRef = ref<HTMLElement | null>(null)
const isHintVisible = ref(false)
/** Once a pin has been clicked the visitor knows; the hint stays away */
const hasUsedPin = ref(false)

const { prefersReducedMotion } = useReducedMotion()

// MapLibre is client-only and loaded on demand, so everything it owns lives in
// plain (non-reactive) module state.
let maplibre: typeof import('maplibre-gl') | undefined
let map: MapLibreMap | undefined
let card: Popup | undefined
let markers: Marker[] = []
let frameObserver: IntersectionObserver | undefined
let hideTimer: ReturnType<typeof setTimeout> | undefined
/** Id of the card a click has pinned open; hover alone never pins */
let pinnedId: string | null = null

// ─── Figma night palette ────────────────────────────────────────────────
const PALETTE = {
  ground: '#000f1b',
  water: '#0b3a5a',
  park: '#10301f',
  building: '#0b1420',
  roadMinor: '#18222f',
  roadMajor: '#6b4f20',
  roadMajorSubtle: '#3d3018',
  motorway: '#e0a23c',
  casing: '#070e17',
  rail: '#162231',
  label: '#cdd2da',
  labelRoad: '#7d8794',
  labelWater: '#5f88a8',
} as const

type PaintOverrides = Record<string, string | number>

/** Layer-id → paint overrides; ids come from the OpenFreeMap "dark" style */
const PAINT_BY_LAYER: Record<string, PaintOverrides> = {
  'background': { 'background-color': PALETTE.ground },
  'water': { 'fill-color': PALETTE.water },
  'waterway': { 'line-color': PALETTE.water },
  'landuse_park': { 'fill-color': PALETTE.park },
  'landcover_wood': { 'fill-color': PALETTE.park },
  'landuse_residential': { 'fill-color': '#0a121c' },
  'building': { 'fill-color': PALETTE.building, 'fill-outline-color': '#101b29' },
  'aeroway-area': { 'fill-color': '#0c1622' },
  'aeroway-runway': { 'line-color': '#1b2c40' },
  'aeroway-runway-casing': { 'line-color': '#101b29' },
  'aeroway-taxiway': { 'line-color': '#142133' },
  'highway_path': { 'line-color': '#16202c' },
  'highway_minor': { 'line-color': PALETTE.roadMinor },
  'highway_major_casing': { 'line-color': PALETTE.casing },
  'highway_major_inner': { 'line-color': PALETTE.roadMajor },
  'highway_major_subtle': { 'line-color': PALETTE.roadMajorSubtle },
  'highway_motorway_casing': { 'line-color': PALETTE.casing },
  'highway_motorway_inner': { 'line-color': PALETTE.motorway },
  'highway_motorway_subtle': { 'line-color': PALETTE.roadMajorSubtle },
  'railway': { 'line-color': PALETTE.rail },
  'railway_minor': { 'line-color': PALETTE.rail },
  'railway_transit': { 'line-color': PALETTE.rail },
  'water_name': { 'text-color': PALETTE.labelWater, 'text-halo-color': PALETTE.ground },
  'highway_name_other': { 'text-color': PALETTE.labelRoad, 'text-halo-color': PALETTE.ground },
  'highway_name_motorway': { 'text-color': PALETTE.labelRoad, 'text-halo-color': PALETTE.ground },
}

function applyFigmaPalette(style: StyleSpecification): StyleSpecification {
  const layers = style.layers.map((layer): LayerSpecification => {
    const overrides = PAINT_BY_LAYER[layer.id]
    if (overrides) {
      return { ...layer, paint: { ...layer.paint, ...overrides } } as LayerSpecification
    }

    // Every remaining place label (city, suburb, village…) shares one look
    if (layer.id.startsWith('place_')) {
      return {
        ...layer,
        paint: { ...layer.paint, 'text-color': PALETTE.label, 'text-halo-color': PALETTE.ground },
      } as LayerSpecification
    }

    return layer
  })

  return { ...style, layers }
}

// ─── Pins and the hover card ────────────────────────────────────────────
const SVG_NS = 'http://www.w3.org/2000/svg'
const PIN_PATH = 'M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z'

function lngLat(point: LatLngTuple): [number, number] {
  return [point[1], point[0]]
}

function createPinElement(label: string, isHotel: boolean) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = isHotel ? 'map-pin map-pin-hotel' : 'map-pin'
  button.setAttribute('aria-label', label)

  const svg = document.createElementNS(SVG_NS, 'svg')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('width', isHotel ? '36' : '28')
  svg.setAttribute('height', isHotel ? '36' : '28')
  svg.setAttribute('aria-hidden', 'true')

  const path = document.createElementNS(SVG_NS, 'path')
  path.setAttribute('d', PIN_PATH)
  const dot = document.createElementNS(SVG_NS, 'circle')
  dot.setAttribute('cx', '12')
  dot.setAttribute('cy', '10')
  dot.setAttribute('r', '2.6')
  dot.setAttribute('class', 'map-pin-dot')

  svg.append(path, dot)
  button.append(svg)
  return button
}

/** Card content is built from text nodes only — no HTML string injection */
function createCardContent(title: string, body: string, meta: string, link?: { href: string, label: string }) {
  const root = document.createElement('div')

  const heading = document.createElement('h3')
  heading.className = 'map-card-name'
  heading.textContent = title

  const description = document.createElement('p')
  description.className = 'map-card-body'
  description.textContent = body

  const distance = document.createElement('p')
  distance.className = 'map-card-meta'
  distance.textContent = meta

  root.append(heading, description, distance)

  if (link) {
    const anchor = document.createElement('a')
    anchor.className = 'map-card-link'
    anchor.href = link.href
    anchor.target = '_blank'
    anchor.rel = 'noopener'
    anchor.textContent = link.label
    root.append(anchor)
  }

  return root
}

/** Moves the hint with the mouse; hides it over pins and cards */
function onPointerMove(event: PointerEvent) {
  const root = rootRef.value
  const hint = hintRef.value
  if (event.pointerType !== 'mouse' || !root || !hint) {
    return
  }

  const bounds = root.getBoundingClientRect()
  hint.style.transform = `translate3d(${event.clientX - bounds.left}px, ${event.clientY - bounds.top}px, 0)`

  const isOverInteractive = event.target instanceof Element
    && event.target.closest('.map-pin, .maplibregl-popup, .map-controls') !== null
  isHintVisible.value = !isOverInteractive
}

function hideHint() {
  isHintVisible.value = false
}

function cancelHide() {
  if (hideTimer) {
    clearTimeout(hideTimer)
    hideTimer = undefined
  }
}

function hideCard() {
  cancelHide()
  pinnedId = null
  card?.remove()
}

/** Hover-out closes the card after a beat, unless a click pinned it open */
function scheduleHide(id: string) {
  cancelHide()
  if (pinnedId === id) {
    return
  }
  hideTimer = setTimeout(() => card?.remove(), HIDE_DELAY_MS)
}

function showCard(coordinates: LatLngTuple, content: HTMLElement) {
  if (!map || !card) {
    return
  }

  cancelHide()
  card.setLngLat(lngLat(coordinates)).setDOMContent(content).addTo(map)
}

function bindPin(
  element: HTMLElement,
  id: string,
  coordinates: LatLngTuple,
  buildContent: () => HTMLElement,
) {
  const open = () => showCard(coordinates, buildContent())

  element.addEventListener('mouseenter', open)
  element.addEventListener('focus', open)
  element.addEventListener('mouseleave', () => scheduleHide(id))
  element.addEventListener('blur', () => scheduleHide(id))
  element.addEventListener('click', (event) => {
    event.stopPropagation()
    hasUsedPin.value = true
    pinnedId = pinnedId === id ? null : id
    open()
  })
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideCard()
    }
  })
}

function addMarkers() {
  if (!maplibre || !map) {
    return
  }

  const hotelPin = createPinElement(props.hotel.name, true)
  bindPin(hotelPin, 'hotel', props.hotel.coordinates, () =>
    createCardContent(
      props.hotel.name,
      props.hotel.address,
      'Our hotel',
      { href: props.hotel.directionsUrl, label: 'Get directions' },
    ))
  markers.push(
    new maplibre.Marker({ element: hotelPin, anchor: 'bottom' })
      .setLngLat(lngLat(props.hotel.coordinates))
      .addTo(map),
  )

  for (const attraction of props.attractions) {
    const pin = createPinElement(attraction.name, false)
    bindPin(pin, attraction.id, attraction.coordinates, () =>
      createCardContent(
        attraction.name,
        attraction.description,
        `${attraction.distanceMiles} mi / ${attraction.distanceKm} km from the hotel`,
      ))
    markers.push(
      new maplibre.Marker({ element: pin, anchor: 'bottom' })
        .setLngLat(lngLat(attraction.coordinates))
        .addTo(map),
    )
  }
}

// ─── Map lifecycle ──────────────────────────────────────────────────────
function frameEverything(animate: boolean) {
  if (!maplibre || !map) {
    return
  }

  const bounds = new maplibre.LngLatBounds()
  bounds.extend(lngLat(props.hotel.coordinates))
  for (const attraction of props.attractions) {
    bounds.extend(lngLat(attraction.coordinates))
  }

  map.fitBounds(bounds, {
    padding: { top: 200, bottom: 100, left: 60, right: 60 },
    maxZoom: 13,
    animate,
    duration: 900,
  })
}

async function initMap() {
  if (map || !mapContainerRef.value) {
    return
  }

  try {
    // Dynamic imports keep MapLibre (and its CSS) out of the initial bundle
    const [maplibreModule, response] = await Promise.all([
      import('maplibre-gl'),
      fetch(BASE_STYLE_URL),
      import('maplibre-gl/dist/maplibre-gl.css'),
    ])

    if (!response.ok || !mapContainerRef.value) {
      return
    }

    maplibre = maplibreModule
    const style = applyFigmaPalette(await response.json() as StyleSpecification)

    map = new maplibreModule.Map({
      container: mapContainerRef.value,
      style,
      center: lngLat(props.hotel.coordinates),
      zoom: 11.5,
      attributionControl: { compact: true },
      // The page owns vertical scrolling: the map never hijacks the wheel.
      // Ctrl/⌘ + wheel (or two-finger touch) zooms.
      cooperativeGestures: true,
      pitchWithRotate: false,
      dragRotate: false,
    })

    card = new maplibreModule.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: [0, -34],
      maxWidth: '320px',
      className: 'map-card',
    })

    // Hovering the card itself keeps it open, so its link stays reachable
    card.on('open', () => {
      const element = card?.getElement()
      element?.addEventListener('mouseenter', cancelHide)
      element?.addEventListener('mouseleave', () => scheduleHide(pinnedId ?? ''))
    })

    map.on('click', hideCard)
    map.on('movestart', () => {
      if (!pinnedId) {
        card?.remove()
      }
    })

    map.once('load', () => {
      addMarkers()
      isMapReady.value = true
      frameEverything(false)
    })
  }
  catch {
    // Leave the readable address card in place
    map?.remove()
    map = undefined
  }
}

function focusHotel() {
  if (!map) {
    return
  }

  hideCard()
  map.flyTo({
    center: lngLat(props.hotel.coordinates),
    zoom: HOTEL_ZOOM,
    duration: prefersReducedMotion.value ? 0 : 1200,
  })
}

function zoomBy(delta: 1 | -1) {
  if (!map) {
    return
  }

  const options = { duration: prefersReducedMotion.value ? 0 : 300 }
  if (delta > 0) {
    map.zoomIn(options)
  }
  else {
    map.zoomOut(options)
  }
}

onMounted(() => {
  if (!mapContainerRef.value) {
    return
  }

  // Nothing loads until the frame is actually near the viewport
  frameObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        frameObserver?.disconnect()
        frameObserver = undefined
        void initMap()
      }
    }
  }, { rootMargin: '200px 0px' })

  frameObserver.observe(mapContainerRef.value)
})

onBeforeUnmount(() => {
  frameObserver?.disconnect()
  frameObserver = undefined
  cancelHide()

  for (const marker of markers) {
    marker.remove()
  }
  markers = []
  card?.remove()
  card = undefined

  // Tears down every MapLibre listener, WebGL resource, and DOM node
  map?.remove()
  map = undefined
  maplibre = undefined
})
</script>

<style scoped>
/* Top and bottom dissolve into the section's own `night`; the centre stays
   completely clear so the map keeps its full detail. */
.map-fade {
  background:
    /* Long, eased falloff at the top: the map surfaces out of the section's
       night with no visible edge, as in the design */
    linear-gradient(
      to bottom,
      rgb(var(--color-night)) 0%,
      rgb(var(--color-night) / 0.92) 6%,
      rgb(var(--color-night) / 0.72) 14%,
      rgb(var(--color-night) / 0.45) 24%,
      rgb(var(--color-night) / 0.2) 34%,
      rgb(var(--color-night) / 0) 46%
    ),
    linear-gradient(
      to top,
      rgb(var(--color-night)) 0%,
      rgb(var(--color-night) / 0.6) 6%,
      rgb(var(--color-night) / 0) 18%
    );
}

.location-map :deep(.maplibregl-map) {
  font-family: inherit;
}

/* Attribution only — zoom is a real button in the control row */
.location-map :deep(.maplibregl-ctrl-attrib) {
  background: transparent;
  color: rgb(var(--color-paper) / 0.35);
  font-size: 0.6rem;
}

.location-map :deep(.maplibregl-ctrl-attrib a) {
  color: inherit;
}

/* Pins: white map pins as in the Figma; the hotel's is gold */
.location-map :deep(.map-pin) {
  background: none;
  border: 0;
  color: rgb(var(--color-paper));
  cursor: pointer;
  display: block;
  line-height: 0;
  padding: 0;
  transition: color var(--duration-fast) var(--ease-premium);
}

.location-map :deep(.map-pin svg) {
  fill: currentColor;
  filter: drop-shadow(0 2px 3px rgb(0 0 0 / 0.5));
}

.location-map :deep(.map-pin-dot) {
  fill: rgb(var(--color-night));
}

.location-map :deep(.map-pin:hover),
.location-map :deep(.map-pin:focus-visible) {
  color: rgb(var(--color-champagne));
  outline: none;
}

.location-map :deep(.map-pin-hotel) {
  color: #e0a23c;
}

/* Above the edge feather and top overlay, so the card is never dimmed */
.location-map :deep(.map-card) {
  z-index: 10;
}

/* Hover/click card: borderless night glass so it belongs to the map surface */
.location-map :deep(.map-card .maplibregl-popup-content) {
  background: rgb(var(--color-night) / 0.96);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 0;
  border-radius: 0;
  box-shadow: none;
  color: rgb(var(--color-paper));
  padding: 1.25rem;
}

.location-map :deep(.map-card .maplibregl-popup-tip) {
  display: none;
}

.location-map :deep(.map-card-name) {
  color: rgb(var(--color-paper));
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.3;
  margin: 0;
}

.location-map :deep(.map-card-body) {
  color: rgb(var(--color-paper) / 0.65);
  font-size: 0.75rem;
  line-height: 1.25rem;
  margin: 0.75rem 0 0;
}

.location-map :deep(.map-card-meta) {
  color: #dfa558;
  font-size: 0.7rem;
  line-height: 1rem;
  margin: 0.75rem 0 0;
}

.location-map :deep(.map-card-link) {
  color: rgb(var(--color-champagne));
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  margin-top: 0.5rem;
  text-transform: uppercase;
}
</style>
