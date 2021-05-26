import React, { useState, useContext } from "react";
import Stat from "./Stat";
import Modal from "react-bootstrap/Modal";
import { r } from "../data/exports";
import Character from "../data/character.js";
import { FaRegEdit } from "react-icons/fa";

const Defenses = () => {
  const [character] = useContext(Character);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStat, setModalStat] = useState("");
  const [result, setResult] = useState("");
  const [edit, setEdit] = useState(false);
  const [currentStat, setCurrentStat] = useState(character[modalStat]);

  const defenses = ["HA", "KA", "BA"];
  const bonuses = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [9, 10],
  ];

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

  const test = (modifier) => {
    let rollResult = r(20) + 1;
    let total = rollResult + modifier;
    if (total <= character[modalStat]) {
      setResult(() => {
        return (
          "Save successful! Result: " + rollResult + ". Total: " + total + "."
        );
      });
    } else {
      setResult(() => {
        return "Save failed! Result: " + rollResult + ". Total: " + total + ".";
      });
    }
  };

  return (
    <div className="outerbox">
      <div className="row mleft5px">DEFENSES</div>
      <div className="padded5px row mleft5px">
        {defenses.map((defense, index) => {
          return (
            <button
              className="button bordered padded5px margin5px"
              key={index}
              onClick={() => {
                modalOpenStat(defense);
              }}
            >
              <Stat stat={defense} />
            </button>
          );
        })}
      </div>
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header className="modalbackground">
          <span className="cardname orangetext center">
            {modalStat} save: ({character[modalStat]})
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
                <div className="cardname center">Edit Stat</div>
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
                <div className="flex">
                  {bonusrow.map((bonus, index) => {
                    return (
                      <button
                        className="button bordered padded5px margin5px flexgrow"
                        key={index}
                        onClick={() => {
                          test(bonus);
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
