import Container from "@/components/ui/container"
// import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import DashboardSidebar from "./_components/DashboardSidebar";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import DashboardLayout from "./layout";
import { IUser } from "@/types";
import { userAgent } from "next/server";

export const revalidate = 0;

interface DashboardPageProps {
  params: {},  
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  params,
}) => {
 
  return (   
    <>
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
  </>
  )
}

export default DashboardPage;