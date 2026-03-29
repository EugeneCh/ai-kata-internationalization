export type TravelPace = 'slow' | 'balanced' | 'fast'

export type Destination = {
  id: string
  name: string
  country: string
  bestFor: string
  pace: TravelPace
  priceFrom: number
  flightTime: string
  blurb: string
  itineraryNote: string
  highlights: string[]
}

export const destinations: Destination[] = [
  {
    id: 'lisbon',
    name: 'Lisbon Long Weekend',
    country: 'Portugal',
    bestFor: 'Food lovers, first-time solo travelers, and short city breaks',
    pace: 'balanced',
    priceFrom: 980,
    flightTime: '6h 45m from New York',
    blurb:
      'Lisbon is bright, walkable, and easy to love. The neighborhoods feel distinct, the food scene is generous, and there is enough history to fill a long weekend without making the trip feel packed.',
    itineraryNote:
      'This route combines central neighborhoods, tram rides, miradouros, and one unhurried afternoon by the river so the schedule never feels rushed.',
    highlights: [
      'Sunset viewpoints with live music',
      'A simple train day trip to Sintra',
      'Pastel de nata stops built into the route',
    ],
  },
  {
    id: 'kyoto',
    name: 'Kyoto Culture Week',
    country: 'Japan',
    bestFor: 'Travelers who want rituals, gardens, and slower mornings',
    pace: 'slow',
    priceFrom: 2380,
    flightTime: '15h 20m from Los Angeles',
    blurb:
      'Kyoto rewards patience. Temples open onto quiet paths, small cafes invite long breakfasts, and every district offers detail that feels best when you are not racing from sight to sight.',
    itineraryNote:
      'This itinerary spreads major landmarks across the week and leaves room for neighborhood wandering, tea houses, and one rain-friendly museum day.',
    highlights: [
      'Temple visits paced across multiple days',
      'Seasonal food markets and tea tastings',
      'Evening walks through lantern-lit streets',
    ],
  },
  {
    id: 'marrakech',
    name: 'Marrakech Design Escape',
    country: 'Morocco',
    bestFor: 'Color, craftsmanship, riad stays, and sensory city travel',
    pace: 'fast',
    priceFrom: 1475,
    flightTime: '7h 10m from Madrid',
    blurb:
      'Marrakech is vivid from the first hour. Courtyards, rooftops, gardens, and market streets all compete for attention, which makes it perfect for travelers who enjoy an energetic city with strong visual identity.',
    itineraryNote:
      'The plan balances market time with calmer pockets such as Majorelle Garden, rooftop dinners, and one guided shopping block to reduce decision fatigue.',
    highlights: [
      'Riad breakfasts in shaded courtyards',
      'Market visits with craft-focused stops',
      'A final-night dinner with city views',
    ],
  },
  {
    id: 'reykjavik',
    name: 'Reykjavik Northern Lights Base',
    country: 'Iceland',
    bestFor: 'Nature-first travelers who still want a comfortable city base',
    pace: 'balanced',
    priceFrom: 2110,
    flightTime: '5h 55m from Boston',
    blurb:
      'Reykjavik gives travelers a soft landing before bigger landscape days. You get coffee shops, design stores, and easy logistics in town, then dramatic excursions once you are ready to leave the city behind.',
    itineraryNote:
      'This plan keeps the first day intentionally light, adds two full excursion windows, and leaves the final evening flexible in case the forecast suggests a better chance to see the sky clear.',
    highlights: [
      'Day trips built around weather windows',
      'Compact city center for easy evenings',
      'Geothermal bathing paired with lighter sightseeing',
    ],
  },
  {
    id: 'cartagena',
    name: 'Cartagena Warm Weather Reset',
    country: 'Colombia',
    bestFor: 'Sun seekers, couples, and remote workers extending a stay',
    pace: 'slow',
    priceFrom: 1260,
    flightTime: '4h 30m from Miami',
    blurb:
      'Cartagena is a strong option when you want warmth without overplanning. The old town is compact, color is everywhere, and beach or island time can be added without rebuilding the whole trip.',
    itineraryNote:
      'This plan leaves one full afternoon unscheduled so travelers can decide between a boat day, a longer lunch, or simply resting in the shade.',
    highlights: [
      'Walkable historic streets and plazas',
      'Flexible mix of city and island time',
      'Evening dining without long transfers',
    ],
  },
]
