import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import architecture from "../../data/architecture.json";
import NameValuePair from "../bits/NameValuePair.js";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import {
  r,
  test,
  damagecalc,
  toggleState,
  toggle,
  withProAdv,
} from "../../utils/exports.js";

function ModalCreatureEdit(props) {
  const { editModalOpen, setEditModalOpen, creatureName, creatureProperties } =
    props;

  return (
    <Modal
      show={editModalOpen}
      onHide={() => {
        toggle(setEditModalOpen, editModalOpen);
      }}
    >
      <Modal.Header className="modalbackground">
        <span className="cardname">Edit {creatureName}!</span>
      </Modal.Header>
      <Modal.Body className="modalbackground">
        {creatureProperties.map((property, index) => {
          return (
            <div key={index}>
              <NameValuePair
                name={property.name}
                value={property.description}
              />
              <hr />
            </div>
          );
        })}
      </Modal.Body>
    </Modal>
  );
}

export default ModalCreatureEdit;
