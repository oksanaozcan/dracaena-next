import { IProduct, IProductResource } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (id: string): Promise<IProduct> => {
  try {
    const res = await fetch(`${URL}/${id}`);
    
    if (!res.ok) {      
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    
    const data: IProductResource = await res.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export default getProduct;
