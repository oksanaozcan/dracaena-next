import Container from "@/components/ui/container"
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DashboardSidebar  from '../../components/DashboardSidebar';
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const revalidate = 0;

interface UpdateDetailsPageProps {
  params: {}
}

const UpdateDetailsPage: React.FC<UpdateDetailsPageProps> = async ({
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
            <h1>Change your personal details</h1>
          </div>
        </div>       
      </Container>
    </div>
  )
}

export default UpdateDetailsPage;