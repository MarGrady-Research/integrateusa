import { Html, Head, Main, NextScript } from "next/document";

import { libre } from "@/typography";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="use-credentials"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className={`${libre.variable} font-sans`}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
