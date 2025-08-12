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
            src="https://ihdbd.org/upload/about_page/1774768787986764.jpg"
            alt="Institute of Healthcare Development"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="prose prose-lg text-gray-700 md:w-1/2 flex flex-col">
          <p>
            Institute of Healthcare Development (IHD) is the first affiliated
            International Training Center (ITC) of the prestigious American
            Heart Association (AHA), in Bangladesh, and have been providing the
            following AHA courses for Physicians, Nurses and other Healthcare
            Providers since April 2011:
          </p>

          <ul className="list-disc list-inside mt-6 space-y-2">
            <li>
              <strong>ACLS (Advanced Cardiovascular Life Support)</strong>
            </li>
            <li>
              <strong>Emergency Cardiac Care (ECC)</strong>
            </li>
            <li>
              <strong>BLS (Basic Life Support - CPR Program)</strong>
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
