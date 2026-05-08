import type { Order } from "@/types";
import { MOCK_ORDERS } from "@/mock/orders";

export function getOrdersForUser(userId?: string): Order[] {
  if (!userId) return MOCK_ORDERS;
  return MOCK_ORDERS.filter((o) => o.userId === userId);
}

export function getOrderById(id: string): Order | undefined {
  return MOCK_ORDERS.find((o) => o.id === id);
}
