import Head from "next/head";
import React from "react";

export default function Layout({ children }) {
  return (
        <div>
            <Head>
                <title>The Oasis</title>
                <meta name="description" content="The Oasis: A hub for the Metaverse" />=
            </Head>

            <main>
                {children}
            </main>
        </div>
    )
}