import { ICategoryResource } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/navigation`;

const getCategories = async (): Promise<ICategoryResource> => {
  const res = await fetch(URL);
  return res.json();
}

export default getCategories;