"use client";

import { AppwriteException } from "@refinedev/appwrite";
import type { AuthProvider } from "@refinedev/core";
import { appwriteAccount, appWriteAvatar, appwriteClient } from "@utils/appwrite/client";
import { APPWRITE_JWT_KEY } from '@constants/appWrite'
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";

export const authProviderClient: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      Cookies.remove(APPWRITE_JWT_KEY!, { path: "/" });
      appwriteClient.setJWT("");

      await appwriteAccount.createEmailPasswordSession(email, password);
      const { jwt } = await appwriteAccount.createJWT();
      appwriteClient.setJWT(jwt);

      if (jwt) {
        Cookies.set(APPWRITE_JWT_KEY!, jwt, {
          expires: 30, // 30 days
          path: "/",
        });
      }

      return {
        success: true,
        redirectTo: "/dashboard",
      };
    } catch (error) {
      const { type, message, code } = error as AppwriteException;
      return {
        success: false,
        error: {
          message,
          name: `${code} - ${type}`,
        },
      };
    }
  },
  logout: async () => {
    try {
      await appwriteAccount.deleteSessions();
    } catch (error) {}

    Cookies.remove(APPWRITE_JWT_KEY!, { path: "/" });
    appwriteClient.setJWT("");
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  register: async ({ email, password, username, name, phone }) => {
    try {
      const user = await appwriteAccount.create(uuidv4(), email, password, name);
      Cookies.remove(APPWRITE_JWT_KEY!, { path: "/" });
      appwriteClient.setJWT("");

      await appwriteAccount.createEmailPasswordSession(email, password);
      const { jwt } = await appwriteAccount.createJWT();
      appwriteClient.setJWT(jwt);

      if (jwt) {
        Cookies.set(APPWRITE_JWT_KEY!, jwt, {
          expires: 30, // 30 days
          path: "/",
        });
      }
      appwriteAccount.updatePrefs({username})
      appwriteAccount.createVerification('https://farmis-web.vercel.app/verify-email')
      message.success('Please check your email to verify your account')

      appwriteAccount.updatePhone(phone, password)

      return {
        success: true,
        redirectTo: "/dashboard",
      };
    } catch (error) {
      const { type, message, code } = error as AppwriteException;
      return {
        success: false,
        error: {
          message,
          name: `${code} - ${type}`,
        },
      };
    }
  },
  onError: async (error: AppwriteException) => {
    if (error.code === 401) {
      return { logout: true, redirectTo: "/login", error };
    }
    return { error };
  },
  check: async () => {
    const appwriteJWT = Cookies.get(APPWRITE_JWT_KEY!);
    if (appwriteJWT) {
      appwriteClient.setJWT(appwriteJWT);
    }

    try {
      const session = await appwriteAccount.get();

      if (session) {
        return {
          authenticated: true,
        };
      }
    } catch (error: any) {
      return {
        authenticated: false,
        error: error,
        logout: true,
        redirectTo: "/login",
      };
    }

    return {
      authenticated: false,
      error: {
        message: "Check failed",
        name: "Session not found",
      },
      logout: true,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const user = await appwriteAccount.get();
    const userPreferences = await appwriteAccount.getPrefs();

    if (user) {
      const avatar = appWriteAvatar.getInitials()
      const user_data = {...user, avatar:avatar?.href, username:userPreferences?.username}
      return user_data;
    }

    return null;
  },
};
