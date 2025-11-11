import { useEffect, useMemo, useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Modal from "@/components/common/Modal";
import FoodCard, { FoodItem } from "@/components/food/FoodCard";
import FoodForm, { FoodFormValues } from "@/components/food/FoodForm";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "../hooks/use-debounce";

const API = "https://6852821e0594059b23cdd834.mockapi.io/Food";

type Mode = "add" | "edit" | "delete" | null;

export default function Index() {
  const qc = useQueryClient();

  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 400);
  const [open, setOpen] = useState<Mode>(null);
  const [selected, setSelected] = useState<FoodItem | null>(null);

  const { data, isLoading, isError, refetch } = useQuery<{ items: FoodItem[] }, Error>({
    queryKey: ["foods", debounced],
    queryFn: async () => {
      const res = await fetch(`${API}${debounced ? `?name=${encodeURIComponent(debounced)}` : ""}`);
      if (!res.ok) throw new Error("Failed to load");
      const items = (await res.json()) as any[];
      const normalized: FoodItem[] = items.map((x) => ({
        id: String(x.id ?? crypto.randomUUID()),
        name: x.name ?? x.food_name ?? "Untitled",
        image: x.image ?? x.food_image ?? x.avatar ?? "/placeholder.svg",
        price: x.price ?? x.amount ?? x.priceLabel ?? undefined,
        rating: typeof x.rating === "number" ? x.rating : Number(x.food_rating ?? 0) || undefined,
        restaurant: x.restaurant ?? {
          name: x.restaurant_name,
          logo: x.restaurant_logo,
          status: x.restaurant_status,
        },
      }));
      return { items: normalized };
    },
  });

  const createMutation = useMutation({
    mutationFn: async (v: FoodFormValues) => {
      const body = {
        name: v.food_name,
        image: v.food_image,
        rating: v.food_rating,
        restaurant: {
          name: v.restaurant_name,
          logo: v.restaurant_logo,
          status: v.restaurant_status,
        },
      };
      const res = await fetch(API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error("Create failed");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["foods"] });
      setOpen(null);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: FoodFormValues }) => {
      const body = {
        name: values.food_name,
        image: values.food_image,
        rating: values.food_rating,
        restaurant: {
          name: values.restaurant_name,
          logo: values.restaurant_logo,
          status: values.restaurant_status,
        },
      };
      const res = await fetch(`${API}/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error("Update failed");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["foods"] });
      setOpen(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["foods"] });
      setOpen(null);
    },
  });

  const startAdd = () => {
    setSelected(null);
    setOpen("add");
  };
  const startEdit = (item: FoodItem) => {
    setSelected(item);
    setOpen("edit");
  };
  const startDelete = (item: FoodItem) => {
    setSelected(item);
    setOpen("delete");
  };

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
    <div className="food-min-h-screen food-bg-white">
      <Header onAdd={startAdd} />

      <section className="food-relative food-bg-gradient-to-br food-from-amber-300 food-to-orange-500">
        <div className="food-container food-mx-auto food-flex food-flex-col md:food-flex-row food-items-center food-gap-8 food-py-16">
          <div className="food-flex-1">
            <h1 className="food-text-4xl md:food-text-5xl food-font-extrabold food-text-white">
              Are you starving?
            </h1>
            <p className="food-mt-2 food-text-white/90">Within a few clicks, find meals that are accessible near you</p>

            <div className="food-mt-6 food-rounded-xl food-bg-white food-p-3 food-shadow-lg food-max-w-xl">
              <div className="food-flex food-gap-2 food-mb-2">
                <button className="food-rounded-full food-bg-orange-50 food-text-orange-600 food-text-sm food-px-3 food-py-1">Delivery</button>
                <button className="food-rounded-full food-bg-slate-100 food-text-slate-600 food-text-sm food-px-3 food-py-1">Pickup</button>
              </div>
              <div className="food-flex food-gap-2">
                <input
                  id="food-search"
                  className="food-input food-flex-1 food-rounded-md food-border food-border-slate-200 food-px-3 food-py-2"
                  placeholder="What do you have in mind?"
                  aria-label="Search foods"
                  data-test-id="food-search-input"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="food-rounded-md food-bg-orange-500 food-text-white food-px-5">Find Meal</button>
              </div>
            </div>
          </div>
          <div className="food-flex-1" />
        </div>
      </section>

      <main className="food-container food-mx-auto food-py-10">
        <h2 className="food-text-center food-text-2xl food-font-semibold food-text-slate-800">Featured Meals</h2>

        {isError && (
          <p className="empty-state-message food-mt-8 food-text-center food-text-rose-600">Failed to load items</p>
        )}
        {isLoading && (
          <p className="food-mt-8 food-text-center">Loading...</p>
        )}
        {!isLoading && data && data.items.length === 0 && (
          <p className="empty-state-message food-mt-8 food-text-center">No items available</p>
        )}

        <div className="food-mt-8 food-grid food-grid-cols-1 sm:food-grid-cols-2 lg:food-grid-cols-3 xl:food-grid-cols-4 food-gap-6">
          {data?.items.map((item) => (
            <FoodCard key={item.id} item={item} onEdit={startEdit} onDelete={startDelete} />
          ))}
        </div>

        {data?.items.length ? (
          <div className="food-mt-10 food-text-center">
            <button className="food-rounded-full food-bg-orange-500 food-text-white food-px-5 food-py-2">Load More</button>
          </div>
        ) : null}
      </main>

      <Footer />

      <Modal open={open === "add"} onOpenChange={(o) => setOpen(o ? "add" : null)} title="Add a meal">
        <FoodForm
          onCancel={() => setOpen(null)}
          onSubmit={(v) => createMutation.mutate(v)}
          loading={createMutation.isPending}
        />
      </Modal>

      <Modal open={open === "edit"} onOpenChange={(o) => setOpen(o ? "edit" : null)} title="Edit Meal">
        <FoodForm
          initial={initialForEdit}
          onCancel={() => setOpen(null)}
          onSubmit={(v) => selected && updateMutation.mutate({ id: selected.id, values: v })}
          loading={updateMutation.isPending}
        />
      </Modal>

      <Modal open={open === "delete"} onOpenChange={(o) => setOpen(o ? "delete" : null)} title="Delete Meal" widthClass="food-w-[420px]">
        <div className="food-space-y-4">
          <p className="food-text-center">Are you sure you want to delete the meal? Action cannot be reversed.</p>
          <div className="food-flex food-justify-end food-gap-3">
            <button className="food-rounded-md food-border food-border-slate-200 food-bg-white food-px-4 food-py-2" onClick={() => setOpen(null)}>
              Cancel
            </button>
            <button
              data-test-id="food-confirm-delete-btn"
              className="food-rounded-md food-bg-orange-500 food-text-white food-px-5 food-py-2 disabled:food-opacity-60"
              onClick={() => selected && deleteMutation.mutate(selected.id)}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Yes"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
