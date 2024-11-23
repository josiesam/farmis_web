"use client";

import { LOCATIONS_COLLECTION_ID, USERS_COLLECTION_ID } from "@constants/appWrite";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export default function FarmerCreate() {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: userSelectProps } = useSelect({
    resource: USERS_COLLECTION_ID!,
  })

  const { selectProps: locationSelectProps } = useSelect({
    resource: LOCATIONS_COLLECTION_ID!,
  });


  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"User"}
          name={'user'}
          rules={[
            {
              required: true,
            }
          ]}
        >
          <Select {...userSelectProps} />
        </Form.Item>
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
    </Create>
  );
}
