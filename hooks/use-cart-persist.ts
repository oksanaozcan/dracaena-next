// import { create } from "zustand";
// import { IProduct, IProductResource } from "@/types";
// import { persist, createJSONStorage } from "zustand/middleware";
// import toast from "react-hot-toast";

// interface CartStore {
//   items: IProduct[];
//   addItem: (data: IProduct) => void;
//   removeItem: (id: string) => void;
//   removeAll: () => void;

// }

// const useCart = create(
//   persist<CartStore>((set, get) => ({
//     items: [],
//     addItem: (data: IProduct) => {
//       const currentItems = get().items;
//       const existingItem = currentItems.find(item => item.id === data.id)

//       if (existingItem) {
//         return toast("Product already in cart")
//       }

//       set({items: [...get().items, data]});
//       toast.success("Product added to cart")
//     },
//     removeItem: (id: string) => {
//       set({items: [...get().items.filter((item) => item.id !== id)]})
//       toast.success("Product remove from cart")
//     },
//     removeAll: () => set({items: []})
//   }), {
//     name: "cart-storage",
//     storage: createJSONStorage(() => localStorage)
//   })
// );

// export default useCart;