import { React, useState, useContext } from "react";
import Stat from "./Stat";
import Modal from "react-bootstrap/Modal";
import Character from "../data/character.js";

const Resources = () => {
  const [character, setCharacter] = useContext(Character);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStat, setModalStat] = useState("");
  const [currentResource, setCurrentResource] = useState(character[modalStat]);
  const [data, setData] = useState(character[modalStat]);

  const resources = ["LIFE", "HERODICE", "XP", "CASH"];
  const amounts = [-10, -5, -1, 1, 5, 10];

  const modalOpenStat = (stat) => {
    setModalOpen(true);
    setModalStat(stat);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const modResource = (amount, resource) => {
    character[resource] += parseInt(amount);
    setCurrentResource(character[resource]);
    console.log(character[resource]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    modResource(data, modalStat);
  };

  return (
    <div className="item">
      <div className="row entry">RESOURCES</div>
      <div className="bit row entry">
        {resources.map((stat, index) => {
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
          Add or Subtract {modalStat}: {character[modalStat]}
        </Modal.Header>
        <Modal.Body className="modalbackground">
          <div>
            {amounts.map((amount, index) => {
              return (
                <button
                  className="bit button bordered padded2"
                  key={index}
                  onClick={() => {
                    modResource(amount, modalStat);
                  }}
                >
                  {amount}
                </button>
              );
            })}
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                className="bit button bordered padded2 marginleft"
                placeholder={character[modalStat]}
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </label>
            <input
              className="bit button bordered padded2 marginleft"
              type="submit"
              value="Modify"
            />
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Resources;
