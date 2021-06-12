import React, { useContext } from "react";
import Character from "../data/character.js";
import architecture from "../data/architecture.json";

const Defense = (props) => {
  const [character] = useContext(Character);
  const statMasks = architecture.statMasks;

  const calcDefense = (defense) => {
    let substats = defense.substats;
    let total = 0;
    total += Math.max(character[substats[0]], character[substats[1]]);
    total += character.PRO;
    total += character[defense.name];
    for (let item of character.items) {
      if (item.stat === defense.name && item.worn === true) {
        total += parseInt(item.number);
      }
    }
    if (defense.name === "BA") {
      total += Math.round((character.CASH - 125) / 250);
    }
    return total;
  };

  return (
    <div>
      <span>{statMasks[props.defense.name]}</span>
      <span className="mleft12px">{calcDefense(props.defense)}</span>
    </div>
  );
};

export default Defense;
