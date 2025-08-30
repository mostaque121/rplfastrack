"use client";

import { saveReview, updateReview } from "@/app/(admin)/action/review";
import { ImageUploaderClient } from "@/components/ImageUploaderClient";
import { useRPL } from "@/components/rpl-context";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import SelectCourse from "./select-course";
import StarRating from "./star-rating";

// Define the form schema with Zod
const formSchema = z.object({
  userName: z.string().min(1, { message: "Name is required." }),
  userImage: z.string().optional(),
  purchasedCourse: z
    .string()
    .min(1, { message: "Please select a valid course." }),
  reviewText: z.string().min(1, { message: "Review text is required." }),
  reviewImage: z.string().optional(),
  givenStar: z.number().min(1, { message: "Rating is required." }),
  reviewDate: z.date({
    required_error: "Review date is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

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
  closeForm?: () => void;
  initialReview?: UserReview;
}

export default function ReviewForm({
  initialReview,
  closeForm,
}: SectionFormProps) {
  const { sections } = useRPL();
  const allCourses = sections.flatMap((section) => section.courses ?? []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: initialReview?.userName || "",
      userImage: initialReview?.userImage || "",
      purchasedCourse: initialReview?.purchasedCourseId || "",
      reviewText: initialReview?.reviewText || "",
      reviewImage: initialReview?.reviewImage || "",
      givenStar: initialReview?.givenStar || 0,
      reviewDate: initialReview?.reviewDate || new Date(),
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
    setIsSubmitting(true);

    try {
      let response;

      if (initialReview) {
        response = await updateReview(initialReview.id, values);
      } else {
        response = await saveReview(values);
      }

      if (response.success) {
        toast.success(
          initialReview
            ? "Review updated successfully."
            : "Review saved successfully."
        );
        resetForm();
      } else {
        toast.error(
          initialReview
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
    } finally {
      setIsSubmitting(false);
      if (closeForm) {
        closeForm();
      }
    }
  };

  return (
    <div className="w-full bg-white max-h-[calc(100vh-150px)] p-4 overflow-y-auto">
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
                  <ImageUploaderClient
                    aspectRatio={1}
                    uploadPreset="avatar"
                    initialImage={initialReview?.userImage}
                    onImageUploaded={(url) => field.onChange(url)}
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
                    suggestions={allCourses}
                    onSelectCourse={(id) => field.onChange(id)}
                    initialCourseId={initialReview?.purchasedCourseId}
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
                  <ImageUploaderClient
                    uploadPreset="review-image"
                    initialImage={initialReview?.reviewImage}
                    onImageUploaded={(url) => field.onChange(url)}
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
                  <StarRating
                    rating={field.value}
                    setRating={(value) => field.onChange(value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reviewDate"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Review Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => field.onChange(date)}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
