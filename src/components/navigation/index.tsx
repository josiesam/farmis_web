"use client";

import React, { useContext, useState } from "react";
import {
  Breadcrumb,
  Button,
  Flex,
  Layout,
  Menu,
  Space,
  Switch,
  theme,
  Typography,
} from "antd";
import { ThemedTitleV2 } from "@refinedev/antd";
import Link from "next/link";
import { DashboardOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { ColorModeContext } from "@contexts/color-mode";

const { Header, Sider, Content, Footer } = Layout;

const items = new Array(15).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));

const CoreLayout = ({ children }: React.PropsWithChildren) => {
  const { mode, setMode } = useContext(ColorModeContext);

  const {
    token: { colorBgContainer, borderRadiusLG, colorTextHeading, colorPrimary },
  } = theme.useToken();

  return (
    <Layout>
        <Header
          style={{
            backgroundColor: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedTitleV2 text="FARMIS" collapsed={false} />

          <Menu
            style={{ backgroundColor: colorBgContainer }}
            mode="horizontal"
            items={[
              {
                label: <Link href={"/agro-registry"}>Registry</Link>,
                key: "registry",
              },
              {
                label: <Link href={"/marketplace"}>Market Place</Link>,
                key: "marketplace",
              },
              {
                label: <Link href={"/research"}>Research</Link>,
                key: "research",
              },
              {
                label: <Link href={"/event"}>Event</Link>,
                key: "event",
              },
            ]}
          />
          <div>
            <Space align="baseline">
              <div
                style={{
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Switch
                  checkedChildren="🌛"
                  unCheckedChildren="🔆"
                  onChange={() => setMode(mode === "light" ? "dark" : "light")}
                  defaultChecked={mode === "dark"}
                />
              </div>

              <Button
                color="primary"
                icon={<DashboardOutlined />}
                href="/dashboard"
              >
                Dashboard
              </Button>
            </Space>
          </div>
        </Header>
        <Content>
          <div
            style={{
              background: colorBgContainer,
              minHeight: 280,
              padding: 24,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center", backgroundColor: colorBgContainer }}>
          FARMIS ©{new Date().getFullYear()} Created by Alhaji Josie Sam
        </Footer>
    </Layout>
  );
};

export default CoreLayout;
