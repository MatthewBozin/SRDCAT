import React, { useState, useContext } from "react";
import { r } from "../../utils/exports.js";
import { ReactComponent as D20} from "../../data/icons/d20.svg";
import Character from "../../data/character.js";
import ModalCardDisplay from "../cards/ModalCardDisplay.js";
import ModalTableDisplay from "../cards/ModalTableDisplay.js";

const Table = (props) => {
  let placement = r(props.table.length);
  if (props.savedresult !== undefined) {
    placement = props.savedresult;
  }
  const [index, setIndex] = useState(placement);
  const entry = props.table[index];
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

  if (typeof entry === "object") {
    //return card display modal
    //and return index button thing (use creature attack)
    return (
      <span>
        <button className="button clearborder" onClick={roll}>
          <D20 className="button iconsvg" />
        </button>
        <ModalTableDisplay table={props.table}></ModalTableDisplay>
        <ModalCardDisplay entry={entry}></ModalCardDisplay>
      </span>
    );
  }
    return (
      <span>
        <button className="button clearborder" onClick={roll}>
          <D20 className="button iconsvg" />
        </button>
        <ModalTableDisplay table={props.table}></ModalTableDisplay>
        <span className="padded5px">{entry}</span>
      </span>
    );
};

export default Table;
