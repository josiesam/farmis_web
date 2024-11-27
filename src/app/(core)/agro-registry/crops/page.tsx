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
  Row,
  Space,
  Spin,
  Switch,
  Image,
  Typography,
} from "antd";
import { CROPS_COLLECTION_ID, EVENTS_COLLECTION_ID } from "@constants/appWrite";
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
    resource: CROPS_COLLECTION_ID!, // This should match the collection name in Appwrite
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
            style={{ borderColor: "#ff9f00", textAlign: "center",  }}
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

  // Extract crops data
  const crops = data?.data || [];

  console.log(crops)

  return (
      <Row gutter={[16, 32]}>
        {crops.length != 0 ? (
          <>
            {crops.map((crop) => (
              <Col key={crop.$id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  cover={<Image src={crop.images[0]} style={{ width: 300, height: 300, objectFit:'cover', overflow: 'hidden'}}  />}
                  style={{ width: 300,}}
                  actions={[
                    <Button key="eye" href="#" icon={<EyeOutlined  />} />,
                    <Button key={"shoppingCart"} icon={<ShoppingCartOutlined />} href={`/marketplace/product/order/`} />
                  ]}
                >
                  <Card.Meta
                    title={crop.name}
                    description={crop.crop_type}
                  />
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
