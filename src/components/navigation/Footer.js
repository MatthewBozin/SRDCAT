import React from "react";

const Footer = () => {

  return (
    <div className="row footer">
      <span className="row heading">
        <a
          className="orangetext creditsLink"
          href="https://github.com/MatthewBozin/SRDCAT"
          rel="noopener noreferror"
        >
          Code
        </a>
        {" by "}
        <a
          className="orangetext creditsLink"
          href="https://matthewbozin.netlify.app/"
          rel="noopener noreferror"
        >
          Matthew Bozin 
        </a>
        2022
      </span>
    </div>
  );
};

export default Footer;
