"use client";

import { DownloadOutlined } from "@ant-design/icons";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { Button, Space, Table } from "antd";

export default function LocationList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title={"ID"} render={(value:any, record: any, index: number) => index+1}/>
        <Table.Column dataIndex={"title"} title={"Title"} />
        <Table.Column dataIndex={"fundingProject"} title={"Project Name"} render={(value) => `${value.title}`}/>
        <Table.Column dataIndex={"fundingProject"} title={"Owner"} render={(value) => `${value.farmer.name}`}/>
        <Table.Column dataIndex={"document_link"} title={"Report"} render={(value) => <Button type="primary" shape="round" icon={<DownloadOutlined />} />}/>
        <Table.Column
          dataIndex={["$createdAt"]}
          title={"Created at"}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
}
