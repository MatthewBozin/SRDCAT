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
        {defenses.map((defense) => {
          return (
            <button
              className="bit bordered padded2 margin"
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
        <Modal.Header>
          {modalStat} save: ({character[modalStat]})
        </Modal.Header>
        <Modal.Body>
          Attacker sum:
          {profarray.map((prof) => {
            return (
              <button
                className="bit button bordered padded2"
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
