"use client";

import { AppwriteException } from "@refinedev/appwrite";
import type { AuthProvider } from "@refinedev/core";
import { appwriteAccount, appWriteAvatar, appwriteClient, appwriteDatabase, appwriteFunction } from "@utils/appwrite/client";
import { APPWRITE_JWT_KEY, AUTH_USERPROFILE_FUNCTION_ID, FARMERS_COLLECTION_ID, INVESTORS_COLLECTION_ID, PROJECT_DATABASE_ID, STAKEHOLDERS_COLLECTION_ID, USERS_COLLECTION_ID } from '@constants/appWrite'
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { message } from "antd";

export const authProviderClient: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      await appwriteAccount.deleteSessions();
    } catch (error) {}

    Cookies.remove(APPWRITE_JWT_KEY!, { path: "/" });
    appwriteClient.setJWT("");
    
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
  register: async ({ email, password, username, name, phone, userType, gender }) => {
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
      await appwriteAccount.updatePrefs({username, userType, gender})
      await appwriteAccount.createVerification('https://farmis-web.vercel.app/verify-email')
      message.success('Please check your email for account verification link')
          
      await appwriteAccount.updatePhone(phone, password)



      appwriteDatabase.createDocument(
        PROJECT_DATABASE_ID!,
        USERS_COLLECTION_ID!,
        user.$id,
        {
          name,
          email,
          phone,
          gender,
          user_type: userType
        }
    
      )

      let profile_collection_id

      switch (userType) {
        case 'farmer':
          profile_collection_id = FARMERS_COLLECTION_ID!
          break;
        case 'investor':
          profile_collection_id = INVESTORS_COLLECTION_ID!
          break;
        case 'stakeholder':
          profile_collection_id = STAKEHOLDERS_COLLECTION_ID!
          break;
      
        default:
          break;
      }

      if (profile_collection_id) {
        appwriteDatabase.createDocument(
          PROJECT_DATABASE_ID!,
          profile_collection_id,
          user.$id,
          {
            user:user.$id
          }
        )
      }
      console.log(userType)
      
      const redirect = Boolean(userType) ? `/config-profile/${userType}` : '/dashboard';
      return {
        success: true,
        redirectTo: redirect,
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
