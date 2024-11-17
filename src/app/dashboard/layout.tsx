"use server";

import DashboardLayout from "@components/dashboard-layout";
import { Header } from "@components/header";
import { authProviderServer } from "@providers/auth-provider";
import { ThemedLayoutV2} from "@refinedev/antd";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  // const data = await getData();

  // if (!data.authenticated) {
  //   return redirect(data?.redirectTo || "/login");
  // }


  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}

async function getData() {
  const { authenticated, redirectTo } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
  };
}

