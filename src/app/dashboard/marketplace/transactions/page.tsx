"use client";

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
import { Space, Table } from "antd";

export default function LocationList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title={"ID"} render={(value:any, record: any, index: number) => index+1}/>
        <Table.Column dataIndex={"id"} title={"Transaction ID"} />
        <Table.Column dataIndex={"status"} title={"Status"} />
        <Table.Column dataIndex={"delivery_mode"} title={'Delivery Mode'} />
        <Table.Column dataIndex={"transaction_method"} title={"Transaction Method"} />
        <Table.Column dataIndex={"order"} title={"Order"} />
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
