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

export default function EventList() {
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
        <Table.Column dataIndex={'title'} title={'Title'} />
        <Table.Column dataIndex={'start_date'} title={'Start Date'} render={(value) => <DateField value={value} />}/>
        <Table.Column dataIndex={'end_date'} title={'End Date'} render={(value) => <DateField value={value} />}/>
        <Table.Column dataIndex={'location'} title={'Location'} render={(value) => `${value.district}`}/>
        <Table.Column dataIndex={'user'} title={'Upload By'} render={(value) =>  `${value.name}`}/>

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
