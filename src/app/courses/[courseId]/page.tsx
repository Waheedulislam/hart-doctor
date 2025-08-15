import CourseDetails from "@/components/modules/Courses/CourseDetails/CourseDetails";
import { getSingleCourses } from "@/services/Courses";

const courseDetailsPage = async ({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) => {
  const { courseId } = await params;
  const { data: course } = await getSingleCourses(courseId);

  return (
    <div>
      <CourseDetails course={course} />
    </div>
  );
};

export default courseDetailsPage;
