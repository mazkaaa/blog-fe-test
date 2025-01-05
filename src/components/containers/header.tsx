import { Button, Layout, Typography } from "antd";
import React from "react";

interface PROPS {
  name: string;
  theme: "Light" | "Dark";
  setTheme: (theme: "Light" | "Dark") => void;
}
export const Header = (props: PROPS) => {
  const { Text, Title, Paragraph } = Typography;
  const { Header } = Layout;
  return (
    <Header className="flex items-center justify-between fixed top-0 left-0 w-full h-16 px-6 xl:px-12 z-50 drop-shadow-lg">
      <Text className="text-2xl font-bold text-white">Blog.</Text>
      <div className="space-x-4 flex items-center">
        <Text className="text-base text-white">{props.name}</Text>
        <Button
          onClick={() => {
            props.setTheme(props.theme === "Light" ? "Dark" : "Light");
          }}
          size="large"
        >
          {props.theme !== "Light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </Button>
      </div>
    </Header>
  );
};
