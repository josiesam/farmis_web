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
import { RESEARCH_ARCHIVES_COLLECTION_ID} from "@constants/appWrite";
import { useList, useLogout } from "@refinedev/core";
import Link from "next/link";
import { DateField } from "@refinedev/antd";

const { Text } = Typography;

const actions: React.ReactNode[] = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];

const App: React.FC = () => {
  // Use Refine's useList hook to fetch marketplace data
  const {mutate} = useLogout()
  const { data, isLoading, error } = useList({
    resource: RESEARCH_ARCHIVES_COLLECTION_ID! // This should match the collection name in Appwrite
  });

  // Handle loading and error states
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            title={"Resource"}
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
            title={"Resource"}
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
            title={"Resource"}
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
          <small>Please wait a few seconds and  reload the page again</small>
        </Text>
      </div>
    );
  }

  // Extract event data
  const researches = data?.data || [];

  return (
      <Row gutter={[16, 16]}>
        {researches.length != 0 ? (
          <>
            {researches.map((research) => (
              <Col key={research.$id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  title={research.title}
                  bordered={true}
                  hoverable
                  style={{ borderColor: "#ff9f00", textAlign: "center" }}
                >
                  <Space direction="vertical">
                    <Text>
                      <strong>Author:</strong> {research.author || "N/A"}
                    </Text>
                    <Text>
                      <strong>Publication date:</strong> <DateField value={research.publication_date || "N/A"} />
                    </Text>
                    <Text>
                      <strong>Publisher:</strong>{" "}
                      {research.publisher || "N/A"}
                    </Text>
                    <Text>
                      <strong>Document Line:</strong>{" "}
                      <Link href={research.document_link}>Download here..</Link>
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
