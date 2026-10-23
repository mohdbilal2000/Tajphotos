import type { TeamMember } from "@/content/types";

/**
 * Real people only. Until the team's names, photos and licence numbers are ready to publish, every
 * guide is credited to the business itself — an honest organisational byline beats invented
 * people, which Google's quality raters and AI engines both treat as a trust red flag.
 */
export const team: TeamMember[] = [
  {
    slug: "tajphotos-team",
    name: "TajPhotos team",
    role: "Agra-based trip planners",
    bio: "The planning team behind TajPhotos. Every guide is researched against official sources (ASI, IRCTC, Rajasthan Tourism) and re-checked when timings or prices change.",
    languages: ["English", "Hindi"],
    years: 0,
    organisation: true,
  },
];

export function getTeamMember(slug: string) {
  return team.find((t) => t.slug === slug) ?? team[0];
}
