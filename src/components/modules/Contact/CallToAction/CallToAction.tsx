import { Heart } from "lucide-react";

const CallToAction = () => {
  return (
    <div>
      <div className="text-center bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-12 shadow-2xl">
        <Heart className="h-16 w-16 mx-auto mb-6 text-emerald-200" />
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Save Lives?
        </h2>
        <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
          Join thousands of certified individuals who are prepared to respond in
          emergency situations. Every second counts when it comes to saving
          lives.
        </p>
      </div>
    </div>
  );
};

export default CallToAction;
