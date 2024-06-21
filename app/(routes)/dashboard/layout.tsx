'use client';

import { useAuth } from "@/context/auth-contex";
import React from "react";
import Container from "@/components/ui/container"
import DashboardSidebar from "./_components/DashboardSidebar";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {  
  const {customer} = useAuth();

  return (
    <Container>
      <div className="flex h-full">
        <DashboardSidebar/>
        <div className="p-4">
          {children}
        </div>
      </div>       
    </Container>
  );
};

export default DashboardLayout;