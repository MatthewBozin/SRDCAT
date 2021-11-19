import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaDiceD20 } from "react-icons/fa";
import Character from "../data/character.js";
import { s, r } from "../utils/exports.js";
import architecture from "../data/architecture.json";
import RandomCharCard from "./RandomCharCard.js";
let contextData = require(`../data/orders.json`);

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
  const charTypes = architecture.charTypes;

  const charGen = (heroType) => {
    let levels = charLevels[heroType];
    let newchar = {};
    let collections = ["skills", "traits", "items", "spells", "creatures"];
    let attributes = architecture.attributeArray;
    let saves = ["ha", "ka", "ba"];
    let otherstats = [
      "level",
      "PRO",
      "actions",
      "MCOST",
      "life",
      "maxlife",
      "HERODICE",
      "XP",
      "CASH",
    ];

    for (let collection of collections) {
      newchar[collection] = [];
      for (let i = 0; i < levels[collection]; i++) {
        let data = require(`../data/collections/` + collection);
        //modifier that adds increased chance of increasing a card rank instead of adding new card
        //based on how high levels[collection] is
        if (
          //collection !== "items" &&
          r(levels[collection]) > 3 &&
          newchar[collection].length > 3
        ) {
          let i = 0;
          while (true) {
            let card = newchar[collection][r(newchar[collection].length - 1)];
            let cardObject = data.data[card.name];
            if (card.savedrank < cardObject.ranks.length - 1) {
              card.savedrank += 1;
              break;
            }
            if (i > 30) {
              break;
            }
            i++;
          }
        } else {
          let selectionName = s(contextData[collection]);
          let selection = data.data[selectionName];
          let selectionObject = { name: selectionName, savedRank: 0 };
          if (selection.table !== undefined) {
            selectionObject.savedresult = r(selection.table.length);
          }
          //below adds rank to card instead of adding duplicate
          if (
            newchar[collection].includes(selection) &&
            collection !== "items"
          ) {
            if (selection.ranks.length > 1) {
              for (let card in newchar[collection]) {
                if (card.name === selection.name) {
                  card.savedrank += 1;
                }
              }
            } else {
              let newSelectionName = s(contextData[collection]);
              let newSelection = data.data[newSelectionName];
              let newSelectionObject = { name: selectionName, savedRank: 0 };
              if (newSelection.table !== undefined) {
                newSelectionObject.savedresult = r(newSelection.table.length);
              }
              //makeshift solution for now, might need while statement
              newchar[collection].push(newSelectionObject);
            }
          } else {
            newchar[collection].push(selectionObject);
          }
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
      newchar[save] = 0;
    }

    for (let otherstat of otherstats) {
      newchar[otherstat] = levels[otherstat];
    }

    //if (gear == "true") { give hero an item each marked "armor" or "clothes", "weapon" }

    newchar.name = "Novelus Charactericus";
    newchar.type = levels.name;

    setCharacter(newchar);
  };

  return (
    <div>
      <FaDiceD20
        className="icon mtop10px"
        onClick={() => {
          modalOpening();
        }}
      />
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header className="modalbackground">
          Generate Random Hero
        </Modal.Header>
        <Modal.Body className="modalbackground">
          {charTypes.map((type, index) => {
            return (
              <RandomCharCard
                key={index}
                name={type.name}
                flavor={type.flavor}
                description={type.description}
                stats={type.stats}
                buttonname={"Generate"}
                buttonprop={type.value}
                buttonfunction={charGen}
              />
            );
          })}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default RandomCharModal;
