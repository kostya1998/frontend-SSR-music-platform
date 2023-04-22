import { Container } from "@mui/material";
import React, { ReactNode, FC } from "react";
import Navbar from "./Navbar";
import Player from "./Player";
import Head from "next/head";

interface MainLayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
  children: ReactNode;
}

const Layout: FC<MainLayoutProps> = ({
  children,
  title,
  description,
  keywords,
}): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title || "музыкальная платформа"}</title>
        <meta
          name="description"
          content={
            "Музыкальная платформа. Здесь каждый может добавить свой трэк и стать популярным" +
            description
          }
        />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || "музыка, трэки, артисты"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Container style={{margin:90}}>{children}</Container>
      <Player />
    </>
  );
};
export default Layout;
