import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { r } from "../data/exports";
import Character from "../data/character.js";
import { FaRegEdit } from "react-icons/fa";
import Defense from "./Defense.js";
import architecture from "../data/architecture.json";

const Defenses = () => {
  const [character] = useContext(Character);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStat, setModalStat] = useState("HA");
  const [result, setResult] = useState("");
  const [edit, setEdit] = useState(false);
  const [currentStat, setCurrentStat] = useState(character[modalStat]);

  const defenses = architecture.defenses;
  const statMasks = architecture.statMasks;

  const deforder = ["HA", "KA", "BA"];

  const bonuses = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10],
  ];

  const calcDefense = (defense) => {
    let substats = defense.substats;
    let total = 0;
    total += Math.max(character[substats[0]], character[substats[1]]);
    total += character.PRO;
    total += character[defense.name];
    let cards = require(`../data/collections/items`);

    //for (let item of character.items) {
    for (let item of character.items) {
      console.log(item);
      let CardItem = cards.data[item.name];
      for (let i = 0; i < CardItem.stat.length; i++) {
        if (CardItem.stat[i] === defense.name && item.worn === true) {
          total += parseInt(CardItem.number[i]);
        }
      }
    }
    //}
    if (defense.name === "BA") {
      total += Math.round(character.CASH / 250);
    }
    return total;
  };

  const modalOpenStat = (stat) => {
    setResult(() => {
      return "";
    });
    setModalOpen(true);
    setModalStat(stat);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const editToggle = (status) => {
    setEdit(!status);
  };

  const editStat = (amount, stat) => {
    character[stat] += parseInt(amount);
    setCurrentStat(character[stat]);
  };

  const save = (modifier) => {
    let rollResult = r(20) + 1;
    let total = rollResult + modifier;
    if (total <= character[modalStat]) {
      return `Save successful! Result: ${rollResult}. Total: ${total}.`;
    } else {
      return `Save failed! Result: ${rollResult}. Total: ${total}.`;
    }
  };

  return (
    <div className="outerbox">
      <div className="row mleft5px">DEFENSES</div>
      <div className="padded5px mleft5px flex">
        {deforder.map((defense, index) => {
          return (
            <button
              className="button bordered padded5px margin5px flexgrow"
              key={index}
              onClick={() => {
                modalOpenStat(defenses[defense].name);
              }}
            >
              <Defense defense={defenses[defense]} />
            </button>
          );
        })}
      </div>
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header className="modalbackground">
          <span className="cardname orangetext center">
            <i>{statMasks[modalStat]}</i> save: (
            {calcDefense(defenses[modalStat])})
          </span>
          <span>
            <FaRegEdit
              className="icon rightfloat"
              onClick={() => {
                editToggle(edit);
              }}
            ></FaRegEdit>
          </span>
        </Modal.Header>
        <Modal.Body className="modalbackground">
          {edit === true && (
            //flex these
            <div>
              <div className="outerbox">
                <div className="cardname center">Edit Defense</div>
                <div className="flex">
                  <button
                    className="button bordered padded5px margin5px flexgrow"
                    onClick={() => {
                      editStat(-1, modalStat);
                    }}
                  >
                    -1
                  </button>
                  <button
                    className="button bordered padded5px margin5px flexgrow"
                    onClick={() => {
                      editStat(+1, modalStat);
                    }}
                  >
                    +1
                  </button>
                </div>
                <div className="flex">
                  <button
                    className="button bordered padded5px margin5px fullwidth"
                    onClick={() => {
                      editToggle(edit);
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
              <hr></hr>
            </div>
          )}
          <div className="center">{result}</div>
          <div>
            {bonuses.map((bonusrow, index) => {
              return (
                <div className="flex" key={index}>
                  {bonusrow.map((bonus, index) => {
                    return (
                      <button
                        className="button bordered padded5px margin5px flexgrow"
                        key={index}
                        onClick={() => {
                          setResult(save(bonus));
                        }}
                      >
                        +{bonus}
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Defenses;
