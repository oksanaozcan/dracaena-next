import Container from "@/components/ui/container"
import { redirect } from "next/navigation";
import DashboardSidebar  from '../../_components/DashboardSidebar';
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const revalidate = 0;

interface UpdateBillingPageProps {
  params: {}
}

const UpdateBillingPage: React.FC<UpdateBillingPageProps> = async ({
  params,
}) => {   

  return (
    <>    
    <h1>Add billing address</h1>                    
    </>
  )
}

export default UpdateBillingPage;