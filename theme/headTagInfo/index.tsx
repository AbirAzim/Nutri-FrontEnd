import Head from "next/head";
import React from "react";
export interface HeadTagInfoType {
  description?: string;
  title?: string;
}

const HeadTagInfo = ({
  description = "description",
  title = "title",
}: HeadTagInfoType) => {
  return (
    <Head>
      <title>Blending101-{title}</title>
      <meta name="description" content={"Blending101-" + description}></meta>
    </Head>
  );
};

export default HeadTagInfo;
