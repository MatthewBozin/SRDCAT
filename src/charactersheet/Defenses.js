import React, { useState, useContext } from "react";
import Stat from "./Stat";
import Modal from "react-bootstrap/Modal";
import { r } from "../data/exports";
import Character from "../data/character.js";

const Defenses = () => {
  const [character] = useContext(Character);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStat, setModalStat] = useState("");
  const [result, setResult] = useState("");

  const defenses = ["HA", "KA", "BA"];
  const profarray = [0, 1, 2, 3, 4, 5, 6];

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

  const test = (modifier) => {
    let rollResult = r(20) + 1;
    let total = rollResult + modifier;
    if (total <= character[modalStat]) {
      setResult(() => {
        return (
          "Save successful! Result: " +
          rollResult +
          ". Total: " +
          total +
          ". Target: " +
          character[modalStat] +
          "."
        );
      });
    } else {
      setResult(() => {
        return (
          "Save failed! Result: " +
          rollResult +
          ". Total: " +
          total +
          "." +
          "Target: " +
          character[modalStat] +
          "."
        );
      });
    }
  };

  return (
    <div className="item">
      <div className="row entry">DEFENSES</div>
      <div className="bit row entry">
        {defenses.map((defense, index) => {
          return (
            <button
              className="bit button bordered padded2"
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
          {modalStat} save: ({character[modalStat]})
        </Modal.Header>
        <Modal.Body className="modalbackground">
          Attacker sum:
          {profarray.map((prof, index) => {
            return (
              <button
                className="bit button bordered padded2"
                key={index}
                onClick={() => {
                  test(prof);
                }}
              >
                +{prof}
              </button>
            );
          })}
          <div>{result}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Defenses;
