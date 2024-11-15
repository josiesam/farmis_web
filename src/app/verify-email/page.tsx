// `app/verify-email/page.tsx` - Email Verification Completion Page

"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Typography, message, Spin } from "antd";
import { appwriteAccount, appWriteAvatar, appwriteClient } from "@utils/appwrite/client";


const { Title, Text } = Typography;

// Initialize Appwrite client

const EmailVerificationPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  // Extract `userId` and `secret` from query parameters
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  useEffect(() => {
    if (userId && secret) {
      verifyEmail(userId, secret);
    } else {
      setLoading(false);
      message.error("Invalid verification link.");
    }
  }, [userId, secret]);

  const verifyEmail = async (userId: string, secret: string) => {
    try {
      // Use Appwrite's updateVerification to complete email verification
      await appwriteAccount.updateVerification(userId, secret);
      setIsVerified(true);
      message.success("Your email has been successfully verified!");
    } catch (error) {
      setIsVerified(false);
      console.error("Verification failed:", error);
      message.error("Email verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goToHomePage = () => {
    router.push("/");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 50 }}>
      {loading ? (
        <Spin tip="Verifying your email..." />
      ) : isVerified ? (
        <>
          <Title level={3}>Email Verified!</Title>
          <Text>Your email has been successfully verified. You can now access all features.</Text>
          <Button type="primary" onClick={goToHomePage} style={{ marginTop: 20 }}>
            Go to Home
          </Button>
        </>
      ) : (
        <>
          <Title level={3}>Verification Failed</Title>
          <Text type="danger">We couldn't verify your email. The verification link may have expired or is invalid.</Text>
          <Button type="primary" onClick={goToHomePage} style={{ marginTop: 20 }}>
            Go to Home
          </Button>
        </>
      )}
    </div>
  );
};

export default EmailVerificationPage;
