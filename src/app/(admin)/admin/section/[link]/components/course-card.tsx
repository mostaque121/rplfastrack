"use client";
import { formatDistanceToNow } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { deleteCourse } from "@/app/(admin)/action/course";
import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import { FormDialog } from "@/components/custom-ui/form-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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

    const result = await deleteCourse(course.id, course.link, course.sectionId, section.link);

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
      <Card className="gap-3 overflow-hidden py-0 pb-4">
        <div className="relative w-full">
          <Image
            src={course.imageCoverLink}
            sizes="(min-width: 768px) 33vw, 100vw"
            alt={course.imageCoverPublicId}
            width={720}
            height={720}
            priority
            className="aspect-[150/72] w-full object-cover"
          />
        </div>
        <CardHeader className="px-3">
          <CardTitle className="flex items-center">
            <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
              {course.index}
            </span>
            {course.title}
          </CardTitle>
        </CardHeader>

        <CardFooter className="flex-col items-start border-t px-3 pt-0">
          <div className="flex w-full justify-between gap-2">
            <FormDialog Form={CourseForm} item={item}>
              <Button variant="outline" size="sm">
                <Pencil className="mr-1 h-4 w-4" />
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
          <div className="mt-3 text-xs text-muted-foreground">
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
