'use client';

import { STORAGE_BUCKET_ID } from "@constants/appWrite";
import { Models, Query } from "@refinedev/appwrite";
import { appwriteStorage } from "@utils/appwrite/client";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface Images {
    [key: string]: any;
}

interface ImagesContextType {
    current: Images[];
    add: (report: Partial<Images>) => Promise<Models.File | undefined>;
    getFile: (id: string) => Promise<Models.File | undefined>;
    downloadImage: (id: string) => Promise<URL | undefined>;
    getPreview: (id: string) => Promise<URL | undefined>;
    getView: (id: string) => Promise<URL | undefined>;
}

const ImagesContext = createContext<ImagesContextType | undefined>(undefined);

export function useImages() {
    const context = useContext(ImagesContext);
    if (!context) {
        throw new Error("useImages must be used within a ImagesProvider");
    }
    return context;
}

interface ImagesProviderProps {
    children: ReactNode;
}

export function ImagesProvider({children}: ImagesProviderProps) {
    const [images, setImages] = useState<Images[]>([]);
    
    async function add(image: Partial<Images>) {
        const {file, fileId } = image
        try {
            const response = await appwriteStorage.createFile(
                STORAGE_BUCKET_ID!,
                fileId,
                file
            );
            setImages((prevImages) => [response, ...prevImages].slice(0, 10))
            return response;
        } catch (error) {
            console.error("Error adding report:", error);
        }
    }
    async function getFile(id: string) {
        try {
            const result = await appwriteStorage.getFile(
                STORAGE_BUCKET_ID!,
                id
            )
            console.log(result)
            return result
        } catch (error) {
            console.error('Error get Image:', error)
        }
    }

    async function downloadImage(id:string) {
        try {
            const result = appwriteStorage.getFileDownload(
                STORAGE_BUCKET_ID!,
                id
            )
            console.log(result)
            return result
        } catch (error) {
            console.error("Error downoad Image:", error)
        }
    }

    async function getPreview(id: string) {
        try {
            const data = {
                height: 500,
                width: 500,
            }
            const result = appwriteStorage.getFilePreview(
                STORAGE_BUCKET_ID!,
                id
            )
            console.log(result)
            return result
        } catch (error) {
            console.error("Error previewing image: ", error)
        }
    }

    async function getView(id: string) {
        try {
            const data = {
                height: 500,
                width: 500,
            }
            const result = appwriteStorage.getFileView(
                STORAGE_BUCKET_ID!,
                id
            )
            console.log(result)
            return result
        } catch (error) {
            console.error("Error view image: ", error)
        }
    }

    async function init() {
        try {
            const response = await appwriteStorage.listFiles(
                STORAGE_BUCKET_ID!,
                [Query.orderDesc("$createdAt"), Query.limit(10)]
            );
            setImages(response.files as Images[]);
        } catch (error) {
            console.error("Error initialising images: ", error);
        }
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <ImagesContext.Provider value={{ current: images, add, downloadImage, getPreview, getFile, getView}}>
            {children}
        </ImagesContext.Provider>
    )
}