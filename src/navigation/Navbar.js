import React from "react";
import Navlet from "./Navlet";
import navbar from "../data/navbar.json";

const Navbar = () => {
  return (
    <h4 className="row entry fullwidth">
      <span className="row ghostpadded">Collections</span>
      <div className="right marginright">
        {navbar.navlets.map((navlet) => {
          return <Navlet key={navlet.name} navlet={navlet} />;
        })}
      </div>
    </h4>
  );
};

export default Navbar;
