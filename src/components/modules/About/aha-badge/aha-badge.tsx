"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, HeartPulse } from "lucide-react";

export default function AHABadge() {
  return (
    <div className="sm:py-12 max-w-7xl mx-auto px-6 py-16">
      <Card
        className="
          border-emerald-100 
          transition-transform transition-shadow duration-300 ease-in-out
          hover:shadow-lg hover:shadow-emerald-300/40 hover:scale-[1.02]
          "
      >
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600">
              <HeartPulse className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <CardTitle className="text-xl sm:text-2xl">
              First AHA International Training Center (ITC) in Bangladesh
            </CardTitle>
          </div>
          <Badge className="bg-emerald-600 hover:bg-emerald-700">
            AHA Affiliated
          </Badge>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2">
          <p className="text-muted-foreground">
            As an AHA ITC, IHD delivers guideline-based resuscitation education
            with standardized curricula, certified instructors, and
            high-fidelity practice for real-world readiness.
          </p>
          <ul className="grid gap-3">
            <li className="flex items-center gap-2 text-sm">
              <ShieldCheck
                className="h-4 w-4 text-emerald-600"
                aria-hidden="true"
              />
              AHA-aligned programs and assessment
            </li>
            <li className="flex items-center gap-2 text-sm">
              <ShieldCheck
                className="h-4 w-4 text-emerald-600"
                aria-hidden="true"
              />
              Authorized certification cards
            </li>
            <li className="flex items-center gap-2 text-sm">
              <ShieldCheck
                className="h-4 w-4 text-emerald-600"
                aria-hidden="true"
              />
              Simulation-based skills training
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
