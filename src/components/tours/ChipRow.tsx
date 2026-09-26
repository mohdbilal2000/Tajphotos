import { Clock, Users, Car, Languages, MapPin, RefreshCcw } from "lucide-react";
import type { Tour } from "@/content/types";

export function ChipRow({ tour }: { tour: Tour }) {
  const chips = [
    { icon: Clock, label: tour.durationLabel },
    { icon: Users, label: tour.groupSize },
    { icon: Car, label: tour.transport },
    { icon: Languages, label: tour.languages.join(", ") },
    { icon: MapPin, label: `Pickup: ${tour.pickup}` },
    { icon: RefreshCcw, label: tour.cancellation },
  ];
  return (
    <ul className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <li key={c.label} className="inline-flex items-center gap-1.5 border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink/85">
          <c.icon className="size-3.5 text-primary" aria-hidden /> {c.label}
        </li>
      ))}
    </ul>
  );
}
