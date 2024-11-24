"use client";

import { IInvestorData } from "@interfaces/database";
import { DateField, MarkdownField, Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography } from "antd";

const { Title } = Typography;

export default function InvestorsShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  console.log(record)

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"User"}</Title>
      <TextField value={record?.user?.name} />
      <Title level={5}>{"Sector Focus"}</Title>
      <TextField value={record?.sector_focus} />
      <Title level={5}>{"Area of Interest"}</Title>
      <TextField value={record?.area_of_interest} />
      <Title level={5}>{"Location"}</Title>
      <TextField value={`${record?.location?.region} - ${record?.location?.district}`} />
      <Title level={5}>{"CreatedAt"}</Title>
      <DateField value={record?.$createdAt} />
    </Show>
  );
}
