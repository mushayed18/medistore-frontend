import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      {/* Large 404 */}
      <h1 className="text-8xl md:text-9xl font-bold text-primary mb-4">404</h1>

      {/* Message */}
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-6">
        Oops! Page Not Found
      </h2>

      <p className="text-lg text-gray-600 max-w-md mb-10">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Home button */}
      <Link
        href="/"
        className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-full text-lg font-medium hover:bg-primary/90 transition shadow-lg"
      >
        Go Back Home
      </Link>

      {/* Optional fun element */}
      <div className="mt-12 opacity-50">
        <p className="text-gray-500 text-sm">
          While you&apos;re here, maybe check out our{" "}
          <Link href="/medicines" className="text-primary hover:underline">
            medicines
          </Link>{" "}
          collection?
        </p>
      </div>
    </div>
  );
}
