
export const revalidate = 0;

interface MyRestockNotificationPageProps {
  params: {}
}

const MyRestockNotificationPage: React.FC<MyRestockNotificationPageProps> = async ({
  params,
}) => {
  

  return (
    <>
    <div className="p-4">
      <h1>Restock notifications</h1> 
      <p>Good news! You will be notified as soon as our popular products are back in stock. We will send you an email as soon as they are available, so keep your inbox. This page contains an overview of the products you have subscribed to.</p>
      <div className="py-2">
        <h2>Your subscriptions</h2>
        <p>You are not subscribed on any of our out of stock products.</p>
      </div>
    </div>
    </>
  )
}

export default MyRestockNotificationPage;