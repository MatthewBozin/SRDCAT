import React from "react";
import Navlet from "./Navlet";
import navbar from "../data/navbar.json";

const Navbar = () => {
  return (
    <h4 className="item">
      <div className="row entry fullwidth">
        <span className="row entry">Collections</span>
        <div className="right">
          {navbar.navlets.map((navlet) => {
            return <Navlet key={navlet.name} navlet={navlet} />;
          })}
        </div>
      </div>
    </h4>
  );
};

export default Navbar;
