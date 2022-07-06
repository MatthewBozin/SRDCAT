import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as Promotion} from "../../data/icons/promotion.svg";
import Character from "../../data/character.js";
import promotions from "../../data/structures/promotions.json";

const PromotionModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [character, setCharacter] = useContext(Character);
  const [message, setMessage] = useState("");

  const modalOpening = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const data = promotions.hero;

  const promote = () => {
    let modstats = ["maxlife","PRO","HERODICE"]
    let newCharacter = character;
    newCharacter.XP -= data[character.level].XP;
    for (let stat of modstats) {
      newCharacter[stat] += data[character.level][stat];
    }
    newCharacter.level++;
    setCharacter(JSON.parse(JSON.stringify(newCharacter)));
    let newMessage = `Your hero has been promoted to the next level!\nYour max life has been increased by ${data[character.level].maxlife}.\nYour max hero dice have been increased by ${data[character.level].HERODICE}.\n`;
    if (data[character.level].stats > 0) {
      newMessage += "You may increase one of your stats by 1!\n"
    };
    if (data[character.level].skills > 0) {
      newMessage += "You may learn a new skill, or increase an existing skill by 1 rank!\n"
    };
    if (data[character.level].traits > 0) {
      newMessage += "You may gain a new trait, or increase an existing trait by 1 rank!"
    }
    setMessage(newMessage);
  }

  return (
    <div className="outerbox992 button mleft8px">
      <span onClick={() => {modalOpening();}}>
        <span className="none992">Promote</span>
        <Promotion className="iconsvg mleft8px"/>
      </span>
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header className="modalbackground">
          Promote Your Hero
        </Modal.Header>
        <Modal.Body className="modalbackground">
          <div>Your level: {character.level}</div>
          <div>XP required for next level: {data[character.level].XP}</div>
          <div>Current XP: {character.XP}</div>
          {character.XP >= data[character.level].XP && <button className="button bordered" onClick={promote}>Promote</button>}
          <div className="whitespace">{message}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default PromotionModal;
