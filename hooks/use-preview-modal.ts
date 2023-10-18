import { create } from "zustand";
import { IProduct, IProductResource } from "@/types";

interface PreviewModalStore {
  isOpen: boolean;
  data?: IProductResource;
  onOpen: (data: IProduct) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: undefined,
  onOpen: (data: IProductResource) => set({data: data, isOpen: true}),
  onClose: () => set({isOpen: false})
}));

export default usePreviewModal;