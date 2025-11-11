import { useEffect, useMemo, useState } from "react";

export interface FoodFormValues {
  food_name: string;
  food_rating: number | "";
  food_image: string;
  restaurant_name: string;
  restaurant_logo: string;
  restaurant_status: "Open Now" | "Closed" | "";
}

export const emptyFoodForm: FoodFormValues = {
  food_name: "",
  food_rating: "",
  food_image: "",
  restaurant_name: "",
  restaurant_logo: "",
  restaurant_status: "",
};

export default function FoodForm({
  initial,
  loading,
  onSubmit,
  onCancel,
}: {
  initial?: Partial<FoodFormValues>;
  loading?: boolean;
  onSubmit: (values: FoodFormValues) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<FoodFormValues>({ ...emptyFoodForm, ...initial });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => setValues((v) => ({ ...v, ...initial })), [initial]);

  const disabled = loading;

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!values.food_name.trim()) e["food-name-error"] = "Food Name is required";
    const ratingNumber = Number(values.food_rating);
    if (Number.isNaN(ratingNumber)) e["food-rating-error"] = "Food Rating must be a number";
    else if (ratingNumber < 1 || ratingNumber > 5)
      e["food-rating-error"] = "Food Rating must be a number";
    try {
      const u = new URL(values.food_image);
      if (!/^https?:/.test(u.protocol)) throw new Error("invalid");
    } catch {
      e["food-image-error"] = "Food Image URL is required";
    }
    if (!values.restaurant_name.trim()) e["restaurant-name-error"] = "Restaurant Name is required";
    try {
      const u = new URL(values.restaurant_logo);
      if (!/^https?:/.test(u.protocol)) throw new Error("invalid");
    } catch {
      e["restaurant-logo-error"] = "Restaurant Logo URL is required";
    }
    if (values.restaurant_status !== "Open Now" && values.restaurant_status !== "Closed")
      e["restaurant-status-error"] = "Restaurant Status must be ‘Open Now’ or ‘Closed’";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      food_name: values.food_name.trim(),
      food_rating: Number(values.food_rating),
      food_image: values.food_image.trim(),
      restaurant_name: values.restaurant_name.trim(),
      restaurant_logo: values.restaurant_logo.trim(),
      restaurant_status: values.restaurant_status,
    });
    setValues(emptyFoodForm);
  };

  return (
    <form onSubmit={handleSubmit} className="food-space-y-4" noValidate>
      <div>
        <label htmlFor="food_name" className="food-block food-text-sm food-font-medium food-text-slate-700">Food Name</label>
        <input
          id="food_name"
          name="food_name"
          placeholder="Enter food name"
          className="food-input food-mt-1 food-w-full food-rounded-md food-border food-border-slate-200 food-bg-white food-px-3 food-py-2 focus:food-ring-2 focus:food-ring-orange-500"
          aria-describedby="food-name-error"
          value={values.food_name}
          onChange={(e) => setValues({ ...values, food_name: e.target.value })}
          disabled={disabled}
        />
        {errors["food-name-error"] && (
          <p id="food-name-error" className="food-mt-1 food-text-sm food-text-rose-600">
            {errors["food-name-error"]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="food_rating" className="food-block food-text-sm food-font-medium food-text-slate-700">Food Rating</label>
        <input
          id="food_rating"
          name="food_rating"
          type="number"
          min={1}
          max={5}
          placeholder="Food rating (1-5)"
          className="food-input food-mt-1 food-w-full food-rounded-md food-border food-border-slate-200 food-bg-white food-px-3 food-py-2 focus:food-ring-2 focus:food-ring-orange-500"
          aria-describedby="food-rating-error"
          value={values.food_rating}
          onChange={(e) => setValues({ ...values, food_rating: e.target.value === "" ? "" : Number(e.target.value) })}
          disabled={disabled}
        />
        {errors["food-rating-error"] && (
          <p id="food-rating-error" className="food-mt-1 food-text-sm food-text-rose-600">
            {errors["food-rating-error"]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="food_image" className="food-block food-text-sm food-font-medium food-text-slate-700">Food Image URL</label>
        <input
          id="food_image"
          name="food_image"
          placeholder="Enter food image url"
          className="food-input food-mt-1 food-w-full food-rounded-md food-border food-border-slate-200 food-bg-white food-px-3 food-py-2 focus:food-ring-2 focus:food-ring-orange-500"
          aria-describedby="food-image-error"
          value={values.food_image}
          onChange={(e) => setValues({ ...values, food_image: e.target.value })}
          disabled={disabled}
        />
        {errors["food-image-error"] && (
          <p id="food-image-error" className="food-mt-1 food-text-sm food-text-rose-600">
            {errors["food-image-error"]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="restaurant_name" className="food-block food-text-sm food-font-medium food-text-slate-700">Restaurant Name</label>
        <input
          id="restaurant_name"
          name="restaurant_name"
          placeholder="Enter restaurant name"
          className="food-input food-mt-1 food-w-full food-rounded-md food-border food-border-slate-200 food-bg-white food-px-3 food-py-2 focus:food-ring-2 focus:food-ring-orange-500"
          aria-describedby="restaurant-name-error"
          value={values.restaurant_name}
          onChange={(e) => setValues({ ...values, restaurant_name: e.target.value })}
          disabled={disabled}
        />
        {errors["restaurant-name-error"] && (
          <p id="restaurant-name-error" className="food-mt-1 food-text-sm food-text-rose-600">
            {errors["restaurant-name-error"]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="restaurant_logo" className="food-block food-text-sm food-font-medium food-text-slate-700">Restaurant Logo URL</label>
        <input
          id="restaurant_logo"
          name="restaurant_logo"
          placeholder="Enter restaurant logo url"
          className="food-input food-mt-1 food-w-full food-rounded-md food-border food-border-slate-200 food-bg-white food-px-3 food-py-2 focus:food-ring-2 focus:food-ring-orange-500"
          aria-describedby="restaurant-logo-error"
          value={values.restaurant_logo}
          onChange={(e) => setValues({ ...values, restaurant_logo: e.target.value })}
          disabled={disabled}
        />
        {errors["restaurant-logo-error"] && (
          <p id="restaurant-logo-error" className="food-mt-1 food-text-sm food-text-rose-600">
            {errors["restaurant-logo-error"]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="restaurant_status" className="food-block food-text-sm food-font-medium food-text-slate-700">Restaurant Status</label>
        <select
          id="restaurant_status"
          name="restaurant_status"
          className="food-input food-mt-1 food-w-full food-rounded-md food-border food-border-slate-200 food-bg-white food-px-3 food-py-2 focus:food-ring-2 focus:food-ring-orange-500"
          aria-describedby="restaurant-status-error"
          value={values.restaurant_status}
          onChange={(e) => setValues({ ...values, restaurant_status: e.target.value as any })}
          disabled={disabled}
        >
          <option value="Open Now">Open Now</option>
          <option value="Closed">Closed</option>
        </select>
        {errors["restaurant-status-error"] && (
          <p id="restaurant-status-error" className="food-mt-1 food-text-sm food-text-rose-600">
            {errors["restaurant-status-error"]}
          </p>
        )}
      </div>

      <div className="food-flex food-justify-end food-gap-3 food-pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="food-rounded-md food-border food-border-slate-200 food-bg-white food-px-4 food-py-2"
          disabled={disabled}
        >
          Cancel
        </button>
        <button
          data-test-id="food-submit-btn"
          type="submit"
          disabled={disabled}
          className="food-rounded-md food-bg-orange-500 food-text-white food-px-5 food-py-2 disabled:food-opacity-60"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
