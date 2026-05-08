import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { LiveNotificationPoll } from "@/features/notifications/live-notification-poll";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <LiveNotificationPoll />
      <div className="flex flex-1 flex-col pb-[calc(5.25rem+env(safe-area-inset-bottom,0px))] pl-[env(safe-area-inset-left,0px)] pr-[env(safe-area-inset-right,0px)] md:pb-8">
        {children}
      </div>
      <SiteFooter />
      <MobileBottomNav />
    </>
  );
}
