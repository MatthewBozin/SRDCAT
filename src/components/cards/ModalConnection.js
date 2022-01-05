import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toggle } from "../../utils/exports.js";
import ModalCardDisplay from "./ModalCardDisplay";

function ModalConnection(props) {
  const [connectionModalOpen, setConnectionModalOpen] = useState(false);
  const { connections } = props;

  return (
    <span>
      <div
        className="button"
        onClick={() => {
          setConnectionModalOpen(true);
        }}
      >
        Connections
      </div>
      <Modal
        show={connectionModalOpen}
        onHide={() => {
          toggle(setConnectionModalOpen, connectionModalOpen);
        }}
      >
        <Modal.Header className="modalbackground">Connections</Modal.Header>
        <Modal.Body className="modalbackground">
          {connections.map((connection, index) => {
            return (
              <div key={index}>
                {connection.direction}:{" "}
                <ModalCardDisplay
                  entry={connection.destination}
                ></ModalCardDisplay>
                {". "}
                <i>{connection.description}</i> Time: {connection.time}
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </span>
  );
}

export default ModalConnection;
