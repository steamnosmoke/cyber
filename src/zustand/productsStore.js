import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductsStore = create(
  persist(
    (set) => ({
      category: "Phones",
      product: {},
      isFilterOpened: true,
      filters: [],
      confirmedFilters: [],
      comment: "",
      filteredProducts: [],
      sortingParams: { param: "price", mod: "desc" },

      setProduct: (product) =>
        set(() => ({
          product,
        })),

      setComment: (comment) =>
        set(() => ({
          comment,
        })),

      setFilters: (filter) => {
        set((state) => {
          const { title, value } = filter;
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
                updatedFilters[index] = { title, values };
              }
            } else {
              values.push(value);
              updatedFilters[index] = { title, values };
            }
          } else {
            updatedFilters.push({ title, values: [value] });
          }
          return { filters: updatedFilters };
        });
      },

      clearFilters: () => set(() => ({ filters: [], confirmedFilters: [] })),

      setConfirmedFilters: () =>
        set((state) => ({ confirmedFilters: state.filters })),

      setFilterOpened: () =>
        set((state) => ({ isFilterOpened: !state.isFilterOpened })),

      setCategory: (category) =>
        set(() => ({
          category: category.charAt(0).toUpperCase() + category.slice(1),
        })),

      setFilteredProducts: (products) =>
        set((state) => {
          const filters = {};
          state.confirmedFilters.forEach((item) => {
            filters[item.title] = item.values;
          });

          const filteredProducts = products.filter((product) => {
            if (
              filters["Brands"] &&
              !filters["Brands"].includes(product.brand)
            ) {
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
              const isPriceInRange = filters["Price Range"].some((range) => {
                const [minStr, maxStr] = range.split("-");
                const minPrice = parseFloat(minStr);
                const maxPrice = parseFloat(maxStr);
                return (
                  product.totalPrice >= minPrice &&
                  product.totalPrice <= maxPrice
                );
              });

              if (!isPriceInRange) {
                return false;
              }
            }

            return true;
          });
          const { param, mod } = state.sortingParams;

          filteredProducts.sort((a, b) => {
            switch (param) {
              case "price":
                const priceA = a.totalPrice;
                const priceB = b.totalPrice;
                return mod === "asc" ? priceA - priceB : priceB - priceA;
              case "rating":
                const ratingA = a.rating || 0;
                const ratingB = b.rating || 0;
                return mod === "asc" ? ratingA - ratingB : ratingB - ratingA;
              default:
                return 0;
            }
          });

          return { filteredProducts };
        }),

      setSortingParams: (sortingParams) =>
        set(() => ({
          sortingParams,
        })),
    }),

    {
      name: "product-storage",
      partialize: (state) => ({
        product: state.product,
        category: state.category,
        filters: state.confirmedFilters,
        confirmedFilters: state.confirmedFilters,
        filteredProducts: state.filteredProducts,
      }),
    }
  )
);
