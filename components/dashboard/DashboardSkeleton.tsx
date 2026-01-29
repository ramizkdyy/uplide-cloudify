export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-9 w-48 bg-muted animate-pulse rounded-md" />

      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border bg-card p-6 space-y-3">
            <div className="h-4 w-32 bg-muted animate-pulse rounded" />
            <div className="h-9 w-24 bg-muted animate-pulse rounded" />
            <div className="h-3 w-16 bg-muted animate-pulse rounded" />
          </div>
        ))}
      </div>

      <div className="rounded-xl border bg-card shadow-sm">
        <div className="p-6 space-y-2">
          <div className="h-6 w-48 bg-muted animate-pulse rounded" />
        </div>
        <div className="px-6 pb-6">
          <div className="h-[300px] bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}