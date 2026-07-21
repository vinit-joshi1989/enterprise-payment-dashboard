import api from "../api/api";
import type { Payment } from "../types/Payment";

export const getPayments = async (): Promise<Payment[]> => {
  const response = await api.get<Payment[]>("/api/payments");
  return response.data;
};

export type CreatePaymentRequest = {
  transactionReference: string;
  customerId: string;
  amount: number;
  currency: string;
  description: string;
};

export const createPayment = async (
  payment: CreatePaymentRequest,
): Promise<Payment> => {
  const response = await api.post<Payment>("/api/payments", payment);

  return response.data;
};

export const updatePaymentStatus = async (
  id: string,
  status: string,
): Promise<Payment> => {
  const response = await api.patch<Payment>(`/api/payments/${id}/status`, {
    status,
  });

  return response.data;
};

export const deletePayment = async (id: string): Promise<void> => {
  await api.delete(`/api/payments/${id}`);
};
