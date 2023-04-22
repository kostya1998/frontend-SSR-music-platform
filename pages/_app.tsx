import React, { FC } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import store from "../Store/index";
import "../styles/global.css";

const MyApp: FC<AppProps> = ({ Component, ...pageProps }) => {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};
export default MyApp;
