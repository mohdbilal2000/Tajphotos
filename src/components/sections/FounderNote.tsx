import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getImage } from "@/content/images";
import { team } from "@/content";

/**
 * The one section on the site written in the first person.
 *
 * Every tour operator's homepage says "passionate local experts". None of them says which gate, at
 * what time, or what goes wrong. This is a letter, set in the display serif at a narrow measure
 * with a real signature line, because a specific voice is the only thing on a travel site that a
 * competitor cannot copy in an afternoon — and the only thing a traveller comparing six identical
 * Golden Triangle pages will actually remember.
 *
 * NOTE: the voice belongs to `team[0]` in src/content/team.ts, which ships as a placeholder person.
 * This copy must be rewritten by the real founder before launch — see the pre-launch checklist in
 * the README. A letter signed by someone who does not exist is the worst version of this section.
 */
export function FounderNote() {
  const founder = team[0];
  const portrait = getImage("taj-mahal-mist-1");
  return (
    <section className="border-y border-border bg-surface py-20 sm:py-24 lg:py-28">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="figure aspect-[4/5] w-full">
            <Image src={portrait.src} alt={portrait.alt} placeholder="blur" sizes="(min-width: 1024px) 34vw, 88vw" />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Mehtab Bagh, across the Yamuna. The view most visitors never make time for, ten minutes
            from the gate everybody queues at.
          </p>
        </div>

        <div className="max-w-[40rem]">
          <p className="border-t border-border pt-4 text-label font-semibold uppercase text-accent">A note before you book</p>

          <div className="mt-8 space-y-6 font-display text-[1.375rem] leading-[1.5] text-ink sm:text-2xl sm:leading-[1.5]">
            <p>
              I grew up in Tajganj, about a ten-minute walk from the East Gate. As a boy I thought it
              was normal to be able to see the dome from the roof of your own house.
            </p>
            <p className="font-sans text-base leading-[1.85] text-muted sm:text-[1.0625rem]">
              Here is what I have learned in eleven years of standing at that gate at five in the
              morning. The people who leave happy are almost never the ones who booked the biggest
              itinerary. They are the ones who were told the truth: that the Taj closes on Fridays
              and no amount of money changes that; that the marble is pink for about twenty minutes
              and then it is white; that four people and four suitcases do not fit comfortably in the
              car most operators will quietly send you. That the best hour of a Golden Triangle trip
              is usually a rooftop in Agra at dusk, which costs nothing.
            </p>
            <p>
              So we tell you those things first, and then we plan the trip. It is slower to sell that
              way. It is the only way I know how to do it in my own city.
            </p>
            <p className="font-sans text-base leading-[1.85] text-muted sm:text-[1.0625rem]">
              We will never drive you to a marble emporium, because we are not paid to. If we cannot
              get you the room, the guide or the night-viewing permit you asked for, we will say so
              before you pay us anything, not after. And on the days you are travelling, the WhatsApp
              thread you started with us is answered by someone whose name you already know.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-border pt-6">
            <div>
              <p className="font-display text-2xl italic text-ink">{founder.name}</p>
              <p className="mt-1.5 text-label font-semibold uppercase text-muted">{founder.role} · {founder.years} years in Agra</p>
            </div>
            <Link href="/about" className="arrow-link">
              Meet the team <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
