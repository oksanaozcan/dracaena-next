import { IProductsResource } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  category_id?: string;
  tag_id?: string; 
  q?: string; 
  page?: number;
  sort?: string;
}

const getProducts = async (query: Query): Promise<IProductsResource> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      search: query.q, 
      category_id: query.category_id,      
      tag_id: query.tag_id, 
      page: query.page,    
      sort: query.sort,            
    }
  });
  const res = await fetch(url, {cache: 'no-cache'});
  return res.json();
}

export default getProducts;