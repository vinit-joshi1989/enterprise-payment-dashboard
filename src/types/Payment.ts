export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export type Payment = {
  id: string;
  transactionReference: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  customerId: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};
