'use client';

import React from "react";
import { useList } from "@refinedev/core";
import {
  Layout,
  Typography,
  Row,
  Col,
  Card,
  Spin,
  Space,
  Button,
  Badge,
  BadgeProps,
  CalendarProps,
  Calendar,
} from "antd";
import { INVESTORS_COLLECTION_ID } from "@constants/appWrite";
import { Dayjs } from "dayjs";
import { info } from "console";

const { Title, Paragraph, Text } = Typography;

const getListData = (value: Dayjs) => {
  let listData: { type: string; content: string }[] = [];
  switch (value.date()) {
    case 8:
      listData = [
        { type: "success", content: "This is an harvesting event" },
        { type: "warning", content: "This is a marketing event" },
      ];
      break;
    case 10:
      listData = [
        { type: "warning", content: "This is a marketing event" },
        { type: "error", content: "This is a seminar event" },
        { type: "success", content: "This is a harvesting events" },
      ];
      break;
    case 20:
      listData = [{ type: "success", content: "This is a harvesting events" }];
      break;
    case 26:
      listData = [
        { type: "warning", content: "This is a marketing event" },
        { type: "success", content: "This is a harvesting events" },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const EventsPage = () => {
  // Use Refine's useList hook to fetch event data
  // const { data, isLoading, error } = useList({
  //   resource: INVESTORS_COLLECTION_ID, // This should match the collection name in Appwrite
  // });

  // // Handle loading and error states
  // if (isLoading) {
  //   return (
  //     <div style={{ textAlign: "center", padding: "50px" }}>
  //       <Spin size="large" />
  //       <Text>Loading Events...</Text>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div style={{ textAlign: "center", padding: "50px" }}>
  //       <Text type="danger">Failed to load events. Please try again later.</Text>
  //     </div>
  //   );
  // }

  // // Extract events data
  // const events = data?.data || [];

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content}></Badge>
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current)
  }

  return (
    <Layout style={{padding: "20px" }}>
      {/* Hero Section */}
      <section
        style={{ padding: "50px"}}
      >
        <Title level={2} style={{ textAlign: "center"}}>
          Discover Agricultural Events & Seminars
        </Title>
        <Paragraph
          style={{
            fontSize: "16px",
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Stay updated on upcoming agricultural seminars, training programs, and
          events designed to empower farmers, stakeholders, and investors.
          Learn, connect, and grow with the agricultural community.
        </Paragraph>
      </section>

      {/* Events Listing Section */}
      <section style={{ padding: "40px 20px" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Upcoming Events
        </Title>
        <Calendar cellRender={cellRender} />
      </section>
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
