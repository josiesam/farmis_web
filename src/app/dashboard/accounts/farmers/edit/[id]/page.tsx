"use client";

import { LOCATIONS_COLLECTION_ID } from "@constants/appWrite";
import { ILocationData } from "@interfaces/database";
import { Edit, useForm } from "@refinedev/antd";
import { useSelect } from "@refinedev/core";
import { Form, Input, Select, Typography } from "antd";

const {Option} = Select

export default function FarmersEdit() {
  const { formProps, saveButtonProps, queryResult } = useForm({
    queryOptions: {
      select: ({ data }) => {
        return {
          data: {
            ...data,
            location: data.location.$id,
            user: data.user
          },
        };
      },
    },
  });

  const farmersData = queryResult?.data?.data;

  const { options: locationOption } = useSelect<ILocationData>({
    resource: LOCATIONS_COLLECTION_ID!,
    defaultValue: farmersData?.location,
    optionLabel: (location) => `${location.region} / ${location.district}`,
  });

  console.log(farmersData)

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Typography.Title>{`Farmer: ${farmersData?.user?.name}`}</Typography.Title>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Farm Size"}
          name={["farm_size"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Location"}
          name={"location"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select disabled={true}>
            {locationOption?.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={"Digital Literacy Level"}
          name={["digital_literacy_level"]}
          initialValue={"3"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            options={[
              { value: "1", label: "Very Low" },
              { value: "2", label: "Low" },
              { value: "3", label: "Mid" },
              { value: "4", label: "High" },
              { value: "5", label: "Very High" },
            ]}
            style={{ width: 120 }}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
}
