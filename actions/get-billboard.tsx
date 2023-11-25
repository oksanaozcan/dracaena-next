import { IBillboard } from "@/types";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

interface Query {
  category_id?: string;
  tag_id?: string;  
}

const getBillboard = async (query: Query): Promise<IBillboard> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      category_id: query.category_id,
      tag_id: query.tag_id,
    }
  });

  const res = await fetch(url);
  return res.json();
}

export default getBillboard