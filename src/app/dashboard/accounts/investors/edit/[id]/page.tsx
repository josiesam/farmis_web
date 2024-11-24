"use client";

import { LOCATIONS_COLLECTION_ID } from "@constants/appWrite";
import { FundingCapOption, RegionPreferenceOptions } from "@constants/forms";
import { ILocationData } from "@interfaces/database";
import { Edit, useForm } from "@refinedev/antd";
import { useSelect } from "@refinedev/core";
import { Checkbox, Form, Input, Select, Typography } from "antd";

const { Option } = Select;

export default function InvestorsEdit() {
  const { formProps, saveButtonProps, queryResult } = useForm({
    queryOptions: {
      select: ({ data }) => {
        return {
          data: {
            ...data,
            location: data.location.$id,
            user: data.user,
          },
        };
      },
    },
  });

  const investorsData = queryResult?.data?.data;

  const { options: locationOption } = useSelect<ILocationData>({
    resource: LOCATIONS_COLLECTION_ID!,
    defaultValue: investorsData?.location,
    optionLabel: (location) => `${location.region} / ${location.district}`,
  });

  console.log(investorsData);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Typography.Title>{`Investor: ${investorsData?.user?.name}`}</Typography.Title>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Funding Cap"}
          name={["funding_cap"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a digital literacy level"
            size="large"
            options={FundingCapOption}
          />
        </Form.Item>
        <Form.Item
          label={"Region Preference"}
          name="region_preference"
          rules={[
            {
              required: true,
            },
          ]}
        >
            <Checkbox.Group options={RegionPreferenceOptions}  />
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
      </Form>
    </Edit>
  );
}
