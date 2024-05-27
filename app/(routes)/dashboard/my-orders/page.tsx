import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import OrderTable from "./components/order-table";
import getOrders from "@/actions/get-orders";

export const revalidate = 0;

interface MyOrdersPageProps {
  params: {}
}

const MyOrdersPage: React.FC<MyOrdersPageProps> = async ({
  params,
}) => {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in?redirectUrl=/dashboard');
  } 

  const ordersData = await getOrders();
  const [orders] = await Promise.all([ordersData])
 
  return (
   <>
    <h1>My Orders</h1> 
    <p>You've not ordered anything yet.</p>

    <div>
      <OrderTable orders={orders}/>
    </div>
   </>
  )
}

export default MyOrdersPage;