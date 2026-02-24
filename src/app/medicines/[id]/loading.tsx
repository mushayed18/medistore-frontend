export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-10">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back button skeleton */}
        <div className="h-8 w-40 bg-gray-200 rounded mb-8 animate-pulse"></div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Image + Stats skeleton */}
          <div className="space-y-8">
            <div className="bg-gray-200 rounded-3xl h-96 md:h-125 animate-pulse"></div>

            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Details skeleton */}
          <div className="space-y-8">
            <div className="h-12 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-5/6 animate-pulse"></div>

            <div className="grid grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-6 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-6">
              <div className="flex-1 h-14 bg-gray-200 rounded-xl animate-pulse"></div>
              <div className="flex-1 h-14 bg-gray-200 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Reviews skeleton */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-100 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-1/3 mb-8"></div>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="border-b pb-8 last:border-b-0">
              <div className="flex gap-4 mb-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="h-6 w-6 bg-gray-200 rounded"></div>
                  ))}
                </div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-5 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mt-3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}