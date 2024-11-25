"use client";

import { PlusOutlined } from "@ant-design/icons";
import { useImages } from "@contexts/appwrite-storage";
import { Create, Edit, getValueFromEvent, useForm } from "@refinedev/antd";
import { ID } from "@refinedev/appwrite";
import { file2Base64 } from "@refinedev/core";
import {
  DatePicker,
  Form,
  GetProp,
  Input,
  InputNumber,
  message,
  Upload,
  UploadFile,
  UploadProps,
} from "antd";
import { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function ResearchEdit() {
  const { formProps, saveButtonProps, onFinish } = useForm({});
  const bucketStore = useImages();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleOnFinish = async (values: any) => {
    setIsUploading(false);
    console.log(values);
    try {
      const base64Files: any = [];

      const { title, author, publication_date, publisher, summary, document_link } =
        values;

      for (const file of document_link) {
        let uploadFile;
        if (file.originFileObj) {
          const base64String = await file2Base64(file);

          uploadFile = {
            ...file,
            base64String,
          };
        } else {
          uploadFile = file;
        }

        const response = await bucketStore.add({
          fileId: ID.unique(),
          file: uploadFile.originFileObj,
        });

        const imageUrl = await bucketStore.downloadImage(response!.$id);

        base64Files.push(imageUrl);
      }

      message.success("Crop data upload successfully");

      return (
        formProps.onFinish &&
        formProps.onFinish({
          title,
          author,
          publication_date,
          publisher,
          summary,
          document_link: base64Files[0],
        })
      );
    } catch (error) {
      message.error(`Crop not uploaded. Error: ${error}`);
    }
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
        <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
          <Form.Item label={"Images"}>
            <Form.Item
              name={"document_link"}
              valuePropName="fileList"
              getValueFromEvent={getValueFromEvent}
              noStyle
            >
              <Upload
                listType="picture-card"
                fileList={fileList}
                multiple
                beforeUpload={() => false}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
          </Form.Item>
          <Form.Item
            label={"Title"}
            name={"title"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={"Author"} name={"author"} rules={[{required:true}]}>
            <Input />
          </Form.Item>
          <Form.Item label={"Publisher"} name={"publisher"} rules={[]}>
            <Input />
          </Form.Item>
          <Form.Item label={"Summary"} name={"summary"} rules={[]}>
            <Input />
          </Form.Item>
          <Form.Item
            label={"Publication Date"}
            name={"publication_date"}
            rules={[]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
    </Edit>
  );
}
