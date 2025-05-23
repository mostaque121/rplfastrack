"use client";
import { ImageUploaderClient } from "@/components/ImageUploaderClient";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { createCourse, updateCourse } from "../../action/course";
import { IndexSelector } from "../section/select-index";

const CKEditorComponent = dynamic(() => import("@/components/ckeditor"), {
  ssr: false,
});

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  metaTitle: z.string().min(1, "Meta title is required"),
  metaDescription: z.string().min(1, "Meta Description title is required"),
  index: z.number().min(1, "index is required"),
  imageSquareLink: z.string().min(1, "Image link is required"),
  imageSquarePublicId: z.string().min(1, "Image public ID is required"),
  imageCoverLink: z.string().min(1, "Image link is required"),
  imageCoverPublicId: z.string().min(1, "Image public ID is required"),

  description: z.string().min(10, "Description is required"),
  jobOpportunity: z.string().min(10, "Job Opportunity is required"),
  entryRequirement: z.string().min(10, "Entry Requirement is required"),
  packagingRule: z.string().min(10, "Packaging Rule is required"),
  coreUnits: z.string().min(10, "Core Units is required"),
  electiveUnits: z.string().min(10, "Elective Units is required"),
});

type courseFormValues = z.infer<typeof formSchema>;

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
  courses: Course[];
}

interface SectionFormProps {
  closeForm: Dispatch<SetStateAction<boolean>>;
  course?: Course;
  section: Section;
}

export default function CourseForm({
  closeForm,
  section,
  course,
}: SectionFormProps) {
  const isEditMode = !!course;
  // Set default values from the blog if it exists
  const defaultValues: Partial<courseFormValues> = {
    title: course?.title || "",
    metaTitle: course?.metaTitle || "",
    metaDescription: course?.metaDescription || "",
    index: course?.index || section.courses.length + 1,
    imageSquareLink: course?.imageSquareLink || "",
    imageSquarePublicId: course?.imageSquarePublicId || "",
    imageCoverLink: course?.imageCoverLink || "",
    imageCoverPublicId: course?.imageCoverPublicId || "",
    description: course?.description || "",
    jobOpportunity: course?.jobOpportunity || "",
    entryRequirement: course?.entryRequirement || "",
    packagingRule: course?.packagingRule || "",
    electiveUnits: course?.electiveUnits || "",
    coreUnits: course?.coreUnits || "",
  };

  const form = useForm<courseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSquareImageUpload = (
    imageLink: string,
    imagePublicId: string
  ) => {
    form.setValue("imageSquareLink", imageLink);
    form.setValue("imageSquarePublicId", imagePublicId);
  };
  const handleCoverImageUpload = (imageLink: string, imagePublicId: string) => {
    form.setValue("imageCoverLink", imageLink);
    form.setValue("imageCoverPublicId", imagePublicId);
  };
  const handleSelectIndex = (index: number) => {
    form.setValue("index", index);
  };

  async function onSubmit(data: courseFormValues) {
    try {
      if (course) {
        await updateCourse(
          course.id,
          course.link,
          section.id,
          section.link,
          data
        );
        toast.success("Course Updated", {
          description: "Your Course has been Updated successfully.",
        });
        closeForm(false);
      } else {
        const result = await createCourse(data, section.id, section.link);
        if (result.success) {
          toast.success("Course created", {
            description: "Your Course has been created successfully.",
          });
        } else {
          toast.error("Error", {
            description: "Something went wrong. Please try again.",
          });
        }

        closeForm(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <div className="relative qualification w-full bg-white max-h-[calc(100vh-150px)] overflow-y-auto">
      <div className="pt-6 p-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 relative"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Course title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Meta Title(Should be unique and 50-60 character)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Meta title (generate from chatgpt)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Meta Description(Should be 120-160 character)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Meta Description (generate from chatgpt)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageSquareLink"
              render={() => (
                <FormItem className="text-center">
                  <FormLabel>Square Image</FormLabel>
                  <FormControl>
                    <ImageUploaderClient
                      uploadPreset="service-square"
                      initialImage={course?.imageSquareLink}
                      initialPublicId={course?.imageSquarePublicId}
                      onImageUploaded={handleSquareImageUpload}
                      aspectRatio={1 / 1}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageCoverLink"
              render={() => (
                <FormItem className="text-center">
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <ImageUploaderClient
                      uploadPreset="service-cover"
                      initialImage={course?.imageCoverLink}
                      initialPublicId={course?.imageCoverPublicId}
                      onImageUploaded={handleCoverImageUpload}
                      aspectRatio={1500 / 720}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={() => (
                <FormItem className="text-center">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <CKEditorComponent
                      value={course?.description}
                      onChange={(value: string) =>
                        form.setValue("description", value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="entryRequirement"
              render={() => (
                <FormItem className="text-center">
                  <FormLabel>Entry Requirement</FormLabel>
                  <FormControl>
                    <CKEditorComponent
                      value={course?.entryRequirement}
                      onChange={(value: string) =>
                        form.setValue("entryRequirement", value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="packagingRule"
              render={() => (
                <FormItem className="text-center">
                  <FormLabel>Packaging Rule</FormLabel>
                  <FormControl>
                    <CKEditorComponent
                      value={course?.packagingRule}
                      onChange={(value: string) =>
                        form.setValue("packagingRule", value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="coreUnits"
              render={() => (
                <FormItem className="text-center">
                  <FormLabel>Core Units</FormLabel>
                  <FormControl>
                    <CKEditorComponent
                      value={course?.coreUnits}
                      onChange={(value: string) =>
                        form.setValue("coreUnits", value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="electiveUnits"
              render={() => (
                <FormItem className="text-center">
                  <FormLabel>Elective Units</FormLabel>
                  <FormControl>
                    <CKEditorComponent
                      value={course?.electiveUnits}
                      onChange={(value: string) =>
                        form.setValue("electiveUnits", value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobOpportunity"
              render={() => (
                <FormItem className="text-center">
                  <FormLabel>Job Opportunity</FormLabel>
                  <FormControl>
                    <CKEditorComponent
                      value={course?.jobOpportunity}
                      onChange={(value: string) =>
                        form.setValue("jobOpportunity", value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="index"
              render={() => (
                <FormItem className="text-center">
                  <FormControl>
                    <IndexSelector
                      currentIndex={
                        course ? course.index : section.courses.length + 1
                      }
                      objects={section.courses}
                      isEditMode={isEditMode}
                      currentId={course?.id}
                      onIndexChange={handleSelectIndex}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                onClick={() => closeForm(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {course ? "Update" : "Add"} Course
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
