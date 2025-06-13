export type PaymentPart = {
  id: string;
  amount: number;
  paidAt: string;
};

export type PaymentWithParts = {
  id: string;
  name: string;
  qualification: string;
  phoneNumber: string;
  email: string;
  source: string;
  collegeName: string;
  courseFee: number;
  paymentStatus: string;
  payment: number;
  collegePayment: number;
  agentCommission: number;
  bankCommission: number;
  netProfit: number;
  enrollmentDate: string;
  parts: PaymentPart[];
};

export type PaymentStats = {
  totalPayments: number;
  totalRevenue: number;
  totalCourseFee: number;
  pendingPayments: number;
  paidPayments: number;
  averagePayment: number;
};

export type PaymentFilters = {
  search?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page: number;
  limit: number;
};

export type PaymentResponse = {
  success: boolean;
  data?: {
    payments: PaymentWithParts[];
    pagination: {
      totalPages: number;
      currentPage: number;
      totalCount: number;
    };
  };
  error?: string;
};

export type StatsResponse = {
  success: boolean;
  data?: PaymentStats;
  error?: string;
};
