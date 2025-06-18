"use client";
import store from "#/redux/store";
import { Context } from "#/widgets/context";
import React from "react";
import { Provider } from "react-redux";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      <Provider store={store}>
        <Context>{children}</Context>
      </Provider>
    </>
  );
};
