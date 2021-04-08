import React, { useState, useContext } from "react";
import Stat from "./Stat";
import Modal from "react-bootstrap/Modal";
import { r } from "../data/exports";
import Character from "../data/character.js";

const Stats = () => {
  const [character] = useContext(Character);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStat, setModalStat] = useState("");
  const [result, setResult] = useState("");

  const SEA = ["STR", "END", "AGI"];
  const CAT = ["CHA", "AUR", "THO"];

  const targets = [
    { name: "Trivial", value: 3 },
    { name: "Easy", value: 7 },
    { name: "Moderate", value: 11 },
    { name: "Difficult", value: 15 },
    { name: "Extreme", value: 19 },
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

  const test = (target) => {
    let rollResult = r(20) + 1;
    let total = rollResult + character[modalStat];
    if (total >= target) {
      setResult(() => {
        return (
          "Success! Result: " +
          rollResult +
          ". Total: " +
          total +
          ". Target: " +
          target +
          "."
        );
      });
    } else {
      setResult(() => {
        return (
          "Failure! Result: " +
          rollResult +
          ". Total: " +
          total +
          ". Target: " +
          target +
          "."
        );
      });
    }
  };

  return (
    <div className="item">
      <div className="row entry">STATS</div>
      <div className="bit row entry">
        {SEA.map((stat) => {
          return (
            <button
              className="bit bordered padded2 margin"
              onClick={() => {
                modalOpenStat(stat);
              }}
            >
              <Stat stat={stat} />
            </button>
          );
        })}
      </div>
      <div className="bit row entry">
        {CAT.map((stat) => {
          return (
            <button
              className="bit bordered padded2 margin"
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
        <Modal.Header>
          Roll {modalStat}: (+{character[modalStat]})
        </Modal.Header>
        <Modal.Body>
          Targets:
          <div>
            {targets.map((target) => {
              return (
                <button
                  className="bit button bordered padded2"
                  onClick={() => {
                    test(target.value);
                  }}
                >
                  {target.name}
                </button>
              );
            })}
          </div>
          <div>{result}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Stats;
