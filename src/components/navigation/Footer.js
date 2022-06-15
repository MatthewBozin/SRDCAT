import React from "react";

const Footer = () => {

  return (
    <div className="row footer">
      <span className="button row heading fontsize18">ABOUT</span>
      <span className="button row heading mleft30px">
        <a
          className="orangetext fontsize18"
          href="https://www.patreon.com/sakertarsos"
          target="_blank"
          rel="noopener noreferror"
        >
          SUPPORT DEVELOPMENT
        </a>
      </span>
    </div>
  );
};

export default Footer;
