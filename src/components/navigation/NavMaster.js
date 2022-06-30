import React, { useContext } from "react";
import Linklet from "./Linklet.js";
import navbar from "../../data/navbar.json";
import Context from "../../data/context.js";

const NavMaster = () => {
  const [context, setContext] = useContext(Context);

  const personaToggle = () => {
    let newContext = context;
    if (context.persona === "PC") {
      newContext.persona = "TC";
      if (!navbar.navletCheckTC.includes(context.collections)) {
        newContext.collections = "environments";
      }
    } else {
      newContext.persona = "PC";
      if (!navbar.navletCheckPC.includes(context.collections)) {
        newContext.collections = "skills";
      }
    }
    setContext(JSON.parse(JSON.stringify(newContext)));
  };

  return (
    <h4 className="outerbox">
      <div className="row mleft5px fullwidth">
        <span className="row heading hoverpointer" onClick={() => {
          let newContext = context;
          newContext.link = "landing";
          setContext(JSON.parse(JSON.stringify(newContext)));
        }}>SRDCAT</span>
        {/* {<span
          className="button bordered row heading mleft30px"
          onClick={() => {
            personaToggle();
          }}
        >
          {context.persona}
        </span>} */}
        {(context.link === "collections" || context.link === "sheet") && 
          <div className="rightfloat mright12px">
            {navbar[context.persona].map((navmaster, index) => {
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
        }
      </div>
    </h4>
  );
};

export default NavMaster;
