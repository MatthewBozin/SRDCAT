import React, { useContext } from "react";
import Linklet from "./Linklet.js";
import Context from "../data/context.js";
import navbar from "../data/navbar.json";

const NavMaster = () => {
  const [context, setContext] = useContext(Context);

  return (
    <h4 className="outerbox">
      <div className="row mleft5px fullwidth">
        <span className="row heading">SRDCAT</span>
        <div className="rightfloat mright12px">
          {navbar.navmasters.map((navmaster, index) => {
            return (
              <Linklet
                text={navmaster.text}
                link={navmaster.link}
                type={navmaster.type}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </h4>
  );
};

export default NavMaster;
