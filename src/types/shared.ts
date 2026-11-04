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
  index: number;
  imageCoverLink: string;
  imageSquareLink: string;
  updatedAt: Date;
};

export type Section = {
  id: string;
  imageCoverLink: string;
  imageSquareLink: string;
  index: number;
  title: string;
  link: string;
  icon?: string | null;
  courses?: Course[];
  updatedAt: Date;
};
