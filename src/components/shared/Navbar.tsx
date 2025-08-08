"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Mail, Phone } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Whole Navbar Fixed */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        {/* Topbar */}
        <div className="bg-gray-900 text-gray-100 text-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Mail size={14} /> <span>info@testdoctor.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={14} /> <span>+880 1234-567890</span>
              </div>
            </div>
            <span className="hidden sm:block">Welcome to Test Doctor!</span>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-3">
              {/* Logo */}
              <Link href="/" className="text-2xl font-bold text-blue-600">
                Test Doctor
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-6 font-medium">
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
                <Link href="/courses" className="hover:text-blue-600">
                  Course
                </Link>
                <Link href="/blog" className="hover:text-blue-600">
                  Blog
                </Link>
                <Link href="/about" className="hover:text-blue-600">
                  About
                </Link>
                <Link href="/contact" className="hover:text-blue-600">
                  Contact
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="flex flex-col space-y-2 pb-4 md:hidden font-medium">
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
                <Link href="/courses" className="hover:text-blue-600">
                  Course
                </Link>
                <Link href="/blog" className="hover:text-blue-600">
                  Blog
                </Link>
                <Link href="/about" className="hover:text-blue-600">
                  About
                </Link>
                <Link href="/contact" className="hover:text-blue-600">
                  Contact
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
      {/* Offset div so content doesn't go under navbar */}
      <div className="h-[112px]" /> {/* Topbar (32px) + Navbar (80px) */}
    </>
  );
}
