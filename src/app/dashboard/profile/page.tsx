'use client'

import { use, useState } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
  UploadProps,
  Image,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useGetIdentity } from "@refinedev/core";

const BgProfile = "/assets/images/bg-profile.jpg";
const profilavatar = "/assets/images/face-1.jpg";
const convesionImg = "/assets/images/face-3.jpg";
const convesionImg2 = "/assets/images/face-4.jpg";
const convesionImg3 = "/assets/images/face-5.jpeg";
const convesionImg4 = "/assets/images/face-6.jpeg";
const convesionImg5 = "/assets/images/face-2.jpg";
const project1 = "/assets/images/home-decor-1.jpeg";
const project2 = "/assets/images/home-decor-2.jpeg";
const project3 = "/assets/images/home-decor-3.jpeg";


interface Project {
  img: string;
  titlesub: string;
  title: string;
  description: string;
}

interface Conversation {
  title: string;
  avatar: string;
  description: string;
}

type IUser = {
  id: number;
  name: string;
  username: string;
  avatar: string;
  email: string;
  phone: string;
};

function Profile() {
  const [imageURL, setImageURL] = useState<Boolean>(false);
  const [, setLoading] = useState<Boolean>(false);
  const { data: user } = useGetIdentity<IUser>();



  const getBase64 = (img: Blob, callback: (result: string | ArrayBuffer | null) => void) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(false);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj!, (imageUrl) => {
        setLoading(false);
        setImageURL(false);
      });
    }
  };

  const uploadButton = (
    <div className="ant-upload-text font-semibold text-dark">
      {<VerticalAlignTopOutlined style={{ width: 20, color: "#000" }} />}
      <div>Upload New Project</div>
    </div>
  );

  const data: Conversation[] = [
    {
      title: "Kadiatu Seasy",
      avatar: convesionImg,
      description: "Hi! I need more information…",
    },
    {
      title: "Aminata K.",
      avatar: convesionImg2,
      description: "Awesome work, can you…",
    },
    {
      title: "Mustapha L.",
      avatar: convesionImg3,
      description: "About files I can…",
    },
    {
      title: "Dauda Brima",
      avatar: convesionImg4,
      description: "Have a great afternoon…",
    },
    {
      title: "Junior M.",
      avatar: convesionImg5,
      description: "Hi! I need more information…",
    },
  ];

  const project: Project[] = [
    {
      img: project1,
      titlesub: "Project #1",
      title: "Modern",
      description:
        "As Uber works through a huge amount of internal management turmoil.",
    },
    {
      img: project2,
      titlesub: "Project #2",
      title: "Scandinavian",
      description:
        "Music is something that every person has his or her own specific opinion about.",
    },
    {
      img: project3,
      titlesub: "Project #3",
      title: "Minimalist",
      description:
        "Different people have different taste, and various types of music, Zimbali Resort",
    },
  ];

  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: `url(${BgProfile})` }}
      ></div>

      <Card
        className="card-profile-head"
        styles={{ body:{display: "none" } }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={user?.avatar} alt="profile" />

                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{user?.name}</h4>
                  <p>Farmer, Kenema District</p>
                </div>
              </Avatar.Group>
            </Col>
            <Col
              span={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Radio.Group defaultValue="a">
                <Radio.Button value="a">OVERVIEW</Radio.Button>
                <Radio.Button value="b">CROPS</Radio.Button>
                <Radio.Button value="c">PROJECTS</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={8} className="mb-24 ">
          <Card
            bordered={false}
            className="header-solid h-full"
            title={<h6 className="font-semibold m-0">Platform Settings</h6>}
          >
            <ul className="list settings-list">
              <li>
                <h6 className="list-header text-sm text-muted">ACCOUNT</h6>
              </li>
              <li>
                <Switch defaultChecked />

                <span>Email me when someone follows me</span>
              </li>
              <li>
                <Switch />
                <span>Email me when someone answers me</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Email me when someone mentions me</span>
              </li>
              <li>
                <h6 className="list-header text-sm text-muted m-0">
                  APPLICATION
                </h6>
              </li>
              <li>
                <Switch defaultChecked />
                <span>New launches and projects</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Monthly product updates</span>
              </li>
              <li>
                <Switch defaultChecked />
                <span>Subscribe to newsletter</span>
              </li>
            </ul>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={<Button type="link">{<EditOutlined />}</Button>}
            styles={{ body:{paddingTop: 0, paddingBottom: 16}  }}
          >
            <p className="text-dark">
              {`Hi, I am ${user?.name}, a 27 years old female farmer from the Lower 
              Bambara Chiefdom, Kenema District. My main commodity crops are rice 
              and vegetable. `}
            </p>
            <hr className="my-25" />
            <Descriptions title={user?.name}>
              <Descriptions.Item label="Full Name" span={3}>
                {user?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                {user?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {user?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={3}>
                Lower Bambara Chiefdom, Kenema District
              </Descriptions.Item>
              <Descriptions.Item label="Social" span={3}>
                <a href="#farmis" className="mx-5 px-5">
                  {<TwitterOutlined />}
                </a>
                <a href="#farmis" className="mx-5 px-5">
                  {<FacebookOutlined style={{ color: "#344e86" }} />}
                </a>
                <a href="#farmis" className="mx-5 px-5">
                  {<InstagramOutlined style={{ color: "#e1306c" }} />}
                </a>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
        <Col span={24} md={8} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Customers</h6>}
            className="header-solid h-full"
            styles={{ body:{paddingTop: 0, paddingBottom: 16}  }}
          >
            <List
              itemLayout="horizontal"
              dataSource={data}
              split={false}
              className="conversations-list"
              renderItem={(item) => (
                <List.Item key={item.title} actions={[<Button key={0} type="link">REPLY</Button>]}>
                  <List.Item.Meta
                    avatar={
                      <Avatar shape="square" size={48} src={item.avatar} />
                    }
                    title={item.title}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Card
        bordered={false}
        className="header-solid mb-24"
        title={
          <>
            <h6 className="font-semibold">Projects</h6>
            <p>Architects design houses</p>
          </>
        }
      >
        <Row gutter={[24, 24]}>
          {project.map((p, index) => (
            <Col span={24} md={12} xl={6} key={index}>
              <Card
                bordered={false}
                className="card-project"
                cover={<Image alt="example" width={0} height={0} src={p.img} />}
              >
                <div className="card-tag">{p.titlesub}</div>
                <h5>{p.title}</h5>
                <p>{p.description}</p>
                <Row gutter={[6, 0]} className="card-footer">
                  <Col span={12}>
                    <Button>VIEW PROJECT</Button>
                  </Col>
                  <Col span={12} className="text-right">
                    <Avatar.Group className="avatar-chips">
                      <Avatar size="small" src={profilavatar} />
                      <Avatar size="small" src={convesionImg} />
                      <Avatar size="small" src={convesionImg2} />
                      <Avatar size="small" src={convesionImg3} />
                    </Avatar.Group>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
          <Col span={24} md={12} xl={6}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader projects-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageURL ? (
                <Image src={""} width={0} height={0} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default Profile;