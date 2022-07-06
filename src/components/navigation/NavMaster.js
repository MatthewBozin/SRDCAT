import React, { useContext } from "react";
import Linklet from "./Linklet.js";
import navbar from "../../data/navbar.json";
import Context from "../../data/context.js";
import { ReactComponent as Title} from "../../data/icons/title.svg";

const NavMaster = () => {
  const [context, setContext] = useContext(Context);

  return (
    <h4 className="outerbox">
      <div className="row mleft5px fullwidth">
        <Title className="titlesvg" onClick={() => {
          let newContext = context;
          newContext.link = "landing";
          setContext(JSON.parse(JSON.stringify(newContext)));
        }}/>
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
