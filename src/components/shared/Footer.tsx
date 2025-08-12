"use client";

import Link from "next/link";
import { Mail, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 mt-20 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About Institute */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Institute of Healthcare Development (IHD)
          </h2>
          <p className="text-sm leading-relaxed">
            IHD is the first affiliated International Training Center (ITC) of
            the prestigious American Heart Association (AHA), in Bangladesh.
          </p>
        </div>

        {/* Courses */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Courses</h3>
          <ul className="space-y-2 text-sm">
            <li>ACLS (Advance Cardiovascular Life Support)</li>
            <li>Emergency Cardiac Care (ECC)</li>
            <li>BLS (Basic Life Support - CPR Program)</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/licence" className="hover:text-white">
                Company Licence
              </Link>
            </li>
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Get in Touch
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-2">
              <Clock size={18} /> <span>Available 24/7, Mon to Fri</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} />{" "}
              <a href="mailto:info@ihdbd.org" className="hover:text-white">
                info@ihdbd.org
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} />{" "}
              <a href="tel:+880197212" className="hover:text-white">
                +880 197212
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom copyright bar */}
      <div className="border-t border-gray-700 mt-10">
        <p className="text-center text-sm text-gray-400 py-4">
          © {new Date().getFullYear()} Institute of Healthcare Development
          (IHD). All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
