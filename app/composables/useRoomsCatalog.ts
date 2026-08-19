import type { Room } from "~/types/room";

/**
 * Static showcase catalog (CMS-ready shape); live rates/availability arrive
 * with the PMS integration. Shared by the home page teaser and the /rooms
 * listing page so both read from one source.
 */
const rooms: Room[] = [
  {
    id: "standard-double",
    tabLabel: "Standard Double",
    name: "Standard Double Room",
    description:
      "A calm, thoughtfully appointed double room with warm wood tones and everything a short city stay needs - rest, work, and an unhurried morning.",
    nightlyRateUsd: 75,
    areaSqFt: 300,
    maxOccupancy: 2,
    bedType: "1 Double Bed",
    images: [
      {
        src: "/images/rooms/standard-double.jpg",
        alt: "Standard Double Room with a plush double bed, walnut headboard, and warm brass lamps",
      },
    ],
  },
  {
    id: "deluxe-twin",
    tabLabel: "Deluxe Twin",
    name: "Deluxe Twin Room",
    description:
      "Our Deluxe Twin Room offers spacious comfort with two premium beds, contemporary furnishings, and thoughtfully designed corners for work and rest.",
    nightlyRateUsd: 95,
    areaSqFt: 345,
    maxOccupancy: 2,
    bedType: "2 Single Beds",
    images: [
      {
        src: "/images/rooms/deluxe-twin-1.jpg",
        alt: "Deluxe Twin Room with two premium single beds against a walnut headboard wall",
      },
      {
        src: "/images/rooms/deluxe-twin-2.jpg",
        alt: "Deluxe Twin Room seen from the window, with writing desk and leather armchair",
      },
    ],
  },
  {
    id: "deluxe-double",
    tabLabel: "Deluxe Double",
    name: "Deluxe Double Room",
    description:
      "A generous king-bedded room layered in ivory and soft beige, with a reading corner and dusk-lit windows made for slow evenings.",
    nightlyRateUsd: 95,
    areaSqFt: 345,
    maxOccupancy: 2,
    bedType: "1 King Bed",
    images: [
      {
        src: "/images/rooms/deluxe-double.jpg",
        alt: "Deluxe Double Room with a king bed, cove-lit walnut headboard, and lounge chair",
      },
    ],
  },
  {
    id: "executive-suite",
    tabLabel: "Executive Suite",
    name: "Executive Suite",
    description:
      "Business-first luxury: a king bedroom beside a proper workspace with a city-view desk, tuned for long stays and productive evenings.",
    nightlyRateUsd: 125,
    areaSqFt: 645,
    maxOccupancy: 2,
    bedType: "1 King Bed",
    images: [
      {
        src: "/images/rooms/standard-double.jpg",
        alt: "Executive Suite with king bed and a city-view workspace behind a walnut partition",
      },
    ],
  },
  {
    id: "presidential-suite",
    tabLabel: "Presidential Suite",
    name: "Presidential Suite",
    description:
      "The house signature: a palatial living room under a crystal chandelier, silk-draped windows, and a private bedroom wing for stays that should feel like occasions.",
    nightlyRateUsd: 350,
    areaSqFt: 3775,
    maxOccupancy: 6,
    bedType: "2 King Beds",
    images: [
      {
        src: "/images/rooms/presidential-suite.jpg",
        alt: "Presidential Suite living room with chandelier, ivory sofas, and marble floor",
      },
    ],
  },
];

export function useRoomsCatalog(): Room[] {
  return rooms;
}
