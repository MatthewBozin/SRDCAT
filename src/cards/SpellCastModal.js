import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import SpellCostCard from "./SpellCostCard.js";
import { toggle } from "../data/exports.js";

function SpellCastModal(props) {
  const {
    character,
    setCharacter,
    name,
    castModalOpen,
    setCastModalOpen,
    description,
    ranks,
    modifiers,
  } = props;

  const [cost, setCost] = useState(0);

  const checkNumber = (number) => {
    if (number > props.ranks.length - 1) {
      return 0;
    }
    if (number < 0) {
      return props.ranks.length - 1;
    }
    return number;
  };

  const modulate = (value) => {
    setCost(checkNumber(cost + value));
  };

  let rank = ranks[cost];

  return (
    <Modal
      show={castModalOpen}
      onHide={() => {
        toggle(setCastModalOpen, castModalOpen);
      }}
    >
      <Modal.Header className="modalbackground">
        <span>Cast {name}</span>
      </Modal.Header>
      <Modal.Body className="modalbackground">
        <div className="margin5px">{description}</div>
        {modifiers.includes("dangerous") && (
          <div>
            <hr />{" "}
            <span className="orangetext">Casting this spell is dangerous.</span>{" "}
            <hr />
          </div>
        )}
        <SpellCostCard
          name={name}
          description={description}
          rank={rank}
          modulate={modulate}
          character={character}
          setCharacter={setCharacter}
        />
      </Modal.Body>
    </Modal>
  );
}

export default SpellCastModal;
