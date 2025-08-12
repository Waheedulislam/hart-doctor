"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutCTA() {
  return (
    <div className="pb-12 pt-6 max-w-7xl mx-auto px-6 py-16">
      <Card className="overflow-hidden border-emerald-200">
        <CardContent className="relative flex flex-col items-start gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h3 id="cta" className="text-xl font-semibold">
              Ready to schedule training or need guidance?
            </h3>
            <p className="text-muted-foreground">
              Our team can help you choose the right AHA course and delivery
              format for your organization.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/contact">Talk to us</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/courses">Browse courses</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
