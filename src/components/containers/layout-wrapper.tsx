import React, { useMemo } from "react";
import { Header } from "./header";
import { Inter } from "next/font/google";
import { useAuth } from "../contexts";
import { Layout } from "antd";

interface PROPS {
  children?: React.ReactNode;
  theme: "Light" | "Dark";
  setTheme: (theme: "Light" | "Dark") => void;
}
const inter = Inter({ subsets: ["latin"] });
export const LayoutWrapper = (props: PROPS) => {
  const { authData, status } = useAuth();
  const { Content } = Layout;

  const defineStatus = useMemo(() => {
    if (status === "pending") {
      return "Loading...";
    }
    if (status === "logged-out") {
      return "Guest";
    }
    return authData?.name || "Guest";
  }, [authData?.name, status]);

  return (
    <Layout className={`${inter.className} px-6 xl:px-12 py-4 h-full`}>
      <Header
        name={defineStatus}
        theme={props.theme}
        setTheme={props.setTheme}
      />
      <Content className="py-[5rem] h-full md:px-[6rem]">
        {props.children}
      </Content>
    </Layout>
  );
};
