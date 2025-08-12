import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const ContactCard = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {/* Phone Contact */}
        <Card className="border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          <CardHeader className="text-center pb-4">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-emerald-600" />
            </div>
            <CardTitle className="text-2xl text-emerald-700">Call Us</CardTitle>
            <CardDescription className="text-gray-600">
              Speak with our certified instructors
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Main Office</p>
              <p className="text-2xl font-bold text-gray-900">(555) CPR-LIFE</p>
              <p className="text-lg text-gray-700">(555) 277-5433</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">
                24/7 Training Hotline
              </p>
              <p className="text-xl font-semibold text-emerald-600">
                (555) 911-HELP
              </p>
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
              Call Now
            </Button>
          </CardContent>
        </Card>

        {/* Email Contact */}
        <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
          <CardHeader className="text-center pb-4">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-blue-700">Email Us</CardTitle>
            <CardDescription className="text-gray-600">
              Get detailed information and schedules
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">General Inquiries</p>
              <p className="text-lg font-semibold text-gray-900">
                info@lifeguardcpr.com
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">
                Training Registration
              </p>
              <p className="text-lg font-semibold text-blue-600">
                training@lifeguardcpr.com
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Corporate Programs</p>
              <p className="text-lg font-semibold text-gray-700">
                corporate@lifeguardcpr.com
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent transition-colors"
            >
              Send Email
            </Button>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="border-2 border-teal-100 hover:border-teal-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 md:col-span-2 lg:col-span-1">
          <CardHeader className="text-center pb-4">
            <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-teal-600" />
            </div>
            <CardTitle className="text-2xl text-teal-700">Visit Us</CardTitle>
            <CardDescription className="text-gray-600">
              Training center and headquarters
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                LifeGuard CPR Training Center
              </p>
              <p className="text-gray-700 leading-relaxed">
                1234 Emergency Response Blvd
                <br />
                Suite 100
                <br />
                Safety City, SC 29401
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full border-teal-600 text-teal-600 hover:bg-teal-50 bg-transparent transition-colors"
            >
              Get Directions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactCard;
