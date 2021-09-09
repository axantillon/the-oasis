// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Space+Mono&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon/favicon.ico" />
        </Head>
        <body className="font-space">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument