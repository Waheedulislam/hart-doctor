"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Award, Clock } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=800')] opacity-5"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Content Section */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <Badge
              variant="secondary"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-100 text-emerald-900 border-emerald-200"
            >
              <Award className="w-4 h-4" />
              Established Since May 2009
            </Badge>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="font-serif text-5xl lg:text-6xl xl:text-5xl font-bold text-foreground leading-tight">
                Empowering Lives Through
                <span className="text-emerald-600 block">
                  Healthcare Training
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Prime Aid Institute has been Bangladesh&#39;s trusted partner in
                healthcare education since 2009, training physicians, nurses,
                and healthcare professionals with world-class standards.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">15+</div>
                  <div className="text-sm text-muted-foreground">
                    Years Experience
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Award className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    5000+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Professionals Trained
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Link href="/courses">Explore PAI Courses</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-lg transition-all duration-300 bg-transparent"
              >
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative">
            <div className="relative aspect-[4/3] w-full max-w-[600px] mx-auto overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="https://media.istockphoto.com/id/174771475/photo/first-aid.jpg?s=612x612&w=0&k=20&c=talA1beMjNWH8eafByiNI3il2lXw44URCwnqTz2vD8w="
                alt="Healthcare professionals participating in Prime Aid Institute training session"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay Badge */}
              <div className="absolute top-6 left-6">
                <Badge className="bg-emerald-600 text-white px-3 py-1">
                  PAI Certified Training
                </Badge>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 hidden lg:block">
              <Card className="bg-card/95 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-emerald-600" />
                    <div>
                      <div className="font-semibold text-card-foreground">
                        ISO Certified
                      </div>
                      <div className="text-sm text-muted-foreground">
                        International Standards
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Course Cards Section */}
        <div className="mt-24 space-y-8">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground">
              Our Specialized Training Programs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive range of internationally recognized
              healthcare courses
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* BLS Course */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-card-foreground">
                  Basic Life Support (BLS)
                </h3>
                <p className="text-muted-foreground">
                  Essential life-saving skills for healthcare professionals
                </p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-emerald-600">
                      ৳8,500
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />1 Day Course
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* First Aid Course */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-card-foreground">
                  First Aid Training
                </h3>
                <p className="text-muted-foreground">
                  Comprehensive emergency response and first aid techniques
                </p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-emerald-600">
                      ৳7,500
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      4-5 Days
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CPR Course */}
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="font-serif text-xl font-bold text-card-foreground">
                  CPR Certification
                </h3>
                <p className="text-muted-foreground">
                  Cardiopulmonary resuscitation for emergency situations
                </p>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-emerald-600">
                      ৳4,000
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />1 Day Course
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-24 text-center space-y-6 max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl lg:text-3xl font-bold text-foreground">
            Building Healthcare Excellence Through Education
          </h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At Prime Aid Institute, we are committed to improving healthcare
            through simulation-based training for doctors, nurses, healthcare
            technicians, and other providers. We focus on developing
            international healthcare standards and building effective systems
            for hospitals and healthcare facilities across Bangladesh.
          </p>
        </div>
      </div>
    </section>
  );
}
