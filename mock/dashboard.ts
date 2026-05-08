import type { DashboardStats, TimeSeriesPoint } from "@/types";
import { MOCK_PRODUCTS } from "@/mock/products";

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  revenue: 48_520_000,
  orders: 1842,
  customers: 6520,
  products: MOCK_PRODUCTS.length,
  revenueChangePct: 12.4,
  ordersChangePct: -2.3,
};

export const MOCK_REVENUE_SERIES: TimeSeriesPoint[] = [
  { date: "2026-04-10", revenue: 1_200_000, orders: 42 },
  { date: "2026-04-12", revenue: 1_450_000, orders: 51 },
  { date: "2026-04-14", revenue: 1_180_000, orders: 38 },
  { date: "2026-04-16", revenue: 1_620_000, orders: 57 },
  { date: "2026-04-18", revenue: 1_310_000, orders: 44 },
  { date: "2026-04-20", revenue: 1_890_000, orders: 63 },
  { date: "2026-04-22", revenue: 1_770_000, orders: 59 },
  { date: "2026-04-24", revenue: 1_920_000, orders: 66 },
  { date: "2026-04-26", revenue: 2_020_000, orders: 71 },
  { date: "2026-04-28", revenue: 1_980_000, orders: 68 },
  { date: "2026-04-30", revenue: 2_100_000, orders: 74 },
  { date: "2026-05-02", revenue: 2_240_000, orders: 79 },
];
