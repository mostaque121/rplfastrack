"use client";
import { formatDistanceToNow } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { deleteSection } from "@/app/(admin)/action/section";
import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import { FormDialog } from "@/components/custom-ui/form-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import SectionForm from "./section-form";

interface Section {
  id: string;
  title: string;
  metaDescription: string;
  index: number;
  imageSquareLink: string;
  imageSquarePublicId: string;
  imageCoverLink: string;
  imageCoverPublicId: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
  courses: Course[];
}
interface Course {
  id: string;
  title: string;
}
interface SectionContentProps {
  section: Section;
}

export default function AdminSectionCard({ section }: SectionContentProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setDeleting(true);

    const result = await deleteSection(section.id, section.link);

    if (result.success) {
      toast.success("Section Deleted", {
        description: "Your Section post has been deleted successfully.",
      });
    } else {
      toast.error("Failed to Delete section", {
        description: "There was an error deleting the section.",
      });
    }
    setDeleting(false);
  };

  return (
    <>
      <Card className="gap-3 overflow-hidden py-0 pb-4">
        <div className="relative w-full">
          <Image
            src={section.imageCoverLink}
            sizes="(min-width: 768px) 33vw, 100vw"
            alt={section.imageCoverPublicId}
            width={720}
            height={720}
            priority
            className="aspect-[150/72] w-full object-cover"
          />
        </div>
        <CardHeader className="px-3">
          <CardTitle className="flex items-center">
            <span className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-sm text-white">
              {section.index}
            </span>
            {section.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3">
          <Link href={`/admin/section/${section.link}`}>
            <div className="rounded-md bg-gray-200 px-2 py-1 text-blue-600 transition-all duration-200 ease-in-out hover:scale-95 active:scale-90">
              <h1>Total Courses: {section.courses.length}</h1>
            </div>
          </Link>
        </CardContent>
        <CardFooter className="flex-col items-start border-t px-3 pt-0">
          <div className="flex w-full justify-between gap-2">
            <FormDialog Form={SectionForm} item={section}>
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
                  section."
            >
              <Button size="sm" variant="destructive">
                <Trash2 className="mr-1 h-4 w-4" />
                Delete
              </Button>
            </DeleteDialog>
          </div>
          <div className="mt-3 text-xs text-muted-foreground">
            Updated{" "}
            {formatDistanceToNow(new Date(section.updatedAt), {
              addSuffix: true,
            })}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
