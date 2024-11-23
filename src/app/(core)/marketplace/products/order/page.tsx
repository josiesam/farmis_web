'use client';

import React, { useState } from "react";
import {Table, InputNumber, Button, Typography, Space, message, theme } from  "antd"
import { useCreate } from "@refinedev/core";
import { ORDERS_COLLECTION_ID } from "@constants/appWrite";
import { redirect } from "next/navigation";

interface Product {
    id: number;
    name: string;
    price: number
}
interface OrderItem {
    productId: number;
    quantity: number;
}

const { Title } = Typography;

const products: Product[] = [
    {id: 1, name: "Rice", price: 50},
    {id: 2, name: "Cashew", price: 100},
    {id: 3, name: "Onion", price: 30},
    {id: 4, name: "Cocoa", price: 150},
    {id: 5, name: "Potato", price: 50},
]

const OrderProductPage = () => {
  const { token } = theme.useToken();

  const { mutate: createOrder, isLoading } = useCreate();
    const [order, setOrder] = useState<OrderItem[]>([])

    const updateOrder = (productId:number, quantity:number) => {
        setOrder((prevOrder) => {
            const existingOrder = prevOrder.find((item) => item.productId === productId)
            if (existingOrder) {
                return prevOrder.map((item) => 
                    item.productId === productId ? { ...item, quantity} : item
            )
            } else {
                return [...prevOrder, { productId, quantity}];
            }
        })
    };

    const confirmOrder = () => {
        const filteredOrder = order.filter((item) => item.quantity > 0);
        
        if (filteredOrder.length === 0) {
            message.warning("Please select at least one product.")
            return;
        }

        createOrder(
            {
                resource: ORDERS_COLLECTION_ID!,
                values: {
                    items: filteredOrder,
                    totalAmount: filteredOrder.reduce<number>(
                        (total, item) => {
                            const product = products.find((product:Product) => product.id === item.productId)
                            if (product) {
                                return total + item.quantity * product.price
                            }
                            return total;
                        },
                        0
                    )
                }
            },
            {
                onSuccess: () => {
                    message.success("Order placed successfully!");
                    redirect("/marketplace/products/transaction");
                },
                onError: () => {
                    message.error("Failed to place order. Please try again")
                },
            }
        );
    };

    const columns = [
        {
            title: "Product",
            dataIndex: "name",
            key: 'name'
        },
        {
            title: "Price",
            dataIndex: 'price',
            key: 'price',
            render: (price:number) =>  `$${price}`
        },
        {
            title: "Quantity",
            key: 'quantity',
            render: (_:unknown, record:Product) => (
                <InputNumber
                    min={0}
                    defaultValue={0}
                    onChange={(value) => updateOrder(record.id, value || 0)}
                />
            )
        }
    ];

    return (
        <div style={{ padding: "20px" }}>
            <Title level={2}>Order Agricultural Products</Title>
            <Table
                dataSource={products}
                columns={columns}
                rowKey="id"
                pagination={false}
            />
            <Space style={{ marginTop: "20px"}}>
                <Button
                    type="primary"
                    onClick={confirmOrder}
                    loading={isLoading}
                >
                    Confirm Order
                </Button>
            </Space>
        </div>
    )
}

export default OrderProductPage;