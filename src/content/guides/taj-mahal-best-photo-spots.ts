import type { Guide } from "@/content/types";
import { tajMahal, otherMonuments } from "@/content/facts";

const guide: Guide = {
  slug: "taj-mahal-best-photo-spots",
  title: "Best Taj Mahal Photo Spots, With the Right Time for Each",
  summary: "The 8 best Taj Mahal photo spots, from the reflecting pool at gate-opening to Mehtab Bagh at sunset, with timings, crowd levels and the camera rules that apply.",
  category: "photography",
  heroImage: "taj-mahal-wide-1",
  author: "rahul-sharma",
  datePublished: "2026-10-23",
  dateModified: "2026-10-23",
  keyTakeaways: [
    "The central reflecting pool is the classic shot, and it is only empty for roughly the first 30 to 45 minutes after the gates open.",
    "The Great Gate (Darwaza-i-Rauza) frames the mausoleum in its arch and works best from inside the forecourt just after entry.",
    "Mehtab Bagh, across the Yamuna, is the best sunset viewpoint because the Taj Mahal itself closes about 30 minutes before sunset.",
    "Tripods, monopods, gimbals and drones are banned inside the complex, and no photography is allowed inside the main mausoleum.",
    `The Taj Mahal is closed every ${tajMahal.closedDay}, so plan Friday shoots at Mehtab Bagh or Agra Fort instead.`,
  ],
  body: [
    { type: "p", text: "The best Taj Mahal photo spots are the central reflecting pool at gate-opening, the arch of the Great Gate, the raised platform beside the mosque, and Mehtab Bagh across the river at sunset. Each one has a short window when the light is right and the crowd is thin. This guide lists eight spots in the order you reach them on a sunrise visit, with the time that works best for each." },
    { type: "callout", variant: "warning", title: "Rules that shape every shot", text: `${tajMahal.photographyRules} Entry allows ${tajMahal.visitTimeLimit}.` },
    { type: "h2", text: "Which Taj Mahal photo spots are worth your time?" },
    { type: "table", caption: "Spots in the order you reach them on a sunrise visit. Crowd levels are typical for October to March.", headers: ["Spot", "Best time", "Crowds", "Why go"], rows: [
      ["Great Gate arch (inside the forecourt)", "First 10 minutes after entry", "Low, then high", "The arch frames the dome like a picture frame"],
      ["Central reflecting pool", "First 30–45 minutes", "Lowest of the day", "The symmetrical, reflected front view"],
      ["Diana bench (raised platform mid-garden)", "First hour", "Queues form by 7:30 AM", "Elevated, centred angle"],
      ["Side gardens and cypress rows", "Morning", "Moderate", "Leading lines and shade, fewer people in frame"],
      ["Mosque (west side) arches", "Mid-morning", "Low", "Red sandstone arches framing white marble"],
      ["Plinth and pietra dura details", "Any time", "Moderate", "Close-ups of inlay and calligraphy"],
      ["Yamuna riverside terrace (rear plinth)", "Morning", "Low", "River and Mehtab Bagh in the background"],
      ["Mehtab Bagh (across the river)", "About an hour before sunset", "Low", "Sunset behind the dome, no crowd in front"],
    ] },
    { type: "h2", text: "When is the reflecting pool empty?" },
    { type: "p", text: "The reflecting pool is emptiest in the first 30 to 45 minutes after the gates open, which is about 30 minutes before sunrise. After that, tour groups arrive and the central walkway fills. Wind ruffles the water by mid-morning, so a still reflection is also most likely early. Arrive at the East Gate 20 to 30 minutes before opening to be among the first through security." },
    { type: "h2", text: "Where is the best sunset view of the Taj Mahal?" },
    { type: "p", text: `Mehtab Bagh is the best sunset view, because the Taj Mahal complex closes about 30 minutes before sunset. The garden sits on the north bank of the Yamuna, directly opposite the mausoleum, and costs ₹${otherMonuments.mehtabBagh.foreigner} for foreign visitors. Bring a zoom lens, since the river keeps you roughly 300 metres from the monument. Read our [Mehtab Bagh guide](/guides/mehtab-bagh-taj-mahal-view) for the exact approach.` },
    { type: "h2", text: "What camera gear can you bring inside?" },
    { type: "p", text: "Handheld cameras and phones are allowed, with any lens. Tripods, monopods, gimbals, selfie sticks with stabilisers and drones are not, and security confiscates them at the gate. Keep your bag small, because large bags must go to the cloakroom. Our [camera rules guide](/guides/taj-mahal-camera-rules) covers each item in detail." },
    { type: "h2", text: "Do you need permission for a professional photoshoot?" },
    { type: "p", text: "Personal photos, including couple and portrait shots with a hired photographer, need no special permission. Commercial shoots for advertising, film or publication need ASI permission arranged at least 15 days in advance. Our [Taj Mahal photoshoot](/tours/taj-mahal-photoshoot) is a personal session, so it works within the standard rules." },
    { type: "cta", title: "Want these shots without the guesswork?", text: "A local photographer walks you to each spot at the right minute and delivers edited photos.", tour: "taj-mahal-photoshoot", label: "See photoshoot sessions" },
  ],
  faqs: [
    { q: "What is the best spot to photograph the Taj Mahal?", a: "The central reflecting pool is the best single spot, giving the classic symmetrical front view with the dome reflected in the water. It is only reliably empty in the first 30 to 45 minutes after the gates open, so arrive before opening and head there first." },
    { q: "Can you take a tripod into the Taj Mahal?", a: "No. Tripods, monopods, gimbals and drones are banned inside the Taj Mahal complex and are taken at security. Handheld cameras and phones are allowed everywhere except inside the main mausoleum, where photography is not permitted." },
    { q: "Where can you photograph the Taj Mahal at sunset?", a: "Mehtab Bagh, the garden across the Yamuna River, is the best place for sunset photos. The Taj Mahal complex closes about 30 minutes before sunset, so you cannot photograph the sun going down from inside. Arrive about an hour before sunset." },
    { q: "Can you photograph the Taj Mahal on a Friday?", a: "Not from inside, because the Taj Mahal is closed to tourists every Friday. You can still photograph it from Mehtab Bagh across the river and from Agra Fort, which has a distant view of the dome from the Musamman Burj." },
  ],
  relatedTours: ["taj-mahal-photoshoot", "taj-mahal-sunrise-tour-with-photographer", "agra-city-tour"],
  relatedGuides: ["taj-mahal-camera-rules", "taj-mahal-sunrise-vs-sunset", "mehtab-bagh-taj-mahal-view"],
  keywords: ["Taj Mahal photo spots", "best place to photograph Taj Mahal", "Taj Mahal reflecting pool", "Diana bench Taj Mahal", "Mehtab Bagh sunset", "Taj Mahal photography tips", "Taj Mahal tripod rules", "Taj Mahal photoshoot"],
  sources: [{ title: "Taj Mahal official website (ASI)", url: "https://www.tajmahal.gov.in/" }],
};

export default guide;
