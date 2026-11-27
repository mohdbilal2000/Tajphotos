import * as SunCalc from "suncalc";

/**
 * Astronomy for the free tools. Sun times come from suncalc (NOAA algorithm, ±1–2 minutes).
 * Full moons use the mean synodic month anchored to the known full moon of 3 Jan 2026 10:03 UTC —
 * accurate to about ±1 day at the range we show, which the 5-night viewing window absorbs; every
 * page that uses it says the ASI's announced dates are the official ones.
 */

/** Taj Mahal main mausoleum. */
export const TAJ = { lat: 27.1751, lng: 78.0421 } as const;

const IST = "Asia/Kolkata";
export const istTime = (d: Date) =>
  d.toLocaleTimeString("en-IN", { timeZone: IST, hour: "2-digit", minute: "2-digit", hour12: false });
export const istDate = (d: Date) =>
  d.toLocaleDateString("en-IN", { timeZone: IST, day: "numeric", month: "short", year: "numeric" });
export const istWeekday = (d: Date) => d.toLocaleDateString("en-IN", { timeZone: IST, weekday: "long" });
const istISO = (d: Date) => d.toLocaleDateString("en-CA", { timeZone: IST }); // YYYY-MM-DD

export interface SunRow {
  label: string; // "1 Jan" / "15 Jan"
  sunrise: string;
  gatesOpen: string; // sunrise − 30 min (ASI rule)
  goldenEnd: string; // soft morning light ends
  goldenStart: string; // evening golden hour begins
  sunset: string;
  lastEntry: string; // sunset − 30 min (ticketing closes; complex clears at sunset)
}

/** Sun table for the 1st and 15th of each month of `year`, computed at the Taj itself. */
export function sunTable(year: number): { month: string; rows: SunRow[] }[] {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months.map((month, m) => ({
    month,
    rows: [1, 15].map((day) => {
      // Noon UTC keeps the civil date stable in IST.
      const raw = SunCalc.getTimes(new Date(Date.UTC(year, m, day, 12)), TAJ.lat, TAJ.lng);
      // At 27°N the sun always rises and sets; the | null in the types is for polar latitudes.
      const at = (k: keyof typeof raw): Date => { const v = raw[k]; if (!(v instanceof Date)) throw new Error(`no ${String(k)}`); return v; };
      const t = { sunrise: at("sunrise"), sunset: at("sunset"), goldenHourEnd: at("goldenHourEnd"), goldenHour: at("goldenHour") };
      const minus30 = (d: Date) => new Date(d.getTime() - 30 * 60 * 1000);
      return {
        label: `${day} ${month.slice(0, 3)}`,
        sunrise: istTime(t.sunrise),
        gatesOpen: istTime(minus30(t.sunrise)),
        goldenEnd: istTime(t.goldenHourEnd),
        goldenStart: istTime(t.goldenHour),
        sunset: istTime(t.sunset),
        lastEntry: istTime(minus30(t.sunset)),
      };
    }),
  }));
}

const SYNODIC_MS = 29.530588853 * 86_400_000;
const ANCHOR_FULL_MOON = Date.UTC(2026, 0, 3, 10, 3);

/** Approximate full-moon instants (UTC) that fall inside `year`. */
export function fullMoons(year: number): Date[] {
  const out: Date[] = [];
  for (let k = -40; k <= 80; k++) {
    const t = new Date(ANCHOR_FULL_MOON + k * SYNODIC_MS);
    if (Number(t.toLocaleDateString("en-CA", { timeZone: IST }).slice(0, 4)) === year) out.push(t);
  }
  return out;
}

export interface ViewingNight {
  iso: string;
  display: string;
  weekday: string;
  isFullMoon: boolean;
  /** Friday: the Taj is closed, so this night of the window is skipped. */
  closed: boolean;
}

/**
 * The ASI's night-viewing pattern: the full-moon night plus two nights either side, except
 * Fridays (and the month of Ramadan, which the page states as a caveat rather than computing).
 */
export function viewingWindows(year: number): { fullMoon: Date; nights: ViewingNight[] }[] {
  return fullMoons(year).map((fm) => ({
    fullMoon: fm,
    nights: [-2, -1, 0, 1, 2].map((off) => {
      const d = new Date(fm.getTime() + off * 86_400_000);
      const weekday = istWeekday(d);
      return { iso: istISO(d), display: istDate(d), weekday, isFullMoon: off === 0, closed: weekday === "Friday" };
    }),
  }));
}
