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
  createdAt: Date;
  updatedAt: Date;
}

type Course = {
  id: string;
  title: string;
  link: string;
  imageCoverLink: string;
  imageSquareLink: string;
  updatedAt: Date;
};

export type Section = {
  id: string;
  imageCoverLink: string;
  imageSquareLink: string;
  title: string;
  link: string;
  courses?: Course[];
  updatedAt: Date;
};
