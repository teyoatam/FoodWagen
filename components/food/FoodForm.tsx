import { useEffect, useState } from "react";
import { z } from "zod";

const foodFormSchema = z.object({
  food_name: z.string().min(1, "Food Name is required").trim(),
  food_rating: z
    .number({ invalid_type_error: "Food Rating must be a number" })
    .refine((val) => val >= 1, { message: "Food Rating must be at least 1" })
    .refine((val) => val <= 5, { message: "Food Rating must be less than or equal to 5" }),
  food_image: z
    .string()
    .min(1, "Food Image URL is required")
    .refine((url) => {
      try {
        const u = new URL(url);
        return /^https?:/.test(u.protocol);
      } catch {
        return false;
      }
    }, { message: "Food Image must be a valid http or https URL" }),
  restaurant_name: z.string().min(1, "Restaurant Name is required").trim(),
  restaurant_logo: z
    .string()
    .min(1, "Restaurant Logo URL is required")
    .refine((url) => {
      try {
        const u = new URL(url);
        return /^https?:/.test(u.protocol);
      } catch {
        return false;
      }
    }, { message: "Restaurant Logo must be a valid http or https URL" }),
  restaurant_status: z.enum(["Open Now", "Closed"], {
    errorMap: () => ({ message: "Restaurant Status must be 'Open Now' or 'Closed'" }),
  }),
});

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
  restaurant_status: "Open Now", 
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

  useEffect(() => {

    if (initial) {
      setValues({ ...emptyFoodForm, ...initial });
    } else {
      setValues(emptyFoodForm);
    }
    setErrors({});
  }, [initial]);

  const disabled = loading;

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    
    try {
      foodFormSchema.parse({
        food_name: values.food_name,
        food_rating: Number(values.food_rating),
        food_image: values.food_image,
        restaurant_name: values.restaurant_name,
        restaurant_logo: values.restaurant_logo,
        restaurant_status: values.restaurant_status,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          const field = err.path[0];
          e[`${field}-error`] = err.message;
        });
      }
    }

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
      restaurant_status: values.restaurant_status as "Open Now" | "Closed",
    });
  };

  return (
    <>
      <form id="food-form" onSubmit={handleSubmit} className="food-space-y-5" noValidate>
      <div>
        <label htmlFor="food_name" className="food-block food-text-sm food-font-normal food-text-slate-500 food-mb-2">
          Food name
        </label>
        <input
          id="food_name"
          name="food_name"
          placeholder="Enter food name"
          className="food-input food-w-full food-rounded-lg food-border food-border-slate-200 food-bg-slate-50 food-px-4 food-py-3 food-text-slate-800 placeholder:food-text-slate-400 focus:food-outline-none focus:food-ring-2 focus:food-ring-orange-400 focus:food-border-transparent"
          aria-describedby="food_name-error"
          value={values.food_name}
          onChange={(e) => setValues({ ...values, food_name: e.target.value })}
          disabled={disabled}
        />
        {errors["food_name-error"] && (
          <p id="food_name-error" className="food-mt-1.5 food-text-xs food-text-rose-500">
            {errors["food_name-error"]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="food_rating" className="food-block food-text-sm food-font-normal food-text-slate-500 food-mb-2">
          Food rating
        </label>
        <input
          id="food_rating"
          name="food_rating"
          type="number"
          step="0.1"
          min={1}
          max={5}
          placeholder="Enter rating (1-5)"
          className="food-input food-w-full food-rounded-lg food-border food-border-slate-200 food-bg-slate-50 food-px-4 food-py-3 food-text-slate-800 placeholder:food-text-slate-400 focus:food-outline-none focus:food-ring-2 focus:food-ring-orange-400 focus:food-border-transparent"
          aria-describedby="food_rating-error"
          value={values.food_rating}
          onChange={(e) => setValues({ ...values, food_rating: e.target.value === "" ? "" : Number(e.target.value) })}
          disabled={disabled}
        />
        {errors["food_rating-error"] && (
          <p id="food_rating-error" className="food-mt-1.5 food-text-xs food-text-rose-500">
            {errors["food_rating-error"]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="food_image" className="food-block food-text-sm food-font-normal food-text-slate-500 food-mb-2">
          Food image (link)
        </label>
        <input
          id="food_image"
          name="food_image"
          placeholder="Enter image URL"
          className="food-input food-w-full food-rounded-lg food-border food-border-slate-200 food-bg-slate-50 food-px-4 food-py-3 food-text-slate-800 placeholder:food-text-slate-400 focus:food-outline-none focus:food-ring-2 focus:food-ring-orange-400 focus:food-border-transparent"
          aria-describedby="food_image-error"
          value={values.food_image}
          onChange={(e) => setValues({ ...values, food_image: e.target.value })}
          disabled={disabled}
        />
        {errors["food_image-error"] && (
          <p id="food_image-error" className="food-mt-1.5 food-text-xs food-text-rose-500">
            {errors["food_image-error"]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="restaurant_name" className="food-block food-text-sm food-font-normal food-text-slate-500 food-mb-2">
          Restaurant name
        </label>
        <input
          id="restaurant_name"
          name="restaurant_name"
          placeholder="Enter restaurant name"
          className="food-input food-w-full food-rounded-lg food-border food-border-slate-200 food-bg-slate-50 food-px-4 food-py-3 food-text-slate-800 placeholder:food-text-slate-400 focus:food-outline-none focus:food-ring-2 focus:food-ring-orange-400 focus:food-border-transparent"
          aria-describedby="restaurant_name-error"
          value={values.restaurant_name}
          onChange={(e) => setValues({ ...values, restaurant_name: e.target.value })}
          disabled={disabled}
        />
        {errors["restaurant_name-error"] && (
          <p id="restaurant_name-error" className="food-mt-1.5 food-text-xs food-text-rose-500">
            {errors["restaurant_name-error"]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="restaurant_logo" className="food-block food-text-sm food-font-normal food-text-slate-500 food-mb-2">
          Restaurant logo (link)
        </label>
        <input
          id="restaurant_logo"
          name="restaurant_logo"
          placeholder="Enter logo URL"
          className="food-input food-w-full food-rounded-lg food-border food-border-slate-200 food-bg-slate-50 food-px-4 food-py-3 food-text-slate-800 placeholder:food-text-slate-400 focus:food-outline-none focus:food-ring-2 focus:food-ring-orange-400 focus:food-border-transparent"
          aria-describedby="restaurant_logo-error"
          value={values.restaurant_logo}
          onChange={(e) => setValues({ ...values, restaurant_logo: e.target.value })}
          disabled={disabled}
        />
        {errors["restaurant_logo-error"] && (
          <p id="restaurant_logo-error" className="food-mt-1.5 food-text-xs food-text-rose-500">
            {errors["restaurant_logo-error"]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="restaurant_status" className="food-block food-text-sm food-font-normal food-text-slate-500 food-mb-2">
          Restaurant status (open/close)
        </label>
        <select
          id="restaurant_status"
          name="restaurant_status"
          className="food-input food-w-full food-rounded-lg food-border food-border-slate-200 food-bg-slate-50 food-px-4 food-py-3 food-text-slate-800 focus:food-outline-none focus:food-ring-2 focus:food-ring-orange-400 focus:food-border-transparent food-appearance-none"
          aria-describedby="restaurant_status-error"
          value={values.restaurant_status}
          onChange={(e) => setValues({ ...values, restaurant_status: e.target.value as any })}
          disabled={disabled}
        >
          <option value="Open Now">Open Now</option>
          <option value="Closed">Closed</option>
        </select>
        {errors["restaurant_status-error"] && (
          <p id="restaurant_status-error" className="food-mt-1.5 food-text-xs food-text-rose-500">
            {errors["restaurant_status-error"]}
          </p>
        )}
      </div>
    </form>
    </>
  );
}

export function FoodFormButtons({
  loading,
  onCancel,
  disabled,
}: {
  loading?: boolean;
  onCancel: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="food-flex food-gap-3">
      <button
        data-test-id="food-submit-btn"
        type="submit"
        form="food-form"
        disabled={disabled}
        className="food-flex-1 food-rounded-xl food-bg-[#FFBA26] food-text-white food-px-6 food-py-3.5 food-font-semibold food-text-base hover:food-bg-[#FF9A0E] food-transition-colors disabled:food-opacity-60 disabled:food-cursor-not-allowed"
      >
        {loading ? "Saving..." : "Save"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="food-flex-1 food-rounded-xl food-border-2 food-border-slate-300 food-bg-white food-px-6 food-py-3.5 food-font-semibold food-text-base food-text-slate-700 hover:food-bg-slate-50 food-transition-colors disabled:food-opacity-60 disabled:food-cursor-not-allowed"
        disabled={disabled}
      >
        Cancel
      </button>
    </div>
  );
}
