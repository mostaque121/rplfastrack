import React, { ChangeEvent } from "react";

type ReviewTextareaProps = {
  reviewText: string;
  setReviewText: (text: string) => void;
  error?: string;
};

const ReviewTextarea: React.FC<ReviewTextareaProps> = ({
  reviewText,
  setReviewText,
  error,
}) => {
  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(e.target.value);
  };

  return (
    <div className="relative">
      <label className="block font-medium">Your Review</label>
      <textarea
        name="review"
        value={reviewText}
        onChange={handleTextChange}
        className="w-full h-32 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Write your review here..."
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default ReviewTextarea;
