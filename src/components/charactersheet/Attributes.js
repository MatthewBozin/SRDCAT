import React, { useState, useContext } from "react";
import Stat from "./Stat";
import Modal from "react-bootstrap/Modal";
import Character from "../../data/character.js";
import { FaRegEdit } from "react-icons/fa";
import RollCard from "./RollCard.js";
import architecture from "../../data/architecture.json";
import {
  r,
  adjudicate,
  test,
  toggleState,
  toggle,
  withProAdv,
} from "../../utils/exports.js";

const Stats = () => {
  const [character, setCharacter] = useContext(Character);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStat, setModalStat] = useState("");
  const [result, setResult] = useState("");
  const [edit, setEdit] = useState(false);
  const [testInfo, setTestInfo] = useState({ pro: "", mod: 0, adv: "" });

  const SEA = ["str", "end", "agi"];
  const CAT = ["cha", "aur", "tho"];

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

  const editStat = (amount, stat) => {
    let newChar = character;
    newChar[stat] += parseInt(amount);
    setCharacter(JSON.parse(JSON.stringify(newChar)));
  };

  const modularString = (object) => {
    let data = withProAdv(object);
    let number = 0;
    if (object.pro !== undefined) {
      if (object.pro === "single") {
        number += character.PRO;
      }
      if (object.pro === "double") {
        number += character.PRO * 2;
      }
    }
    number += character[modalStat];
    return (
      <span>
        {data.string}
        {data.mod}: (+{number})
      </span>
    );
  };

  const spendHeroDie = () => {
    let dieRoll = r(6) + 1;
    let newRollData = {
      rollResult: result.rollData.rollResult + dieRoll,
      rollTotal: result.rollData.rollTotal + dieRoll,
      target: result.rollData.target,
      text: result.rollData.text,
    };
    let newResultString = adjudicate(newRollData);
    let newResult = {
      resultString: newResultString,
      rollData: newRollData,
    };
    setResult(() => {
      return newResult;
    });
    let newCharacter = character;
    newCharacter.HERODICE -= 1;
    setCharacter(JSON.parse(JSON.stringify(newCharacter)));
    console.log(character.HERODICE);
  };

  return (
    <div className="outerbox">
      <div className="row mleft5px">ATTRIBUTES</div>
      <div>
        <div className="padded5px mleft5px flex">
          {SEA.map((stat, index) => {
            return (
              <button
                className="padded5px button bordered padded5px margin5px flexgrow fontsize"
                key={index}
                onClick={() => {
                  modalOpenStat(stat);
                  setEdit(false);
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
                className="padded5px button bordered padded5px margin5px flexgrow fontsize"
                key={index}
                onClick={() => {
                  modalOpenStat(stat);
                  setEdit(false);
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
          <span className="cardname">
            {edit === false && <span className="cardname">Test</span>}
            {edit === true && <span className="cardname">Edit</span>}
            Your {architecture.statMasks[modalStat]}
            {modularString(testInfo)}
          </span>
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
            <div>
              <div className="outerbox">
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

          {edit === false && (
            <div>
              <div className="flex">
                <button
                  className="button bordered padded5px margin5px flexgrow"
                  onClick={() => {
                    toggleState(testInfo, setTestInfo, "adv", "", "-");
                  }}
                >
                  [-]
                </button>
                {testInfo.pro === "" && (
                  <button
                    className="button bordered padded5px margin5px flexgrow"
                    onClick={() => {
                      toggleState(
                        testInfo,
                        setTestInfo,
                        "pro",
                        "single",
                        character.PRO
                      );
                    }}
                  >
                    PRO
                  </button>
                )}
                {testInfo.pro === "single" && (
                  <button
                    className="button bordered padded5px margin5px flexgrow"
                    onClick={() => {
                      toggleState(
                        testInfo,
                        setTestInfo,
                        "pro",
                        "double",
                        character.PRO
                      );
                    }}
                  >
                    PRO x2
                  </button>
                )}
                {testInfo.pro === "double" && (
                  <button
                    className="button bordered padded5px margin5px flexgrow"
                    onClick={() => {
                      toggleState(
                        testInfo,
                        setTestInfo,
                        "pro",
                        "",
                        character.PRO
                      );
                    }}
                  >
                    No PRO
                  </button>
                )}
                <button
                  className="button bordered padded5px margin5px flexgrow"
                  onClick={() => {
                    toggleState(testInfo, setTestInfo, "adv", "", "+");
                  }}
                >
                  [+]
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
                          let prof = 0;
                          if (testInfo.pro === "single") {
                            prof += character.PRO;
                          }
                          if (testInfo.pro === "double") {
                            prof += character.PRO * 2;
                          }
                          setResult(() => {
                            let result = test(
                              target.value,
                              testInfo.adv,
                              prof,
                              character[modalStat]
                            );
                            return result;
                          });
                        }}
                      />
                    );
                  })}
                </div>
                {result.resultString !== undefined && (
                  <div>
                    <hr />
                    <div
                      className="center button"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          character.name +
                            " tests their " +
                            architecture.statMasks[modalStat] +
                            withProAdv(testInfo).string +
                            "!\nThe test is a " +
                            result.resultString
                        );
                      }}
                    >
                      {result.resultString}
                    </div>
                    <hr />
                    {character.HERODICE > 0 && (
                      <div
                        className="button bordered"
                        onClick={() => {
                          spendHeroDie();
                        }}
                      >
                        Spend Hero Die ({character.HERODICE} remaining)
                      </div>
                    )}
                    {character.HERODICE < 1 && (
                      <div>No hero dice remaining.</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Stats;
