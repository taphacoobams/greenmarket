"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useNotificationStore } from "@/store/notification-store";

export function LiveNotificationPoll() {
  const pushLive = useNotificationStore((s) => s.pushLive);

  useEffect(() => {
    const id = window.setInterval(() => {
      const n = pushLive();
      toast.info(n.title, { description: n.message, duration: 4200 });
    }, 38_000);
    return () => window.clearInterval(id);
  }, [pushLive]);

  return null;
}
