import React, { useContext } from "react";
import Linklet from "./Linklet.js";
import Context from "../data/context.js";
import navbar from "../data/navbar.json";

const NavMaster = () => {
  const [context, setContext] = useContext(Context);

  return (
    <h4 className="outerbox">
      <div className="row entry fullwidth">
        <span className="row ghostpadded">SRDCAT</span>
        <div className="right marginright">
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
