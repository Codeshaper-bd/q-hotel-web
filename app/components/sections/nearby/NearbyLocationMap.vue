<template>
  <!--
    Light interactive location map for the nearby-locations page. Leaflet is
    loaded lazily — only once the frame enters the viewport — so the library
    and its tiles never touch the initial payload. The frame keeps its size at
    every stage, so nothing here can cost CLS. Before the map is ready (and
    for no-JS users) the same frame holds a real, readable address card with a
    link out to Google Maps, so the location is never JS-only content.
  -->
  <!-- No position utility of its own: the PARENT positions this inside the
       framed panel. Setting `relative` here would out-specify that and
       collapse the map to zero height. -->
  <div class="nearby-map isolate overflow-hidden">
    <!-- Leaflet mounts here. Its class attribute is deliberately STATIC:
         Leaflet adds `leaflet-container` (and friends) imperatively, and a Vue
         class binding would patch them straight back off on the next render. -->
    <div
      ref="mapContainerRef"
      class="absolute inset-0"
      role="application"
      :aria-label="`Map of ${hotel.name} and nearby attractions`"
    />

    <!-- Pre-map / no-JS state: real content, not a spinner -->
    <div
      v-if="!isMapReady"
      class="absolute inset-0 z-[800] flex flex-col items-center justify-center gap-3 p-8 text-center"
    >
      <svg class="h-7 w-7 text-copper" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
      <p class="font-display text-xl text-ink">{{ hotel.name }}</p>
      <p class="max-w-xs text-sm leading-6 text-ink/60">{{ hotel.address }}</p>
      <a
        :href="hotel.directionsUrl"
        target="_blank"
        rel="noopener"
        class="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-copper underline-offset-4 hover:underline"
      >
        Open in Google Maps
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Map as LeafletMap, Marker, Polyline } from 'leaflet'
import type { HotelLocation, NearbyAttraction } from '~/types/location'

const props = withDefaults(defineProps<{
  hotel: HotelLocation
  attractions: NearbyAttraction[]
  /** Attraction the surrounding section wants centred, or null for the hotel */
  activeAttractionId: string | null
}>(), {
  activeAttractionId: null,
})

const mapContainerRef = ref<HTMLElement | null>(null)
const isMapReady = ref(false)

const { prefersReducedMotion } = useReducedMotion()

// Leaflet is client-only and loaded on demand, so everything it owns lives in
// plain (non-reactive) module state — reactivity would only cost us proxies.
let leaflet: typeof import('leaflet') | undefined
let map: LeafletMap | undefined
let attractionMarkers = new Map<string, Marker>()
let connector: Polyline | undefined
let frameObserver: IntersectionObserver | undefined

const HOTEL_ZOOM = 15
const ATTRACTION_ZOOM = 14

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
    // The page owns vertical scrolling: the map must never hijack the wheel.
    // Ctrl/⌘ + wheel still zooms, and the +/- control always works.
    scrollWheelZoom: false,
    attributionControl: true,
  })

  // Dark, street-focused basemap with a separate, brighter label layer on top
  // so road numbers and place names stay clearly legible. The labels get their
  // own pane so CSS can lift them without washing out the streets underneath.
  const labelPane = map.createPane('labels')
  labelPane.style.zIndex = '400'

  leaflet.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
    { maxZoom: 20, attribution: '&copy; OpenStreetMap, &copy; CARTO' },
  ).addTo(map)

  leaflet.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png',
    { maxZoom: 20, attribution: '', pane: 'labels' },
  ).addTo(map)

  addHotelMarker()
  addAttractionMarkers()

  isMapReady.value = true
  // The placeholder covered the container until now; re-measure so Leaflet's
  // tile grid matches the frame exactly
  await nextTick()
  map.invalidateSize()
  map.setView(props.hotel.coordinates, HOTEL_ZOOM, { animate: false })
}

function addHotelMarker() {
  if (!leaflet || !map) {
    return
  }

  const icon = leaflet.divIcon({
    className: 'nearby-map-pin-wrap',
    html: `
      <span class="nearby-map-pin">
        <svg viewBox="0 0 30 42" width="30" height="42" aria-hidden="true">
          <path d="M15 1C7.3 1 1 7.3 1 15c0 11.5 14 26.5 14 26.5S29 26.5 29 15C29 7.3 22.7 1 15 1z" fill="#E5484D" stroke="#FFFFFF" stroke-width="1.5"/>
          <circle cx="15" cy="14.5" r="5.5" fill="#FFFFFF"/>
          <circle cx="15" cy="14.5" r="2.5" fill="#E5484D"/>
        </svg>
      </span>`,
    iconSize: [30, 42],
    iconAnchor: [15, 41],
  })

  const marker = leaflet.marker(props.hotel.coordinates, {
    icon,
    title: props.hotel.name,
    zIndexOffset: 1000,
  }).addTo(map)

  // The hotel is the map's subject: its card stays open from the start
  marker.bindPopup(
    `<p class="map-card-name">${props.hotel.name}</p>
     <p class="map-card-meta">${props.hotel.address}</p>
     <a class="map-card-link" href="${props.hotel.directionsUrl}" target="_blank" rel="noopener">Get directions</a>`,
    {
      className: 'nearby-map-card nearby-map-card-hotel',
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
      className: 'nearby-map-attraction-pin-wrap',
      html: '<span class="nearby-map-attraction-pin"></span>',
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
      { className: 'nearby-map-card', closeButton: false, offset: [0, -4] },
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
    className: 'nearby-map-connector',
    dashArray: '4 8',
    weight: 1.5,
  }).addTo(map)

  map.flyToBounds(
    leaflet.latLngBounds([props.hotel.coordinates, attraction.coordinates]),
    {
      padding: [48, 48],
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

  if (prefersReducedMotion.value) {
    map.setView(props.hotel.coordinates, HOTEL_ZOOM)
  }
  else {
    map.flyTo(props.hotel.coordinates, HOTEL_ZOOM)
  }
}

// The attraction cards drive the map
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

  // Tears down every Leaflet listener, layer, and DOM node it created
  map?.remove()
  map = undefined
  leaflet = undefined
})
</script>

<style scoped>
/* No intrinsic height: the map fills the parent's framed panel */

/* Leaflet renders its own DOM, so its chrome has to be reached through :deep */
.nearby-map :deep(.leaflet-container) {
  background: rgb(var(--color-cream));
  font-family: inherit;
}

/* Base streets: a gentle lift keeps roads visible against the dark theme */
.nearby-map :deep(.leaflet-tile-pane) {
  filter: brightness(1.1);
}

/* Labels live on their own pane: push them hard toward bright white so road
   numbers and place names are clearly readable */
.nearby-map :deep(.leaflet-labels-pane .leaflet-tile) {
  filter: brightness(1.9) contrast(1.4) saturate(0.35);
}

/* Hotel pin: the standard red location marker */
.nearby-map :deep(.nearby-map-pin) {
  display: block;
  filter: drop-shadow(0 2px 4px rgb(13 17 23 / 0.35));
}

/* Attraction pins: light dots that stay visible on the dark basemap */
.nearby-map :deep(.nearby-map-attraction-pin) {
  background: rgb(var(--color-paper) / 0.9);
  border: 1px solid rgb(var(--color-night));
  border-radius: 9999px;
  box-shadow: 0 1px 3px rgb(13 17 23 / 0.5);
  display: block;
  height: 14px;
  transition: background-color var(--duration-fast) var(--ease-premium);
  width: 14px;
}

.nearby-map :deep(.nearby-map-attraction-pin-wrap:hover .nearby-map-attraction-pin) {
  background: rgb(var(--color-copper));
}

/* Popups: light panel surface on the light map */
.nearby-map :deep(.nearby-map-card .leaflet-popup-content-wrapper) {
  background: rgb(var(--color-paper));
  border: 1px solid rgb(var(--color-line));
  border-radius: 0;
  box-shadow: 0 16px 40px -20px rgb(13 17 23 / 0.4);
  color: rgb(var(--color-ink));
}

.nearby-map :deep(.nearby-map-card .leaflet-popup-content) {
  margin: 0.875rem 1.125rem;
}

.nearby-map :deep(.nearby-map-card .leaflet-popup-tip) {
  background: rgb(var(--color-paper));
  border: 1px solid rgb(var(--color-line));
}

.nearby-map :deep(.nearby-map-card-hotel .leaflet-popup-content-wrapper) {
  border-color: rgb(var(--color-copper) / 0.5);
}

.nearby-map :deep(.map-card-name) {
  color: rgb(var(--color-ink));
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.125rem;
  margin: 0;
}

.nearby-map :deep(.map-card-meta) {
  color: rgb(var(--color-ink) / 0.6);
  font-size: 0.75rem;
  line-height: 1.25rem;
  margin: 0.25rem 0 0;
  max-width: 14rem;
}

.nearby-map :deep(.map-card-link) {
  color: rgb(var(--color-copper));
  display: inline-block;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  margin-top: 0.5rem;
  text-transform: uppercase;
}

.nearby-map :deep(.nearby-map-connector) {
  stroke: rgb(var(--color-copper));
}

.nearby-map :deep(.leaflet-control-attribution) {
  background: rgb(var(--color-paper) / 0.85);
  color: rgb(var(--color-ink) / 0.45);
  font-size: 0.6rem;
}

.nearby-map :deep(.leaflet-control-attribution a) {
  color: rgb(var(--color-ink) / 0.6);
}

/* Leaflet's own minimal zoom control, re-skinned to the design */
.nearby-map :deep(.leaflet-control-zoom) {
  border: 1px solid rgb(var(--color-line));
  border-radius: 0;
  box-shadow: none;
}

.nearby-map :deep(.leaflet-control-zoom a) {
  background: rgb(var(--color-paper));
  color: rgb(var(--color-ink));
  border-bottom: 1px solid rgb(var(--color-line));
}

.nearby-map :deep(.leaflet-control-zoom a:hover) {
  background: rgb(var(--color-cream));
  color: rgb(var(--color-copper));
}
</style>