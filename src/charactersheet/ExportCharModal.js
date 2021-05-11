import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaFileExport } from "react-icons/fa";
import Character from "../data/character.js";

const SaveCharModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [character] = useContext(Character);
  const [charexport, setCharExport] = useState("");

  const modalOpening = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  let properties = [
    "name",
    "STR",
    "END",
    "AGI",
    "CHA",
    "AUR",
    "THO",
    "HA",
    "KA",
    "BA",
    "LIFE",
    "LEVEL",
    "PRO",
    "MCOST",
    "HERODICE",
    "XP",
    "CASH",
    "skills",
    "traits",
    "mutations",
    "items",
  ];

  const exportTxt = () => {
    let txtstring = "";
    for (let property of properties) {
      let txtproperty = character[property].toString();
      console.log(txtproperty);
      //if typeof == "object"
      txtstring += property + ": " + txtproperty + "\n";
    }
    setCharExport(txtstring);
  };

  const process = (toProcess) => {
    console.log(toProcess);
    let toProcessString = toProcess.toString();
    if (toProcessString.includes(",")) {
      return '"' + toProcessString + '",';
    } else {
      return toProcessString + ",";
    }
  };

  const exportCsv = () => {
    let csvstring = "";
    for (let property of properties) {
      let charProperty = character[property];
      console.log(charProperty);
      if (typeof charProperty == "object") {
        let csvobject = [];
        for (let part of charProperty) {
          csvobject += process(part) + ",";
        }
        csvstring += process(csvobject);
      } else {
        csvstring += process(charProperty);
      }
    }
    setCharExport(csvstring);
  };

  const ifCharExport = () => {
    if (charexport !== "") {
      return (
        <button
          className="bit button bordered padded2"
          onClick={() => {
            navigator.clipboard.writeText(charexport);
            //possible nonfunctionality with older browsers?
          }}
        >
          copy
        </button>
      );
    }
  };

  return (
    <div>
      <FaFileExport
        className="button right margin"
        onClick={() => {
          modalOpening();
        }}
      />
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header className="modalbackground">
          Export Character As
        </Modal.Header>
        <Modal.Body className="modalbackground">
          {character.name}
          <button
            className="bit button bordered padded2"
            onClick={() => {
              exportTxt();
            }}
          >
            .txt
          </button>
          <button
            className="bit button bordered padded2"
            onClick={() => {
              setCharExport(JSON.stringify(character));
            }}
          >
            .json
          </button>
          <button
            className="bit button bordered padded2"
            onClick={() => {
              exportCsv();
            }}
          >
            .csv
          </button>
          <br />
          {ifCharExport()}
          <div className={"textwrap"}>{charexport}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default SaveCharModal;
