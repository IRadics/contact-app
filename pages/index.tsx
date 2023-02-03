import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React from "react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Contact App</title>
        <meta
          name="description"
          content="Contact app for UX studio dev challenge"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}></main>
    </>
  );
}
