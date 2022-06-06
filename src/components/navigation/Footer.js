import React from "react";
import { s } from "../../utils/exports.js";

const Footer = () => {

  return (
    <div className="row footer">
      <span className="row heading fontsize18">Built by Saker Tarsos for WTF</span>
      <span className="button bordered row heading mleft20px">
        <a
          className="orangetext fontsize18"
          href="https://www.patreon.com/sakertarsos"
          target="_blank"
          rel="noopener noreferror"
        >
          support on patreon
        </a>
      </span>
      <div className="rightfloat mright12px"></div>
    </div>
  );
};

export default Footer;
