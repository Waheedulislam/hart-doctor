"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Stethoscope, CalendarClock } from "lucide-react";

export default function AboutHighlights() {
  const years = new Date().getFullYear() - 2011;
  const items = [
    {
      icon: CalendarClock,
      title: `${years}+ years`,
      desc: "Continuous training since 2015",
    },

    {
      icon: Stethoscope,
      title: "Healthcare focused",
      desc: "For physicians, nurses, and providers",
    },
    {
      icon: Users,
      title: "Instructor-led",
      desc: "Hands-on practice and assessment",
    },
  ];

  return (
    <section
      aria-labelledby="highlights"
      className="sm:py-10 max-w-7xl mx-auto px-6 py-16"
    >
      <h2
        id="highlights"
        className="mb-6 text-2xl font-semibold tracking-tight"
      >
        What sets PAI apart
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Card
            key={i}
            className="
              border-emerald-100
              transition-transform  duration-300 ease-in-out
              hover:shadow-lg hover:shadow-emerald-300/40 hover:scale-[1.03]
              cursor-pointer
            "
          >
            <CardContent className="flex items-start gap-3 p-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-emerald-50">
                <item.icon
                  className="h-5 w-5 text-emerald-700"
                  aria-hidden="true"
                />
              </span>
              <div>
                <div className="font-medium">{item.title}</div>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
