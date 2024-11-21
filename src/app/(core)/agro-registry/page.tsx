'use client';

import { FARMERS_COLLECTION_ID } from "@constants/appWrite";
import { useList } from "@refinedev/core";
import { Card, Col, Row, Space, Spin, Typography, Layout, Button } from "antd";
import React from "react";

type Props = {};

const { Title, Paragraph, Text } = Typography;

const AgroRegistryPage = (props: Props) => {
  const {
    data,
    error,
    isLoading: farmersIsLoading,
  } = useList({
    resource: FARMERS_COLLECTION_ID,
  });

  // Handle loading and error states
  if (farmersIsLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <Text>Loading data...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Text type="danger">
          Failed to load farmers. Please try again later.
        </Text>
      </div>
    );
  }

  // Extract farmers data
  const farmers = data?.data || [];

  return (
    <Layout style={{ padding: "20px" }}>
      {/* Hero Section */}
      <section
        style={{ padding: "50px" }}
      >
        <Title level={2} style={{ textAlign: "center"}}>
          Welcome to the National Agriculture Registry
        </Title>
        <Paragraph
          style={{
            fontSize: "16px",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          The National Agriculture Registry is the cornerstone of our platform,
          designed to empower farmers, stakeholders, and investors by providing
          a centralized database of farmer profiles, crop information, and
          agricultural insights. This registry bridges the information gap,
          enabling better resource allocation, data-driven decision-making, and
          stronger connections across the agricultural value chain.
        </Paragraph>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Space>

          <Button type="primary" size="large" href="/agro-registry/crops">
            View Crops
          </Button>
          <Button type="primary" size="large" href="/agro-registry/farmers">
            View Farmers
          </Button>
          </Space>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: "40px 20px", textAlign: "center" }}>
        <Title level={3}>Benefits of the National Agriculture Registry</Title>
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <Title level={5}>For Farmers</Title>
              <Paragraph>
                Gain visibility, access real-time market data, and connect with
                stakeholders for better resource allocation and support.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <Title level={5}>For Investors</Title>
              <Paragraph>
                Discover verified farmer profiles, assess risk levels, and make
                informed investment decisions tailored to the agricultural
                sector.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <Title level={5}>For Stakeholders</Title>
              <Paragraph>
                Access aggregated data to support policy-making, resource
                planning, and agricultural research initiatives.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Farmers Listings Section */}
      {/* <section style={{ padding: "20px" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Farmers Overview
        </Title>
        <Row gutter={[16, 16]}>
          {farmers.map((farmer) => (
            <Col key={farmer.$id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={farmer.name}
                bordered={true}
                hoverable
                style={{ borderColor: "#1890ff", textAlign: "center" }}
              >
                <Space direction="vertical">
                  <Text>
                    <strong>Location:</strong> {farmer.location || "N/A"}
                  </Text>
                  <Text>
                    <strong>Farm Size:</strong> {farmer.farm_size} acres
                  </Text>
                  <Text>
                    <strong>Crops:</strong> {farmer.crops?.join(", ") || "N/A"}
                  </Text>
                  <Text>
                    <strong>Digital Literacy:</strong>{" "}
                    {farmer.digital_literacy_level || "Unknown"}
                  </Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </section> */}
    </Layout>
  );
};

export default AgroRegistryPage;
