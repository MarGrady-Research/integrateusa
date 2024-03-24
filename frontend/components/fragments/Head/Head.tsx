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
      <meta name="theme-color" content="#4472C3" />
      <link rel="icon" href="/logo.svg" />
      {children}
    </Head>
  );
}
