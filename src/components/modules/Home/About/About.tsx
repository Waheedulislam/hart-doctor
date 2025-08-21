"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-6xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-12 text-center">
        About Us
      </h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 max-w-5xl mx-auto">
        {/* Image */}
        <div className="flex-shrink-0 w-full md:w-1/2 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSSvagjyQ0TGHmMmpqCDY6Q0KjYUO6Nqnbhw&s"
            alt="Institute of Healthcare Development"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="prose prose-lg text-gray-700 md:w-1/2 flex flex-col lg:mt-10">
          <p>
            Since May 2009, Prime Aid Institute has been a trusted and respected
            name in healthcare training in Bangladesh. We proudly offer these
            following specialized courses for physicians, nurses, and other
            healthcare professionals :
          </p>

          <ul className="list-disc list-inside mt-6 space-y-2">
            <li>
              <strong>Basic Life Support (BLS) Course</strong>
            </li>
            <li>
              <strong>First Aid Training Course</strong>
            </li>
            <li>
              <strong>Cardiopulmonary Resuscitation (CPR) Course</strong>
            </li>
          </ul>

          {/* Learn More Button */}
          <Link
            href="/about"
            className="mt-6 inline-block bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3 rounded-md font-semibold transition self-start
             hover:from-emerald-700 hover:to-teal-600"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
