import Container from "@/components/ui/container"
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DashboardSidebar from '../components/DashboardSidebar';
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const revalidate = 0;

interface MyFavouritesPageProps {
  params: {}
}

const MyFavouritesPage: React.FC<MyFavouritesPageProps> = async ({
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
          <DashboardSidebar userName={user?.firstName ?? ''}/>
          <div className="p-4">
            <h1>Wishlist</h1> 
            <p>Welcome to your personal jungle oasis! Browse your wishlist and let your green thumb run wild as you curate the ultimate indoor garden that will make all your plant parent friends green with envy.</p>
            <div className="py-2">
              <h2>Your favourites</h2>
              <p>You have not selected any favourites yet.</p>
            </div>
          </div>
        </div>       
      </Container>
    </div>
  )
}

export default MyFavouritesPage;