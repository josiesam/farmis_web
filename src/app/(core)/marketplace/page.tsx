'use client';

import React from "react";
import { useList, useLogout } from "@refinedev/core";
import { Layout, Typography, Row, Col, Card, Spin, Space, Button, Empty } from "antd";
import { PRODUCTS_COLLECTION_ID } from "@constants/appWrite";

const { Title, Paragraph, Text } = Typography;

const Marketplace = () => {
  // Use Refine's useList hook to fetch marketplace data
  const {mutate} = useLogout()
  const { data, isLoading, error } = useList({
    resource: PRODUCTS_COLLECTION_ID, // This should match the collection name in Appwrite
  });

  // Handle loading and error states
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <Text>Loading Products...</Text>
      </div>
    );
  }

  if (error) {
    mutate()
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Text type="danger">Failed to load products. Please try again later.</Text>
        <small>Please wait a few seconds and  reload the page again</small>

      </div>
    );
  }

  // Extract product data
  const products = data?.data || [];

  return (
    <Layout style={{ padding: "20px" }}>
      {/* Hero Section */}
      <section style={{ padding: "50px"}}>
        <Title level={2} style={{ textAlign: "center"}}>
          Welcome to the Agricultural Marketplace
        </Title>
        <Paragraph style={{ fontSize: "16px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          The Agricultural Marketplace is your go-to platform for buying and selling agricultural products. Farmers, 
          investors, and stakeholders can connect seamlessly, ensuring fair pricing and transparent transactions.
        </Paragraph>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button type="primary" size="large" href="/marketplace/products">
            View Products
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: "40px 20px", textAlign: "center" }}>
        <Title level={3}>Why Use the Agricultural Marketplace?</Title>
        <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <Title level={5}>For Farmers</Title>
              <Paragraph>
                Sell your products directly to buyers, ensuring fair prices and reducing the middleman effect.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <Title level={5}>For Buyers</Title>
              <Paragraph>
                Access a wide range of fresh, locally grown produce with detailed information about the seller.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card hoverable>
              <Title level={5}>For Stakeholders</Title>
              <Paragraph>
                Analyze market trends and facilitate better resource allocation in the agricultural sector.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Product Listings Section */}
      <section style={{ padding: "20px" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Available Products
        </Title>
        <Row gutter={[16, 16]}>
        {products.length  != 0 ? (
          <>
          {products.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={product.name}
                bordered={true}
                hoverable
                style={{ borderColor: "#ff9f00", textAlign: "center" }}
              >
                <Space direction="vertical">
                  <Text>
                    <strong>Category:</strong> {product.category || "N/A"}
                  </Text>
                  <Text>
                    <strong>Price:</strong> ${product.price || "N/A"}
                  </Text>
                  <Text>
                    <strong>Quantity Available:</strong> {product.quantity_available || "N/A"}
                  </Text>
                  <Text>
                    <strong>Seller:</strong> {product.farmer.user.name || "Unknown"}
                  </Text>
                  <Button type="primary" size="small" href={`/product/#`}>
                    View Details
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
          </>
        ) : (<Empty style={{marginInline: 'auto'}} />)}
        </Row>
      </section>
    </Layout>
  );
};

export default Marketplace;
