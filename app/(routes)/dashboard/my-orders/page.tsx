import Container from "@/components/ui/container"
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DashboardSidebar from '../components/DashboardSidebar';
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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

  return (
    <div>
      <Container>
        <div className="flex h-full">
          <DashboardSidebar user={user}/>
          <div className="p-4">
            <h1>My Orders</h1> 
            <p>You've not ordered anything yet.</p>
          </div>
        </div>       
      </Container>
    </div>
  )
}

export default MyOrdersPage;