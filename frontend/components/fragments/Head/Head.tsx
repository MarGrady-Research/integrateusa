import React from "react";
import Head from "next/head";

interface Props {
  title: string;
  desc: string;
  children?: React.ReactNode;
}

export default function AppHead({ title, desc, children }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="icon" href="/logo.svg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="use-credentials"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@500&display=swap"
        rel="stylesheet"
      ></link>
      {children}
    </Head>
  );
}
