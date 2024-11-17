'use client'

// import { Header } from "@components/header";
import { Header, ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import React from "react";

type Props = {};

const DashboardLayout = ({children}: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      Header={Header}
      Title={({collapsed}) => (
        <ThemedTitleV2 text={"FARMIS"} collapsed={collapsed} />
      )}
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default DashboardLayout;
