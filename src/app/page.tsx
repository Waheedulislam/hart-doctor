import AboutUs from "@/components/modules/Home/About/About";
import BlogSection from "@/components/modules/Home/Blog/Blog";
import HeroSection from "@/components/modules/Home/HeroSection/HeroSection";
import OurCourses from "@/components/modules/Home/OurCourses/OurCourses";
import Testimonials from "@/components/modules/Home/Testimonial/Testimonial";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <OurCourses />
      <Testimonials />
      <BlogSection />
    </div>
  );
}
