import React, { useState, useContext } from "react";
import { r } from "../../utils/exports.js";
import { ReactComponent as D20} from "../../data/icons/d20.svg";
import { ReactComponent as AddCard} from "../../data/icons/addcard.svg";
import Character from "../../data/character.js";
import ModalCardDisplay from "../cards/ModalCardDisplay.js";
import ModalTableDisplay from "../cards/ModalTableDisplay.js";
import HyperText from "./HyperText";
import Context from "../../data/context";

const Table = (props) => {
  let placement = r(props.table.length);
  if (props.savedresult !== undefined) {
    placement = props.savedresult;
  }
  const [context] = useContext(Context);
  const [index, setIndex] = useState(placement);
  const entry = props.table[index];
  const [character, setCharacter] = useContext(Character);

  const roll = () => {
    while (true) {
      if(props.table.length < 2) break;
      let newplacement;
      if (props.disruption !== undefined) {
        newplacement = r(10) + props.disruption; 
        if (newplacement >= props.table.length) newplacement = props.table.length - 1;
        setIndex(newplacement);
        break;
      } else {
        newplacement = r(props.table.length);
        setIndex(newplacement);
      };
      if (newplacement !== index) {
        if (props.savedresult !== undefined) {
          let newchar = character;
          newchar[props.category][props.placement].savedresult = newplacement;
          setCharacter(newchar);
        }
        setIndex(newplacement);
        break;
      }
    }
  };

  return (
    <span>
      <button className="button clearborder" onClick={roll}>
        <D20 className="button iconsvg" />
      </button>
      {props.type === "encounter" && <ModalTableDisplay table={props.table} mode={"encounter"} method={props.method}></ModalTableDisplay>}
      {props.type !== "encounter" && <ModalTableDisplay table={props.table} method={props.method}></ModalTableDisplay>}
      {context.link !== "collections" && props.type === "encounter" &&
        <button className="button clearborder" onClick={() => {props.method(entry.creatures)}}>
          <AddCard className="button iconsvg" />
        </button>
      }
      {context.link !== "collections" && (props.type === "prop" || props.type === "zone") &&
        <button className="button clearborder" onClick={() => {props.method(entry)}}>
          <AddCard className="button iconsvg" />
        </button>
      }
      {typeof entry === "object" && props.type !== "encounter" && <ModalCardDisplay entry={entry}></ModalCardDisplay>}
      {(typeof entry !== "object" || props.type === "encounter") && <HyperText text={props.type === "encounter" ? entry.description : entry} />}
    </span>
  );
};

export default Table;
