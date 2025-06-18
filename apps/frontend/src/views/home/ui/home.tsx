import React from "react";

import Ad from "../../../components/advertisement/Ad";
import { CatalogItems } from "#/widgets/catalog-items";

import { ExHeader } from "#/widgets/ex-header";
import { Banner } from "#/features/banner";

import Rec from "../../../components/recommended/Rec";

export const Home = () => {


  return (
    <>
      <ExHeader />
      <Banner />
      <Rec />
      <Ad />
      <CatalogItems />
    </>
  );
};
