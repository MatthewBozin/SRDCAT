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

  const SEACAT = ["STR", "END", "AGI", "CHA", "AUR", "THO"];

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
      <div className="row entry">ATTRIBUTES</div>
      <div className="bit row entry">
        {SEACAT.map((stat, index) => {
          return (
            <button
              className="bit button bordered padded2"
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
          Roll {modalStat}: (+{character[modalStat]})
        </Modal.Header>
        <Modal.Body className="modalbackground">
          Targets:
          <div>
            {targets.map((target, index) => {
              return (
                <button
                  className="bit button bordered padded2"
                  key={index}
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
