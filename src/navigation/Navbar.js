import React from "react";
import Navlet from "./Navlet";
import navbar from "../data/navbar.json";

const Navbar = () => {
  return (
    <h4 className="row mleft5px fullwidth">
      <div className="flex mright12px fullwidth">
        {navbar.navlets.map((navlet) => {
          return <Navlet key={navlet.name} navlet={navlet} />;
        })}
      </div>
    </h4>
  );
};

export default Navbar;
