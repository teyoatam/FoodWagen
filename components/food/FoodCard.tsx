"use client";

import { useState } from "react";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";

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
    <article className="food-group food-relative food-rounded-2xl food-bg-white food-shadow-sm hover:food-shadow-xl food-transition food-duration-150 food-ease-out hover:-food-translate-y-0.5 food-animate-slide-up">
      <div className="food-relative food-overflow-hidden food-rounded-t-2xl">
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
        <div className="food-flex food-items-center food-gap-2 food-mb-2">
          {/* Restaurant Logo */}
          {item.restaurant?.logo ? (
            <img
              src={item.restaurant.logo}
              alt={item.restaurant.name ?? "Restaurant logo"}
              className="restaurant-logo food-h-6 food-w-6 food-rounded food-object-cover food-flex-shrink-0"
            />
          ) : (
            <div className="restaurant-logo food-h-6 food-w-6 food-rounded food-bg-slate-200 food-flex-shrink-0" />
          )}
          
          {/* Food Name */}
          <h3 className="food-name food-text-slate-800 food-font-semibold food-flex-1 food-truncate">{item.name}</h3>
          
          {/* More Menu Button */}
          <div className="food-relative food-flex-shrink-0">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="food-h-7 food-w-7 food-rounded-full hover:food-bg-slate-100 food-flex food-items-center food-justify-center food-transition"
              aria-label="More options"
            >
              <MoreVertical className="food-h-4 food-w-4 food-text-slate-600" />
            </button>
            
            {showMenu && (
              <>
                <div 
                  className="food-fixed food-inset-0 food-z-[100]" 
                  onClick={() => setShowMenu(false)}
                />
                <div className="food-absolute food-right-0  food-z-[101] food-w-40 food-rounded-lg food-bg-white food-shadow-lg food-border food-border-slate-200 ">
                  <button
                    data-test-id={`food-edit-btn-${item.id}`}
                    className="food-w-full food-flex food-items-center food-gap-2 food-px-4 food-py-2 food-text-left food-text-sm food-text-slate-700 hover:food-bg-orange-50 food-transition"
                    onClick={() => {
                      setShowMenu(false);
                      onEdit(item);
                    }}
                  >
                    Edit Food
                  </button>
                  <button
                    data-test-id={`food-delete-btn-${item.id}`}
                    className="food-w-full food-flex food-items-center food-gap-2 food-px-4 food-py-2 food-text-left food-text-sm food-text-slate-700 hover:food-bg-rose-50 food-transition"
                    onClick={() => {
                      setShowMenu(false);
                      onDelete(item);
                    }}
                  >
                    Delete Food
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
