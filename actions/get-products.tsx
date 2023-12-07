import { IProductsResource } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  category_id?: string;
  tag_id?: string; 
  q?: string; 
}

const getProducts = async (query: Query): Promise<IProductsResource> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      search: query.q, 
      category_id: query.category_id,      
      tag_id: query.tag_id,           
    }
  });

  const res = await fetch(url);
  return res.json();
}

export default getProducts;