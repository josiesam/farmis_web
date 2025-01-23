'use client';

import React from "react";
import { useList, useLogout } from "@refinedev/core";
import { Layout, Typography, Row, Col, Card, Spin, Space, Button } from "antd";
import { RESEARCH_ARCHIVES_COLLECTION_ID } from "@constants/appWrite";

const { Title, Paragraph, Text } = Typography;

const ResearchArchive = () => {
  // Use Refine's useList hook to fetch research data
  const {mutate} = useLogout();
  const { data, isLoading, error } = useList({
    resource: RESEARCH_ARCHIVES_COLLECTION_ID, // This should match the collection name in Appwrite
  });

  // Handle loading and error states
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <Text>Loading Research Articles...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Text type="danger">Failed to load research articles. Please try again later.</Text>
      </div>
    );
  }

  // Extract research data
  const researchArticles = data?.data || [];

  return (
    <Layout style={{ padding: "20px" }}>
      {/* Hero Section */}
      <section style={{ padding: "50px"}}>
        <Title level={2} style={{ textAlign: "center"}}>
          Welcome to the Agricultural Research Archive
        </Title>
        <Paragraph style={{ fontSize: "16px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          Explore a comprehensive archive of research articles, reports, and journals dedicated to advancing the
          agricultural sector. Gain insights into key studies that empower decision-making and foster innovation.
        </Paragraph>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button type="primary" size="large" href="/research/list">
            View Researches
          </Button>
        </div>
      </section>

      {/* Research Archive Section */}
      {/* <section style={{ padding: "40px 20px" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Available Research Papers
        </Title>
        <Row gutter={[16, 16]}>
          {researchArticles.map((article) => (
            <Col key={article.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={article.title}
                bordered={true}
                hoverable
                style={{ borderColor: "#3b5998", textAlign: "center" }}
              >
                <Space direction="vertical">
                  <Text>
                    <strong>Author:</strong> {article.author || "N/A"}
                  </Text>
                  <Text>
                    <strong>Publication Date:</strong> {article.publication_date || "Unknown"}
                  </Text>
                  <Text>
                    <strong>Summary:</strong> {article.summary?.slice(0, 100)}...
                  </Text>
                  <Button type="primary" size="small" href={article.document_link} target="_blank">
                    Read Full Paper
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </section> */}
    </Layout>
  );
};

export default ResearchArchive;
