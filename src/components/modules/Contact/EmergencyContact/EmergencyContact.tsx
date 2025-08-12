import { AlertTriangle } from "lucide-react";
import React from "react";

const EmergencyContact = () => {
  return (
    <div>
      <div className="bg-amber-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-4 text-center">
            <AlertTriangle className="h-6 w-6 animate-pulse" />
            <p className="text-lg font-semibold">
              EMERGENCY? Call 911 immediately • For training inquiries, contact
              us below
            </p>
            <AlertTriangle className="h-6 w-6 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;
