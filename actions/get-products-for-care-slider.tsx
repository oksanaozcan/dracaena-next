import {IProductsCareSliderResource} from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/care-slides`;

const getProductsForCareSlider = async (): Promise<IProductsCareSliderResource> => {
  const res = await fetch(URL);
  return res.json();
}

export default getProductsForCareSlider;