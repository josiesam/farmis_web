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
  Row,
  Space,
  Spin,
  Switch,
  Typography,
} from "antd";
import { EVENTS_COLLECTION_ID } from "@constants/appWrite";
import { useList } from "@refinedev/core";

const { Text } = Typography;

const actions: React.ReactNode[] = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];

const App: React.FC = () => {
  // Use Refine's useList hook to fetch marketplace data
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
            title={"Crops"}
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
            title={"Crop"}
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
            title={"Crop"}
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
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Text type="danger">
          Failed to load products. Please try again later.
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
                  title={event.title}
                  bordered={true}
                  hoverable
                  style={{ borderColor: "#ff9f00", textAlign: "center" }}
                >
                  <Space direction="vertical">
                    <Text>
                      <strong>Category:</strong> {event.start_date || "N/A"}
                    </Text>
                    <Text>
                      <strong>Price:</strong> ${event.end_date || "N/A"}
                    </Text>
                    <Text>
                      <strong>Location:</strong>{" "}
                      {`${event.location.region}, ${event.location.district}` || "N/A"}
                    </Text>
                    <Text>
                      <strong>Seller:</strong>{" "}
                      {event.user.name || "Unknown"}
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
