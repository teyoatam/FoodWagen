import Modal from "@/components/common/Modal";
import DeleteModal from "@/components/food/DeleteModal";
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
      <DeleteModal
        open={open === "delete"}
        onOpenChange={(o) => setOpen(o ? "delete" : null)}
        selected={selected}
        deleteMutation={deleteMutation}
      />
    </>
  );
}
