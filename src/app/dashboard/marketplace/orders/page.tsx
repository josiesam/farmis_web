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
      <Table.Column dataIndex="id" title={"ID"} render={(value:any, record: any, index: number) => {console.log(record); return index+1} }/>
        <Table.Column
          dataIndex={["$createdAt"]}
          title={"Created at"}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column dataIndex={"transactionId"} title={"Transaction ID"} render={(value) => (`${value}` || "N/A")  }/>
        <Table.Column dataIndex={'user'} title={'Buyer'}  render={(value) => `${value?.user?.name}` || "N/A"}/>
        <Table.Column dataIndex={'farmer'} title={'Farmer'}  render={(value) => `${value?.product?.farmer?.name}` || "N/A"}/>
        <Table.Column dataIndex={"quantity"} title={'Quantity'}  />
        <Table.Column dataIndex={"total_price"} title={"Total Price"} render={(value) => `NLe ${value}`} />
        <Table.Column dataIndex={"status"} title={'Status'} />
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
