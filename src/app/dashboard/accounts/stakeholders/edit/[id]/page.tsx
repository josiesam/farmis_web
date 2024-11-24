"use client";

import { LOCATIONS_COLLECTION_ID } from "@constants/appWrite";
import {
  AreaOfInterestOptions,
  FundingCapOption,
  RegionPreferenceOptions,
  SectorFocusOptions,
} from "@constants/forms";
import { ILocationData } from "@interfaces/database";
import { Edit, useForm } from "@refinedev/antd";
import { useSelect } from "@refinedev/core";
import { Checkbox, Form, Input, Select, Typography } from "antd";

const { Option } = Select;

export default function StakeholdersEdit() {
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

  const stakeholdersData = queryResult?.data?.data;

  const { options: locationOption } = useSelect<ILocationData>({
    resource: LOCATIONS_COLLECTION_ID!,
    defaultValue: stakeholdersData?.location,
    optionLabel: (location) => `${location.region} / ${location.district}`,
  });

  console.log(stakeholdersData);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Typography.Title>{`Investor: ${stakeholdersData?.user?.name}`}</Typography.Title>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={"Sector Focus"}
          name={["sector_focus"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a digital literacy level"
            size="large"
            options={SectorFocusOptions}
          />
        </Form.Item>
        <Form.Item
          label={"Area of Interest"}
          name="area_of_interest"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a digital literacy level"
            size="large"
            options={AreaOfInterestOptions}
          />
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
