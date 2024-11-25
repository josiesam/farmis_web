"use client";

import { DownloadOutlined } from "@ant-design/icons";
import { IInvestorData } from "@interfaces/database";
import { DateField, MarkdownField, Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Button, Image, Typography } from "antd";

const { Title } = Typography;

export default function InvestorsShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  console.log(record)

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{"Title"}</Title>
      <TextField value={record?.title} />
      <Title level={5}>{"Author"}</Title>
      <TextField value={record?.author} />
      <Title level={5}>{"Publisher"}</Title>
      <TextField value={record?.publisher} />
      <Title level={5}>{"Summary"}</Title>
      <TextField value={`${record?.summary}`} />
      <Button href={record?.document_line} icon={<DownloadOutlined />} />
      <Title level={5}>{"Publication Date"}</Title>
      <DateField value={record?.publication_date} />
      <Title level={5}>{"CreatedAt"}</Title>
      <DateField value={record?.$createdAt} />
    </Show>
  );
}
