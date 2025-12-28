"use client";

import { saveReview, updateReview } from "@/app/(admin)/action/review";
import { reviewFormSchema } from "@/app/(admin)/lib/zod";
import { LoadingButton } from "@/components/custom-ui/loading-button";
import SelectCourse from "@/components/custom-ui/select-course";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploaderServer } from "@/components/uploader/image-uploader-server";
import { useRPL } from "@/contexts/rpl-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { DatePicker } from "../../../../../../components/custom-ui/date-picker";
import StarRating from "./star-rating";

type FormValues = z.infer<typeof reviewFormSchema>;

type Course = {
  id: string;
  title: string;
};

export interface UserReview {
  id: string;
  purchasedCourseId: string;
  purchasedCourse: Course;
  userName: string;
  userImage?: string | null;
  reviewImage?: string | null;
  reviewText: string;
  givenStar: number;
  approved: boolean;
  reviewDate: Date;
}

interface SectionFormProps {
  onCloseForm: () => void;
  onSuccess?: () => void;
  item?: UserReview;
}

export default function ReviewForm({
  item,
  onCloseForm,
  onSuccess,
}: SectionFormProps) {
  const { sections } = useRPL();
  const allCourses = sections.flatMap((section) => section.courses ?? []);

  const form = useForm<FormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      userName: item?.userName || "",
      userImage: item?.userImage || "",
      purchasedCourse: item?.purchasedCourseId || "",
      reviewText: item?.reviewText || "",
      reviewImage: item?.reviewImage || "",
      givenStar: item?.givenStar || 0,
      reviewDate: item?.reviewDate || new Date(),
    },
  });

  const resetForm = () => {
    form.reset({
      userName: "",
      userImage: "",
      purchasedCourse: "",
      reviewText: "",
      reviewImage: "",
      givenStar: 0,
      reviewDate: new Date(),
    });
  };

  const onSubmit = async (values: FormValues) => {
    try {
      let response;

      if (item) {
        response = await updateReview(item.id, values);
      } else {
        response = await saveReview(values);
      }

      if (response.success) {
        toast.success(
          item ? "Review updated successfully." : "Review saved successfully."
        );
        resetForm();
        if (onSuccess) {
          onSuccess();
        }
        onCloseForm();
      } else {
        toast.error(
          item
            ? "Error editing review. Please try again."
            : "Error saving review. Please try again."
        );
      }
    } catch (error: unknown) {
      console.error("Error submitting review:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full">
      <div>
        <h3 className="text-2xl font-semibold text-center pb-4">
          {item ? "Edit Review" : "Add Review"}
        </h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Profile Image Upload */}
          <FormField
            control={form.control}
            name="userImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Avatar (Optional)</FormLabel>
                <FormControl>
                  <ImageUploaderServer
                    aspectRatio={1}
                    uploadPreset="avatar"
                    initialImage={field.value}
                    onImageUploaded={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Course Selection */}
          <FormField
            control={form.control}
            name="purchasedCourse"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Course Purchased</FormLabel>
                <FormControl>
                  <SelectCourse
                    courses={allCourses}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Review Text */}
          <FormField
            control={form.control}
            name="reviewText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your experience with this course..."
                    className="min-h-[120px] "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Review Image Upload (Optional) */}
          <FormField
            control={form.control}
            name="reviewImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Image (Optional)</FormLabel>
                <FormControl>
                  <ImageUploaderServer
                    uploadPreset="review-image"
                    initialImage={field.value}
                    onImageUploaded={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Star Rating */}
          <FormField
            control={form.control}
            name="givenStar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <StarRating rating={field.value} setRating={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Review Date */}
          <FormField
            control={form.control}
            name="reviewDate"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Review Date
                </FormLabel>
                <DatePicker
                  className="w-full"
                  selected={field.value}
                  onSelect={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <LoadingButton
            loading={form.formState.isSubmitting}
            className="bg-emerald-900 w-full hover:bg-emerald-950 text-white"
          >
            {item ? "Update" : "Add"} Review
          </LoadingButton>
        </form>
      </Form>
    </div>
  );
}
