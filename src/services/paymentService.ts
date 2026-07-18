import api from "../api/api";
import type { Payment } from "../types/Payment";

export const getPayments = async (): Promise<Payment[]> => {
  const response = await api.get<Payment[]>("/api/payments");
  return response.data;
};
