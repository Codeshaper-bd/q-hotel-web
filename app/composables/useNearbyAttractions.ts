import type { HotelLocation, NearbyAttraction } from "~/types/location";

export const useNearbyAttractions = () => {
  /**
   * Static showcase content (CMS-ready shape). Coordinates mark each
   * landmark's location; displayed distances are concise, approximate road
   * distances from the hotel for guest-facing wayfinding. Card images are
   * best-fit placeholders until dedicated location photography lands.
   */
  const hotel: HotelLocation = {
    name: "Q Hotel Dhaka",
    address: "Uttara, Dhaka, Bangladesh",
    coordinates: [23.8377208, 90.4572272],
    directionsUrl: "https://maps.app.goo.gl/KAggvEKj6dWVGrQE9",
  };

  const attractions: NearbyAttraction[] = [
    {
      id: "hazrat-shahjalal-airport",
      name: "Hazrat Shahjalal International Airport (HSIA)",
      description:
        "Dhaka's primary international airport, providing convenient connectivity for domestic and international business travelers visiting the capital.",
      distanceMiles: 5,
      distanceKm: 8,
      coordinates: [23.8433472, 90.3977833],
      image: "/images/nearby/hazrat-saha-jala-airport.png",
    },
    {
      id: "international-convention-city-bashundhara",
      name: "International Convention City Bashundhara (ICCB)",
      description:
        "One of Dhaka's largest venues for major conferences, exhibitions, corporate events, trade shows, and large-scale business gatherings.",
      distanceMiles: 3.5,
      distanceKm: 5.5,
      coordinates: [23.8276, 90.42718],
      image: "/images/nearby/iccb.png",
    },
    {
      id: "bangladesh-china-friendship-conference-center",
      name: "Bangladesh-China Friendship Conference Center (BCFCC)",
      description:
        "A prominent conference and event destination in Dhaka, hosting business conferences, exhibitions, seminars, and important institutional events.",
      distanceMiles: 7.5,
      distanceKm: 12,
      coordinates: [23.76936, 90.37929],
      image: "/images/nearby/bcfcc.png",
    },
    {
      id: "adamjee-epz",
      name: "Adamjee EPZ (AEPZ)",
      description:
        "A major export-processing and industrial hub in Narayanganj, serving corporate visitors, investors, suppliers, and business travelers.",
      distanceMiles: 12,
      distanceKm: 19,
      coordinates: [23.67673, 90.52335],
      image: "/images/nearby/aepz.png",
    },
    {
      id: "jamuna-future-park",
      name: "Jamuna Future Park",
      description:
        "One of Dhaka's major commercial and retail destinations, conveniently located near Bashundhara and the Purbachal Expressway corridor.",
      distanceMiles: 4.3,
      distanceKm: 7,
      coordinates: [23.8134982, 90.4240893],
      image: "/images/nearby/jamuna-future-park.png",
    },
    {
      id: "bashundhara-residential-commercial-area",
      name: "Bashundhara Residential & Commercial Area",
      description:
        "A major mixed-use district with corporate offices, educational institutions, hospitals, restaurants, retail, and business services.",
      distanceMiles: 4,
      distanceKm: 6.5,
      coordinates: [23.8255, 90.432],
      image: "/images/nearby/bashundhara-residential.png",
    },
    {
      id: "bashundhara-city-shopping-complex",
      name: "Bashundhara City Shopping Complex",
      description:
        "One of Dhaka's premier shopping and commercial destinations, featuring leading brands, retail outlets, dining, entertainment, and business facilities.",
      distanceMiles: 9.3,
      distanceKm: 15,
      coordinates: [23.7474, 90.3906],
      image: "/images/nearby/bashundhara-city-complex.png",
    },
  ];

  const formatDistance = (attraction: NearbyAttraction) =>
    `${attraction.distanceMiles} mi / ${attraction.distanceKm} km from the hotel`;

  return { hotel, attractions, formatDistance };
};