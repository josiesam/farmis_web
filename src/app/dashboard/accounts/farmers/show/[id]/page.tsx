"use client";

import { DateField, MarkdownField, Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export default function FarmersShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  console.log(record)

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"User"}</Title>
      <TextField value={record?.user?.name} />
      <Title level={5}>{"Farm Size"}</Title>
      <TextField value={record?.farm_size} />
      <Title level={5}>{"Digital Literacy Level"}</Title>
      <TextField value={record?.digital_literacy_level} />
      <Title level={5}>{"Location"}</Title>
      <TextField value={`${record?.location?.region} - ${record?.location?.district}`} />
      <Title level={5}>{"CreatedAt"}</Title>
      <DateField value={record?.$createdAt} />
    </Show>
  );
}
