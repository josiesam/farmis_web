import React from "react";
import { useList } from "@refinedev/core";
import { Layout, Typography, Row, Col, Card, Spin, Space, Button } from "antd";

const { Title, Paragraph, Text } = Typography;

const EventsPage = () => {
  // Use Refine's useList hook to fetch event data
  const { data, isLoading, error } = useList({
    resource: "events", // This should match the collection name in Appwrite
  });

  // Handle loading and error states
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <Text>Loading Events...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Text type="danger">Failed to load events. Please try again later.</Text>
      </div>
    );
  }

  // Extract events data
  const events = data?.data || [];

  return (
    <Layout style={{ backgroundColor: "#f9f9f9", padding: "20px" }}>
      {/* Hero Section */}
      <section style={{ background: "#2a9d8f", padding: "50px", color: "white" }}>
        <Title level={2} style={{ textAlign: "center", color: "white" }}>
          Discover Agricultural Events & Seminars
        </Title>
        <Paragraph style={{ fontSize: "16px", textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          Stay updated on upcoming agricultural seminars, training programs, and events designed to empower farmers, 
          stakeholders, and investors. Learn, connect, and grow with the agricultural community.
        </Paragraph>
      </section>

      {/* Events Listing Section */}
      {/* <section style={{ padding: "40px 20px" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Upcoming Events
        </Title>
        <Row gutter={[16, 16]}>
          {events.map((event) => (
            <Col key={event.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={event.title}
                bordered={true}
                hoverable
                style={{ borderColor: "#2a9d8f", textAlign: "center" }}
              >
                <Space direction="vertical">
                  <Text>
                    <strong>Date:</strong> {event.date || "TBA"}
                  </Text>
                  <Text>
                    <strong>Location:</strong> {event.location || "Online"}
                  </Text>
                  <Text>
                    <strong>Organizer:</strong> {event.organizer || "N/A"}
                  </Text>
                  <Paragraph>{event.description?.slice(0, 100)}...</Paragraph>
                  <Button type="primary" size="small" href={`/events/${event.id}`} style={{ backgroundColor: "#264653" }}>
                    RSVP Now
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

export default EventsPage;
