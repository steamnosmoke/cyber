import { create } from "zustand";
import { persist } from "zustand/middleware";

import { TStoreState } from "../types";

export const useFilterStore = create<TStoreState>()(
  persist(
    (set, get) => ({
      isFilterOpened: true,
      filters: [],
      confirmedFilters: [],
      filteredProducts: [],
      sortingParams: { param: "price", mod: "desc" },

      setFilters: ({ title, value }) => {
        set((state) => {
          const existingFilter = state.filters.find((f) => f.title === title);
          const updatedFilters = [...state.filters];

          if (existingFilter) {
            const index = updatedFilters.findIndex((f) => f.title === title);
            const values = [...existingFilter.values];
            const valueIndex = values.indexOf(value);

            if (valueIndex > -1) {
              values.splice(valueIndex, 1);
              if (values.length === 0) {
                updatedFilters.splice(index, 1);
              } else {
                updatedFilters[index] = {
                  ...existingFilter,
                  values,
                };
              }
            } else {
              values.push(value);
              updatedFilters[index] = {
                ...existingFilter,
                values,
              };
            }
          } else {
            updatedFilters.push({
              title,
              values: [value],
            });
          }

          return { filters: updatedFilters };
        });
      },

      clearFilters: () => set({ filters: [], confirmedFilters: [] }),

      setConfirmedFilters: () =>
        set((state) => ({ confirmedFilters: state.filters })),

      setFilterOpened: () =>
        set((state) => ({ isFilterOpened: !state.isFilterOpened })),

      setFilteredProducts: (products) => {
        const state = get();
        const filters: Record<string, string[]> = {};

        state.confirmedFilters.forEach((item) => {
          filters[item.title] = item.values;
        });

        const filteredProducts = products.filter((product) => {
          if (filters["Brands"] && !filters["Brands"].includes(product.brand)) {
            return false;
          }

          if (
            filters["Memory"] &&
            !filters["Memory"].includes(product.memory)
          ) {
            return false;
          }

          if (
            filters["Screen Size"] &&
            !filters["Screen Size"].includes(product.screenSize)
          ) {
            return false;
          }

          if (filters["Price Range"] && filters["Price Range"].length > 0) {
            const isInRange = filters["Price Range"].some((range) => {
              const [minStr, maxStr] = range.split("-");
              const min = parseFloat(minStr);
              const max = parseFloat(maxStr);
              return product.totalPrice >= min && product.totalPrice <= max;
            });

            if (!isInRange) return false;
          }

          return true;
        });

        const { param, mod } = state.sortingParams;

        filteredProducts.sort((a, b) => {
          const aValue = param === "price" ? a.totalPrice : a.rating || 0;
          const bValue = param === "price" ? b.totalPrice : b.rating || 0;
          return mod === "asc" ? aValue - bValue : bValue - aValue;
        });

        set({ filteredProducts });
      },

      setSortingParams: (params) => set({ sortingParams: params }),
    }),
    {
      name: "product-storage",
      partialize: (state) => ({
        filters: state.confirmedFilters,
        confirmedFilters: state.confirmedFilters,
        filteredProducts: state.filteredProducts,
      }),
    }
  )
);
