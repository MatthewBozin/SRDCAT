import React, { useState, useContext } from "react";
import Stat from "./Stat";
import Modal from "react-bootstrap/Modal";
import { r } from "../data/exports";
import Character from "../data/character.js";
import { FaRegEdit } from "react-icons/fa";
import RollCard from "./RollCard.js";

const Stats = () => {
  const [character] = useContext(Character);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStat, setModalStat] = useState("");
  const [result, setResult] = useState("");
  const [edit, setEdit] = useState(false);
  const [currentStat, setCurrentStat] = useState(character[modalStat]);

  const SEACAT = ["STR", "END", "AGI", "CHA", "AUR", "THO"];

  const targets = [
    {
      name: "Trivial",
      description: "Routine, but risk of catastrophic or hilarious failure.",
      value: 3,
    },
    {
      name: "Easy",
      description: "Normally no obstacle to a professional.",
      value: 7,
    },
    {
      name: "Moderate",
      description: "Even professionals risk failure regularly.",
      value: 11,
    },
    {
      name: "Difficult",
      description:
        "Smart heroes avoid these kinds of tests or seek to stack advantages in their favor before attempting them.",
      value: 15,
    },
    {
      name: "Extreme",
      description: "Odds only a desperate professional would attempt.",
      value: 19,
    },
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

  const test = (target) => {
    let rollResult = r(20) + 1;
    let total = rollResult + character[modalStat];
    let resultString = "";
    if (rollResult === 20 || rollResult === 1) {
      resultString += " Critical ";
    }
    if (rollResult === target) {
      resultString += "Barely a ";
    }
    if (total >= target) {
      resultString += "Success";
    } else {
      resultString += "Failure";
    }
    if (rollResult === 7 && total <= target) {
      resultString += " with a Silver Lining ";
    }
    if (rollResult === 13 && total >= target) {
      resultString += " with a Drawback ";
    }

    resultString += "! Result: " + rollResult + ". Total: " + total + ".";
    setResult(() => {
      return resultString;
    });
  };

  return (
    <div className="outerbox">
      <div className="row mleft5px">ATTRIBUTES</div>
      <div className="padded5px row mleft5px">
        {SEACAT.map((stat, index) => {
          return (
            <button
              className="padded5px button bordered padded5px margin5px"
              key={index}
              onClick={() => {
                modalOpenStat(stat);
              }}
            >
              <Stat stat={stat} />
            </button>
          );
        })}
      </div>
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header className="modalbackground">
          <span className="cardname orangetext">
            Roll {modalStat}: (+{character[modalStat]})
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
          <div>
            <div className="center">{result}</div>
            <div>
              {targets.map((target, index) => {
                return (
                  <RollCard
                    name={target.name}
                    description={target.description}
                    target={target.value}
                    method={() => {
                      test(target.value);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Stats;
