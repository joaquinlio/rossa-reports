import React from "react";

import { Navbar } from "./Navbar/Navbar";

export const Container = ({ ...props }) => {
  return (
    <React.Fragment>
      <Navbar />
      {props.children}
    </React.Fragment>
  );
};
