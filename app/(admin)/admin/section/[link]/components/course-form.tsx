"use client";
import { createCourse, updateCourse } from "@/app/(admin)/action/course";
import { CourseFormData, CourseSchema } from "@/app/(admin)/lib/zod";
import { IndexSelector } from "@/components/custom-ui/index-selector";
import { LoadingButton } from "@/components/custom-ui/loading-button";
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
import { ImageUploaderServer } from "@/components/uploader/image-uploader-server";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const RichTextEditor = dynamic(
  () => import("@/components/custom-ui/rich-text-editor"),
  {
    ssr: false,
  }
);

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
interface Item {
  course?: Course;
  section: Section;
}

interface SectionFormProps {
  onCloseForm: () => void;
  item?: Item;
}

export default function CourseForm({ onCloseForm, item }: SectionFormProps) {
  const isEditMode = !!item?.course;
  const defaultValues: Partial<CourseFormData> = {
    title: item?.course?.title || "",
    metaTitle: item?.course?.metaTitle || "",
    metaDescription: item?.course?.metaDescription || "",
    index: item?.course?.index ?? (item?.section?.courses?.length ?? 0) + 1,
    imageSquareLink: item?.course?.imageSquareLink || "",
    imageSquarePublicId: item?.course?.imageSquarePublicId || "",
    imageCoverLink: item?.course?.imageCoverLink || "",
    imageCoverPublicId: item?.course?.imageCoverPublicId || "",
    description: item?.course?.description || "",
    jobOpportunity: item?.course?.jobOpportunity || "",
    entryRequirement: item?.course?.entryRequirement || "",
    packagingRule: item?.course?.packagingRule || "",
    electiveUnits: item?.course?.electiveUnits || "",
    coreUnits: item?.course?.coreUnits || "",
  };

  const form = useForm<CourseFormData>({
    resolver: zodResolver(CourseSchema),
    defaultValues,
  });

  if (!item) {
    return null;
  }

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

  async function onSubmit(data: CourseFormData) {
    try {
      let result;
      if (item?.course) {
        result = await updateCourse(
          item.course.id,
          item.course.link,
          item.section.id,
          item.section.link,
          data
        );
      } else {
        if (item) {
          result = await createCourse(data, item.section.id, item.section.link);
        }
      }
      if (result?.success) {
        toast.success(
          `Course ${isEditMode ? "updated" : "created"} successfully!`
        );
        onCloseForm();
      } else {
        toast.error("Error", {
          description: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <div className=" qualification">
      <h3 className="text-2xl font-semibold text-center pb-4">
        {item.course ? "Edit Course" : "Add Course"}
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 relative"
        >
          {/* Title */}
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

          {/* Meta Title */}
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

          {/* Meta Description */}
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

          {/* Square Image */}
          <FormField
            control={form.control}
            name="imageSquareLink"
            render={() => (
              <FormItem className="text-center">
                <FormLabel>Square Image</FormLabel>
                <FormControl>
                  <ImageUploaderServer
                    uploadPreset="service-square"
                    initialImage={item.course?.imageSquareLink}
                    initialPublicId={item.course?.imageSquarePublicId}
                    onImageUploaded={handleSquareImageUpload}
                    aspectRatio={1 / 1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Cover Image */}
          <FormField
            control={form.control}
            name="imageCoverLink"
            render={() => (
              <FormItem className="text-center">
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <ImageUploaderServer
                    uploadPreset="service-cover"
                    initialImage={item.course?.imageCoverLink}
                    initialPublicId={item.course?.imageCoverPublicId}
                    onImageUploaded={handleCoverImageUpload}
                    aspectRatio={1500 / 720}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="text-center">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <RichTextEditor
                    onContentChange={field.onChange}
                    content={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Entry Requirement */}
          <FormField
            control={form.control}
            name="entryRequirement"
            render={({ field }) => (
              <FormItem className="text-center">
                <FormLabel>Entry Requirement</FormLabel>
                <FormControl>
                  <RichTextEditor
                    onContentChange={field.onChange}
                    content={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* packaging Rule */}
          <FormField
            control={form.control}
            name="packagingRule"
            render={({ field }) => (
              <FormItem className="text-center">
                <FormLabel>Packaging Rule</FormLabel>
                <FormControl>
                  <RichTextEditor
                    onContentChange={field.onChange}
                    content={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* coreUnits */}
          <FormField
            control={form.control}
            name="coreUnits"
            render={({ field }) => (
              <FormItem className="text-center">
                <FormLabel>Core Units</FormLabel>
                <FormControl>
                  <RichTextEditor
                    onContentChange={field.onChange}
                    content={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Elective Units */}
          <FormField
            control={form.control}
            name="electiveUnits"
            render={({ field }) => (
              <FormItem className="text-center">
                <FormLabel>Elective Units</FormLabel>
                <FormControl>
                  <RichTextEditor
                    onContentChange={field.onChange}
                    content={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* job Opportunity */}
          <FormField
            control={form.control}
            name="jobOpportunity"
            render={({ field }) => (
              <FormItem className="text-center">
                <FormLabel>Job Opportunity</FormLabel>
                <FormControl>
                  <RichTextEditor
                    onContentChange={field.onChange}
                    content={field.value as string}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Index */}
          <FormField
            control={form.control}
            name="index"
            render={({ field }) => (
              <FormItem className="text-center">
                <FormControl>
                  <IndexSelector
                    currentIndex={field.value}
                    objects={item.section.courses}
                    isEditMode={isEditMode}
                    currentId={item.course?.id}
                    onIndexChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button type="button" onClick={onCloseForm} variant="outline">
              Cancel
            </Button>

            <LoadingButton loading={form.formState.isSubmitting} type="submit">
              {isEditMode ? "Update" : "Add"} Course
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
