"use client";

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 py-8 px-4">
      <div className="max-w-6xl mx-auto animate-pulse">
        <div className="h-12 bg-gray-200 rounded-xl w-64 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg h-64"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
