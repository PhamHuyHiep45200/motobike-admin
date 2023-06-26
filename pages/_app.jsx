import React, { useEffect, useMemo, useState } from "react";
import LayoutMain from "@/components/layouts/LayoutMain";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Spin, notification } from "antd";
import { CheckCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { getNotify } from "@/service/notify";
import { CreateContext } from "@/context/ContextApi";
import { io } from "socket.io-client";
import { userAdmin } from "@/service/user";
import moment from "moment";
const antIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

function MyApp({ Component, pageProps }) {
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const [noti, setNoti] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    router.events.on("routeChangeStart", loadingStart);
    router.events.on("routeChangeComplete", loadingEnd);
    router.events.on("routeChangeError", loadingEnd);

    return () => {
      router.events.off("routeChangeStart", loadingStart);
      router.events.off("routeChangeComplete", loadingEnd);
      router.events.off("routeChangeError", loadingEnd);
    };
  }, [router, router.events]);
  const loadingStart = () => {
    setLoading(true);
  };

  const loadingEnd = () => {
    setLoading(false);
  };
  const getNotifyData = async () => {
    const res = await getNotify();
    if (res.data && res.data.status === 200) {
      setNoti(res.data.data);
    }
  };
  useEffect(() => {
    getNotifyData();
    getAdmin();
  }, []);
  const data = useMemo(() => {
    return {
      noti,
    };
  }, [noti]);
  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_URL_SERVER);
    setSocket(newSocket);

    newSocket.on("notify", (data) => {
      api.open({
        message: "Thông Báo Thuê Xe",
        description: (
          <div>
            <span className="text-[red] font-semibold">{data.UserReceiverOrder.name}</span> vừa thuê xe{" "}
            <span className="text-[red] font-medium">{data.motoOrder.name}</span> vào lúc{" "}
            <span className="text-[#666]">
            {moment(data.createdAt).format("HH")} giờ{" "}
            {moment(data.createdAt).format("mm")} phút
            </span>
          </div>
        ),
        icon: <CheckCircleOutlined className="text-[green]" />,
      });
      setNoti((prevMessages) => [data, ...prevMessages]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);
  const getAdmin = async () => {
    const res = await userAdmin();
    if (res.data && res.data.status === 200) {
      localStorage.setItem("userId", res.data.data.id);
    }
  };
  const getLayout =
    Component.getLayout || ((page) => <LayoutMain>{page}</LayoutMain>);
  return (
    <CreateContext.Provider value={data}>
      {contextHolder}
      <Spin spinning={loading} indicator={antIcon}>
        {getLayout(<Component {...pageProps} />)}
      </Spin>
    </CreateContext.Provider>
  );
}

export default MyApp;
