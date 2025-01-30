import { Html, Head, Main, NextScript } from 'next/document';
import { useEffect } from 'react';

export default function Document() {
  return (
    <Html lang="pt-BR" className="h-full">
      <Head>
        <meta name="description" content="Silence Killers" />
        <link rel="icon" href="/images/vampire_face.ico" sizes="any" />

        <html lang="pt-BR" />
      </Head>
      <body className="h-full transition-all">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
