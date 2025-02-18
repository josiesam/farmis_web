"use client";
import React, { useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Empty,
  Flex,
  Image,
  Row,
  Space,
  Spin,
  Switch,
  Typography,
} from "antd";
import { EVENTS_COLLECTION_ID } from "@constants/appWrite";
import { useList, useLogout } from "@refinedev/core";
import dayjs from "dayjs";

const { Text } = Typography;

const actions: React.ReactNode[] = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];

const App: React.FC = () => {
  // Use Refine's useList hook to fetch marketplace data
  const { mutate } = useLogout()
  const { data, isLoading, error } = useList({
    resource: EVENTS_COLLECTION_ID! // This should match the collection name in Appwrite
  });

  // Handle loading and error states
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title={"Event"}
              bordered={true}
              loading={isLoading}
              hoverable
              style={{ borderColor: "#ff9f00", textAlign: "center" }}
            >
              <Space direction="vertical">
                <Text>
                  <strong>Category:</strong> {"N/A"}
                </Text>
                <Text>
                  <strong>Price:</strong> ${"N/A"}
                </Text>
                <Text>
                  <strong>Quantity Available:</strong> {"N/A"}
                </Text>
                <Text>
                  <strong>Seller:</strong> {"Unknown"}
                </Text>
                <Button type="primary" size="small" href={`#`}>
                  View Details
                </Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title={"Event"}
              bordered={true}
              loading={isLoading}
              hoverable
              style={{ borderColor: "#ff9f00", textAlign: "center" }}
            >
              <Space direction="vertical">
                <Text>
                  <strong>Category:</strong> {"N/A"}
                </Text>
                <Text>
                  <strong>Price:</strong> ${"N/A"}
                </Text>
                <Text>
                  <strong>Quantity Available:</strong> {"N/A"}
                </Text>
                <Text>
                  <strong>Seller:</strong> {"Unknown"}
                </Text>
                <Button type="primary" size="small" href={`#`}>
                  View Details
                </Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title={"Event"}
              bordered={true}
              loading={isLoading}
              hoverable
              style={{ borderColor: "#ff9f00", textAlign: "center" }}
            >
              <Space direction="vertical">
                <Text>
                  <strong>Category:</strong> {"N/A"}
                </Text>
                <Text>
                  <strong>Price:</strong> ${"N/A"}
                </Text>
                <Text>
                  <strong>Quantity Available:</strong> {"N/A"}
                </Text>
                <Text>
                  <strong>Seller:</strong> {"Unknown"}
                </Text>
                <Button type="primary" size="small" href={`#`}>
                  View Details
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  if (error) {
    mutate()
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Text type="danger">
          Failed to load products. Please try again later.
          <small>Please wait a few seconds and  reload the page again</small>

        </Text>
      </div>
    );
  }

  // Extract events data
  const events = data?.data || [];

  return (
    <Row gutter={[16, 16]}>
      {events.length != 0 ? (
        <>
          {events.map((event) => (
            <Col key={event.$id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={event.name}
                bordered={true}
                hoverable
                style={{ borderColor: "#ff9f00", textAlign: "center" }}
              >
                <Space direction="vertical">
                  <Image
                    src={"/assets/images/illustrators/events.png"}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "contain",
                      overflow: "hidden",
                    }}
                  />
                  <Text>
                    <strong>Date:</strong> {dayjs(event.date).format("DD MMMM, YYYY")  || "N/A"}
                  </Text>
                  <Button
                    type="primary"
                    size="small"
                    href={`#`}
                  >
                    View Details
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </>
      ) : (
        <Empty style={{ marginInline: "auto" }} />
      )}
    </Row>
  );
};

export default App;
