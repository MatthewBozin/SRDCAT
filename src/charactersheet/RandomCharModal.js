import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaDiceD20 } from "react-icons/fa";
import Character from "../data/character.js";
import data from "../data/data.json";
import { s } from "../data/exports.js";

const RandomCharModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [character, setCharacter] = useContext(Character);

  const modalOpening = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const charLevels = {
    specialextra: {
      skills: 1,
      traits: 0,
      LEVEL: 0,
      PRO: 1,
      actions: 2,
      MCOST: 2,
      stats: 5,
      statlimit: 3,
      LIFE: 5,
      HERODICE: 0,
      XP: 0,
      gear: false,
      items: 1,
      CASH: 30,
    },
    pulphero: {
      skills: 3,
      traits: 2,
      LEVEL: 3,
      PRO: 2,
      actions: 2,
      MCOST: 2,
      stats: 7,
      statlimit: 4,
      LIFE: 20,
      HERODICE: 3,
      XP: 999,
      gear: false,
      items: 4,
      CASH: 300,
    },
    epiclegend: {
      skills: 6,
      traits: 5,
      LEVEL: 6,
      PRO: 3,
      actions: 2,
      MCOST: 2,
      stats: 9,
      statlimit: 5,
      LIFE: 38,
      HERODICE: 6,
      XP: 9999,
      gear: true,
      items: 4,
      CASH: 3000,
    },
    avatar: {
      skills: 9,
      traits: 9,
      LEVEL: 9,
      PRO: 4,
      actions: 2,
      MCOST: 2,
      stats: 11,
      statlimit: 5,
      LIFE: 60,
      HERODICE: 9,
      XP: 99999,
      gear: true,
      items: 6,
      CASH: 30000,
    },
  };

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
        let selection = s(data[collection]);
        selection.savedrank = 0;
        if (newchar[collection].includes(selection)) {
          if (selection.ranks.length > 1) {
            for (let card in newchar[collection]) {
              if (card.name == selection.name) {
                card.savedrank += 1;
              }
            }
          } else {
            let newselection = s(data[collection]);
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
