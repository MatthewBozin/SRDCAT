import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaSave } from "react-icons/fa";
import Character from "../data/character.js";
import CharSlot from "./CharSlot.js";

const SaveCharModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [characters, setCharacters] = useState(
    JSON.parse(localStorage.getItem("SRDcharacters"))
  );
  const [character, setCharacter] = useContext(Character);

  const modalOpening = () => {
    setModalOpen(true);
    console.log(localStorage.SRDcharacters);
    if (localStorage.getItem("SRDcharacters") === undefined) {
      localStorage.setItem("SRDcharacters", []);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const addSlot = () => {
    let array = characters;
    array.push({ slot: characters.length });
    setCharacters(JSON.parse(JSON.stringify(array)));
  };

  const saveChar = (slot, charInfo) => {
    let array = characters;
    charInfo.slot = slot;
    array.splice(slot, 1, charInfo);
    setCharacters(() => {
      return JSON.parse(JSON.stringify(array));
    });
    localStorage.setItem("SRDcharacters", JSON.stringify(array));
  };

  const loadChar = (slot) => {
    let charInfo = characters[slot];
    setCharacter(() => {
      //may have to json parse/stringify
      return charInfo;
    });
  };

  const deleteChar = (slot) => {
    let array = characters;
    array.splice(slot, 1);
    setCharacters(() => {
      return JSON.parse(JSON.stringify(array));
    });
    localStorage.setItem("SRDcharacters", JSON.stringify(array));
  };

  return (
    <div>
      <FaSave
        className="icon"
        onClick={() => {
          modalOpening();
        }}
      />
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header className="modalbackground">
          Manage Characters
        </Modal.Header>
        <Modal.Body className="modalbackground">
          {characters.map((char, index) => {
            let slot = JSON.parse(JSON.stringify(index));
            if (char.name === undefined) {
              return (
                <div key={index}>
                  <span className="padded5px outerbox">(empty)</span>
                  <button
                    onClick={() => {
                      saveChar(char.slot, character);
                    }}
                    className="button bordered padded5px margin5px"
                  >
                    save
                  </button>
                </div>
              );
            } else {
              return (
                <CharSlot
                  key={index}
                  char={char}
                  saveChar={saveChar}
                  loadChar={loadChar}
                  deleteChar={deleteChar}
                  slot={slot}
                />
              );
            }
          })}
          <button
            className="button bordered padded5px margin5px"
            onClick={() => {
              addSlot();
            }}
          >
            New
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default SaveCharModal;
