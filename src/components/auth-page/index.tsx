"use client";
import { AuthPage as AuthPageBase, ThemedTitleV2 } from "@refinedev/antd";
import type { AuthPageProps } from "@refinedev/core";

export const AuthPage = (props: AuthPageProps) => {
  return (
    <AuthPageBase
      {...props}
      title={<ThemedTitleV2 text="FARMIS" collapsed={false} />}
      formProps={{
        initialValues: { email: "demo@farmis.org", password: "demodemo" },
      }}
    />
  );
};
