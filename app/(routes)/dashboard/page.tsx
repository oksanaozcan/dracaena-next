import Container from "@/components/ui/container"
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DashboardSidebar from "./components/DashboardSidebar";

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
        </div>       
      </Container>
    </div>
  )
}

export default DashboardPage;