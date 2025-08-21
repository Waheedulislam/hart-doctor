"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mail, Phone } from "lucide-react";
import Image from "next/image";
import logo from "../../../src/app/Icon.png";

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

  // Check active route
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
        <div className="bg-gray-800 text-gray-100 text-sm">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Mail size={14} /> <span>info@testdoctor.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={14} /> <span>+880 1951-163533</span>
              </div>
            </div>
            <span className="hidden sm:block font-medium">
              Welcome to Prime Aid Institute
            </span>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center py-2">
              {/* Logo */}
              <Link href="/" onClick={handleLinkClick}>
                <Image
                  src={logo}
                  alt="Prime Aid Institute Logo"
                  width={100}
                  height={100}
                  className="object-contain"
                  priority
                />
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-6 font-medium">
                {links.map(({ name, href }) => (
                  <Link
                    key={name}
                    href={href}
                    onClick={handleLinkClick}
                    className={`relative inline-block text-lg cursor-pointer
                      hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 hover:bg-clip-text hover:text-transparent transition
                      ${
                        isActive(href)
                          ? "bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent border-b-2 border-red-600"
                          : "text-gray-800"
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
                className="md:hidden p-2 text-red-700"
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
                    className={`relative inline-block px-1 py-1 text-lg cursor-pointer
                      hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 hover:bg-clip-text hover:text-transparent transition
                      ${
                        isActive(href)
                          ? "bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent"
                          : "text-gray-800"
                      }
                    `}
                  >
                    {name}
                    {isActive(href) && (
                      <span
                        className="absolute bottom-0 left-0 h-0.5 bg-red-600"
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
