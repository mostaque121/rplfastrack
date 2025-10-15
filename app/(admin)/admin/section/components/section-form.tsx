"use client";
import { createSection, updateSection } from "@/app/(admin)/action/section";
import { SectionFormData, sectionSchema } from "@/app/(admin)/lib/zod";
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
import { ImageUploaderClient } from "@/components/uploader/ImageUploaderClient";
import { useRPL } from "@/contexts/rpl-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
  onCloseForm: () => void;
  item?: Section;
}

export default function SectionForm({ onCloseForm, item }: SectionFormProps) {
  const isEditMode = !!item;
  const { sections: allSections } = useRPL();

  const defaultValues: Partial<SectionFormData> = {
    title: item?.title || "",
    metaDescription: item?.metaDescription || "",
    index: item?.index || allSections.length + 1,
    imageSquareLink: item?.imageSquareLink || "",
    imageSquarePublicId: item?.imageSquarePublicId || "",
    imageCoverLink: item?.imageCoverLink || "",
    imageCoverPublicId: item?.imageCoverPublicId || "",
  };

  const form = useForm<SectionFormData>({
    resolver: zodResolver(sectionSchema),
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

  async function onSubmit(data: SectionFormData) {
    try {
      let result;
      if (item?.id) {
        result = await updateSection(item.id, item.link, data);
      } else {
        result = await createSection(data);
      }
      if (result.success) {
        toast.success(
          `Section ${isEditMode ? "updated" : "created"} successfully!`
        );
        onCloseForm();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error", {
        description: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold text-center pb-4">
        {item ? "Edit Section" : "Add Section"}
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

          {/* Meta Description */}
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

          {/* Image Square */}
          <FormField
            control={form.control}
            name="imageSquareLink"
            render={() => (
              <FormItem className="text-center">
                <FormLabel>Square Image</FormLabel>
                <FormControl>
                  <ImageUploaderClient
                    uploadPreset="service-square"
                    initialImage={item?.imageSquareLink}
                    initialPublicId={item?.imageSquarePublicId}
                    onImageUploaded={handleSquareImageUpload}
                    aspectRatio={1 / 1}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Cover */}
          <FormField
            control={form.control}
            name="imageCoverLink"
            render={() => (
              <FormItem className="text-center">
                <FormLabel>Cover Image</FormLabel>
                <FormControl>
                  <ImageUploaderClient
                    uploadPreset="service-cover"
                    initialImage={item?.imageCoverLink}
                    initialPublicId={item?.imageCoverPublicId}
                    onImageUploaded={handleCoverImageUpload}
                    aspectRatio={1500 / 720}
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
                    objects={allSections}
                    isEditMode={isEditMode}
                    currentId={item?.id}
                    onIndexChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Action */}
          <div className="flex justify-end gap-4">
            <Button type="button" onClick={onCloseForm} variant="outline">
              Cancel
            </Button>

            <LoadingButton loading={form.formState.isSubmitting} type="submit">
              {item ? "Update" : "Create"} Section
            </LoadingButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
