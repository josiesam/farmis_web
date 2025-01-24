'use client';

import React, { useState } from "react";
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
import { EVENTS_COLLECTION_ID, INVESTORS_COLLECTION_ID } from "@constants/appWrite";
import dayjs, { Dayjs } from "dayjs";
import { info } from "console";

const { Title, Paragraph, Text } = Typography;

type ListDataType = {
  type: Required<BadgeProps>["status"]; // Ensures it matches the Badge `status`
  content: string;
};

const getListData = (value: Dayjs) => {
  let listData: ListDataType[] = [];
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




    const { data, isLoading, error } = useList({
      resource: EVENTS_COLLECTION_ID!, // This should match the collection name in Appwrite
    });

  
    if (isLoading) {
      return (<Spin />)
    }

    if (error) {
      return (<div>Error</div>)
    }

  const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current)
  }

  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value:Dayjs) => {
    const stringValue = value.format("YYYY-MM-DD");
    const listData = data.data.filter(({ date }) => 
      dayjs(date).format("YYYY-MM-DD") === stringValue
    );

    return (
      <ul className="events" style={{margin:0, padding:0, listStyle: 'none'}}>
        {listData.map((item:any) => (
          <li key={item.id}>
            <Badge status={"success"} text={item.name} />
          </li>
        ))}
      </ul>
    );

  };

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
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button type="primary" size="large" href="/event/list">
            View Events
          </Button>
        </div>
      </section>

      {/* Events Listing Section */}
      <section style={{ padding: "40px 20px" }}>
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Upcoming Events
        </Title>
        <Calendar cellRender={cellRender} />
      </section>
    </Layout>
  );
};

export default EventsPage;

