import { Heart, Shield, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EmergencyContact from "../EmergencyContact/EmergencyContact";
import ContactCard from "../ContactCard/ContactCard";
import HourAndQuick from "../HourAndQuick/HourAndQuick";
import CallToAction from "../CallToAction/CallToAction";

export default function CPRContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Hero Section */}
      <div
        className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.stockcake.com/public/5/9/b/59b94f87-31fc-47ec-83ac-6e2321aabce8_large/medical-team-discussion-stockcake.jpg')",
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-70"></div>

        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Heart className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Life<span className="text-emerald-200">Guard</span> CPR Training
            </h1>
            <p className="text-xl md:text-2xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Professional CPR & First Aid Training • Emergency Response •
              Life-Saving Skills
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30 text-lg px-4 py-2"
              >
                <Shield className="h-4 w-4 mr-2" />
                AHA Certified
              </Badge>
              <Badge
                variant="secondary"
                className="bg-white/20 text-white border-white/30 text-lg px-4 py-2"
              >
                <Users className="h-4 w-4 mr-2" />
                10,000+ Trained
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact Banner */}
      <EmergencyContact />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Cards Grid */}
        <ContactCard />

        {/* Hours and Quick Info */}
        <HourAndQuick />
        {/* Call to Action */}
        <CallToAction />
      </div>
    </div>
  );
}
