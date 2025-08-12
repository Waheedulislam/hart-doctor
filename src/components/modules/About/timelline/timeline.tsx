/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Calendar, Star, Layers } from "lucide-react";

type Milestone = {
  year: string;
  title: string;
  description: string;
  icon: any;
};

const milestones: Milestone[] = [
  {
    year: "2011",
    title: "AHA ITC in Bangladesh",
    description:
      "IHD becomes the first affiliated American Heart Association International Training Center in Bangladesh.",
    icon: Star,
  },
  {
    year: "Today",
    title: "Continuing AHA Programs",
    description:
      "Ongoing delivery of guideline-based AHA courses for physicians, nurses, and healthcare providers.",
    icon: Layers,
  },
];

export default function AboutTimeline() {
  return (
    <section
      aria-labelledby="timeline"
      className="sm:py-12 max-w-7xl mx-auto px-6 py-16"
    >
      <h2
        id="timeline"
        className="mb-12 text-3xl font-semibold tracking-tight text-gray-900"
      >
        Our journey
      </h2>
      <ol className="relative border-l-2 border-emerald-300">
        {milestones.map((m, idx) => (
          <li
            key={idx}
            className="mb-10 ml-8 relative group flex items-start gap-4"
          >
            {/* Icon + label */}
            <span className="flex flex-col items-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-emerald-600 bg-white text-emerald-600 shadow-md transition group-hover:bg-emerald-600 group-hover:text-white">
                <m.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="mt-1 max-w-[80px] text-center text-xs font-semibold text-emerald-700">
                {m.title}
              </span>
            </span>

            {/* Content */}
            <div>
              <time className="mb-1 flex items-center gap-2 text-sm font-semibold text-emerald-700">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                {m.year}
              </time>
              <p className="text-gray-600">{m.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
