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
  Pagination,
  Row,
  Space,
  Spin,
  Switch,
  Typography,
} from "antd";
import {
  EVENTS_COLLECTION_ID,
  FARMERS_COLLECTION_ID,
} from "@constants/appWrite";
import { useList, useLogout } from "@refinedev/core";

const { Text } = Typography;

const actions: React.ReactNode[] = [
  <EditOutlined key="edit" />,
  <SettingOutlined key="setting" />,
  <EllipsisOutlined key="ellipsis" />,
];

const App: React.FC = () => {
  // Use Refine's useList hook to fetch marketplace data
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const {mutate} = useLogout()
  const { data, isLoading, error } = useList({
    resource: FARMERS_COLLECTION_ID!, // This should match the collection name in Appwrite
    pagination: {
      pageSize: pageSize,
      current: current
    }
  });

  // Handle loading and error states
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title={"Farmer"}
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
              title={"Farmer"}
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
              title={"Farmer"}
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

  // Extract events data
  const farmers = data?.data || [];

  console.log(data);

  return (
    <div>
      <Pagination
        total={data.total}
        showTotal={(total, range) => `${range[0]}-${range[1]} farmers`}
        defaultPageSize={10}
        defaultCurrent={1}
        align="end"
        onChange={(page, pageSize) => {setCurrent(page); setPageSize(pageSize)}}
      />
      <Space size={'middle'} />
      <Row gutter={[16, 16]}>
        {farmers.length != 0 ? (
          <>
            {farmers.map((farmer) => (
              <Col key={farmer.$id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  title={farmer.user.name}
                  bordered={true}
                  hoverable
                  style={{ borderColor: "#ff9f00", textAlign: "center" }}
                >
                  <Space direction="vertical">
                    <Text>
                      <strong>Farmer Size:</strong> {farmer.farm_size || "N/A"}
                    </Text>
                    <Text>
                      <strong>Crop:</strong> {farmer.farmerCrop.length || "N/A"}
                    </Text>
                    <Text>
                      <strong>Location:</strong>{" "}
                      {`${farmer.location.region}, ${farmer.location.district}` ||
                        "N/A"}
                    </Text>
                    <Button type="primary" size="small" href={`#`}>
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
    </div>
  );
};

export default App;
