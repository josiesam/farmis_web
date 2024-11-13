"use client";

import { dataProvider, liveProvider } from "@refinedev/appwrite";
import { appwriteClient } from "@utils/appwrite/client";
import { PROJECT_DATABASE_ID } from '@constants/appWrite'

export const appwriteDataProvider = dataProvider(appwriteClient, {
  databaseId: PROJECT_DATABASE_ID!,
});

export const appwriteLiveProvider = liveProvider(appwriteClient, {
  databaseId: PROJECT_DATABASE_ID!,
});
