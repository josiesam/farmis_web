"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  InputNumber,
  Button,
  Typography,
  Space,
  message,
  theme,
  Spin,
  Avatar,
} from "antd";
import {
  useCreate,
  useCreateMany,
  useGetIdentity,
  useList,
} from "@refinedev/core";
import {
  ORDERS_COLLECTION_ID,
  PRODUCTS_COLLECTION_ID,
} from "@constants/appWrite";
import { redirect, useRouter } from "next/navigation";
import { ID } from "@refinedev/appwrite";
import { title } from "process";

interface IFarmer {
  name: string;
  [key: string]: any;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  farmer: IFarmer;
  [key: string]: any;
}

type IUser = {
  id: number;
  name: string;
  username: string;
  avatar: string;
};

interface OrderItem {
  quantity: number;
  product: Product;
  user?: IUser;
  transactionId?: string;
  orderId?: string;
  [key: string]: any;
}

const { Title } = Typography;

// const products: Product[] = [
//     {id: 1, name: "Rice", price: 50},
//     {id: 2, name: "Cashew", price: 100},
//     {id: 3, name: "Onion", price: 30},
//     {id: 4, name: "Cocoa", price: 150},
//     {id: 5, name: "Potato", price: 50},
// ]

function generateFiveDigit(): string {
  return Math.floor(10000 * Math.random() * 90000).toString();
}

function computeTotalAmount(items: OrderItem[]): number {
  return items.reduce((total, item) => {
    const itemTotal = item.product.price;
    return total + itemTotal;
  }, 0);
}

const OrderProductPage = () => {
  const { token } = theme.useToken();
  const router = useRouter();
  const { mutate: createOrder, isLoading } = useCreateMany({
    resource: ORDERS_COLLECTION_ID!,
  });
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const { data: user } = useGetIdentity<IUser>();
  const {
    data: productData,
    isLoading: productIsLoading,
    isError: productIsError,
  } = useList<Product>({
    resource: PRODUCTS_COLLECTION_ID!,
    pagination: {
      pageSize: 20,
    },
  });

  if (productIsLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin />;
      </div>
    );
  }

  if (productIsError) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Typography.Text type="danger">
          Failed to load products. Please try again later.
        </Typography.Text>
      </div>
    );
  }

  const products = productData.data || ([] as Product[]);

  console.log(products);

  const updateOrder = (record: Product, value: number) => {
    console.log(record);
    console.log(value);
    let tempOrder: OrderItem[];
    setOrder((prevOrder) => {
      const existingOrder = prevOrder.find(
        (item) => item.product.id === record.id
      );
      if (existingOrder) {
        tempOrder = prevOrder.map((item) =>
          item.product.id === record.id ? { ...item, quantity: value } : item
        );
        setTotalAmount((prev) => {
          return computeTotalAmount(tempOrder);
        });
        return [...tempOrder];
      } else {
        tempOrder = [
          ...prevOrder,
          {
            quantity: value,
            product: record,
            user: user,
            transactionId: generateFiveDigit(),
            orderId: generateFiveDigit(),
          },
        ];
        setTotalAmount((prev) => {
          return computeTotalAmount(tempOrder);
        });
        return tempOrder;
      }
    });
  };

  const confirmOrder = () => {
    const filteredOrder = order.filter((item) => item.quantity > 0);

    if (filteredOrder.length === 0) {
      message.warning("Please select at least one product.");
      return;
    }
    createOrder(
      {
        resource: ORDERS_COLLECTION_ID!,
        values: filteredOrder.map((item) => {
          return {
            total_price: item.product.price * item.quantity,
            quantity: item.quantity,
            orderId: item.orderId,
            user: item?.user?.id || null,
            product: item.product.id
          };
        }),
      },

      {
        onSuccess: () => {
          message.success("Order placed successfully!");
          router.push("/marketplace/products/order/successfully")
        },
        onError: () => {
          message.error("Failed to place order. Please try again");
        },
      }
    );

    // createOrder(
    //   {
    //     resource: ORDERS_COLLECTION_ID!,
    //     values: {
    //       items: filteredOrder,
    //       totalAmount: filteredOrder.reduce<number>((total, item) => {
    //         const product = products.find(
    //           (product: Product) => product.id === item.productId
    //         );
    //         if (product) {
    //           return total + item.quantity * product.price;
    //         }
    //         return total;
    //       }, 0),
    //     },
    //   },
    //   {
    //     onSuccess: () => {
    //       message.success("Order placed successfully!");
    //       redirect("/marketplace/products/transaction");
    //     },
    //     onError: () => {
    //       message.error("Failed to place order. Please try again");
    //     },
    //   }
    // );
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      render: (images: any) => (
        <Avatar.Group max={{ count: 2 }}>
          {images.map((imageSrc: string) => (
            <Avatar key={imageSrc} src={imageSrc} />
          ))}
        </Avatar.Group>
      ),
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Farmer",
      dataIndex: "farmer",
      key: "farmer",
      render: (farmer: IFarmer) => `${farmer.user.name}`,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `NLe${price}`,
    },
    {
      title: "Quantity",
      key: "quantity",
      render: (_: unknown, record: Product) => (
        <InputNumber
          min={0}
          defaultValue={0}
          onChange={(value) => updateOrder(record, value || 0)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Your Order</Title>
      <Title level={4}>{`Total Amount: ${totalAmount}`}</Title>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <Space style={{ marginTop: "20px" }}>
        <Button
          type="primary"
          onClick={confirmOrder}
          loading={isLoading}
        >
          Confirm Order
        </Button>
      </Space>
    </div>
  );
};

export default OrderProductPage;
