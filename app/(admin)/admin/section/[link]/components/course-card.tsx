"use client";
import { deleteCourse } from "@/app/(admin)/action/course";
import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import { FormDialog } from "@/components/custom-ui/form-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import CourseForm from "./course-form";

interface Course {
  id: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  index: number;
  imageSquareLink: string;
  imageSquarePublicId: string;
  imageCoverLink: string;
  imageCoverPublicId: string;
  description: string;
  jobOpportunity: string;
  entryRequirement: string;
  packagingRule: string;
  coreUnits: string;
  electiveUnits: string;
  link: string;
  sectionId: string;
  createdAt: Date;
  updatedAt: Date;
}
interface Section {
  id: string;
  link: string;
  title: string;
  courses: Course[];
}

interface CourseContentProps {
  course: Course;
  section: Section;
}

export function AdminCourseCard({ course, section }: CourseContentProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setDeleting(true);

    const result = await deleteCourse(
      course.id,
      course.link,
      course.sectionId,
      section.link
    );

    if (result.success) {
      toast.success("Course Deleted", {
        description: "Your Course has been deleted successfully.",
      });
    } else {
      toast.error("Failed to Delete course", {
        description: "There was an error deleting the course.",
      });
    }
    setDeleting(false);
  };

  const item = {
    section: section,
    course: course,
  };

  return (
    <>
      <Card className="gap-3  py-0 pb-4 overflow-hidden">
        <div className="relative w-full">
          <Image
            src={course.imageCoverLink}
            alt={course.imageCoverPublicId}
            width={720}
            height={720}
            priority
            className="object-cover w-full aspect-[150/72]"
          />
        </div>
        <CardHeader className="px-3">
          <CardTitle className="flex items-center">
            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 text-sm">
              {course.index}
            </span>
            {course.title}
          </CardTitle>
        </CardHeader>

        <CardFooter className="flex-col px-3 pt-0 items-start border-t">
          <div className="flex justify-between w-full gap-2">
            <FormDialog Form={CourseForm} item={item}>
              <Button variant="outline" size="sm">
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </FormDialog>

            <DeleteDialog
              isLoading={deleting}
              onConfirm={handleDeleteConfirm}
              title="Are you absolutely sure?"
              description="This action cannot be undone. This will permanently delete the
                            course."
            >
              <Button size="sm" variant="destructive">
                <Trash2 className="mr-1 h-4 w-4" />
                Delete
              </Button>
            </DeleteDialog>
          </div>
          <div className="text-xs mt-3 text-muted-foreground">
            Updated{" "}
            {formatDistanceToNow(new Date(course.updatedAt), {
              addSuffix: true,
            })}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
