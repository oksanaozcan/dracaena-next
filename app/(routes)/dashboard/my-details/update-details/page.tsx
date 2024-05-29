import Container from "@/components/ui/container"
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DashboardSidebar  from '../../_components/DashboardSidebar';
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
    <>
    <h1>Change your personal details</h1>
    </>
  )
}

export default UpdateDetailsPage;