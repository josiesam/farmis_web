"use client";

import { AuthPage } from "@components/auth-page";
import {
  FARMERS_COLLECTION_ID,
  INVESTORS_COLLECTION_ID,
  LOCATIONS_COLLECTION_ID,
  STAKEHOLDERS_COLLECTION_ID,
} from "@constants/appWrite";
import {
  AreaOfInterestOptions,
  FundingCapOption,
  LocationCascader,
  RegionPreferenceOptions,
  SectorFocusOptions,
} from "@constants/forms";
import { IUserData } from "@interfaces/database";
import {
  useTranslate,
  useUpdate,
  useOne,
  useGetIdentity,
  Authenticated,
  useCreate,
} from "@refinedev/core";
import {
  Button,
  Card,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Select,
  theme,
  Typography,
} from "antd";
import { useRouter } from "next/navigation";
import React from "react";

interface IInvestorUpdateFormData {
  sector_focus?: string;
  area_of_interest?: [];
  location: [string, string?];
  date_of_birth?: string;
  bio?: string;
}

type Props = {};
const { Option } = Select;

const StakeholderProfileConfig = (props: Props) => {
  const router = useRouter();
  const { token } = theme.useToken();
  const translate = useTranslate();
  const { data: userData, isLoading: loadingUserData } =
    useGetIdentity<IUserData>();
  const { mutate: mutateInvestor, isLoading: isUpdating } = useUpdate();

  const [form] = Form.useForm();

  const onFinish = async (values: IInvestorUpdateFormData) => {
    await mutateInvestor({
      resource: STAKEHOLDERS_COLLECTION_ID!,
      id: userData?.$id,
      values: {
        location: {
          region: values.location[0],
          district: values.location[1],
        },
        sector_focus: values.sector_focus,
        area_of_interest: values.area_of_interest,
        bio: values.bio,
        date_of_birth: values.date_of_birth,
      },
    });
    router.push("/dashboard");
  };

  const CardTitle = (
    <>
      <Typography.Title
        level={3}
        style={{
          color: token.colorPrimaryTextHover,
          textAlign: "center",
        }}
      >
        {translate("pages.profile.title", `Welcome, ${userData?.name}`)}
      </Typography.Title>
      <Typography.Paragraph style={{ textAlign: "center", marginBottom: 0 }}>
        {`Let's configure your profile`}
      </Typography.Paragraph>
    </>
  );
  return (
    <AuthPage
      type="login"
      renderContent={(content, title) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            title={CardTitle}
            styles={{
              body: { padding: 0, marginTop: "32px" },
              header: { borderBottom: 0, padding: 0 },
            }}
            style={{
              backgroundColor: token.colorBgElevated,
              maxWidth: "400px",
              margin: "auto",
              padding: "32px",
              boxShadow:
                "0px 2px 4px rgba(0, 0, 0, 0.02), 0px 1px 6px -1px rgba(0, 0, 0, 0.02), 0px 1px 2px rgba(0, 0, 0, 0.03)",
            }}
          >
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              requiredMark={false}
              style={{ width: 300 }}
            >
              <Form.Item
                name="location"
                label={translate(
                  "pages.configInvestorProfile.location",
                  "Your Location"
                )}
                rules={[
                  {
                    required: true,
                    message: translate(
                      "pages.configInvestorProfile.errors.location",
                      "Location is required"
                    ),
                  },
                ]}
              >
                <Cascader
                  size="large"
                  options={LocationCascader}
                  placeholder={"Please select region & district"}
                />
              </Form.Item>
              <Form.Item
                name="sector_focus"
                label={translate(
                  "pages.configInvestorProfile.sector_focus",
                  "Sector Focus"
                )}
                rules={[
                  {
                    required: true,
                    message: translate(
                      "pages.configInvestorProfile.errors.sector_focus",
                      "Sector Focus is required"
                    ),
                  },
                ]}
              >
                <Select
                  placeholder="Select a sector focus"
                  size="large"
                  options={SectorFocusOptions}
                />
              </Form.Item>

              <Form.Item
                name="area_of_insterest"
                label={translate(
                  "pages.configInvestorProfile.area_of_insterest",
                  "Area of interest"
                )}
                rules={[]}
              >
                <Select
                  size="large"
                  placeholder="Select a area of interest"
                  options={AreaOfInterestOptions}
                />
              </Form.Item>
              <Form.Item
                name="date_of_birth"
                label={translate(
                  "pages.configInvestorProfile.date_of_birth",
                  "Date of Birth"
                )}
              >
                <DatePicker
                  size="large"
                  format={"DD/MM/YYYY"}
                  placeholder="Enter your date of dirth"
                />
              </Form.Item>
              <Form.Item
                name="bio"
                label={translate("pages.configInvestorProfile.bio", "Bio")}
              >
                <Input.TextArea
                  count={{ show: true, max: 250 }}
                  autoSize={{ minRows: 2, maxRows: 5 }}
                  placeholder="A brief description about yourself (Optional)"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isUpdating}
                  block
                >
                  Config
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      )}
    />
  );
};

export default StakeholderProfileConfig;
