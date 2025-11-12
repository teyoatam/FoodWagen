import Modal from "@/components/common/Modal";
import { FoodItem } from "@/components/food/FoodCard";
import { UseMutationResult } from "@tanstack/react-query";

interface DeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected: FoodItem | null;
  deleteMutation: UseMutationResult<any, Error, string, unknown>;
}

export default function DeleteModal({
  open,
  onOpenChange,
  selected,
  deleteMutation,
}: DeleteModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Meal"
      widthClass="food-w-full md:food-w-[520px]"
      titleClassName="food-text-[#FFBA26]"
    >
      <div className="food-space-y-6 food-py-4">
        <p className="food-text-center food-text-slate-600">
          Are you sure you want to delete this meal? Actions cannot be reversed.
        </p>
        
        <div className="food-flex food-justify-center food-gap-3">
          <button
            data-test-id="food-confirm-delete-btn"
            className="food-flex-1 food-max-w-[200px] food-rounded-lg food-bg-[#FFBA26] food-text-white food-text-[11px] food-font-bold food-px-8 food-py-3 hover:food-bg-[#FF9A0E] disabled:food-opacity-60 food-transition food-shadow-md"
            onClick={() => selected && deleteMutation.mutate(selected.id)}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Yes"}
          </button>
          <button
            className="food-flex-1 food-max-w-[200px] food-rounded-lg food-border-2 food-border-slate-300 food-bg-white food-text-slate-700 food-text-[11px] food-font-bold food-px-8 food-py-3 hover:food-bg-slate-50 food-transition"
            onClick={() => onOpenChange(false)}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
