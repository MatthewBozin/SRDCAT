import React, { useContext } from "react";
import Linklet from "./Linklet.js";
import Context from "../data/context.js";
import navbar from "../data/navbar.json";

const NavMaster = () => {
  const [context, setContext] = useContext(Context);

  return (
    <h4 className="item">
      <div className="row entry fullwidth">
        <span className="row entry">SRDCAT</span>
        <div className="right">
          {navbar.navmasters.map((navmaster, index) => {
            return (
              <Linklet
                text={navmaster.text}
                link={navmaster.link}
                type={navmaster.type}
                key={index}
                onClick={() =>
                  setContext(() => {
                    let newcontext = context;
                    newcontext.collections = navmaster.type;
                    let final = JSON.parse(JSON.stringify(newcontext));
                    return final;
                  })
                }
              />
            );
          })}
        </div>
      </div>
    </h4>
  );
};

export default NavMaster;
