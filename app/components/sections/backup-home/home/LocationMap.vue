<template>
  <!--
    Interactive location map. Leaflet is loaded lazily — only once the frame
    actually enters the viewport — so the library and its tiles never touch
    the homepage's initial payload. The frame keeps its size at every stage,
    so nothing here can cost CLS. Before the map is ready (and for no-JS
    users) the same frame holds a real, readable address card with a link out
    to Google Maps, so the location is never JS-only content.
  -->
  <!-- No position utility of its own: the PARENT positions this (here, as the
       section's `absolute inset-0` backdrop). Setting `relative` here would
       out-specify that and collapse the map to zero height. -->
  <div :class="['location-map isolate overflow-hidden', activeBasemap === 'dark' ? 'is-dark' : 'is-satellite']">
    <!-- Leaflet mounts here. Its class attribute is deliberately STATIC:
         Leaflet adds `leaflet-container` (and friends) imperatively, and a Vue
         class binding would patch them straight back off on the next render,
         taking Leaflet's own overflow/cursor/background rules with them. The
         placeholder below simply covers this until the map is ready. -->
    <div
      ref="mapContainerRef"
      class="absolute inset-0"
      role="application"
      :aria-label="`Map of ${hotel.name} and nearby attractions`"
    />

    <!--
      Edge feather. The map must read as part of the section, not as a panel
      dropped onto it, so its edges dissolve into the SAME `ink` the section is
      painted with — no new colour is introduced, which is what stops it
      reading as a box. Sits above Leaflet's panes (z 400–700) but below its
      controls (z 800+), so zoom and attribution stay crisp and legible.
    -->
    <div class="map-fade pointer-events-none absolute inset-0 z-[750]" aria-hidden="true" />

    <!-- Pre-map / no-JS state: real content, not a spinner -->
    <div
      v-if="!isMapReady"
      class="absolute inset-0 z-[800] flex flex-col items-center justify-center gap-3 p-8 text-center"
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

    <!-- Basemap switch + recentre. Real buttons: keyboard-reachable, and
         hidden from the a11y tree only while the map has yet to load. -->
    <div
      v-if="isMapReady"
      class="pointer-events-none absolute bottom-8 left-5 z-[900] flex flex-wrap items-center gap-x-5 gap-y-2 sm:left-6 lg:left-8"
    >
      <div class="pointer-events-auto flex gap-4">
        <button
          v-for="style in basemapStyles"
          :key="style.id"
          type="button"
          :class="[
            'text-[0.65rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-fast',
            activeBasemap === style.id ? 'text-champagne' : 'text-paper/40 hover:text-paper',
          ]"
          :aria-pressed="activeBasemap === style.id"
          @click="setBasemap(style.id)"
        >
          {{ style.label }}
        </button>
      </div>

      <button
        type="button"
        class="pointer-events-auto flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-paper/40 transition-colors duration-fast hover:text-champagne"
        @click="focusHotel"
      >
        <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
          <circle cx="12" cy="12" r="3.25" />
          <path stroke-linecap="round" d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
        </svg>
        The Hotel
      </button>

      <!-- Zoom lives with the other map controls rather than floating off in a
           corner of its own; Leaflet's built-in control is disabled for it -->
      <div class="pointer-events-auto flex items-center gap-1">
        <button
          type="button"
          class="flex h-7 w-7 items-center justify-center text-paper/40 transition-colors duration-fast hover:text-champagne disabled:opacity-30 disabled:hover:text-paper/40"
          :disabled="!canZoomIn"
          aria-label="Zoom in"
          @click="zoomBy(1)"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
            <path stroke-linecap="round" d="M12 5v14M5 12h14" />
          </svg>
        </button>
        <button
          type="button"
          class="flex h-7 w-7 items-center justify-center text-paper/40 transition-colors duration-fast hover:text-champagne disabled:opacity-30 disabled:hover:text-paper/40"
          :disabled="!canZoomOut"
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
import type { Map as LeafletMap, Marker, Polyline, TileLayer } from 'leaflet'
import type { HotelLocation, LatLngTuple, NearbyAttraction } from '~/types/location'

const props = defineProps<{
  hotel: HotelLocation
  attractions: NearbyAttraction[]
  /** Attraction the surrounding section wants centred, or null for the hotel */
  activeAttractionId: string | null
}>()

type BasemapId = 'satellite' | 'dark'

const basemapStyles: { id: BasemapId, label: string }[] = [
  { id: 'dark', label: 'Dark' },
  { id: 'satellite', label: 'Satellite' },
]

const mapContainerRef = ref<HTMLElement | null>(null)
const isMapReady = ref(false)
const activeBasemap = ref<BasemapId>('dark')
const canZoomIn = ref(true)
const canZoomOut = ref(true)

const { prefersReducedMotion } = useReducedMotion()

// Leaflet is client-only and loaded on demand, so everything it owns lives in
// plain (non-reactive) module state — reactivity would only cost us proxies.
let leaflet: typeof import('leaflet') | undefined
let map: LeafletMap | undefined
let baseLayers: Partial<Record<BasemapId, TileLayer>> = {}
let labelLayer: TileLayer | undefined
let attractionMarkers = new Map<string, Marker>()
let connector: Polyline | undefined
let frameObserver: IntersectionObserver | undefined

const HOTEL_ZOOM = 15
const ATTRACTION_ZOOM = 14

/**
 * The map is the section's full-bleed backdrop, and the attraction cards sit
 * over its right half. So the map's subject is pushed into the LEFT of the
 * frame — the open space — where it can actually be seen. Below `lg` the cards
 * stack and the whole width is open again, so the bias drops to zero.
 */
const LEFT_BIAS_RATIO = 0.24

/** Centre that puts `point` left-of-centre by the bias, in map coordinates */
function biasedCenter(point: LatLngTuple, zoom: number) {
  if (!leaflet || !map) {
    return leaflet?.latLng(point)
  }

  const width = map.getSize().x
  const bias = width >= 1024 ? width * LEFT_BIAS_RATIO : 0
  const projected = map.project(point, zoom).add([bias, 0])

  return map.unproject(projected, zoom)
}

async function initMap() {
  if (map || !mapContainerRef.value) {
    return
  }

  // Dynamic import keeps Leaflet (and its CSS) out of the initial bundle
  const [leafletModule] = await Promise.all([
    import('leaflet'),
    import('leaflet/dist/leaflet.css'),
  ])
  leaflet = leafletModule.default ?? leafletModule

  if (!mapContainerRef.value) {
    return
  }

  map = leaflet.map(mapContainerRef.value, {
    center: props.hotel.coordinates,
    zoom: HOTEL_ZOOM,
    zoomControl: false,
    // The page owns vertical scrolling: the map must never hijack the wheel.
    // Ctrl/⌘ + wheel still zooms, and the +/- control always works.
    scrollWheelZoom: false,
    attributionControl: true,
  })

  // Zoom is rendered in the control row below, not as a floating Leaflet widget
  map.on('zoomend', syncZoomState)

  baseLayers = {
    satellite: leaflet.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { maxZoom: 19, attribution: 'Imagery &copy; Esri' },
    ),
    dark: leaflet.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      { maxZoom: 20, attribution: '&copy; OpenStreetMap, &copy; CARTO' },
    ),
  }

  // Place names over the satellite imagery — without them it reads as texture,
  // not as a neighbourhood you can actually navigate
  labelLayer = leaflet.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png',
    { maxZoom: 20, attribution: '' },
  )

  baseLayers.dark?.addTo(map)

  addHotelMarker()
  addAttractionMarkers()

  isMapReady.value = true
  // The placeholder covered the container until now; re-measure so Leaflet's
  // tile grid matches the frame exactly — and only THEN bias the view, since
  // the bias is a fraction of a width we must have measured first
  await nextTick()
  map.invalidateSize()

  const center = biasedCenter(props.hotel.coordinates, HOTEL_ZOOM)
  if (center) {
    map.setView(center, HOTEL_ZOOM, { animate: false })
  }

  syncZoomState()
}

function addHotelMarker() {
  if (!leaflet || !map) {
    return
  }

  const icon = leaflet.divIcon({
    className: 'hotel-pin-wrap',
    html: '<span class="hotel-pin"><span class="hotel-pin-pulse"></span><span class="hotel-pin-dot"></span></span>',
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  })

  const marker = leaflet.marker(props.hotel.coordinates, {
    icon,
    title: props.hotel.name,
    keyboard: false,
    zIndexOffset: 1000,
  }).addTo(map)

  // The hotel's card stays open — it IS the highlight, not a click reward
  marker.bindPopup(
    `<p class="map-card-name">${props.hotel.name}</p>
     <p class="map-card-meta">${props.hotel.address}</p>
     <a class="map-card-link" href="${props.hotel.directionsUrl}" target="_blank" rel="noopener">Get directions</a>`,
    {
      className: 'map-card map-card-hotel',
      closeButton: false,
      autoClose: false,
      closeOnClick: false,
      offset: [0, -6],
    },
  ).openPopup()
}

function addAttractionMarkers() {
  if (!leaflet || !map) {
    return
  }

  for (const attraction of props.attractions) {
    const icon = leaflet.divIcon({
      className: 'attraction-pin-wrap',
      html: '<span class="attraction-pin"></span>',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    })

    const marker = leaflet.marker(attraction.coordinates, {
      icon,
      title: attraction.name,
    }).addTo(map)

    marker.bindPopup(
      `<p class="map-card-name">${attraction.name}</p>
       <p class="map-card-meta">${attraction.distanceMiles} mi / ${attraction.distanceKm} km from the hotel</p>`,
      { className: 'map-card', closeButton: false, offset: [0, -4] },
    )

    attractionMarkers.set(attraction.id, marker)
  }
}

/** Recentre on an attraction and draw its line back to the hotel */
function focusAttraction(id: string) {
  const attraction = props.attractions.find(item => item.id === id)
  const marker = attractionMarkers.get(id)

  if (!leaflet || !map || !attraction || !marker) {
    return
  }

  connector?.remove()
  connector = leaflet.polyline([props.hotel.coordinates, attraction.coordinates], {
    className: 'map-connector',
    dashArray: '4 8',
    weight: 1.5,
  }).addTo(map)

  // Frame the hotel AND the landmark, so the distance is something you see.
  // The right padding is what keeps the pair out from under the attraction
  // cards: it reserves their half of the section, so the pair lands in the
  // open left side. Extra top padding keeps the popups clear of the heading.
  // Half the section belongs to the cards — plus ~140px, because a pin sitting
  // exactly on that seam would still fly its popup out underneath them
  const width = map.getSize().x
  const cardsGutter = width >= 1024 ? width * 0.5 + 140 : 90

  map.flyToBounds(
    leaflet.latLngBounds([props.hotel.coordinates, attraction.coordinates]),
    {
      paddingTopLeft: [90, 190],
      paddingBottomRight: [cardsGutter, 110],
      maxZoom: ATTRACTION_ZOOM,
      animate: !prefersReducedMotion.value,
    },
  )
  marker.openPopup()
}

function focusHotel() {
  if (!map) {
    return
  }

  connector?.remove()
  connector = undefined
  map.closePopup()

  const center = biasedCenter(props.hotel.coordinates, HOTEL_ZOOM)
  if (!center) {
    return
  }

  if (prefersReducedMotion.value) {
    map.setView(center, HOTEL_ZOOM)
  }
  else {
    map.flyTo(center, HOTEL_ZOOM)
  }
}

/** Keeps the +/- buttons honest at the basemap's zoom limits */
function syncZoomState() {
  if (!map) {
    return
  }

  const zoom = map.getZoom()
  canZoomIn.value = zoom < map.getMaxZoom()
  canZoomOut.value = zoom > map.getMinZoom()
}

function zoomBy(delta: 1 | -1) {
  if (!map) {
    return
  }

  map.setZoom(map.getZoom() + delta, { animate: !prefersReducedMotion.value })
}

function setBasemap(id: BasemapId) {
  if (!map || activeBasemap.value === id) {
    return
  }

  baseLayers[activeBasemap.value]?.remove()
  baseLayers[id]?.addTo(map)
  activeBasemap.value = id

  // The two basemaps top out at different zooms, so the limits move with them
  syncZoomState()

  // Labels are baked into the dark basemap; they'd double up over it
  if (id === 'dark') {
    labelLayer?.remove()
  }
  else if (labelLayer) {
    labelLayer.addTo(map)
  }
}

// The section's attraction cards drive the map
watch(() => props.activeAttractionId, (id) => {
  if (!isMapReady.value) {
    return
  }

  if (id) {
    focusAttraction(id)
  }
  else {
    focusHotel()
  }
})

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

  connector?.remove()
  connector = undefined
  attractionMarkers.clear()
  attractionMarkers = new Map()
  baseLayers = {}
  labelLayer = undefined

  // Tears down every Leaflet listener, layer, and DOM node it created
  map?.remove()
  map = undefined
  leaflet = undefined
})
</script>

<style scoped>
/* No intrinsic height: the map is a backdrop and takes the section's box */

/* The map has no frame, no border and no panel tint — it simply dissolves into
   the section on every edge. Corners get the strongest falloff (that is where a
   rectangle announces itself), and the centre stays completely clear. All four
   stops land on the section's own `ink`, so no new colour enters the design. */
.map-fade {
  background:
    /* Right side settles almost fully into ink: that is the ground the
       attraction cards stand on, and it is what keeps the map's detail
       reading in the open left half rather than fighting the copy. */
    linear-gradient(
      to right,
      rgb(var(--color-ink) / 0.35) 0%,
      rgb(var(--color-ink) / 0) 14%,
      rgb(var(--color-ink) / 0) 34%,
      rgb(var(--color-ink) / 0.82) 62%,
      rgb(var(--color-ink) / 0.96) 100%
    ),
    linear-gradient(
      to bottom,
      rgb(var(--color-ink)) 0%,
      rgb(var(--color-ink) / 0) 24%,
      rgb(var(--color-ink) / 0) 74%,
      rgb(var(--color-ink)) 100%
    );
}

/* Leaflet renders its own DOM, so its chrome has to be reached through :deep.
   Everything below re-skins that chrome in the project's tokens. */
.location-map :deep(.leaflet-container) {
  background: transparent;
  font-family: inherit;
}

/* Grade each basemap toward the section's ink so the map sits INSIDE the
   design. Satellite gets pulled down and desaturated; the dark basemap is
   already near-black, so it gets lifted instead — otherwise its streets
   vanish entirely against the section. */
.location-map.is-satellite :deep(.leaflet-tile-pane) {
  filter: saturate(0.72) contrast(1.05) brightness(0.78);
}

.location-map.is-dark :deep(.leaflet-tile-pane) {
  filter: saturate(0.85) contrast(1.02) brightness(1.25);
}

/* Hotel pin: a champagne dot with a slow sonar pulse */
.location-map :deep(.hotel-pin) {
  display: block;
  height: 22px;
  position: relative;
  width: 22px;
}

.location-map :deep(.hotel-pin-dot) {
  background: rgb(var(--color-champagne));
  border-radius: 9999px;
  box-shadow: 0 0 0 3px rgb(var(--color-night) / 0.85);
  height: 12px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
}

.location-map :deep(.hotel-pin-pulse) {
  animation: hotel-pin-sonar 2.8s var(--ease-premium) infinite;
  border: 1px solid rgb(var(--color-champagne));
  border-radius: 9999px;
  inset: 0;
  position: absolute;
}

@keyframes hotel-pin-sonar {
  0% {
    opacity: 0.7;
    transform: scale(0.45);
  }

  70% {
    opacity: 0;
    transform: scale(1.9);
  }

  100% {
    opacity: 0;
    transform: scale(1.9);
  }
}

.location-map :deep(.attraction-pin) {
  background: rgb(var(--color-paper) / 0.9);
  border: 1px solid rgb(var(--color-night));
  border-radius: 9999px;
  display: block;
  height: 14px;
  transition: background-color var(--duration-fast) var(--ease-premium);
  width: 14px;
}

.location-map :deep(.attraction-pin-wrap:hover .attraction-pin) {
  background: rgb(var(--color-champagne));
}

/* Popups become the design's panel surface */
.location-map :deep(.map-card .leaflet-popup-content-wrapper) {
  background: rgb(var(--color-night) / 0.92);
  border: 1px solid rgb(var(--color-champagne) / 0.35);
  border-radius: 0;
  box-shadow: 0 24px 60px -24px rgb(var(--color-night));
  color: rgb(var(--color-paper));
}

.location-map :deep(.map-card .leaflet-popup-content) {
  margin: 0.875rem 1.125rem;
}

.location-map :deep(.map-card .leaflet-popup-tip) {
  background: rgb(var(--color-night) / 0.92);
  border: 1px solid rgb(var(--color-champagne) / 0.35);
}

.location-map :deep(.map-card-hotel .leaflet-popup-content-wrapper) {
  border-color: rgb(var(--color-champagne));
}

.location-map :deep(.map-card-name) {
  color: rgb(var(--color-paper));
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.125rem;
  margin: 0;
}

.location-map :deep(.map-card-meta) {
  color: rgb(var(--color-paper) / 0.6);
  font-size: 0.75rem;
  line-height: 1.25rem;
  margin: 0.25rem 0 0;
  max-width: 14rem;
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

.location-map :deep(.map-connector) {
  stroke: rgb(var(--color-champagne));
}

/* Attribution only — zoom is a real button in the control row now */
.location-map :deep(.leaflet-control-attribution) {
  background: transparent;
  color: rgb(var(--color-paper) / 0.35);
  font-size: 0.6rem;
}

.location-map :deep(.leaflet-control-attribution a) {
  color: rgb(var(--color-paper) / 0.5);
}
</style>
