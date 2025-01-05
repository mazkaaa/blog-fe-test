import React, { useMemo } from "react";
import { Header } from "./header";
import { Inter } from "next/font/google";
import { useAuth } from "../contexts";

interface PROPS {
  children?: React.ReactNode;
}
const inter = Inter({ subsets: ["latin"] });
export const Layout = (props: PROPS) => {
  const { authData, status } = useAuth();

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
    <div className={`${inter.className} p-6`}>
      <Header name={defineStatus} />
      <main className="pt-[5rem]">{props.children}</main>
    </div>
  );
};
