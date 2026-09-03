import type { TeamMember } from "@/content/types";

/** TODO: replace with real team members (names, licence numbers, photos). Used for E-E-A-T author bylines. */
export const team: TeamMember[] = [
  {
    slug: "imran-khan",
    name: "Imran Khan",
    role: "Founder & Licensed Tour Guide",
    bio: "Born in Tajganj, a ten-minute walk from the Taj Mahal's East Gate, Imran has guided travellers through Agra, Delhi and Rajasthan since 2014. He holds a Ministry of Tourism regional guide licence and plans every itinerary personally.",
    languages: ["English", "Hindi", "Urdu"],
    years: 12,
    credentials: ["Ministry of Tourism (Govt. of India) Regional Level Guide", "First-aid certified"],
  },
  {
    slug: "rahul-sharma",
    name: "Rahul Sharma",
    role: "Lead Photographer",
    bio: "Rahul has photographed more than 1,500 couples and families at the Taj Mahal, Amber Fort and Lake Pichola. He knows the exact minute the light hits the marble on every month of the year.",
    languages: ["English", "Hindi"],
    years: 9,
  },
  {
    slug: "priya-verma",
    name: "Priya Verma",
    role: "Travel Designer",
    bio: "Priya builds custom Golden Triangle and Rajasthan itineraries, handles hotel bookings and is the calm voice on WhatsApp when plans change.",
    languages: ["English", "Hindi", "French"],
    years: 7,
  },
];

export function getTeamMember(slug: string) {
  return team.find((t) => t.slug === slug) ?? team[0];
}
