export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F7FA]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        <div
          className="w-12 h-12 border-4 border-transparent border-t-emerald-400 rounded-full animate-spin absolute top-2 left-2"
          style={{ animationDirection: "reverse", animationDuration: "0.8s" }}
        ></div>
      </div>
      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold text-emerald-800 mb-2">
          Loading...
        </h2>
        <p className="text-emerald-600">
          Please wait while we prepare your content
        </p>
      </div>
    </div>
  );
}
