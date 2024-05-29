import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
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
  const emailAddress = user?.emailAddresses[0].emailAddress;

  if (!user) {
    redirect('/sign-in?redirectUrl=/dashboard');
  } 

  // const emailAddress = user.emailAddresses[0]?.emailAddress || user.externalAccounts[0]?.emailAddress;

  return (
    <>
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
          <div className="py-2">
            <h4>Shipping address</h4>
            <p>No address configured</p>
            <Link href="/dashboard/my-details/update-shipping" className="flex items-center">Add shipping address&nbsp;<ChevronRight size={14} /></Link>
          </div>
          <div className="py-2">
            <h4>Billing address</h4>
            <p>No address configured</p>
            <Link href="/dashboard/my-details/update-billing" className="flex items-center">Add billing address&nbsp;<ChevronRight size={14} /></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyDetailsPage;