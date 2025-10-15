"use client";

import { useRPL } from "@/components/rpl-context";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { saveReview } from "../../action/review";
import ProfileImageUpload from "./ProfileImageUpload";
import ReviewImageUpload from "./ReviewImageUpload";
import SelectCourse from "./SelectCourse";
import StarRating from "./StarRating";

// Define the form schema with Zod
const formSchema = z.object({
  userName: z.string().min(1, { message: "Name is required." }),
  userImage: z.string().min(1, { message: "Profile image is required." }),
  purchasedCourse: z
    .string()
    .min(1, { message: "Please select a valid course." }),
  reviewText: z.string().min(1, { message: "Review text is required." }),
  reviewImage: z.string().optional(),
  givenStar: z.number().min(1, { message: "Rating is required." }),
});

type FormValues = z.infer<typeof formSchema>;

const ReviewForm = () => {
  const { sections } = useRPL();
  const allCourses = sections.flatMap((section) => section.courses ?? []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with React Hook Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      userImage: "",
      purchasedCourse: "",
      reviewText: "",
      reviewImage: "",
      givenStar: 0,
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
    });
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      const data = await saveReview(values);
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Review posted! It will be visible after approval.");
      resetForm();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error posting review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white pb-10 py-8 sm:px-8 px-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Post a Review</h2>

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
                <FormLabel>User Profile</FormLabel>
                <FormControl>
                  <ProfileImageUpload
                    profileImageUrl={field.value}
                    setProfileImageUrl={field.onChange}
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
                <FormLabel>Add Image (optional)</FormLabel>
                <FormControl>
                  <ReviewImageUpload
                    reviewImageUrl={field.value}
                    setReviewImageUrl={field.onChange}
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-emerald-900 hover:bg-emerald-950 text-white"
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
};

export default ReviewForm;
