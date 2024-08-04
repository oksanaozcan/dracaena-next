'use server'

import getProducts from "./get-products"

export async function fetchProducts({
  page = 1,
  search,
  category_id,
  tag_id,
  sort,
  category_filter_id,
}: {
  page?: number
  search?: string | undefined
  category_id?: string;
  tag_id?: string;
  sort?: string;
  category_filter_id?: string;
}) {
  const products = await getProducts({ q: search, page, category_id, tag_id, sort, category_filter_id })
  return products;
}
