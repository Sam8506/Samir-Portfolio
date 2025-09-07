"use client";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-700 mb-6">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
