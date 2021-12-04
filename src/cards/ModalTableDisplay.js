import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toggle } from "../utils/exports.js";
import ModalCardDisplay from "./ModalCardDisplay.js";
import { FaDiceD20 } from "react-icons/fa";

function ModalTableDisplay(props) {
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const { table } = props;

  return (
    <span>
      <button
        className="button clearborder"
        onClick={() => {
          setTableModalOpen(true);
        }}
      >
        <FaDiceD20 className="button scaleup125" />
      </button>
      <Modal
        show={tableModalOpen}
        onHide={() => {
          toggle(setTableModalOpen, tableModalOpen);
        }}
      >
        <Modal.Body className="modalbackground">
          {table.map((entry, index) => {
            if (typeof entry === "object") {
              //return card display modal
              //and return index button thing (use creature attack)
              return (
                <div>
                  <ModalCardDisplay
                    entry={entry}
                    key={index}
                  ></ModalCardDisplay>
                </div>
              );
            }
            return <div>{entry}</div>;
          })}
        </Modal.Body>
      </Modal>
    </span>
  );
}

export default ModalTableDisplay;
