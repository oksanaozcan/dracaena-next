'use server'

import getProducts from "./get-products"

export async function fetchProducts({
  page = 1,
  search,
  category_id,
  tag_id,
  sort,
}: {
  page?: number
  search?: string | undefined
  category_id?: string;
  tag_id?: string;
  sort?: string;
}) {
  const products = await getProducts({ q: search, page, category_id, tag_id, sort })
  return products;
}
