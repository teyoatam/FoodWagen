import { ReactNode, useState } from "react";

export interface RestaurantInfo {
  name?: string;
  logo?: string;
  status?: "Open Now" | "Closed" | string;
}

export interface FoodItem {
  id: string;
  name: string;
  image: string;
  rating?: number;
  price?: string;
  restaurant?: RestaurantInfo | null;
}

export default function FoodCard({
  item,
  onEdit,
  onDelete,
}: {
  item: FoodItem;
  onEdit: (item: FoodItem) => void;
  onDelete: (item: FoodItem) => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const status = item.restaurant?.status ?? "";
  const isOpen = status.toLowerCase().includes("open");
  const statusLabel = status ? status : "Unknown";

  return (
    <article
      className="food-group food-relative food-rounded-2xl food-bg-white food-shadow-sm hover:food-shadow-xl food-transition food-duration-150 food-ease-out hover:-food-translate-y-0.5 food-overflow-hidden food-animate-slide-up"
    >
      <div className="food-relative">
        <img
          src={item.image}
          alt={item.name}
          className="food-aspect-[4/3] food-w-full food-object-cover"
        />
        {item.price && (
          <div className="food-absolute food-left-3 food-top-3 food-rounded-md food-bg-orange-500 food-text-white food-text-xs food-font-semibold food-px-2 food-py-1 food-shadow">
            <span className="food-price">{item.price}</span>
          </div>
        )}
      </div>
      <div className="food-p-4">
        <div className="food-flex food-items-center food-justify-between food-mb-2">
          <div className="food-flex food-items-center food-gap-2 food-flex-1">
            {item.restaurant?.logo ? (
              <img
                src={item.restaurant.logo}
                alt={item.restaurant.name ?? "Restaurant logo"}
                className="restaurant-logo food-h-6 food-w-6 food-rounded food-object-cover food-flex-shrink-0"
              />
            ) : (
              <div className="restaurant-logo food-h-6 food-w-6 food-rounded food-bg-slate-200 food-flex-shrink-0" />
            )}
            <h3 className="food-name food-text-slate-800 food-font-semibold food-truncate">{item.name}</h3>
          </div>
          
          {/* More Vertical Menu */}
          <div className="food-relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="food-p-1 hover:food-bg-slate-100 food-rounded food-transition"
              aria-label="More options"
            >
              <svg className="food-h-5 food-w-5 food-text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            
            {showMenu && (
              <>
                {/* Backdrop to close menu */}
                <div 
                  className="food-fixed food-inset-0 food-z-10"
                  onClick={() => setShowMenu(false)}
                />
                {/* Dropdown Menu */}
                <div className="food-absolute food-right-0 food-top-8 food-bg-white food-rounded-lg food-shadow-lg food-border food-border-slate-200 food-py-1 food-min-w-[120px] food-z-20">
                  <button
                    data-test-id={`food-edit-btn-${item.id}`}
                    className="food-w-full food-text-left food-px-4 food-py-2 food-text-sm food-text-slate-700 hover:food-bg-slate-100 food-flex food-items-center food-gap-2"
                    onClick={() => {
                      setShowMenu(false);
                      onEdit(item);
                    }}
                  >
                    <svg className="food-h-4 food-w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    data-test-id={`food-delete-btn-${item.id}`}
                    className="food-w-full food-text-left food-px-4 food-py-2 food-text-sm food-text-rose-600 hover:food-bg-rose-50 food-flex food-items-center food-gap-2"
                    onClick={() => {
                      setShowMenu(false);
                      onDelete(item);
                    }}
                  >
                    <svg className="food-h-4 food-w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="food-flex food-items-center food-justify-between food-text-sm food-text-slate-600">
          <div>
            <span className="food-rating">{item.rating ?? "-"}★</span>
          </div>
          <div>
            <span className={`restaurant-status food-rounded-md food-border food-px-2 food-py-0.5 food-text-xs ${
              isOpen
                ? "food-border-emerald-500 food-text-emerald-600"
                : "food-border-rose-500 food-text-rose-600"
            }`}>
              {isOpen ? "Open Now" : statusLabel}
            </span>
          </div>
        </div>
      </div>
      <div className="food-sr-only restaurant-name">{item.restaurant?.name ?? "Unknown Restaurant"}</div>
    </article>
  );
}
