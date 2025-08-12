import AHABadge from "@/components/modules/About/aha-badge/aha-badge";
import AboutCTA from "@/components/modules/About/cta/cta";
import AboutHero from "@/components/modules/About/hero/hero";
import AboutHighlights from "@/components/modules/About/highlights/highlights";
import AboutTimeline from "@/components/modules/About/timelline/timeline";
import NMPageHeader from "@/components/shared/NMPageHader/NMPageHader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us • Institute of Healthcare Development (IHD)",
  description:
    "IHD is the first AHA International Training Center (ITC) in Bangladesh, providing AHA courses for Physicians, Nurses, and Healthcare Providers since April 2011.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      {/* page header  */}
      <div>
        <NMPageHeader
          title="Contact Us"
          backgroundImage="https://images.stockcake.com/public/5/9/b/59b94f87-31fc-47ec-83ac-6e2321aabce8_large/medical-team-discussion-stockcake.jpg"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
        />
      </div>
      <AboutHero />
      <section>
        <AHABadge />
      </section>
      <section>
        <AboutHighlights />
      </section>

      <section>
        <AboutTimeline />
      </section>
      <section>
        <AboutCTA />
      </section>
    </main>
  );
}
