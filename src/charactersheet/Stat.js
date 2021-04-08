import React, { useContext } from "react";
import Character from "../data/character.js";

const Stat = (props) => {
  const [character] = useContext(Character);
  return (
    <div>
      <span className="tag">{props.stat}</span>
      <span className="marginleft">{character[props.stat]}</span>
    </div>
  );
};

export default Stat;
