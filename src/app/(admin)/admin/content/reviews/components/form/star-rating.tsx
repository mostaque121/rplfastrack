import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type StarRatingProps = {
  error?: string;
  rating: number;
  setRating: (rating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({ error, rating, setRating }) => {
  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
  };

  return (
    <div className="flex flex-col items-center rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 p-6 shadow-lg">
      <label className="mb-4 block text-lg font-medium text-white">Rate the Course</label>
      <div className="mb-2 flex space-x-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className="cursor-pointer transition-transform hover:scale-110"
          >
            {rating > index ? (
              <AiFillStar size={36} className="text-yellow-300" />
            ) : (
              <AiOutlineStar size={36} className="text-gray-300" />
            )}
          </div>
        ))}
      </div>
      <p className="text-center text-sm text-white">
        {rating ? `You rated this course ${rating} out of 5` : "Please rate this course"}
      </p>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default StarRating;
