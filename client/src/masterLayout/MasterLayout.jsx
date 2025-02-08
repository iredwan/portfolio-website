import React from "react";
import MenuBar from "../components/MenuBar";
import FooterBar from "../components/FooterBar";

const MasterLayout = ({ children }) => {
  return (
    <>
      {/* MenuBar */}
      <MenuBar />

      <div>{children}</div>

      {/* FooterBar */}
      <FooterBar />
    </>
  );
};

export default MasterLayout;
