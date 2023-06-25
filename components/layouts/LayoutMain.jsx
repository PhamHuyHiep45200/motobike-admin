import { CreateContext } from "@/context/ContextApi";
import {
  AreaChartOutlined,
  BellOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Layout, Menu, Popover } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const { Sider, Content } = Layout;
function LayoutMain({ children }) {
  const { noti } = useContext(CreateContext);
  const router = useRouter();
  const changeMenu = (e) => {
    router.push(e.key);
  };
  const content = () => {
    return (
      <div>
        {noti.length &&
          noti.map((e) => (
            <div
              key={e.id}
              className="my-[10px] flex border-b-[1px] border-[#eaeaea] max-w-[300px] space-x-[10px] max-h-[500px] overflow-y-auto"
            >
              <div>
              <Avatar>{e.UserReceiverOrder.name[0]}</Avatar>
              </div>
              <div className="text-[#777]">
                <span className="font-bold text-[black]">{e.UserReceiverOrder.name}</span> đã
                thuê xe{" "}
                <span className="text-medium text-[red]">
                  {e.motoOrder.name}
                </span>{" "}
                vào lúc {moment(e.createdAt).format("HH:mm")} phút{" "}
                {moment(e.createdAt).format("DD-MM-YYYY")}
              </div>
            </div>
          ))}
      </div>
    );
  };
  const itemsLayout = [
    {
      key: "/",
      icon: <AreaChartOutlined />,
      label: "Trang chủ",
    },
    {
      key: "/user",
      icon: <UsergroupAddOutlined />,
      label: "Người dùng",
    },
    {
      key: "/category",
      icon: <UsergroupAddOutlined />,
      label: "Hãng xe",
    },
    {
      key: "/moto",
      icon: <UsergroupAddOutlined />,
      label: "Moto",
    },
    {
      key: "/order",
      icon: <UsergroupAddOutlined />,
      label: (
        <div className="flex justify-between items-center pr-[10px]">
          <span>Đơn hàng</span>
          <Popover content={content} trigger='hover' title="Thông báo" placement="right">
            <Badge count={noti.length ?? 0} size="small">
              <BellOutlined className="text-[white] !text-[20px]" />
            </Badge>
          </Popover>
        </div>
      ),
    },
    {
      key: "/banner",
      icon: <UsergroupAddOutlined />,
      label: "Banner",
    },
    {
      key: "/chat",
      icon: <UsergroupAddOutlined />,
      label: "Chat",
    },
  ];
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={itemsLayout}
          onClick={changeMenu}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "24px 16px 0" }}>
          <div style={{ padding: 24, minHeight: 360 }}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutMain;
