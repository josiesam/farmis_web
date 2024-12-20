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

export default function InventoryList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} render={(value:any, record: any, index: number) => index+1}/>
        <Table.Column dataIndex={"name"} title={"Name"} />
        <Table.Column dataIndex={"farmer"} title={"Farmer"} render={(value) => `${value?.user?.name}`}/>
        <Table.Column dataIndex={"quantity"} title={"Quantity"} />
        <Table.Column dataIndex={"product"} title={"Products"} 
          render={(value:Array<any>) => {
            console.log(value)
            return value.length
          }} />
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
