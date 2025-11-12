import Link from "next/link";
import { Button } from "../ui/button";

export default function Header({ onAdd }: { onAdd: () => void }) {
  return (
    <header className="food-bg-white food-sticky food-top-0 food-z-30 food-border-b food-border-black/5 food-backdrop-blur">
      <div className="food-container food-mx-auto food-flex food-items-center food-justify-between food-py-3">
        <Link href="/" className="food-inline-flex food-items-center food-gap-2">
          <div className="food-h-8 food-w-8 food-rounded food-bg-gradient-to-br food-from-amber-400 food-to-orange-500" />
          <span className="food-text-lg food-font-extrabold food-text-slate-800">FoodWagen</span>
        </Link>
        <Button
          data-test-id="food-add-btn"
          className="food-bg-orange-500 food-text-white hover:food-bg-orange-600 food-rounded-full food-px-5 food-py-2"
          onClick={onAdd}
        >
          Add Food
        </Button>
      </div>
    </header>
  );
}
