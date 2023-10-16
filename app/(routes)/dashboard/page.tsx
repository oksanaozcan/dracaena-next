import Container from "@/components/ui/container"
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

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
        <h1>Dashboard for auth user</h1>
        <p>info about previous orders, subscriptions etc.</p>
      </Container>
    </div>
  )
}

export default DashboardPage;