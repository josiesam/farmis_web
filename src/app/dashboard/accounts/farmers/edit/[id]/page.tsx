"use client";

import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export default function FarmersEdit() {
  const { formProps, saveButtonProps, queryResult } = useForm({
    queryOptions: {
      select: ({ data }) => {
        return {
          data: {
            ...data,
            location: data.location.$id,
          },
        };
      },
    },
  });

  const blogPostsData = queryResult?.data?.data;

  const { selectProps: locationSelectProps } = useSelect({
    resource: "locations",
    defaultValue: blogPostsData?.location,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
          label={"Digital Literacy Level"}
          name="digital_literacy_level"
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
          <Select {...locationSelectProps} />
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
            defaultValue={"draft"}
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
