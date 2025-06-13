"use client";

import { useQueries } from "@tanstack/react-query";

import { getTotalUsersLast30Days } from "../action/analytics";
import {
  getAdminPannelStat,
  getCourseStat,
  getEnrollmentStat,
  getFormSubmissionStat,
  getReviewStat,
} from "../action/home";

export function useDashboardData() {
  const results = useQueries({
    queries: [
      {
        queryKey: ["courseStats"],
        queryFn: getCourseStat,
        staleTime: 5 * 60 * 1000, // 5 minutes
      },
      {
        queryKey: ["enrollmentStats"],
        queryFn: getEnrollmentStat,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ["visitorStats"],
        queryFn: getTotalUsersLast30Days,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ["formSubmissionStats"],
        queryFn: getFormSubmissionStat,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ["reviewStats"],
        queryFn: getReviewStat,
        staleTime: 5 * 60 * 1000,
      },
      {
        queryKey: ["adminList"],
        queryFn: getAdminPannelStat,
        staleTime: 5 * 60 * 1000,
      },
    ],
  });

  return {
    courseStats: results[0],
    enrollmentStats: results[1],
    visitorStats: results[2],
    formSubmissionStats: results[3],
    reviewStats: results[4],
    adminList: results[5],
  };
}
