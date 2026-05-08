"use client";

import { useMemo } from "react";
import { MOCK_ORDERS } from "@/mock/orders";
import { useOrderExtrasStore } from "@/store/order-extras-store";
import { useAuthStore } from "@/store/auth-store";

export function useMergedOrders() {
  const userId = useAuthStore((s) => s.user?.id);
  const extra = useOrderExtrasStore((s) => s.extra);

  return useMemo(() => {
    const all = [...extra, ...MOCK_ORDERS];
    if (!userId) return all;
    return all.filter((o) => o.userId === userId);
  }, [extra, userId]);
}
