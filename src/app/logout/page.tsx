"use client";

import { AuthPage } from "@components/auth-page";
import { useLogout, useTranslate } from "@refinedev/core";
import { Button, Card, Layout, Spin, theme, Typography } from "antd";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const Logout = (props: Props) => {
  const { mutate, isLoading } = useLogout();
  const { token } = theme.useToken();
  const translate = useTranslate();

  const CardTitle = (
    <Typography.Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
      }}
    >
      {translate("pages.register.title", "See you again soon")}
    </Typography.Title>
  );

  return (
    <AuthPage type="login" renderContent={(content, title) => (
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        title={CardTitle}
        styles={{
          body: { padding: 0, marginTop: "32px" },
          header: { borderBottom: 0, padding: 0 },
        }}
        style={{
          backgroundColor: token.colorBgElevated,
          maxWidth: "400px",
          margin: "auto",
          padding: "32px",
          boxShadow:
            "0px 2px 4px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 1px 2px rgba(0, 0, 0, 0.03)",
        }}
      >
        {isLoading ? <Spin tip="Loading..." size="large" /> : <></>}
        <Button
          block
          color="primary"
          onClick={() => {
            mutate();
          }}
          disabled={isLoading}
        >
          Log out
        </Button>
      </Card>
    </div>
    )} />


  );
};

export default Logout;
