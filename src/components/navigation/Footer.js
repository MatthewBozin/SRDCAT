import React from "react";
import { s } from "../../utils/exports.js";

const Footer = () => {

  const phrases1 = [
    "Sculpted",
    "Crafted",
    "Shaped",
    "Trained",
    "Carved",
    "Synthesized",
    "Built"
  ];

  const phrases2 = [
    "support the cause",
    "feed the beast",
    "venerate the machine",
    "peer into the future",
    "donate filthy lucres",
    "make pilgrimage",
    "perform haruspexy",
    "read the omens"
  ];

  let phrase1 = s(phrases1);
  let phrase2 = s(phrases2);

  return (
    <div className="row footer">
      <span className="row heading fontsize18">{phrase1} by Saker Tarsos for WTF</span>
      <span className="button bordered row heading mleft20px">
        <a
          className="orangetext fontsize18"
          href="https://www.patreon.com/sakertarsos"
          target="_blank"
          rel="noopener noreferror"
        >
          {phrase2}
        </a>
      </span>
      <div className="rightfloat mright12px"></div>
    </div>
  );
};

export default Footer;
