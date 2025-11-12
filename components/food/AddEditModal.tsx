import Modal from "@/components/common/Modal";
import FoodForm, { FoodFormValues, FoodFormButtons } from "@/components/food/FoodForm";
import { FoodItem } from "@/components/food/FoodCard";
import { UseMutationResult } from "@tanstack/react-query";

type Mode = "form" | "delete" | null;

interface AddEditModalProps {
  open: Mode;
  setOpen: (mode: Mode) => void;
  selected: FoodItem | null;
  createMutation: UseMutationResult<any, Error, FoodFormValues, unknown>;
  updateMutation: UseMutationResult<any, Error, { id: string; values: FoodFormValues }, unknown>;
  deleteMutation: UseMutationResult<any, Error, string, unknown>;
}

export default function AddEditModal({
  open,
  setOpen,
  selected,
  createMutation,
  updateMutation,
  deleteMutation,
}: AddEditModalProps) {
  const initialForEdit: Partial<FoodFormValues> | undefined = selected
    ? {
        food_name: selected.name,
        food_image: selected.image,
        food_rating: selected.rating ?? 3,
        restaurant_name: selected.restaurant?.name ?? "",
        restaurant_logo: selected.restaurant?.logo ?? "",
        restaurant_status:
          selected.restaurant?.status === "Open Now" || selected.restaurant?.status === "Closed"
            ? (selected.restaurant?.status as any)
            : "Open Now",
      }
    : undefined;

  return (
    <>
      {/* Add/Edit Food Modal */}
      <Modal 
        open={open === "form"} 
        onOpenChange={(o) => setOpen(o ? "form" : null)} 
        title={selected ? "Edit Meal" : "Add a meal"}
        footer={
          <FoodFormButtons
            loading={createMutation.isPending || updateMutation.isPending}
            onCancel={() => setOpen(null)}
            disabled={createMutation.isPending || updateMutation.isPending}
          />
        }
      >
        <FoodForm
          initial={initialForEdit}
          onCancel={() => setOpen(null)}
          onSubmit={(v) => {
            if (selected) {
              updateMutation.mutate({ id: selected.id, values: v });
            } else {
              createMutation.mutate(v);
            }
          }}
          loading={createMutation.isPending || updateMutation.isPending}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={open === "delete"}
        onOpenChange={(o) => setOpen(o ? "delete" : null)}
        title="Delete Meal"
        widthClass="food-w-full md:food-w-[420px]"
      >
        <div className="food-space-y-4">
          <div className="food-text-center food-py-4">
            <div className="food-inline-flex food-items-center food-justify-center food-h-16 food-w-16 food-rounded-full food-bg-green-100 food-mb-4">
              <svg className="food-h-8 food-w-8 food-text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="food-text-slate-700">Are you sure you want to delete this meal?</p>
            <p className="food-text-slate-500 food-text-sm food-mt-1">This action cannot be reversed.</p>
          </div>
          <div className="food-flex food-justify-center food-gap-3">
            <button
              className="food-rounded-md food-border food-border-slate-200 food-bg-white food-px-6 food-py-2 food-text-slate-700 hover:food-bg-slate-50 food-transition"
              onClick={() => setOpen(null)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </button>
            <button
              data-test-id="food-confirm-delete-btn"
              className="food-rounded-md food-bg-orange-500 food-text-white food-px-6 food-py-2 hover:food-bg-orange-600 disabled:food-opacity-60 food-transition"
              onClick={() => selected && deleteMutation.mutate(selected.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Yes"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
