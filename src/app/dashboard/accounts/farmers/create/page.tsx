"use client";

import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export default function FarmerCreate() {
  const { formProps, saveButtonProps } = useForm({});

  const { selectProps: locationSelectProps } = useSelect({
    resource: "locations",
  });


  return (
    <Create saveButtonProps={saveButtonProps}>
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
    </Create>
  );
}
