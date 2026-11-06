"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
import { useRPL } from "@/contexts/rpl-context";
import { saveReview } from "@/features/reviews/actions";
import { reviewFormSchema } from "@/lib/zod";

import ProfileImageUpload from "./profile-image-upload";
import ReviewImageUpload from "./review-image-upload";
import StarRating from "./star-rating";

type FormValues = z.infer<typeof reviewFormSchema>;

const ReviewForm = () => {
  const { sections } = useRPL();
  const allCourses = sections.flatMap((section) => section.courses ?? []);

  const form = useForm<FormValues>({
    resolver: zodResolver(reviewFormSchema),
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
    try {
      const data = await saveReview(values);

      if (data.success) toast.success("Review posted! It will be visible after approval.");
      resetForm();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Error posting review. Please try again.");
    }
  };

  return (
    <section className="bg-surface py-12 md:py-20">
      <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white px-4 py-8 shadow-lg sm:px-8 md:py-10">
        <h2 className="text-2xl font-bold text-ink md:text-3xl">Share your experience</h2>
        <p className="mt-2 mb-8 text-gray-600">
          Reviews are checked by our team before they appear on the site.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Star Rating */}
            <FormField
              control={form.control}
              name="givenStar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your rating</FormLabel>
                  <FormControl>
                    <StarRating rating={field.value} setRating={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name Field */}
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Sarah M." {...field} />
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
                  <FormLabel>Profile photo (optional)</FormLabel>
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
                  <FormLabel>Qualification you completed</FormLabel>
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
                  <FormLabel>Your review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="How did the RPL process go for you?"
                      className="min-h-[120px]"
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
                  <FormLabel>Add a photo (optional)</FormLabel>
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

            {/* Submit Button */}
            <LoadingButton
              loading={form.formState.isSubmitting}
              type="submit"
              className="h-12 w-full bg-cta text-base text-white hover:bg-cta-strong"
              loadingText="Submitting"
            >
              Submit review
            </LoadingButton>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default ReviewForm;
