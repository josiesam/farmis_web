"use client";

import { PlusOutlined } from "@ant-design/icons";
import { useImages } from "@contexts/appwrite-storage";
import { Create, getValueFromEvent, useForm } from "@refinedev/antd";
import { ID } from "@refinedev/appwrite";
import { file2Base64 } from "@refinedev/core";
import {
  Form,
  GetProp,
  Image,
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

export default function CropCreate() {
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

      const { name, crop_type, growing_season, yield_per_hectare, images } =
        values;

      for (const file of images) {
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

        console.log(typeof uploadFile);

        const response = await bucketStore.add({
          fileId: ID.unique(),
          file: uploadFile.originFileObj,
        });

        const imageUrl = await bucketStore.getView(response!.$id);

        base64Files.push(imageUrl);
      }

      let _yield_per_hectare;
      if (yield_per_hectare) {
        _yield_per_hectare = parseFloat(yield_per_hectare);
      } else {
        _yield_per_hectare = null;
      }

      message.success("Crop data upload successfully");

      return (
        formProps.onFinish &&
        formProps.onFinish({
          name,
          crop_type,
          growing_season,
          yield_per_hectare: _yield_per_hectare,
          images: base64Files,
        })
      );
    } catch (error) {
      message.error(`Crop not uploaded. Error: ${error}`);
    }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} onFinish={handleOnFinish} layout="vertical">
        <Form.Item label={"Images"}>
          <Form.Item
            name={"images"}
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
              {fileList.length >= 5 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form.Item>
        <Form.Item
          label={"Name"}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"Crop Type"} name={["crop_type"]} rules={[]}>
          <Input />
        </Form.Item>
        <Form.Item
          label={"Growing Season"}
          name={["growing_season"]}
          rules={[]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Yield per hectare"}
          name={["yield_per_hectare"]}
          rules={[]}
        >
          <InputNumber />
        </Form.Item>
      </Form>
    </Create>
  );
}
