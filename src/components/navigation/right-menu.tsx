import React, { useContext } from "react";
import { ColorModeContext } from "@contexts/color-mode";
import { Button, Space, Switch } from "antd";

export default async function Layout({ children }: React.PropsWithChildren) {
  const { mode, setMode } = useContext(ColorModeContext);


  
  return (
    <Space>
      <Switch
        checkedChildren="🌛"
        unCheckedChildren="🔆"
        onChange={() => setMode(mode === "light" ? "dark" : "light")}
        defaultChecked={mode === "dark"}
      />
      <Button title="Dashboard" />
    </Space>
  );
}
