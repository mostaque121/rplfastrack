import Image from "next/image";
import Link from "next/link";
import { MdStar } from "react-icons/md";

interface Course {
  id: string;
  title: string;
  link: string;
}
type UserReview = {
  id: string;
  purchasedCourseId: string;
  purchasedCourse: Course;
  userName: string;
  userImage: string | null;
  reviewImage: string | null;
  reviewText: string;
  givenStar: number;
  approved: boolean;
  createdAt: Date;
  updatedAt: Date;
};
interface ReviewCardProps {
  review: UserReview;
}
// Helper function to format date
const formatDate = (dateString: Date) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export default function ReviewCard({ review }: ReviewCardProps) {
  const {
    userImage,
    userName,
    reviewText,
    reviewImage,
    givenStar,
    purchasedCourse,
    createdAt,
  } = review;
  return (
    <div className="bg-white shadow-sm rounded-lg p-3 sm:p-6 mb-4 text-sm sm:text-base">
      {/* User Info */}
      <div className="flex items-center mb-4">
        <div className="relative shrink-0 w-10 h-10 sm:w-12 sm:h-12 mr-3">
          {userImage ? (
            <Image
              src={userImage}
              alt={`${userName}'s profile`}
              fill
              className="rounded-full object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          ) : (
            <div className="bg-gray-300 rounded-full w-full h-full flex items-center justify-center">
              <span className="text-sm font-bold text-indigo-500">
                {userName.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
              {userName}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              {formatDate(createdAt)}
            </p>
          </div>
          {/* Stars */}
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <MdStar
                key={index}
                className={`h-4 w-4 ${
                  index < givenStar ? "text-emerald-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Course Link */}
      {purchasedCourse && (
        <Link prefetch={false} href={`/courses/${purchasedCourse.link}`}>
          <p className="text-emerald-600 text-xs sm:text-sm font-medium bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition duration-200 mb-3">
            {purchasedCourse.title}
          </p>
        </Link>
      )}

      {/* Review Text */}
      <p className="text-gray-800 ">&quot;{reviewText}&quot;</p>

      {/* Review Image */}
      {reviewImage && (
        <div className="mt-3 relative flex justify-center">
          <Image
            src={reviewImage}
            alt="Review image"
            width={150}
            height={150}
            className="rounded-lg object-contain"
          />
        </div>
      )}
    </div>
  );
}
