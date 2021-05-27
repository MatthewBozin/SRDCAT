import React, { useState, useContext } from "react";
import Stat from "./Stat";
import Modal from "react-bootstrap/Modal";
import { r } from "../data/exports";
import Character from "../data/character.js";
import { FaRegEdit } from "react-icons/fa";
import RollCard from "./RollCard.js";

const Stats = () => {
  const [character, setCharacter] = useContext(Character);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStat, setModalStat] = useState("");
  const [result, setResult] = useState("");
  const [edit, setEdit] = useState(false);
  const [pro, setPro] = useState(false);
  const [adv, setAdv] = useState("");

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

  const toggle = (method, status) => {
    method(!status);
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

  const roll = () => {
    let result = 0;
    let total = 0;
    let text = "";
    if (adv === "+") {
      let roll1 = r(20) + 1;
      let roll2 = r(20) + 1;
      result = Math.max(roll1, roll2);
      text = "Results: " + roll1 + ", " + roll2;
    } else if (adv === "-") {
      let roll1 = r(20) + 1;
      let roll2 = r(20) + 1;
      result = Math.min(roll1, roll2);
      text = "Results: " + roll1 + ", " + roll2;
    } else {
      result = r(20) + 1;
      text = "Result: " + result;
    }
    if (pro === true) {
      total = result + character.PRO;
    } else {
      total = result;
    }
    return { result: result, total: total, text: text };
  };

  const test = (target) => {
    let rollData = roll();
    let rollResult = rollData.result;
    let rollTotal = rollData.total + character[modalStat];
    let resultString = "";
    if (rollResult === 20 || rollResult === 1) {
      resultString += " Critical ";
    }
    if (rollResult === target) {
      resultString += "Barely a ";
    }
    if (rollTotal >= target) {
      resultString += "Success";
    } else {
      resultString += "Failure";
    }
    if (rollResult === 7 && rollTotal <= target) {
      resultString += " with a Silver Lining";
    }
    if (rollResult === 13 && rollTotal >= target) {
      resultString += " with a Drawback";
    }

    resultString += "! " + rollData.text + ". Total: " + rollTotal + ".";
    setResult(() => {
      return resultString;
    });
  };

  const ifTitle = () => {
    let titleString = "Roll " + modalStat;
    let calc = character[modalStat];
    let mod = "";
    if (pro !== false || adv !== "") {
      titleString += " with ";
    }
    if (pro === true) {
      titleString += "Proficiency";
      calc += character.PRO;
    }
    if (pro === true && adv !== "") {
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
      <span className="cardname orangetext">
        {titleString}: (+{calc}) {mod}
      </span>
    );
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
          <hr />
          <div className="flex">
            <button
              className="button bordered padded5px margin5px flexgrow"
              onClick={() => {
                toggle(setPro, pro);
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
            <div className="center">{result}</div>
            <div>
              {targets.map((target, index) => {
                return (
                  <RollCard
                    key={index}
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
