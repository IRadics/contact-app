import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <div className="px-6 py-3">
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}
