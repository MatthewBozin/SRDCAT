import React, { useContext } from "react";
import Character from "../../data/character.js";
import architecture from "../../data/architecture.json";
import Worldstate from "../../data/worldstate.js";
import Context from "../../data/context.js";

const Stat = (props) => {
  const [context] = useContext(Context);
  const [worldState] = useContext(Worldstate);
  const [character] = useContext(Character);
  const statMasks = architecture.statMasks;
  return (
    <div>
      <span>{statMasks[props.stat]}</span>
      {context.persona === "PC" && <span className="mleft12px">{character[props.stat]}</span>}
      {context.persona === "TC" && <span className="mleft12px">{worldState[props.stat]}</span>}
      {props.stat === "life" && <span>/{character.maxlife}</span>}
    </div>
  );
};

export default Stat;
