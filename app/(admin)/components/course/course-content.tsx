"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { deleteCourse } from "../../action/course";
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

export function CourseContent({ course, section }: CourseContentProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
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
    setIsDeleteDialogOpen(false);
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
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
            <Button onClick={handleEdit} variant="outline" size="sm">
              <Pencil className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  {deleting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 mr-1" />
                  )}
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this course.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="text-xs mt-3 text-muted-foreground">
            Updated{" "}
            {formatDistanceToNow(new Date(course.updatedAt), {
              addSuffix: true,
            })}
          </div>
        </CardFooter>
      </Card>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="min-w-[calc(100%-100px)]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription className="hidden">
              descriptioin
            </DialogDescription>
          </DialogHeader>
          <div className="relative">
            <CourseForm
              section={section}
              course={course}
              closeForm={setIsEditDialogOpen}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
