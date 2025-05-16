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
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { createSection, updateSection } from "../../action/section";
import { IndexSelector } from "./select-index";

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  metaDescription: z.string().min(1, "Meta Description is required"),
  index: z.number().min(1, "index is required"),
  imageSquareLink: z.string().min(1, "Image link is required"),
  imageSquarePublicId: z.string().min(1, "Image public ID is required"),
  imageCoverLink: z.string().min(1, "Image link is required"),
  imageCoverPublicId: z.string().min(1, "Image public ID is required"),
});

type SectionFormValues = z.infer<typeof formSchema>;

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
}

interface SectionFormProps {
  closeForm: Dispatch<SetStateAction<boolean>>;
  section?: Section;
  allSections: Section[];
}

export default function SectionForm({
  closeForm,
  section,
  allSections,
}: SectionFormProps) {
  const isEditMode = !!section;
  // Set default values from the blog if it exists
  const defaultValues: Partial<SectionFormValues> = {
    title: section?.title || "",
    metaDescription: section?.metaDescription || "",
    index: section?.index || allSections.length + 1,
    imageSquareLink: section?.imageSquareLink || "",
    imageSquarePublicId: section?.imageSquarePublicId || "",
    imageCoverLink: section?.imageCoverLink || "",
    imageCoverPublicId: section?.imageCoverPublicId || "",
  };

  const form = useForm<SectionFormValues>({
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

  async function onSubmit(data: SectionFormValues) {
    try {
      if (section) {
        await updateSection(section.id, section.link, data);
        toast.success("Section Updated", {
          description: "Your Section has been Updated successfully.",
        });
        closeForm(false);
      } else {
        await createSection(data);
        toast.success("Section created", {
          description: "Your Section has been created successfully.",
        });
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
    <div className="relative w-full max-h-[calc(100vh-150px)] overflow-y-auto">
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
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Meta Description (Should be 120-160 character)
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Meta Description" {...field} />
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
                      initialImage={section?.imageSquareLink}
                      initialPublicId={section?.imageSquarePublicId}
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
                      initialImage={section?.imageCoverLink}
                      initialPublicId={section?.imageCoverPublicId}
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
              name="index"
              render={() => (
                <FormItem className="text-center">
                  <FormControl>
                    <IndexSelector
                      currentIndex={
                        section ? section.index : allSections.length + 1
                      }
                      objects={allSections}
                      isEditMode={isEditMode}
                      currentId={section?.id}
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
                {section ? "Update" : "Create"} Section
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
