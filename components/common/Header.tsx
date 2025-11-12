import Link from "next/link";
import { Button } from "../ui/button";

export default function Header({ onAdd }: { onAdd: () => void }) {
  return (
    <header className="food-bg-white food-sticky food-top-0 food-z-30 food-border-b food-border-black/5 food-backdrop-blur">
      <div className="food-container food-mx-auto food-flex food-items-center food-justify-between food-py-3">
        <Link href="/" className="food-inline-flex food-items-center food-gap-3">
          <svg className="food-h-8 food-w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="3" y="4" width="18" height="10" rx="2" fill="#FFBA26" />
            <circle cx="7" cy="18" r="1.6" fill="#FFBA26" />
            <circle cx="17" cy="18" r="1.6" fill="#FFBA26" />
            <rect x="5" y="6" width="14" height="2" rx="1" fill="#F65900" />
          </svg>
          <span className="food-text-2xl food-font-extrabold">
            <span style={{ color: '#F65900' }}>Food</span>
            <span style={{ color: '#FFBA26' }}>Wagen</span>
          </span>
        </Link>
        <Button
          data-test-id="food-add-btn"
          className="food-bg-[#FFBA26] shadow-lg food-text-white food-text-xs hover:food-bg-[#FF9A0E] food-rounded-lg food-px-5 food-py-2"
          onClick={onAdd}
        >
          Add Food
        </Button>
      </div>
  
    </header>
  );
}
