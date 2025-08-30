"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MdStar } from "react-icons/md";
import { toast } from "sonner";
import { deleteReview, toggleUserReviewPublish } from "../../action/review";
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isPublishedDialogOpen, setIsPublishedDialogOpen] = useState(false);
  const [newPublishedStatus, setNewPublishedStatus] = useState(review.approved);
  const [deleting, setDeleting] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const handleClose = () => {
    setIsEditOpen(false);
  };

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
          description:
            result.error || "There was an error deleting the review.",
        });
      }
    } catch {
      toast.error("Unexpected Error", {
        description: "Something went wrong while deleting the review.",
      });
    } finally {
      setDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handlePublishedConfirm = async () => {
    setPublishing(true);
    try {
      const result = await toggleUserReviewPublish(
        review.id,
        newPublishedStatus
      );
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
      setIsPublishedDialogOpen(false);
    }
  };

  return (
    <div className="border rounded-md overflow-hidden shadow-sm bg-white dark:bg-zinc-900">
      {/* Review image */}
      {review.reviewImage && (
        <Image
          src={review.reviewImage}
          alt={review.userName}
          width={1280}
          height={720}
          className="w-full object-cover max-h-60"
        />
      )}

      <div className="p-4 space-y-3">
        {/* User info */}
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={review.userImage || ""} alt={review.userName} />
            <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{review.userName}</p>
            <p className="text-xs text-muted-foreground">
              {review.purchasedCourse.title}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(review.reviewDate), "PPP")}
            </p>
          </div>
        </div>

        {/* Star rating */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <MdStar
              className={`w-4 h-4 ${
                i < review.givenStar
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 dark:text-gray-600"
              }`}
              key={i}
            />
          ))}
        </div>

        {/* Review text */}
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {review.reviewText}
        </p>

        {/* Approved switch and edit/delete buttons */}
        <div className="flex items-center justify-between pt-2 border-t gap-2">
          {/* Approved switch */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Approved</span>
            <AlertDialog
              open={isPublishedDialogOpen}
              onOpenChange={setIsPublishedDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <div className="relative">
                  {publishing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Switch
                      checked={review.approved}
                      onCheckedChange={(checked: boolean) => {
                        setNewPublishedStatus(checked);
                        setIsPublishedDialogOpen(true);
                      }}
                    />
                  )}
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Status Change</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to{" "}
                    {newPublishedStatus ? "publish" : "unpublish"} this review?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handlePublishedConfirm}>
                    Confirm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Edit button */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setIsEditOpen(true)}
          >
            <Edit2 className="w-4 h-4" /> Edit
          </Button>

          {/* Delete button */}
          <AlertDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                {deleting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-1" />
                )}
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  review.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Edit Review Dialog */}
        {isEditOpen && (
          <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
            <DialogContent className="min-w-[calc(100%-100px)]  bg-muted ">
              <DialogHeader>
                <DialogTitle>Add Review</DialogTitle>
                <DialogDescription className="hidden">Course</DialogDescription>
              </DialogHeader>
              <ReviewForm initialReview={review} closeForm={handleClose} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
