import { ICategoryResource } from "@/types"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formNavigationObjectFromJsonData (data: ICategoryResource, pathname: string) {

  const routes = data.data.map((route) => ({
    id: route.id,
    href: `/category/${route.id}`,
    label: route.title,
    active: pathname === `/category/${route.id}`,
    category_filters: route.category_filters.map(f => (
      {
        id: f.id,
        title: f.title,
        category_id: f.category_id
      }
    )),
    tags: route.tags.map(t => ({
      id: t.id,
      title: t.title,
      href: `/tag/${t.id}`,
      category_filter_id: t.category_filter_id
    })),
  }))

  return routes;
}