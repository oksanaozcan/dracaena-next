import Container from "@/components/ui/container"
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DashboardSidebar from '../components/DashboardSidebar';
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const revalidate = 0;

interface MyDetailsPageProps {
  params: {}
}

const MyDetailsPage: React.FC<MyDetailsPageProps> = async ({
  params,
}) => {
  const user = await currentUser();

  if (!user) {
    redirect('/sign-in?redirectUrl=/dashboard');
  } 

  const emailAddress = user.emailAddresses[0]?.emailAddress || user.externalAccounts[0]?.emailAddress;

  return (
    <div>
      <Container>
        <div className="flex h-full">
          <DashboardSidebar user={user}/>
          <div className="p-4">
            <h1 className="text-center">Personal details</h1>
            <p>This is your personal detail page, here you can see an overview of your personal information.</p>     
            <div className="flex justify-between py-4">
              <div className="flex flex-col space-y-4">
                <h2>Basics</h2>
                <div>
                  <h4>Name:</h4>
                  <p>{user.firstName} {user.lastName}</p>
                </div>
                <div>
                  <h4>Email:</h4>
                  <p>{emailAddress}</p>
                </div>
                <div>
                  <h4>Birthdate:</h4>
                  <p>{user.birthday ? user.birthday : '---' }</p>
                </div>
                <div>
                  <h4>Newsletter</h4>
                  <p>No</p>
                </div>
                <div>
                  <Link href="/dashboard/my-details/update-details" className="flex items-center">Update personal details&nbsp;<ChevronRight size={14} /></Link>
                </div>
              </div>
              <div>
                <h2>Addresses</h2>              
              </div>
            </div>
          </div>
        </div>       
      </Container>
    </div>
  )
}

export default MyDetailsPage;