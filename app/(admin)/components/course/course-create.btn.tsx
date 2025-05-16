"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
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
  createdAt: Date;
  updatedAt: Date;
}
interface Section {
  id: string;
  link: string;
  title: string;
  courses: Course[];
}

interface CourseCreateBtnProps {
  section: Section;
}

export default function CourseCreateBtn({ section }: CourseCreateBtnProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setIsDialogOpen(true)}
        className="flex items-center gap-2"
      >
        <Plus size={18} />
        Add Course
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="min-w-[calc(100%-100px)] bg-muted ">
          <DialogHeader>
            <DialogTitle>Add Course Under {section.title}</DialogTitle>
            <DialogDescription className="hidden">Course</DialogDescription>
          </DialogHeader>
          <CourseForm section={section} closeForm={setIsDialogOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
