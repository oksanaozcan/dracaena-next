import OrderTable from "./components/order-table";

export const revalidate = 0;

interface MyOrdersPageProps {
  params: {}
}

const MyOrdersPage: React.FC<MyOrdersPageProps> = async ({ params }) => {
    return (
      <>
        <h1>My Orders</h1>
        <p>You've not ordered anything yet.</p>
        <div>
          <OrderTable/>
        </div>
      </>
    )
  }
   

export default MyOrdersPage;

// import OrderTable from "./components/order-table";
// import getOrders from "@/actions/get-orders";

// export const revalidate = 0;

// interface MyOrdersPageProps {
//   params: {}
// }

// const MyOrdersPage: React.FC<MyOrdersPageProps> = async ({
//   params,
// }) => {
  
//   const ordersData = await getOrders();
//   const [orders] = await Promise.all([ordersData])
 
//   return (
//    <>
//     <h1>My Orders</h1> 
//     <p>You've not ordered anything yet.</p>

//     <div>
//       <OrderTable orders={orders}/>
//     </div>
//    </>
//   )
// }

// export default MyOrdersPage;