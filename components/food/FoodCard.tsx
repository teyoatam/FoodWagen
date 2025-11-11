import { ReactNode } from "react";

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
          <h3 className="food-name food-text-slate-800 food-font-semibold">{item.name}</h3>
          {item.restaurant?.logo ? (
            <img
              src={item.restaurant.logo}
              alt={item.restaurant.name ?? "Restaurant logo"}
              className="restaurant-logo food-h-6 food-w-6 food-rounded food-object-cover"
            />
          ) : (
            <div className="restaurant-logo food-h-6 food-w-6 food-rounded food-bg-slate-200" />
          )}
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
        <div className="food-mt-3 food-flex food-justify-end food-gap-2">
          <button
            data-test-id={`food-edit-btn-${item.id}`}
            className="food-rounded-md food-border food-border-orange-500 food-text-orange-600 food-text-xs food-px-3 food-py-1 hover:food-bg-orange-50"
            onClick={() => onEdit(item)}
          >
            Edit
          </button>
          <button
            data-test-id={`food-delete-btn-${item.id}`}
            className="food-rounded-md food-border food-border-rose-500 food-text-rose-600 food-text-xs food-px-3 food-py-1 hover:food-bg-rose-50"
            onClick={() => onDelete(item)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="food-sr-only restaurant-name">{item.restaurant?.name ?? "Unknown Restaurant"}</div>
    </article>
  );
}
