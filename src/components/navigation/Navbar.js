import React, { useContext } from "react";
import Navlet from "./Navlet";
import navbar from "../../data/navbar.json";
import Context from "../../data/context.js";

const Navbar = () => {
  const context = useContext(Context);

  let whichPersona = `navlets${context[0].persona}`;

  return (
    <h4 className="row mleft5px fullwidth">
      <div className="flex mright12px fullwidth">
        {navbar[whichPersona].map((navlet) => {
          return <Navlet key={navlet.name} navlet={navlet} />;
        })}
      </div>
    </h4>
  );
};

export default Navbar;
