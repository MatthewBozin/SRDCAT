import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ReactComponent as D20} from "../../data/icons/d20.svg";
import Character from "../../data/character.js";
import { s, r } from "../../utils/exports.js";
import architecture from "../../data/architecture.json";
import RandomCharCard from "./RandomCharCard.js";
import filter from "../../utils/filter.js";
let contextData = require(`../../data/orders.json`);

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

  const ifListIncludes = (array, target) => {
    //console.log(array);
    //console.log(target);
    for (let element of array) {
      //console.log(element.name);
      if (element.name === target.name) return true;
    }
    return false;
  };

  const addCard = (collection, data, newchar, heroType) => {
    let selectionName;
    if (collection === "creatures") {
      selectionName = s(filter("tags", "creatures", "pet"));
    } else if (heroType === "votbo") {
      selectionName = s(filter("tags", collection, "votbo"));
    } else {
      selectionName = s(contextData[collection])
    }
    let selection = data[selectionName];
    let selectionObject = { name: selectionName, savedrank: 0 };
    if (collection === "items" || collection === "creatures") {
      selectionObject.mods = [];
      selectionObject.statmods = {};
    }
    if (selection.table !== undefined) {
      selectionObject.savedresult = r(selection.table.length);
    }
    //below adds rank to card instead of adding duplicate
    if (
      ifListIncludes(newchar[collection], selectionObject) &&
      collection !== "items" && collection !== "creatures"
    ) {
      console.log("duplicate");
      if (selection.ranks.length > 1) {
        for (let card in newchar[collection]) {
          if (card.name === selection.name) {
            card.savedrank += 1;
          }
        }
      } else {
        let newSelectionName = s(contextData[collection]);
        let newSelection = data[newSelectionName];
        let newSelectionObject = { name: selectionName, savedrank: 0 };
        if (newSelection.table !== undefined) {
          newSelectionObject.savedresult = r(newSelection.table.length);
        }
        //makeshift solution for now, might need while statement
        newchar[collection].push(newSelectionObject);
      }
    } else {
      newchar[collection].push(selectionObject);
    }
  };

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
        let data = require(`../../data/collections/` + collection);
        //modifier that adds increased chance of increasing a card rank instead of adding new card
        //based on how high levels[collection] is
        if (
          (collection === "skills" || collection === "traits") &&
          r(levels[collection]) > 1 &&
          newchar[collection].length > 0
        ) {
          let i = 0;
          while (true) {
            let card = newchar[collection][r(newchar[collection].length - 1)];
            let cardObject = data[card.name];
            if (!cardObject.ranks || cardObject.ranks.length === 1) {
              addCard(collection, data, newchar, heroType);
              break;
            }
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
          addCard(collection, data, newchar, heroType);
        }
      }
    }

    let weaponNames;
    if (heroType === "votbo") {
      weaponNames = filter("tags", "items", "offensive+votbo");
    } else {
      weaponNames = filter("tags", "items", "offensive");
    }
    let weapon = { name: s(weaponNames), savedrank: 0, mods: [], statmods: {} };
    newchar.items.push(weapon);

    let armorNames;
    if (heroType === "votbo") {
      armorNames = filter("tags", "items", "defensive+votbo");
    } else {
      armorNames = filter("tags", "items", "defensive");
    }
    let armor = { name: s(armorNames), savedrank: 0, mods: [], statmods: {} };
    newchar.items.push(armor);

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
      <D20
        className="iconsvg mleft8px mtop4px"
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
