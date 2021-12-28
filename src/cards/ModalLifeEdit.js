import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Character from "../data/character.js";

function ModalCreatureEdit(props) {
  const [character, setCharacter] = useContext(Character);
  console.log(props.placement);
  console.log(character.creatures[props.placement]);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState(
    character.creatures[props.placement].lifecurrent
  );
  const [setButton, setSetButton] = useState(false);
  const lifeCurrent = character.creatures[props.placement].lifecurrent;

  const amounts = [
    [1, 5, 10],
    [-1, -5, -10],
    ["+1", "+5", "+10"],
  ];

  const modResource = (amount) => {
    let newchar = character;
    newchar.creatures[props.placement].lifecurrent += parseInt(amount);
    setCharacter(JSON.parse(JSON.stringify(newchar)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = "modalformlifeCurrent";
    document.getElementById(id).value = "";
    if (data !== undefined) {
      let newchar = character;
      newchar.creatures[props.placement].lifecurrent += parseInt(data);
      setCharacter(JSON.parse(JSON.stringify(newchar)));
    }
    setSetButton(false);
  };

  return (
    <span>
      <span
        className="button"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Life: {<span>{lifeCurrent} /</span>} {props.life}
      </span>
      <Modal
        show={modalOpen}
        onHide={() => {
          setModalOpen(false);
        }}
      >
        <Modal.Body className="modalbackground">
          <form onSubmit={handleSubmit} className="flex">
            <div className="padded5px button bordered margin5px flex flexgrow2">
              <span className="margin5px button--override">Current Life</span>
              <input
                className="padded5px button clearborder flexgrow2 lefttoright"
                placeholder={lifeCurrent}
                type="text"
                onClick={() => {
                  setSetButton(true);
                }}
                onChange={(e) => {
                  setData(e.target.value);
                }}
                id={"modalformlifeCurrent"}
              />
              <span className="mtop45px button--override">/ {props.life}</span>
            </div>
            {setButton === true && (
              <input
                className="button bordered padded5px margin5px flexgrow2"
                type="submit"
                //value = stat.value
                value="Set"
              />
            )}
          </form>
          <div className="flex">
            {amounts[0].map((amount, index) => {
              return (
                <button
                  className="button bordered padded5px margin5px flexgrow"
                  key={index}
                  onClick={() => {
                    modResource(amount);
                  }}
                >
                  {amounts[2][index]}
                </button>
              );
            })}
          </div>
          <div className="flex">
            {amounts[1].map((amount, index) => {
              return (
                <button
                  className="button bordered padded5px margin5px flexgrow"
                  key={index}
                  onClick={() => {
                    modResource(amount);
                  }}
                >
                  {amount}
                </button>
              );
            })}
          </div>
        </Modal.Body>
      </Modal>
    </span>
  );
}

export default ModalCreatureEdit;
