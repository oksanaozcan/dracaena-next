'use client';

import { useUser } from "@clerk/clerk-react";
import React from "react";
import Container from "@/components/ui/container"
import DashboardSidebar from "./components/DashboardSidebar";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {  
  const { isSignedIn, user, isLoaded } = useUser(); 

  return (
    <Container>
      <div className="flex h-full">
        <DashboardSidebar userName={user?.firstName ?? ''}/>
        <div className="p-4">
          {children}
        </div>
      </div>       
    </Container>
  );
};

export default DashboardLayout;