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
import { Space, Table, Typography } from "antd";

export default function FarmersList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title={"ID"} render={(value:any, record: any, index: number) => index+1}/>

        <Table.Column
          dataIndex="user"
          title={"Name"}
          render={(value: any) => {
            if (value) {
              const { name } = value;
              return name;
            } else {
              return "N/A";
            }
          }}
        />
        <Table.Column dataIndex="farm_size" title={"Farm size"} />
        <Table.Column dataIndex="digital_literacy_level" title={"DLL"} />
        <Table.Column
          dataIndex="location"
          title={"Location"}
          render={(value) => {
            if (value) {
              const { region, district } = value;
              return `${district}, ${region}`;
            } else {
              return "N/A";
            }
          }}
        />
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
