// Your component file, e.g., app/dashboard/page.tsx

"use client";

import { useDashboardData } from "../../lib/use-dashboard-data";
import { AdminListCard } from "./admin-pannel";
import { FormSubmissionStatsCard } from "./form-submission";
import { CourseStatsCard } from "./total-course";
import { EnrollmentStatsCard } from "./total-enrollment";
import { ReviewStatsCard } from "./total-review";
import { VisitorStatsCard } from "./total-visitor";

export default function HomeDashboard() {
  // Use the simplified hook. It returns one data object, one isLoading, and one error.
  const { data: response, isLoading, error } = useDashboardData();

  // Handle the error state for the entire dashboard
  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>Error loading dashboard data: {error.message}</p>
      </div>
    );
  }

  // The actual data is inside response.data
  const dashboardData = response?.data;

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">
        <CourseStatsCard
          data={dashboardData?.courseStats}
          isLoading={isLoading}
        />
        <EnrollmentStatsCard
          data={dashboardData?.enrollmentStats}
          isLoading={isLoading}
        />
        <VisitorStatsCard
          data={dashboardData?.visitorStats}
          isLoading={isLoading}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <FormSubmissionStatsCard
          data={dashboardData?.formSubmissionStats}
          isLoading={isLoading}
        />
        <ReviewStatsCard
          data={dashboardData?.reviewStats}
          isLoading={isLoading}
        />
      </div>
      <div className="mt-4">
        <AdminListCard data={dashboardData?.adminList} isLoading={isLoading} />
      </div>
    </div>
  );
}
