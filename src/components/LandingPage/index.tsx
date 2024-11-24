import React from 'react'
import { Typography, Layout, Button, Row, Col, Card} from 'antd'
import { AppstoreOutlined, CalendarOutlined, FundProjectionScreenOutlined } from '@ant-design/icons';

const {Title, Paragraph} = Typography;
const { Content} = Layout

type Props = {}

const LandingPage = (props: Props) => {
  return (
    <Content style={{ padding: "16px" }}>
    {/* Overview Section */}
    <div style={{ textAlign: "center", marginBottom: "50px" }}>
      <Title level={2}>Empowering Farmers Through Digital Innovation</Title>
      <Paragraph>
        Our platform bridges the gap between farmers, investors, and stakeholders by offering tools for market access, funding opportunities, 
        and agricultural insights.
      </Paragraph>
      <Button type="primary" size="large" href="/register">
        Get Started
      </Button>
    </div>

    {/* Features Section */}
    <Row gutter={[16, 16]} justify="center">
      <Col xs={24} sm={12} md={8}>
        <Card
          title="National Agriculture Registry"
          bordered={false}
          style={{ textAlign: "center" }}
          cover={<AppstoreOutlined />}
        >
          <Paragraph>Manage farmer profiles, crop data, and more with ease.</Paragraph>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card
          title="Agricultural Marketplace"
          bordered={false}
          style={{ textAlign: "center" }}
          cover={<FundProjectionScreenOutlined />}
        >
          <Paragraph>Buy and sell agricultural products directly on the platform.</Paragraph>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card
          title="Funding Management"
          bordered={false}
          style={{ textAlign: "center" }}
          cover={<FundProjectionScreenOutlined />}
        >
          <Paragraph>Access funding opportunities for agricultural projects.</Paragraph>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={8}>
        <Card
          title="Event Management"
          bordered={false}
          style={{ textAlign: "center" }}
          cover={<CalendarOutlined />}
        >
          <Paragraph>Stay updated on agricultural seminars and training programs.</Paragraph>
        </Card>
      </Col>
    </Row>
  </Content>
  )
}

export default LandingPage