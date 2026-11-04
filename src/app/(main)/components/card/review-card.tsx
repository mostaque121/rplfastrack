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
  reviewDate: Date;
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
  const { userImage, userName, reviewText, reviewImage, givenStar, purchasedCourse, reviewDate } =
    review;
  return (
    <div className="mb-4 rounded-lg bg-white p-3 text-sm shadow-sm sm:p-6 sm:text-base">
      {/* User Info */}
      <div className="mb-4 flex items-center">
        <div className="relative mr-3 h-10 w-10 shrink-0 sm:h-12 sm:w-12">
          {userImage ? (
            <Image
              src={userImage}
              alt={`${userName}'s profile`}
              fill
              className="rounded-full object-cover"
              sizes="(max-width: 768px) 100vw, 300px"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-300">
              <span className="text-sm font-bold text-indigo-500">{userName.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold text-ink sm:text-lg">{userName}</h3>
            <p className="text-xs text-gray-500 sm:text-sm">{formatDate(reviewDate)}</p>
          </div>
          {/* Stars */}
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <MdStar
                key={index}
                className={`h-4 w-4 ${index < givenStar ? "text-brand" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Course Link */}
      {purchasedCourse && (
        <Link prefetch={false} href={`/courses/${purchasedCourse.link}`}>
          <p className="mb-3 rounded bg-gray-100 px-2 py-1 text-xs font-medium text-brand transition duration-200 hover:bg-gray-200 sm:text-sm">
            {purchasedCourse.title}
          </p>
        </Link>
      )}

      {/* Review Text */}
      <p className="text-ink">&quot;{reviewText}&quot;</p>

      {/* Review Image */}
      {reviewImage && (
        <div className="relative mt-3 flex justify-center">
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
