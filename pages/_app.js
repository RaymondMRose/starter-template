import "../faust.config";
import React from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";
import "@faustwp/core/dist/css/toolbar.css";
import "../styles/global.scss";
import "../styles/global.css";
import { ThemeProvider } from "next-themes";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider attribute="class">
      <FaustProvider pageProps={pageProps}>
        <div>
          <Component {...pageProps} key={router.asPath} />
        </div>
      </FaustProvider>
    </ThemeProvider>
  );
}
