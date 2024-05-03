import Container from "@/components/ui/container"
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DashboardSidebar from "./components/DashboardSidebar";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const revalidate = 0;

interface DashboardPageProps {
  params: {}
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
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
            <div className="py-2">
              <h2>Account overview</h2>
              <p>This is your account overview.</p>
            </div>
            <div className="py-2">
              <h2>Your latest order</h2>
              <p>You've not ordered anything yet.</p>
              <Link href="/dashboard/my-orders" className="flex items-center">View all your orders&nbsp;<ChevronRight size={14} /></Link>
            </div>
            <div className="py-2">
              <h3>A selection from your wishlist</h3>
              <p>You have not selected any favourites yet.</p>
            </div>
            <div className="py-2">
              <h3>Recently viewed items</h3>
              <Link href="#" className="flex items-center">Start browsing! Your viewed list is empty.&nbsp;<ChevronRight size={14} /></Link>
            </div>
          
          </div>
        </div>       
      </Container>
    </div>
  )
}

export default DashboardPage;