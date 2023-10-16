import React, { FC } from "react";

interface Props {
  title: string;
  description: string;
  keywords: string;
}

const Heading = ({ title, description, keywords }: Props) => {
  return (
    <>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      ></meta>
      <meta name="description" content={description}></meta>
      <meta name="keywords" content={keywords}></meta>
    </>
  );
};

export default Heading;
