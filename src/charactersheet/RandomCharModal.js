import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaDiceD20 } from "react-icons/fa";
import Character from "../data/character.js";
import { s, r } from "../data/exports.js";
import architecture from "../data/architecture.json";
import RandomCharCard from "./RandomCharCard.js";

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
            console.log(newchar[collection]);
            if (card.savedrank < card.ranks.length - 1) {
              console.log("yes");
              console.log(card.savedrank);
              console.log(card.ranks.length);
              card.savedrank += 1;
              break;
            }
            if (i > 30) {
              break;
            }
            i++;
            console.log(i);
          }
        } else {
          let selection = s(data.data);
          if (selection.table !== undefined) {
            selection.savedresult = r(selection.table.length);
          }
          selection.savedrank = 0;
          //below adds rank to card instead of adding duplicate
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

  const charTypes = [
    {
      name: "Special Extra",
      value: "specialextra",
      stats: ["Level: 0", "Life: 5", "XP: 0", "Cash: 30"],
      flavor: "A rather common hero.",
      description:
        "Starting play with the extra lets players discover the story of how a nobody becomes a hero. Abilities are few, survival is uncertain, and advancement is slowed by the character’s need to rest.",
    },
    {
      name: "Pulp Hero",
      value: "pulphero",
      stats: ["Level: 3", "Life: 20", "XP: 999", "Cash: 300"],
      flavor: "A memorable human.",
      description:
        "The standard starting hero. Unique, unforgettable, historic. As glorious in battle as the great horse lords of the Centaur Empire, as powerful as the great avatar wizards who laid waste the oldest world with the heavy metal arrows of the Rain God.",
    },
    {
      name: "Epic Legend",
      value: "epiclegend",
      stats: ["Level: 6", "Life: 38", "XP: 9999", "Cash: 3000"],
      flavor: "Quite unforgotten.",
      description:
        "Their achievements will not be forgotten for a thousand years. A legend’s advancement is slowed by high experience costs, but it promises  power overwhelming.",
    },
    {
      name: "Avatar of the Final Form",
      value: "avatar",
      stats: ["Level: 9", "Life: 60", "XP: 99999", "Cash: 30000"],
      flavor: "Obviously not really human.",
      description:
        "The embodiment of a culture hero, an archetype taken flesh. After reaching the pinnacle of power, the only paths left open are change and decline. There is nowhere further to go.",
    },
  ];

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
          Generate Random Hero
        </Modal.Header>
        <Modal.Body className="modalbackground">
          {charTypes.map((type, index) => {
            return (
              <RandomCharCard
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
