"use client";

import { useDashboardData } from "../../lib/use-dashboard-data";
import { AdminListCard } from "./admin-pannel";
import { FormSubmissionStatsCard } from "./form-submission";
import { CourseStatsCard } from "./total-course";
import { EnrollmentStatsCard } from "./total-enrollment";
import { ReviewStatsCard } from "./total-review";
import { VisitorStatsCard } from "./total-visitor";

export default function HomeDashboard() {
  // Fetch all data in parallel
  const {
    courseStats,
    enrollmentStats,
    visitorStats,
    formSubmissionStats,
    reviewStats,
    adminList,
  } = useDashboardData();

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <CourseStatsCard
          data={courseStats.data?.data}
          isLoading={courseStats.isLoading}
          error={courseStats.error}
        />
        <EnrollmentStatsCard
          data={enrollmentStats.data?.data}
          isLoading={enrollmentStats.isLoading}
          error={enrollmentStats.error}
        />
        <VisitorStatsCard
          data={visitorStats.data}
          isLoading={visitorStats.isLoading}
          error={visitorStats.error}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <FormSubmissionStatsCard
          data={formSubmissionStats.data?.data}
          isLoading={formSubmissionStats.isLoading}
          error={formSubmissionStats.error}
        />
        <ReviewStatsCard
          data={reviewStats.data?.data}
          isLoading={reviewStats.isLoading}
          error={reviewStats.error}
        />
      </div>
      <div className="mt-4">
        <AdminListCard
          data={adminList.data?.data}
          isLoading={adminList.isLoading}
          error={adminList.error}
        />
      </div>
    </div>
  );
}
