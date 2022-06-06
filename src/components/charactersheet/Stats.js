import { React, useState, useContext } from "react";
import Stat from "./Stat";
import Modal from "react-bootstrap/Modal";
import Character from "../../data/character.js";
import Worldstate from "../../data/worldstate.js";
import architecture from "../../data/architecture.json";
import Context from "../../data/context.js";

const Stats = (props) => {
  const [context] = useContext(Context);
  const [character, setCharacter] = useContext(Character);
  const [worldState, setWorldState] = useContext(Worldstate);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStat, setModalStat] = useState("");
  const [data, setData] = useState(character[modalStat]);
  const [setButton, setSetButton] = useState(false);

  const statMasks = architecture.statMasks;
  const stats = props.stats;
  const amounts = [
    [1, 5, 10],
    [-1, -5, -10],
    ["+1", "+5", "+10"],
  ];

  const add = (original, stat, amount, method) => {
    let New = original;
    New[stat] += parseInt(amount);
    method(JSON.parse(JSON.stringify(New)));
  }

  const modalOpenStat = (stat) => {
    setModalOpen(true);
    setModalStat(stat);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = "modalform" + character[modalStat];
    document.getElementById(id).value = "";
    if (data !== undefined) {
      if (context.persona === "PC") {add(character, modalStat, data, setCharacter)}
      if (context.persona === "TC") {add(worldState, modalStat, data, setWorldState)}
    }
    setSetButton(false);
  };

  const placeholder = () => {
    if (context.persona === "PC") return character[modalStat];
      if (context.persona === "TC") return worldState[modalStat];
  }

  return (
    <div className="outerbox">
      <div className="row mleft5px">{props.name}</div>
      <div className="padded5px mleft5px flex">
        {stats.map((stat, index) => {
          return (
            <button
              className="button bordered padded5px margin5px flexgrow fontsize"
              key={index}
              onClick={() => {
                modalOpenStat(stat);
              }}
            >
              <Stat stat={stat} />
            </button>
          );
        })}
        <Modal show={modalOpen} onHide={closeModal}>
          <Modal.Body className="modalbackground">
            <form onSubmit={handleSubmit} className="flex">
              <div className="padded5px button bordered margin5px flex flexgrow2">
                <span className="margin5px button--override">
                  {statMasks[modalStat]}
                </span>
                <input
                  className="padded5px button clearborder flexgrow2 lefttoright"
                  placeholder={placeholder()}
                  type="text"
                  onClick={() => {
                    setSetButton(true);
                  }}
                  onChange={(e) => {
                    setData(e.target.value);
                  }}
                  id={"modalform" + placeholder()}
                />
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
                      if (context.persona === "PC") {add(character, modalStat, amount, setCharacter)}
                      if (context.persona === "TC") {add(worldState, modalStat, amount, setWorldState)}
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
                      if (context.persona === "PC") {add(character, modalStat, amount, setCharacter)}
                      if (context.persona === "TC") {add(worldState, modalStat, amount, setWorldState)}
                    }}
                  >
                    {amounts[1][index]}
                  </button>
                );
              })}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Stats;
