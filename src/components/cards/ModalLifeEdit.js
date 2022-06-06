import React, { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Character from "../../data/character.js";
import WorldState from "../../data/worldstate.js";
import Context from "../../data/context.js";

function ModalLifeEdit(props) {
  const [character, setCharacter] = useContext(Character);
  const [worldState, setWorldState] = useContext(WorldState);
  const [context] = useContext(Context);
  let baseCreature;
  const [modalOpen, setModalOpen] = useState(false);
  if (context.persona === "PC") {
    baseCreature = character.creatures[props.placement]
  } else if (context.persona === "TC") {
    baseCreature = worldState.creatures[props.placement]
  }

  const [data, setData] = useState(
    baseCreature.lifecurrent
  );
  const [setButton, setSetButton] = useState(false);
  const lifeCurrent = baseCreature.lifecurrent;

  const amounts = [
    [1, 5, 10],
    [-1, -5, -10],
    ["+1", "+5", "+10"],
  ];

  const modResource = (amount) => {
    if (context.persona === "PC") {
      let newchar = character;
      newchar.creatures[props.placement].lifecurrent += parseInt(amount);
      setCharacter(JSON.parse(JSON.stringify(newchar)));
    } else if (context.persona === "TC") {
      let newWorldState = worldState;
      worldState.creatures[props.placement].lifecurrent += parseInt(amount);
      setWorldState(JSON.parse(JSON.stringify(newWorldState)));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = "modalformlifeCurrent";
    document.getElementById(id).value = "";
    if (data !== undefined) {
      let newchar = character;
      newchar.creatures[props.placement].lifecurrent = parseInt(data);
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
              <span className="margin5px button--override">Life</span>
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

export default ModalLifeEdit;
