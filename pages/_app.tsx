import { AppContextProvider } from "@/clientFunctions/context/appContext";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Layout>
        <div className="px-6 py-3">
          <Component {...pageProps} />
        </div>
      </Layout>
    </AppContextProvider>
  );
}
