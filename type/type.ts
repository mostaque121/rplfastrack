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
};

export type Section = {
  id: string;
  imageCoverLink: string;
  imageSquareLink: string;
  title: string;
  link: string;
  courses?: Course[];
};

export type AnalyticsData = {
  overview: {
    totalRevenue: number;
    totalProfit: number;
    totalStudents: number;
    totalEnrollments: number;
    averagePayment: number;
    averageProfit: number;
    revenueGrowth: number;
    profitGrowth: number;
    studentGrowth: number;
    enrollmentGrowth: number;
    avgPaymentGrowth: number;
    avgProfitGrowth: number;
  };
  trends: {
    revenueAndProfit: Array<{
      period: string;
      revenue: number;
      profit: number;
    }>;
    enrollments: Array<{ period: string; enrollments: number }>;
  };
  distributions: {
    paymentStatus: Array<{ name: string; value: number }>;
    revenueAndProfitBySource: Array<{
      source: string;
      revenue: number;
      profit: number;
    }>;
    topColleges: Array<{ college: string; revenue: number; students: number }>;
    topQualifications: Array<{
      qualification: string;
      revenue: number;
      students: number;
      netProfit: number;
    }>;
  };
  insights: Array<{
    type: "positive" | "negative" | "neutral";
    title: string;
    description: string;
    value?: string;
  }>;
};

export type FilterType = "timeRange" | "dateRange" | "monthFilter";

export interface FilterParams {
  type: FilterType;
  timeRange?: "7d" | "30d" | "90d" | "6m" | "1y" | "All";
  dateRange?: { from: Date; to: Date };
  monthFilter?: string;
}
