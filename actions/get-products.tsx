import { IProductsResource } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  category_id?: string;
  tag_id?: string;
  colorId?: string; 
  isFeatured?: string;
}

const getProducts = async (query: Query): Promise<IProductsResource> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      category_id: query.category_id,      
      tag_id: query.tag_id,      
      colorId: query.colorId,
      isFeatured: query.isFeatured
    }
  });

  const res = await fetch(url);
  return res.json();
}

export default getProducts;