// `app/register/RegisterAuthPage.tsx` - Client Component
"use client";

import React, { useImperativeHandle, useRef, useState } from "react";
import { AuthPage } from "@components/auth-page";
import { Button, Card, Form, Input, theme, Typography } from "antd";
import {
  useActiveAuthProvider,
  useLink,
  useRegister,
  useRouterContext,
  useRouterType,
  useTranslate,
} from "@refinedev/core";

export interface RegisterFormTypes {
  email?: string;
  password?: string;
  username?: string;
  phone?: string;
  name?: string;
  providerName?: string;
}

const { Title } = Typography;



const RegisterAuthPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { token } = theme.useToken();
  const translate = useTranslate();
  const [form] = Form.useForm<RegisterFormTypes>();

  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const authProvider = useActiveAuthProvider();
  const { mutate: register, isLoading } = useRegister<RegisterFormTypes>({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const CardTitle = (
    <Typography.Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
      }}
    >
      {translate("pages.register.title", "Sign up for your account")}
    </Typography.Title>
  );

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Replace this with your registration logic
      console.log("Form Values:", values);
      // Call the server API or auth provider register function here
      // await authProviderServer.register(values);
    } catch (error) {
      console.error("Registration failed:", error);
    }
    // try {
    //   await authProviderServer.login(values);
    //   message.success("Login successful!");
    //   router.push("/"); // Redirect to home or desired page after successful login
    // } catch (error) {
    //   message.error("Login failed. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };
  return (
    <AuthPage
      type="register"
      renderContent={(content, title) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {title}
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
              onFinish={(values) => register(values)}
              requiredMark={false}
              style={{ width: 300 }}
            >
              <Form.Item
                name="name"
                label={translate("pages.register.name", "Full Name")}
                rules={[
                  {
                    required: true,
                    message: translate(
                      "pages.register.errors.requiredName",
                      "Name is required"
                    ),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={translate("pages.register.fields.name", "Name")}
                />
              </Form.Item>

              <Form.Item
                name="username"
                label={translate("pages.register.username", "Username")}
                rules={[
                  {
                    required: true,
                    message: translate(
                      "pages.register.errors.requiredUsername",
                      "Username is required"
                    ),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={translate("pages.register.fields.name", "Name")}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label={translate("pages.register.email", "Email")}
                rules={[
                  {
                    required: true,
                    message: translate(
                      "pages.register.errors.requiredEmail",
                      "Email is required"
                    ),
                  },
                  {
                    type: "email",
                    message: translate(
                      "pages.register.errors.validEmail",
                      "Invalid email address"
                    ),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={translate(
                    "pages.register.fields.email",
                    "Email"
                  )}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                label={translate("pages.register.phone", "Phone")}
                rules={[
                  {
                    required: true,
                    message: translate(
                      "pages.register.errors.requiredPhone",
                      "Phone is required with country code format"
                    ),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={translate(
                    "pages.register.fields.phone",
                    "Phone"
                  )}
                />
              </Form.Item>

              <Form.Item
                name="password"
                label={translate("pages.register.fields.password", "Password")}
                rules={[
                  {
                    required: true,
                    message: translate(
                      "pages.register.errors.requiredPassword",
                      "Password is required"
                    ),
                  },
                ]}
              >
                <Input type="password" placeholder="●●●●●●●●" size="large" />
              </Form.Item>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "24px",
                }}
              >
                {
                  <Typography.Text
                    style={{
                      fontSize: 12,
                      marginLeft: "auto",
                    }}
                  >
                    {translate(
                      "pages.register.buttons.haveAccount",
                      translate(
                        "pages.login.buttons.haveAccount",
                        "Have an account?"
                      )
                    )}{" "}
                    <ActiveLink
                      style={{
                        fontWeight: "bold",
                        color: token.colorPrimaryTextHover,
                      }}
                      to="/login"
                    >
                      {translate(
                        "pages.register.signin",
                        translate("pages.login.signin", "Sign in")
                      )}
                    </ActiveLink>
                  </Typography.Text>
                }
              </div>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
      )}
    />
  );
};

export default RegisterAuthPage;

// renderContent={(content: React.ReactNode, title: React.ReactNode) => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       {title}
//       {content}
//       <h1 style={{ color: "white" }}>Extra Footer</h1>
//     </div>
//   );
// }}
