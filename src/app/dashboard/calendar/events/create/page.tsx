"use client";

import { Create, useForm, useSelect } from "@refinedev/antd";
import { DatePicker, Form, Input, Select } from "antd";

export default function FarmerCreate() {
  const { formProps, saveButtonProps } = useForm({});


  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">

        <Form.Item
          label={"Name"}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Date"}
          name={['date']}
        >
          <DatePicker
            size="large"
            format={"DD/MM/YYYY"}
          />
        </Form.Item>

      </Form>
    </Create>
  );
}
