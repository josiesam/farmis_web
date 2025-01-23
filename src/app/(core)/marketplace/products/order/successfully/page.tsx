'use client';

import React from 'react';
import { Typography, Button, Card } from 'antd';
import { redirect } from 'next/navigation';

const {Title, Paragraph } = Typography;

const TransactionPage = () => {

    return (
        <Card style={{ padding: "20px", textAlign: "center"}}>
            <Title level={2}>Order Successfull</Title>
            <Paragraph>
                Your order has been successsfully placed. You will receive a confirmation email shortly.
            </Paragraph>
            <Button type='primary' onClick={() => redirect('/')}>
                Back to Home
            </Button>
        </Card>
    )
}

export default TransactionPage;