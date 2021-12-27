import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toggle } from "../utils/exports.js";
import { FaListAlt } from "react-icons/fa";
import NameValuePair from "./NameValuePair.js";

function ModalPropAction(props) {
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const { action } = props;

  return (
    <span>
      <div
        className="button"
        onClick={() => {
          setActionModalOpen(true);
        }}
      >
        {action.name}
      </div>
      <Modal
        show={actionModalOpen}
        onHide={() => {
          toggle(setActionModalOpen, actionModalOpen);
        }}
      >
        <Modal.Body className="modalbackground">
          {action.options.map((option, index) => {
            if (typeof option === "object") {
              //return card display modal
              //and return index button thing (use creature attack)
              return (
                <NameValuePair
                  name={option.name}
                  value={option.description}
                  key={index}
                />
              );
            }
            return <div>{option}</div>;
          })}
        </Modal.Body>
      </Modal>
    </span>
  );
}

export default ModalPropAction;
