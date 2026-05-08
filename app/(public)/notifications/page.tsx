"use client";

import { useNotificationStore } from "@/store/notification-store";
import { formatDateTimeFr } from "@/lib/format";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const items = useNotificationStore((s) => s.items);
  const markRead = useNotificationStore((s) => s.markRead);
  const markAll = useNotificationStore((s) => s.markAllRead);

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-14 md:px-0">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button type="button" variant="outline" size="xs" className="rounded-xl" onClick={() => markAll()}>
          Tout lire
        </Button>
      </div>
      <div className="space-y-3">
        {items.map((n) => (
          <button
            type="button"
            key={n.id}
            onClick={() => markRead(n.id)}
            className={`w-full rounded-[1.5rem] border border-border bg-card p-5 text-left shadow-sm transition hover:border-primary/35 ${!n.read ? "ring-1 ring-brand-orange/35" : ""}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold">{n.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{n.message}</p>
                <p className="mt-3 text-[0.7rem] uppercase text-muted-foreground">
                  {formatDateTimeFr(n.createdAt)}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
