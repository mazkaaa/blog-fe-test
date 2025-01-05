import { LayoutWrapper } from "@/components/containers";
import { AuthProvider } from "@/components/contexts/auth-provider";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ConfigProvider
          theme={{
            algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          }}
        >
          <LayoutWrapper
            theme={isDarkMode ? "Dark" : "Light"}
            setTheme={(theme) => setIsDarkMode(theme === "Dark")}
          >
            <Component {...pageProps} />
          </LayoutWrapper>
        </ConfigProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
