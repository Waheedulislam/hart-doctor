import CallToAction from "@/components/modules/Contact/CallToAction/CallToAction";
import NMPageHeader from "@/components/shared/NMPageHader/NMPageHader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { courses } from "@/data/CoursesData";
import Image from "next/image";

const CoursePage = () => {
  return (
    <div>
      {/* page header  */}
      <div>
        <NMPageHeader
          title="Our Courses"
          backgroundImage="https://images.stockcake.com/public/5/9/b/59b94f87-31fc-47ec-83ac-6e2321aabce8_large/medical-team-discussion-stockcake.jpg"
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Our Courses" }]}
        />
      </div>
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <Card
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg border hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-emerald-500 "
            >
              <div className="relative w-full h-56 -mt-10">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <h3 className="font-bold text-lg">{course.title}</h3>
              </CardHeader>
              <CardContent>
                <p className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-semibold">
                  Duration: {course.duration}
                </p>
                <p className="text-gray-700 mt-2">৳ {course.price}</p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-6 py-3 rounded-md font-semibold transition self-start
             hover:from-emerald-700 hover:to-teal-600"
                >
                  DETAILS
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-20">
          <CallToAction />
        </div>
      </section>
    </div>
  );
};

export default CoursePage;
