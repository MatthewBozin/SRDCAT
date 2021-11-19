import React, { useState, useContext } from "react";
import { r, rdamage } from "../utils/exports.js";
import { FaDiceD20 } from "react-icons/fa";
import Character from "../data/character.js";
import ModalCardDisplay from "./ModalCardDisplay.js";

const Table = (props) => {
  let placement = r(props.table.length);
  if (props.savedresult !== undefined) {
    placement = props.savedresult;
  }
  const [index, setIndex] = useState(placement);
  const entry = props.table[index];
  const [damage, setDamage] = useState("");
  const [character, setCharacter] = useContext(Character);
  const [modalOpen, setModalOpen] = useState(false);

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

  if (typeof entry === "object") {
    //return card display modal
    //and return index button thing (use creature attack)
    return (
      <span>
        <button className="button clearborder" onClick={roll}>
          <FaDiceD20 className="button scaleup125" />
        </button>
        <span
          className="button"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          {entry.display}
        </span>
        <ModalCardDisplay
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          entry={entry}
        ></ModalCardDisplay>
      </span>
    );
  }

  if (typeof props.table === "string") {
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
