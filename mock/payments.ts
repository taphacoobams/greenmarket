import type { PaymentRecord } from "@/types";

export const MOCK_PAYMENTS: PaymentRecord[] = [
  {
    id: "pay-501",
    orderId: "ord-1001",
    method: "wave",
    amount: 5000,
    status: "completed",
    createdAt: "2026-04-22T09:18:00.000Z",
  },
  {
    id: "pay-502",
    orderId: "ord-1002",
    method: "orange_money",
    amount: 4200,
    status: "pending",
    createdAt: "2026-05-05T11:08:00.000Z",
  },
  {
    id: "pay-503",
    orderId: "ord-1003",
    method: "card",
    amount: 5300,
    status: "completed",
    createdAt: "2026-04-18T08:43:00.000Z",
  },
  {
    id: "pay-504",
    orderId: "ord-old-77",
    method: "cod",
    amount: 0,
    status: "failed",
    createdAt: "2026-02-02T09:01:00.000Z",
  },
];
