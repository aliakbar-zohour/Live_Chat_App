import { requireSession } from "@/lib/session";
import { SystemsRail } from "@/components/chat/systems-rail";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireSession();
  const user = session.user as typeof session.user & {
    handle?: string | null;
  };

  return (
    <div className="flex h-dvh flex-col bg-ink lg:flex-row">
      <SystemsRail
        user={{
          name: user.name,
          email: user.email,
          image: user.image,
          handle: user.handle,
        }}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col pb-16 lg:pb-0">
        {children}
      </div>
    </div>
  );
}
