"use client";
import React, { useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
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
import { PRODUCTS_COLLECTION_ID } from "@constants/appWrite";
import { useList } from "@refinedev/core";

const { Text, Title, Paragraph } = Typography;

const actions: React.ReactNode[] = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];

const App: React.FC = () => {
  // Use Refine's useList hook to fetch marketplace data
  const { data, isLoading, error } = useList({
    resource: PRODUCTS_COLLECTION_ID, // This should match the collection name in Appwrite
    pagination: {
      pageSize: 100
    }
  });

  // Handle loading and error states
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title={"Products"}
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
              title={"Product"}
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
              title={"Product"}
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

  // Extract product data
  const products = data?.data || [];

  return (
    <>
      <section style={{ padding: "15px 50px" }}>
        <Title level={2} style={{ textAlign: "center" }}>
          All produce sourced directly from farmers.
        </Title>
      </section>
      <Row gutter={[16, 16]}>
        {products.length != 0 ? (
          <>
            {products.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                 <Card
                  cover={<Image src={product.images[0]} style={{ width: 300, height: 300, objectFit:'cover', overflow: 'hidden'}}  />}
                  style={{ width: 300,}}
                  actions={[
                    <Button key="eye" href="#" icon={<EyeOutlined  />} />,
                    <Button key={"shoppingCart"} icon={<ShoppingCartOutlined />} href="/marketplace/products/order" />
                  ]}
                >
                  <Card.Meta
                    title={product.name}
                    description={product.description}
                  />
                </Card>
              </Col>
            ))}
          </>
        ) : (
          <Empty style={{ marginInline: "auto" }} />
        )}
      </Row>
    </>
  );
};

export default App;
