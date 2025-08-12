import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock } from "lucide-react";

const HourAndQuick = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {/* Business Hours */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-emerald-600" />
              <CardTitle className="text-xl">Business Hours</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium">Monday - Friday</span>
              <span className="text-emerald-600 font-semibold">
                8:00 AM - 8:00 PM
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium">Saturday</span>
              <span className="text-emerald-600 font-semibold">
                9:00 AM - 5:00 PM
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium">Sunday</span>
              <span className="text-amber-600 font-semibold">
                Emergency Only
              </span>
            </div>
            <div className="bg-emerald-50 p-4 rounded-lg mt-4 border border-emerald-100">
              <p className="text-sm text-emerald-800">
                <strong>24/7 Emergency Training:</strong> Available for urgent
                corporate needs and emergency responder certification.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Response */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl">Response Times</CardTitle>
            <CardDescription>
              We prioritize urgent training needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-semibold text-amber-700">
                  Emergency Training
                </p>
                <p className="text-sm text-amber-600">Same day response</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <div>
                <p className="font-semibold text-blue-700">Phone Inquiries</p>
                <p className="text-sm text-blue-600">Within 2 hours</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <div>
                <p className="font-semibold text-emerald-700">
                  Email Responses
                </p>
                <p className="text-sm text-emerald-600">Within 24 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HourAndQuick;
