import React, { useState, useContext } from "react";
import Stat from "./Stat";
import Modal from "react-bootstrap/Modal";
import Character from "../data/character.js";
import { FaRegEdit } from "react-icons/fa";
import RollCard from "./RollCard.js";
import architecture from "../data/architecture.json";
import { test } from "../data/exports.js";

const Stats = () => {
  const [character, setCharacter] = useContext(Character);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStat, setModalStat] = useState("");
  const [result, setResult] = useState("");
  const [edit, setEdit] = useState(false);
  const [pro, setPro] = useState(0);
  const [adv, setAdv] = useState("");

  const SEA = ["STR", "END", "AGI"];
  const CAT = ["CHA", "AUR", "THO"];
  const statMasks = architecture.statMasks;

  const targets = architecture.targets;

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

  const toggle = (method, status) => {
    method(!status);
  };

  const togglePro = () => {
    if (pro === 0) {
      setPro(character.PRO);
    } else {
      setPro(0);
    }
  };

  const toggleAdv = (input) => {
    if (input === "+") {
      if (adv === "+") {
        setAdv("");
      } else {
        setAdv("+");
      }
    } else if (input === "-") {
      if (adv === "-") {
        setAdv("");
      } else {
        setAdv("-");
      }
    }
  };

  const editStat = (amount, stat) => {
    let newChar = character;
    newChar[stat] += parseInt(amount);
    setCharacter(JSON.parse(JSON.stringify(newChar)));
  };

  const ifTitle = () => {
    let titleString = "Test Your " + statMasks[modalStat];
    let calc = character[modalStat];
    let mod = "";
    if (pro !== 0 || adv !== "") {
      titleString += " with ";
    }
    if (pro !== 0) {
      titleString += "Proficiency";
      calc += character.PRO;
    }
    if (pro !== 0 && adv !== "") {
      titleString += " and ";
    }
    if (adv === "+") {
      titleString += "Advantage";
      mod = "[+]";
    }
    if (adv === "-") {
      titleString += "Disadvantage";
      mod = "[-]";
    }

    return (
      <span className="cardname">
        {titleString}: (+{calc}) {mod}
      </span>
    );
  };

  return (
    <div className="outerbox">
      <div className="row mleft5px">ATTRIBUTES</div>
      <div>
        <div className="padded5px mleft5px flex">
          {SEA.map((stat, index) => {
            return (
              <button
                className="padded5px button bordered padded5px margin5px flexgrow"
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
        <div className="padded5px mleft5px flex">
          {CAT.map((stat, index) => {
            return (
              <button
                className="padded5px button bordered padded5px margin5px flexgrow"
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
      </div>
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header className="modalbackground">
          {ifTitle()}
          <span>
            <FaRegEdit
              className="icon rightfloat"
              onClick={() => {
                toggle(setEdit, edit);
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
                      toggle(setEdit, edit);
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
          <hr />
          <div className="flex">
            <button
              className="button bordered padded5px margin5px flexgrow"
              onClick={() => {
                togglePro();
              }}
            >
              PRO
            </button>
            <button
              className="button bordered padded5px margin5px flexgrow"
              onClick={() => {
                toggleAdv("+");
              }}
            >
              [+]
            </button>
            <button
              className="button bordered padded5px margin5px flexgrow"
              onClick={() => {
                toggleAdv("-");
              }}
            >
              [-]
            </button>
          </div>
          <hr />
          <div>
            <div>
              {targets.map((target, index) => {
                return (
                  <RollCard
                    key={index}
                    name={target.name}
                    description={target.description}
                    target={target.value}
                    method={() => {
                      setResult(() => {
                        return test(
                          target.value,
                          adv,
                          pro,
                          character[modalStat]
                        );
                      });
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
