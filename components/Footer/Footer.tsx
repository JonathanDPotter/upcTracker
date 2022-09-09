import React, { useState } from "react";
import { Dimensions } from "react-native";
import FooterPresentation from "./FooterPresentation";

const Footer = () => {
  const [aboutOpen, setAboutOpen] = useState(false);

  // get screenHeight
  const screenHeight = Dimensions.get("window").height;

  const presentationProps = { aboutOpen, setAboutOpen, screenHeight };

  return <FooterPresentation {...presentationProps} />;
};

export default Footer;
