"use server";

import { Header } from "@components/header";
import CoreLayout from "@components/navigation";
import { authProviderServer } from "@providers/auth-provider";
import { ThemedLayoutV2 } from "@refinedev/antd";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <CoreLayout>{children}</CoreLayout>
    </div>
  );
}
