import React, { useEffect, useState } from "react";
import LayoutMain from "@/components/layouts/LayoutMain";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const antIcon = <LoadingOutlined style={{ fontSize: 34 }} spin />;

function MyApp({ Component, pageProps }) {
  const router = useRouter();
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
  const getLayout =
    Component.getLayout || ((page) => <LayoutMain>{page}</LayoutMain>);
  return (
    <Spin spinning={loading} indicator={antIcon}>
      {getLayout(<Component {...pageProps} />)}
    </Spin>
  );
}

export default MyApp;
