import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-BR" className="h-full">
      <Head>
        <meta name="description" content="TeleZap" />
        <html lang="pt-BR" />
      </Head>
      <body className="h-full transition-all">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
