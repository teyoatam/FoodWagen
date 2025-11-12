"use client";

import { useState } from "react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import FoodCard, { FoodItem } from "@/components/food/FoodCard";
import AddEditModal from "@/components/food/AddEditModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/use-debounce";
import { FoodFormValues } from "./FoodForm";

type Mode = "form" | "delete" | null;

export default function FoodMain() {
  const qc = useQueryClient();

  const [search, setSearch] = useState("");
  const debounced = useDebounce(search, 400);
  const [open, setOpen] = useState<Mode>(null);
  const [selected, setSelected] = useState<FoodItem | null>(null);

  const { data, isLoading, isError } = useQuery<{ items: FoodItem[] }, Error>({
    queryKey: ["foods", debounced],
    queryFn: async () => {
      const url = debounced 
        ? `/api/food?name=${encodeURIComponent(debounced)}` 
        : "/api/food";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to load");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (v: FoodFormValues) => {
      const res = await fetch("/api/food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
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
      const res = await fetch(`/api/food?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
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
      const res = await fetch(`/api/food?id=${id}`, { method: "DELETE" });
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
    setOpen("form");
  };

  const startEdit = (item: FoodItem) => {
    setSelected(item);
    setOpen("form");
  };

  const startDelete = (item: FoodItem) => {
    setSelected(item);
    setOpen("delete");
  };

  return (
    <div className="food-min-h-screen food-bg-white">
      <Header onAdd={startAdd} />

  {/* Hero Section */}
  <section className="food-relative food-bg-[#FFB30E]">
        <div className="food-container food-mx-auto food-max-w-7xl food-px-4 food-flex food-flex-col md:food-flex-row food-items-center food-gap-8 food-py-12 md:food-py-16">
          <div className="food-flex-1 food-w-full food-pl-10">
            <h1 className="food-text-4xl md:food-text-5xl food-font-extrabold food-text-white food-mb-2">
              Are you starving?
            </h1>
            <p className="food-mt-2 food-text-white/90 food-text-base md:food-text-lg">
              Within a few clicks, find meals that are accessible near you
            </p>

            <div className="food-mt-6 food-rounded-xl food-bg-white food-p-3 md:food-p-4 food-shadow-lg food-max-w-xl">
              <div className="food-flex food-gap-2 food-mb-3">
                <button className="food-rounded-full food-bg-[#F17228] hover:food-bg-[#D1601B] food-text-white food-text-sm food-px-4 food-py-1.5 food-font-medium">
                  <span className="food-inline-flex food-items-center food-gap-1">
                    <svg className="food-h-4 food-w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Delivery
                  </span>
                </button>
                <button className="food-rounded-full food-bg-slate-100 food-text-slate-600 food-text-sm food-px-4 food-py-1.5 food-font-medium">
                  <span className="food-inline-flex food-items-center food-gap-1">
                    <svg className="food-h-4 food-w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Pickup
                  </span>
                </button>
              </div>
              <div className="food-flex food-flex-col sm:food-flex-row food-gap-2">
                <div className="food-flex-1 food-relative">
                  <svg className="food-absolute food-left-3 food-top-1/2 -food-translate-y-1/2 food-h-5 food-w-5 food-text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    id="food-search"
                    className="food-input food-w-full food-rounded-md food-border food-border-slate-200 food-pl-10 food-pr-3 food-py-2.5 focus:food-ring-2 focus:food-ring-orange-500 focus:food-outline-none"
                    placeholder="What do you have in mind?"
                    aria-label="Search foods"
                    data-test-id="food-search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <button className="food-rounded-md food-bg-orange-500 food-text-white food-px-6 food-py-2.5 food-font-medium hover:food-bg-orange-600 food-transition food-flex food-items-center food-justify-center food-gap-2">
                  <svg className="food-h-5 food-w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Find Meal
                </button>
              </div>
            </div>
          </div>
          <div className="food-flex-1 food-hidden md:food-block">
            <div className="food-relative food-h-64 md:food-h-80">
              {/* Decorative element */}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="food-container food-mx-auto food-max-w-7xl food-px-4 food-py-10 md:food-py-12">
        <h2 className="food-text-center food-text-2xl md:food-text-3xl food-font-semibold food-text-slate-800 food-mb-2">
          Featured Meals
        </h2>
        <p className="food-text-center food-text-slate-600 food-mb-8">Delicious food from restaurants near you</p>

        {isError && (
          <div className="empty-state-message food-mt-8 food-text-center food-p-8 food-bg-rose-50 food-rounded-xl">
            <svg className="food-h-12 food-w-12 food-text-rose-400 food-mx-auto food-mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="food-text-rose-600 food-font-medium">Failed to load items</p>
            <p className="food-text-rose-500 food-text-sm food-mt-1">Please try again later</p>
          </div>
        )}

        {isLoading && !debounced && (
          <div className="food-mt-8 food-text-center food-p-8">
            <div className="food-inline-block food-h-8 food-w-8 food-animate-spin food-rounded-full food-border-4 food-border-solid food-border-orange-500 food-border-r-transparent"></div>
            <p className="food-mt-3 food-text-slate-600">Loading delicious food...</p>
          </div>
        )}

        {isLoading && debounced && (
          <div className="food-mt-8 food-text-center food-p-8">
            <p className="food-text-slate-600 food-font-medium">No food found</p>
            <p className="food-text-slate-500 food-text-sm food-mt-1">Try a different name or add a new meal</p>
          </div>
        )}

        {!isLoading && data && data.items.length === 0 && (
          <div className="empty-state-message food-mt-8 food-text-center food-p-12 food-bg-slate-50 food-rounded-xl">
            <svg className="food-h-16 food-w-16 food-text-slate-300 food-mx-auto food-mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="food-text-slate-600 food-font-medium food-text-lg">{debounced ? 'No food found' : 'No items available'}</p>
            <p className="food-text-slate-500 food-text-sm food-mt-1">{debounced ? 'Try a different name or add a new meal' : 'Try searching for something else or add a new meal'}</p>
          </div>
        )}

        {data && data.items.length > 0 && (
          <>
            <div className="food-grid food-grid-cols-1 sm:food-grid-cols-2 lg:food-grid-cols-3 xl:food-grid-cols-4 food-gap-6">
              {data.items.map((item) => (
                <FoodCard key={item.id} item={item} onEdit={startEdit} onDelete={startDelete} />
              ))}
            </div>

            {data.items.length > 8 && (
              <div className="food-mt-10 food-text-center">
                <button className="food-rounded-full food-bg-orange-500 food-text-white food-px-6 food-py-2.5 food-font-medium hover:food-bg-orange-600 food-transition">
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      {/* Modals */}
      <AddEditModal
        open={open}
        setOpen={setOpen}
        selected={selected}
        createMutation={createMutation}
        updateMutation={updateMutation}
        deleteMutation={deleteMutation}
      />
    </div>
  );
}
