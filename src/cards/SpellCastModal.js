import React from "react";
import Modal from "react-bootstrap/Modal";
import SpellCostCard from "./SpellCostCard.js";
import "toasted-notes/src/styles.css";
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
  } = props;

  return (
    <Modal
      show={castModalOpen}
      onHide={() => {
        toggle(setCastModalOpen, castModalOpen);
      }}
    >
      <Modal.Header className="modalbackground">
        <span className="cardname">Cast {name}</span>
      </Modal.Header>
      <Modal.Body className="modalbackground">
        <div>{description}</div>
        {ranks.map((rank, index) => {
          return (
            <SpellCostCard
              key={index}
              name={name}
              rank={rank}
              character={character}
              setCharacter={setCharacter}
            />
          );
        })}
      </Modal.Body>
    </Modal>
  );
}

export default SpellCastModal;
