"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mail, Phone } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Course", href: "/courses" },
    { name: "Blog", href: "/article" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false);
  };

  // Helper to check active route (exact match or startsWith)
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
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
            <span className="hidden sm:block">
              Welcome to First Aid Institute!
            </span>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-3">
              {/* Logo */}
              <Link
                href="/"
                className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
                onClick={handleLinkClick}
              >
                First Aid Institute
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-6 font-medium">
                {links.map(({ name, href }) => (
                  <Link
                    key={name}
                    href={href}
                    onClick={handleLinkClick}
                    className={`relative inline-block text-xl cursor-pointer
                      hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition
                      ${
                        isActive(href)
                          ? "bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent border-b-2 border-emerald-600"
                          : ""
                      }
                    `}
                  >
                    {name}
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
              <div className="flex flex-col space-y-2 pb-4 md:hidden font-medium">
                {links.map(({ name, href }) => (
                  <Link
                    key={name}
                    href={href}
                    onClick={handleLinkClick}
                    className={`relative inline-block px-1 py-1 text-xl cursor-pointer
                      hover:bg-gradient-to-r hover:from-emerald-600 hover:to-teal-500 hover:bg-clip-text hover:text-transparent transition
                      ${
                        isActive(href)
                          ? "bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent"
                          : ""
                      }
                    `}
                  >
                    {name}
                    {isActive(href) && (
                      <span
                        className="absolute bottom-0 left-0 h-0.5 bg-emerald-600"
                        style={{ width: "60px" }}
                      />
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>
      </header>
      <div className="h-[112px]" />
    </>
  );
}
