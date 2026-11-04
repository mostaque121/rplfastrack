"use client";

import { format } from "date-fns";
import { Edit2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MdStar } from "react-icons/md";
import { toast } from "sonner";

import { deleteReview, toggleUserReviewPublish } from "@/app/(admin)/action/review";
import { ConfirmSwitch } from "@/components/custom-ui/confirm-switch";
import { DeleteDialog } from "@/components/custom-ui/delete-dialog";
import { FormDialog } from "@/components/custom-ui/form-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import ReviewForm from "./form/review-form";

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

type Course = {
  id: string;
  title: string;
  link: string;
};

export function ReviewCard({ review }: { review: UserReview }) {
  const [deleting, setDeleting] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      const result = await deleteReview(review.id);
      if (result.success) {
        toast.success("Review Deleted", {
          description: "The review has been deleted successfully.",
        });
      } else {
        toast.error("Failed to Delete Review", {
          description: result.error || "There was an error deleting the review.",
        });
      }
    } catch {
      toast.error("Unexpected Error", {
        description: "Something went wrong while deleting the review.",
      });
    } finally {
      setDeleting(false);
    }
  };

  const handlePublishedConfirm = async (newPublishedStatus: boolean) => {
    setPublishing(true);
    try {
      const result = await toggleUserReviewPublish(review.id, newPublishedStatus);
      if (result.success) {
        toast.success("Review Updated", {
          description: "The review has been updated successfully.",
        });
      } else {
        toast.error("Failed to Update Review", {
          description: "There was an error updating the review.",
        });
      }
    } catch {
      toast.error("Unexpected Error", {
        description: "Something went wrong while updating the review.",
      });
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-md border bg-white shadow-sm dark:bg-zinc-900">
      {/* Review image */}
      {review.reviewImage && (
        <Image
          src={review.reviewImage}
          sizes="(min-width: 768px) 50vw, 100vw"
          alt={review.userName}
          width={1280}
          height={720}
          className="max-h-60 w-full object-cover"
        />
      )}

      <div className="flex h-full flex-col space-y-3 p-4">
        {/* User info */}
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={review.userImage || ""} alt={review.userName} />
            <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{review.userName}</p>
            <p className="text-xs text-muted-foreground">{review.purchasedCourse.title}</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(review.reviewDate), "PPP")}
            </p>
          </div>
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <MdStar
              className={`h-4 w-4 ${
                i < review.givenStar
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
              key={i}
            />
          ))}
        </div>

        {/* Review text */}
        <p className="text-sm text-gray-600 dark:text-gray-300">{review.reviewText}</p>

        {/* Approved switch and edit/delete buttons */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t pt-2">
          <ConfirmSwitch
            label="Approved"
            checked={review.approved}
            isLoading={publishing}
            onConfirm={handlePublishedConfirm}
            title="Confirm Status Change"
            buildDescription={(isTurningOn) => (
              <>
                Are you sure you want to <strong>{isTurningOn ? "approve" : "unapprove"}</strong>{" "}
                this review?
              </>
            )}
          />

          {/* Edit button */}
          <FormDialog Form={ReviewForm} item={review}>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Edit2 className="h-4 w-4" /> Edit
            </Button>
          </FormDialog>

          {/* Delete button */}
          <DeleteDialog
            isLoading={deleting}
            onConfirm={handleDeleteConfirm}
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete the
                  review."
          >
            <Button size="sm" variant="destructive">
              <Trash2 className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </DeleteDialog>
        </div>
      </div>
    </div>
  );
}
