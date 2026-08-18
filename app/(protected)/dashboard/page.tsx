import { requireAuth } from "@/features/auth/actions";

export default async function DashboardPage() {
  const session = await requireAuth();

  return (
    <main className="flex min-h-screen flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Dashboard</p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back
          </h1>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Signed in as</p>
          <p className="mt-2 text-lg font-medium">
            {session.user?.email ?? "Unknown user"}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Status</p>
          <p className="mt-2 text-lg font-medium">Authentication OK</p>
        </div>
      </section>
    </main>
  );
}
