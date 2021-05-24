import React from "react";
import Navlet from "./Navlet";
import navbar from "../data/navbar.json";

const Navbar = () => {
  return (
    <h4 className="row mleft5px fullwidth">
      <span className="row heading">Collections</span>
      <div className="rightfloat mright12px">
        {navbar.navlets.map((navlet) => {
          return <Navlet key={navlet.name} navlet={navlet} />;
        })}
      </div>
    </h4>
  );
};

export default Navbar;
