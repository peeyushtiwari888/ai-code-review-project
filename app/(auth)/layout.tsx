import { requireUnauth } from "@/features/auth/actions";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUnauth()
  return (
    <div className="flex min-h-screen w-full bg-background">
      {children}
    </div>
  );
}
