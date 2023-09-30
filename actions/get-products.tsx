import { IProductsResource } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface Query {
  category_id?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: string;
}

const getProducts = async (query: Query): Promise<IProductsResource> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      colorId: query.colorId,
      sizeId: query.sizeId,
      category_id: query.category_id,
      isFeatured: query.isFeatured
    }
  });

  const res = await fetch(url);
  return res.json();
}

export default getProducts;