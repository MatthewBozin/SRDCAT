import React, { useContext } from "react";
import Character from "../data/character.js";

const Defense = (props) => {
  const [character] = useContext(Character);

  const calcDefense = (defense) => {
    let substats = defense.substats;
    let total = 0;
    total += Math.max(character[substats[0]], character[substats[1]]);
    total += character.PRO;
    total += character[defense.name];
    return total;
  };

  return (
    <div>
      <span className="orangetext">{props.defense.name}</span>
      <span className="mleft12px">{calcDefense(props.defense)}</span>
    </div>
  );
};

export default Defense;
