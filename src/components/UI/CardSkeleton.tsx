const CardSkeleton = () => (
  <div className="bg-white border border-slate-100 rounded-xl p-6 space-y-4 animate-pulse">
    <div className="flex justify-between">
      <div className="h-6 w-32 bg-slate-100 rounded" />
      <div className="h-6 w-12 bg-slate-100 rounded" />
    </div>
    <div className="space-y-2">
      <div className="h-4 w-full bg-slate-50 rounded" />
      <div className="h-4 w-2/3 bg-slate-50 rounded" />
    </div>
    <div className="h-10 w-full bg-slate-100 rounded-lg mt-4" />
  </div>
);

export { CardSkeleton };