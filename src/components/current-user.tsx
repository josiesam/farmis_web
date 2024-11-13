import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { useLink, useRouterContext, useRouterType } from "@refinedev/core";
import { Avatar, Button, Popover, Space, Typography } from "antd";
import React, { useState } from "react";

type IUser = {
  id: number;
  name: string;
  username: string;
  avatar: string;
};

type Props = {
  user: IUser;
};

const { Text } = Typography;

const CurrentUser = ({ user }: Props) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const content = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text strong style={{ padding: "12px 20px", textAlign: "center" }}>
        {user?.name}
      </Text>
      <div
        style={{
          borderTop: "1px solid",
          padding: "4px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <ActiveLink
          to="/dashboard/profile"
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
              paddingLeft: '0.5em',
              paddingRight: '0.5em'
            }}
          >
            <div
              style={{
                height: "24px",
                width: "24px",
              }}
            >
              <UserOutlined />
            </div>
            <Typography.Title
              style={{
                fontSize: "inherit",
                marginBottom: 0,
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              {"Profile"}
            </Typography.Title>
          </Space>
        </ActiveLink>
      </div>
    </div>
  );
  return (
    <>
      <Popover
        placement="bottomRight"
        trigger="click"
        overlayInnerStyle={{ padding: 0 }}
        overlayStyle={{ zIndex: 9999 }}
        content={content}
      >
        <Space style={{ marginLeft: "8px" }} size="middle">
          {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
        </Space>
      </Popover>
    </>
  );
};

export default CurrentUser;
