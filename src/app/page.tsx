"use client";

import { Suspense } from "react";

import LandingPage from "@components/LandingPage";
import CoreLayout from "@components/navigation";

export default function IndexPage() {
  return (
      <CoreLayout>
        <LandingPage />
      </CoreLayout>
  );
}
