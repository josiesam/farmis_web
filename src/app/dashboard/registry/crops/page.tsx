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
import { Avatar, Space, Table, Typography } from "antd";

export default function LocationList() {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title={"ID"} render={(value:any, record: any, index: number) => index+1}/>
        <Table.Column dataIndex={'images'} title={"Images"} render={
          (value) => (
            <Avatar.Group max={{count: 2}}>
              {value.map((imageSrc: string) => (<Avatar key={imageSrc} src={imageSrc} />))}
            </Avatar.Group>
          )
        } />
        <Table.Column dataIndex="name" title={"Name"} />
        <Table.Column dataIndex="growing_season" title={"Season"} />
        <Table.Column dataIndex="yield_per_hectare" title={"Yield"} />
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
