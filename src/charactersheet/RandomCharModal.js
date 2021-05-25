import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaDiceD20 } from "react-icons/fa";
import Character from "../data/character.js";
import { s, r } from "../data/exports.js";
import architecture from "../data/architecture.json";

const RandomCharModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [character, setCharacter] = useContext(Character);

  const modalOpening = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const charLevels = architecture.charLevels;

  const charGen = (heroType) => {
    let levels = charLevels[heroType];
    let newchar = {};
    let collections = ["skills", "traits", "items", "mutations"];
    let attributes = ["STR", "END", "AGI", "CHA", "AUR", "THO"];
    let saves = ["HA", "KA", "BA"];
    let otherstats = [
      "LEVEL",
      "PRO",
      "actions",
      "MCOST",
      "LIFE",
      "HERODICE",
      "XP",
      "CASH",
    ];

    for (let collection of collections) {
      newchar[collection] = [];
      for (let i = 0; i < levels[collection]; i++) {
        let data = require(`../data/collections/` + collection);
        let selection = s(data.data);
        if (selection.table !== undefined) {
          selection.savedresult = r(selection.table.length);
        }
        selection.savedrank = 0;
        if (newchar[collection].includes(selection)) {
          if (selection.ranks.length > 1) {
            for (let card in newchar[collection]) {
              if (card.name == selection.name) {
                card.savedrank += 1;
              }
            }
          } else {
            let newselection = s(data.data);
            //makeshift solution for now, might need while statement
            newchar[collection].push(newselection);
          }
        } else {
          newchar[collection].push(selection);
        }
      }
    }

    for (let attribute of attributes) {
      newchar[attribute] = 0;
    }

    for (let i = 0; i < levels.stats; i++) {
      let attribute = s(attributes);
      //add stat limit?
      newchar[attribute]++;
    }

    for (let save of saves) {
      newchar[save] = 10;
    }

    for (let otherstat of otherstats) {
      newchar[otherstat] = levels[otherstat];
    }

    //if (gear == "true") { give hero an item each marked "armor" or "clothes", "weapon" }

    newchar.name = "Novelus Charactericus";

    console.log(newchar);

    setCharacter(newchar);
  };

  return (
    <div>
      <FaDiceD20
        className="icon"
        onClick={() => {
          modalOpening();
        }}
      />
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header className="modalbackground">
          Generate Random Character
        </Modal.Header>
        <Modal.Body className="modalbackground">
          <button
            className="button bordered padded5px margin5px"
            onClick={() => {
              charGen("specialextra");
            }}
          >
            Special Extra
          </button>
          <button
            className="button bordered padded5px margin5px"
            onClick={() => {
              charGen("pulphero");
            }}
          >
            Pulp Hero
          </button>
          <button
            className="button bordered padded5px margin5px"
            onClick={() => {
              charGen("epiclegend");
            }}
          >
            Epic Legend
          </button>
          <button
            className="button bordered padded5px margin5px"
            onClick={() => {
              charGen("avatar");
            }}
          >
            Avatar of the Final Form
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default RandomCharModal;
