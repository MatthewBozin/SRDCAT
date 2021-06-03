import React, { useContext } from "react";
import Character from "../data/character.js";
import architecture from "../data/architecture.json";

const Stat = (props) => {
  const [character] = useContext(Character);
  const statMasks = architecture.statMasks;
  return (
    <div>
      <span className="orangetext">{statMasks[props.stat]}</span>
      <span className="mleft12px">{character[props.stat]}</span>
    </div>
  );
};

export default Stat;
