"use client";

import { DownloadOutlined } from "@ant-design/icons";
import { IInvestorData } from "@interfaces/database";
import { DateField, MarkdownField, Show, TextField } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Button, Flex, Image, Space, Typography } from "antd";

const { Title } = Typography;

export default function ResearchShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  console.log(record);

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
      <Flex gap={"large"} vertical={false}>
        <Space direction="vertical" size={"small"}>
          <Title level={5}>{"Publication Date"}</Title>
          <DateField value={record?.publication_date} />
        </Space>
        <Space direction="vertical" size={"small"}>
          <Title level={5}>{"CreatedAt"}</Title>
          <DateField value={record?.$createdAt} />
        </Space>
      </Flex>
      <Space />
      <Button block type="primary" href={record?.document_line} icon={<DownloadOutlined />} />
    </Show>
  );
}
