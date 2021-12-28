import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaSave } from "react-icons/fa";
import Character from "../../data/character.js";
import WorldState from "../../data/worldstate.js";
import SaveCard from "./SaveCard.js";
import Col from "react-bootstrap/Col";

const SaveModal = (props) => {
  const savepath = props.savepath;

  const [modalOpen, setModalOpen] = useState(false);
  const [slots, setSlots] = useState(
    JSON.parse(localStorage.getItem(savepath))
  );
  const [character, setCharacter] = useContext(Character);
  const [worldState, setWorldState] = useContext(WorldState);

  const gate = () => {
    if (props.context === "character") {
      return character;
    }
    if (props.context === "worldstate") {
      return worldState;
    }
  };

  const modalOpening = () => {
    setModalOpen(true);
    if (localStorage.getItem(savepath) === undefined) {
      localStorage.setItem(savepath, []);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const addSlot = (slotInfo) => {
    let array = slots;
    slotInfo.slot = slots.length;
    array.push(slotInfo);
    setSlots(() => {
      return JSON.parse(JSON.stringify(array));
    });
    localStorage.setItem(savepath, JSON.stringify(array));
  };

  const saveSlot = (slot, slotInfo) => {
    let array = slots;
    slotInfo.slot = slot;
    array.splice(slot, 1, slotInfo);
    setSlots(() => {
      return JSON.parse(JSON.stringify(array));
    });
    localStorage.setItem(savepath, JSON.stringify(array));
  };

  const loadSlot = (slot) => {
    let slotInfo = slots[slot];
    if (props.context === "character") {
      setCharacter(() => {
        //may have to json parse/stringify
        return slotInfo;
      });
    }
    if (props.context === "worldstate") {
      setWorldState(() => {
        //may have to json parse/stringify
        return slotInfo;
      });
    }
  };

  const deleteSlot = (slot) => {
    let array = slots;
    array.splice(slot, 1);
    setSlots(() => {
      return JSON.parse(JSON.stringify(array));
    });
    localStorage.setItem(savepath, JSON.stringify(array));
  };

  return (
    <div>
      <FaSave
        className="icon mtop10px"
        onClick={() => {
          modalOpening();
        }}
      />
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header className="modalbackground">Manage Slots</Modal.Header>
        <Modal.Body className="modalbackground">
          {slots.map((eachSlot, index) => {
            let slot = JSON.parse(JSON.stringify(index));
            if (eachSlot.name === undefined) {
              return (
                <Col key={index}>
                  <div className="outerbox">
                    <div className="padded5px">Empty Slot</div>
                    <button
                      onClick={() => {
                        saveSlot(eachSlot.slot, gate());
                      }}
                      className="button bordered padded5px margin5px"
                    >
                      save
                    </button>
                    <button
                      onClick={() => {
                        deleteSlot(eachSlot.slot, gate());
                      }}
                      className="button bordered padded5px margin5px"
                    >
                      delete
                    </button>
                  </div>
                </Col>
              );
            } else {
              return (
                <SaveCard
                  key={index}
                  context={props.context}
                  eachSlot={eachSlot}
                  saveSlot={saveSlot}
                  loadSlot={loadSlot}
                  deleteSlot={deleteSlot}
                  slot={slot}
                />
              );
            }
          })}
          <Col>
            <button
              className="button bordered padded5px fullwidth"
              onClick={() => {
                addSlot(gate());
              }}
            >
              Save
            </button>
          </Col>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default SaveModal;
