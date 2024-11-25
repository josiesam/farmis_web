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
        <Table.Column
          dataIndex="id"
          title={"ID"}
          render={(value: any, record: any, index: number) => index + 1}
        />
        <Table.Column dataIndex={"title"} title={"Title"} />
        <Table.Column dataIndex={"author"} title={"Author"} />
        <Table.Column dataIndex={"publisher"} title={"Publisher"} />
        <Table.Column
          dataIndex={"publication_date"}
          title={"Publication Date"}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column dataIndex={"document_link"} title="Report" render={(value) => (<Button type="primary" color="default" href={value} icon={<DownloadOutlined />} />)} />
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
