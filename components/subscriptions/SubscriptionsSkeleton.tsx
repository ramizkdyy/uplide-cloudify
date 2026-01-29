export function SubscriptionsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-9 w-48 bg-muted animate-pulse rounded-md" />

      <div className="flex gap-4 items-center">
        <div className="h-9 w-80 bg-muted animate-pulse rounded-md" />
        <div className="h-9 w-52 bg-muted animate-pulse rounded-md" />
        <div className="h-9 w-52 bg-muted animate-pulse rounded-md" />
      </div>

      <div className="rounded-lg border bg-card">
        <div className="p-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
              <div className="w-8 h-8 bg-muted animate-pulse rounded-xl" />
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
              <div className="ml-auto flex gap-2">
                <div className="w-8 h-8 bg-muted animate-pulse rounded" />
                <div className="w-8 h-8 bg-muted animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}