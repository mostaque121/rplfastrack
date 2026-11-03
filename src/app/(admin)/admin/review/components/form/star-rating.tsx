import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type StarRatingProps = {
  error?: string;
  rating: number;
  setRating: (rating: number) => void;
};

const StarRating: React.FC<StarRatingProps> = ({
  error,
  rating,
  setRating,
}) => {
  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg shadow-lg">
      <label className="block font-medium text-lg text-white mb-4">
        Rate the Course
      </label>
      <div className="flex space-x-2 mb-2">
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
      <p className="text-white text-sm text-center">
        {rating
          ? `You rated this course ${rating} out of 5`
          : "Please rate this course"}
      </p>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default StarRating;
