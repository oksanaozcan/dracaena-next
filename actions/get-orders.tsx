import { IOrder } from "@/types";
import axios from "axios";

const getOrders = async (): Promise<IOrder[]> => {

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/my-orders/user_2XpxHHpFdmBrIPKS7qL3tnCnb2n`);      
  if (!res) {
    throw new Error("Failed to fetch data");
  } 
  const orders = await res.data.data;    
  return orders;
}

export default getOrders;