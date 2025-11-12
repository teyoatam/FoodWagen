import Link from "next/link";

export default function NotFound() {
  return (
    <div className="food-min-h-screen food-flex food-items-center food-justify-center food-bg-gray-100">
      <div className="food-text-center food-p-8">
        <h1 className="food-text-6xl food-font-bold food-text-[#F65900] food-mb-4">404</h1>
        <h2 className="food-text-2xl food-font-semibold food-text-slate-800 food-mb-2">
          Page Not Found
        </h2>
        <p className="food-text-slate-600 food-mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link 
          href="/" 
          className="food-inline-block food-rounded-full food-bg-[#FFBA26] food-text-white food-px-6 food-py-3 food-font-semibold hover:food-bg-[#FF9A0E] food-transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
