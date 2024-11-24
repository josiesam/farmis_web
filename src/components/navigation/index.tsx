"use client";

import React, { useContext, useState } from "react";
import {
  Button,
  Menu,
  Space,
  Switch,
  theme,
  Typography,
  Layout as AntDesignLayout,
  Grid,
} from "antd";
import { ThemedLayoutV2, ThemedSiderV2, ThemedTitleV2 } from "@refinedev/antd";
import Link from "next/link";
import {
  CalendarOutlined,
  DashboardOutlined,
  DatabaseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { ColorModeContext } from "@contexts/color-mode";
import { useLink, useRouterContext, useRouterType } from "@refinedev/core";


const CoreLayout = ({ children }: React.PropsWithChildren) => {
  const { mode, setMode } = useContext(ColorModeContext);

  const { token } = theme.useToken();
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;
  const breakpoint = Grid.useBreakpoint();

  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  const HeaderLogo = () => (
    <ActiveLink
      to="/"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "inherit",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "24px",
            width: "24px",
            color: token.colorPrimary,
          }}
        >
          {
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-testid="refine-logo"
              id="refine-default-logo"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M13.7889 0.422291C12.6627 -0.140764 11.3373 -0.140764 10.2111 0.422291L2.21115 4.42229C0.85601 5.09986 0 6.48491 0 8V16C0 17.5151 0.85601 18.9001 2.21115 19.5777L10.2111 23.5777C11.3373 24.1408 12.6627 24.1408 13.7889 23.5777L21.7889 19.5777C23.144 18.9001 24 17.5151 24 16V8C24 6.48491 23.144 5.09986 21.7889 4.42229L13.7889 0.422291ZM8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8V16C16 18.2091 14.2091 20 12 20C9.79086 20 8 18.2091 8 16V8Z"
                fill="currentColor"
              ></path>
              <path
                d="M14 8C14 9.10457 13.1046 10 12 10C10.8954 10 10 9.10457 10 8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8Z"
                fill="currentColor"
              ></path>
            </svg>
          }
        </div>

        {!isMobile && (
          <Typography.Title
            style={{
              fontSize: "inherit",
              marginBottom: 0,
              fontWeight: 700,
            }}
          >
            {"FARMIS"}
          </Typography.Title>
        )}
      </Space>
    </ActiveLink>
  );

  // return (
  //   <Layout>
  //       <Header
  //         style={{
  //           backgroundColor: colorBgContainer,
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "space-between",
  //         }}
  //       >
  //         <ThemedTitleV2 text="FARMIS" collapsed={false} />

  // <Menu
  //   style={{ backgroundColor: colorBgContainer }}
  //   mode="horizontal"
  //   items={[
  //     {
  //       label: <Link href={"/agro-registry"}>Registry</Link>,
  //       key: "registry",
  //     },
  //     {
  //       label: <Link href={"/marketplace"}>Market Place</Link>,
  //       key: "marketplace",
  //     },
  //     {
  //       label: <Link href={"/research"}>Research</Link>,
  //       key: "research",
  //     },
  //     {
  //       label: <Link href={"/event"}>Event</Link>,
  //       key: "event",
  //     },
  //   ]}
  // />
  //         <div>
  //           <Space align="baseline">
  //             <div
  //               style={{
  //                 height: "32px",
  //                 display: "flex",
  //                 alignItems: "center",
  //               }}
  //             >
  //               <Switch
  //                 checkedChildren="🌛"
  //                 unCheckedChildren="🔆"
  //                 onChange={() => setMode(mode === "light" ? "dark" : "light")}
  //                 defaultChecked={mode === "dark"}
  //               />
  //             </div>

  //             <Button
  //               color="primary"
  //               icon={<DashboardOutlined />}
  //               href="/dashboard"
  //             >
  //               Dashboard
  //             </Button>
  //           </Space>
  //         </div>
  //       </Header>
  //       <Content>
  //         <div
  //           style={{
  //             background: colorBgContainer,
  //             minHeight: 280,
  //             padding: 24,
  //             borderRadius: borderRadiusLG,
  //           }}
  //         >
  //           {children}
  //         </div>
  //       </Content>
  //       <Footer style={{ textAlign: "center", backgroundColor: colorBgContainer }}>
  //         FARMIS ©{new Date().getFullYear()} Created by Alhaji Josie Sam
  //       </Footer>
  //   </Layout>
  // );
  return (
    <ThemedLayoutV2
      Header={() => (
        <AntDesignLayout.Header
          style={{
            backgroundColor: token.colorBgElevated,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <HeaderLogo />

          {!isMobile && (
            <Menu
            style={{ backgroundColor: token.colorBgElevated }}
            mode="horizontal"
            items={[
              {
                label: (
                  <ActiveLink to={"/agro-registry"}>Registry</ActiveLink>
                ),
                key: "registry",
              },
              {
                label: (
                  <ActiveLink to={"/marketplace"}>
                    Market Place
                  </ActiveLink>
                ),
                key: "marketplace",
              },
              {
                label: <ActiveLink to={"/research"}>Research</ActiveLink>,
                key: "research",
              },
              {
                label: <ActiveLink to={"/event"}>Event</ActiveLink>,
                key: "event",
              },
            ]}
          />
          )}

          <Space size="small">
            <Switch
              checkedChildren="🌛"
              unCheckedChildren="🔆"
              onChange={() => setMode(mode === "light" ? "dark" : "light")}
              defaultChecked={mode === "dark"}
            />

            <Button
              color="primary"
              icon={<DashboardOutlined />}
              href="/dashboard"
            >
              {!isMobile && <span>Dashboard</span>}
            </Button>
          </Space>
        </AntDesignLayout.Header>
      )}
      Sider={() => (isMobile &&
        <ThemedSiderV2
          Title={({ collapsed }) => (
            <ThemedTitleV2 collapsed={collapsed} text="FARMIS" />
          )}
          render={({ items, logout, collapsed }) => {
            return (
              <>
                <Menu
                  style={{ backgroundColor: token.colorBgContainer }}
                  mode="vertical"
                  items={[
                    {
                      label: (
                        <ActiveLink to={"/agro-registry"}>Registry</ActiveLink>
                      ),
                      key: "registry",
                      icon: <DatabaseOutlined />
                    },
                    {
                      label: (
                        <ActiveLink to={"/marketplace"}>
                          Market Place
                        </ActiveLink>
                      ),
                      key: "marketplace",
                      icon: <ShopOutlined />
                    },
                    {
                      label: <ActiveLink to={"/research"}>Research</ActiveLink>,
                      key: "research",
                      icon: <SearchOutlined />
                    },
                    {
                      label: <ActiveLink to={"/event"}>Event</ActiveLink>,
                      key: "event",
                      icon: <CalendarOutlined />
                    },
                  ]}
                />
              </>
            );
          }}
        />
      )}
      Footer={() => (
        <AntDesignLayout.Footer>
          FARMIS ©{new Date().getFullYear()} Created by Alhaji Josie Sam
        </AntDesignLayout.Footer>
      )}
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default CoreLayout;
