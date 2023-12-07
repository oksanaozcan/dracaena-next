'use server'

import getProducts from "./get-products"

export async function fetchProducts({
  page = 1,
  search
}: {
  page?: number
  search?: string | undefined
}) {
  const products = await getProducts({ q: search, page })
  return products;
}
