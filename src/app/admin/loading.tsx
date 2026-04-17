export default function AdminLoading() {
  return (
    <div className="min-h-[80vh] bg-muted/30 flex">
      <aside className="hidden lg:block w-64 bg-white border-r animate-pulse" />
      <main className="flex-1 lg:ml-64 p-4 lg:p-8">
        <div className="space-y-6">
          <div className="h-8 w-48 bg-muted rounded animate-pulse" />
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border p-5 h-24 animate-pulse" />
            ))}
          </div>
          <div className="bg-white rounded-xl border p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 bg-muted rounded animate-pulse" style={{ width: `${60 + Math.random() * 40}%` }} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
