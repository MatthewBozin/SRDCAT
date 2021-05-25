import React, { useState, useContext } from "react";
import { r, rdamage } from "../data/exports.js";
import { FaDiceD20 } from "react-icons/fa";
import Character from "../data/character.js";

const Table = (props) => {
  let placement = r(props.table.length);
  console.log(props.savedresult);
  if (props.savedresult !== undefined) {
    placement = props.savedresult;
  }
  const [index, setIndex] = useState(placement);
  const entry = props.table[index];
  const [damage, setDamage] = useState("");
  const [character, setCharacter] = useContext(Character);

  const roll = () => {
    let newplacement = r(props.table.length);
    if (props.savedresult !== undefined) {
      let newchar = character;
      newchar[props.category][props.placement].savedresult = newplacement;
      setCharacter(newchar);
    }
    setIndex((index) => {
      return newplacement;
    });
  };

  const rollDamage = () => {
    setDamage(() => {
      return rdamage(props.table);
    });
  };

  if (typeof props.table == "string") {
    return (
      <span>
        <button
          className="button clearborder"
          onClick={() => {
            rollDamage();
          }}
        >
          <FaDiceD20 className="button scaleup125" />
        </button>
        <span className="padded5px">{damage}</span>
      </span>
    );
  } else {
    return (
      <span>
        <button className="button clearborder" onClick={roll}>
          <FaDiceD20 className="button scaleup125" />
        </button>
        <span className="padded5px">{entry}</span>
      </span>
    );
  }
};

export default Table;
