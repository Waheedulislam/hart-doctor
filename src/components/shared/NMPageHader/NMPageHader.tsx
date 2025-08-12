import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  backgroundImage: string;
  breadcrumb?: { label: string; href?: string }[];
}

const NMPageHeader: React.FC<PageHeaderProps> = ({
  title,
  backgroundImage,
  breadcrumb = [],
}) => {
  return (
    <div className="relative w-full h-96 flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        className="object-cover z-0" // z-index fixed
        priority
        unoptimized // prevents Vercel optimization fetch issues
      />

      {/* Green Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-80 z-10"></div>

      {/* Black Overlay for subtle darkening */}
      <div className="absolute inset-0 bg-black/10 z-10"></div>

      {/* Content */}
      <div className="text-center relative z-20 px-4">
        <h1 className="text-5xl font-semibold">{title}</h1>
        {breadcrumb.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-2 text-sm">
            {breadcrumb.map((item, idx) => (
              <React.Fragment key={idx}>
                {item.href ? (
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {idx < breadcrumb.length - 1 && (
                  <ChevronRight size={14} className="text-white" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NMPageHeader;
