"use client";

import { IInvestorData } from "@interfaces/database";
import { DateField, MarkdownField, Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Image, Typography } from "antd";

const { Title } = Typography;

export default function InvestorsShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  console.log(record)

  return (
    <Show isLoading={isLoading}>
      <Image.PreviewGroup>
        {record?.images.map((imageSrc:string) => <Image key={imageSrc} width={200} src={imageSrc} />)}
      </Image.PreviewGroup>
      <Title level={5}>{"Name"}</Title>
      <TextField value={record?.name} />
      <Title level={5}>{"Farmer"}</Title>
      <TextField value={record?.farmer.user.name} />
      <Title level={5}>{"Description"}</Title>
      <TextField value={record?.description} />
      <Title level={5}>{"Category"}</Title>
      <TextField value={`${record?.category}`} />
      <Title level={5}>{"Price"}</Title>
      <TextField value={`${record?.price}`} />
      <Title level={5}>{"CreatedAt"}</Title>
      <DateField value={record?.$createdAt} />
    </Show>
  );
}
