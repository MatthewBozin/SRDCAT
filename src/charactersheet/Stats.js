import { React, useState, useContext } from "react";
import Stat from "./Stat";
import Modal from "react-bootstrap/Modal";
import Character from "../data/character.js";
import architecture from "../data/architecture.json";

const Resources = () => {
  const [character, setCharacter] = useContext(Character);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStat, setModalStat] = useState("");
  const [data, setData] = useState(character[modalStat]);
  const [setButton, setSetButton] = useState(false);

  const statMasks = architecture.statMasks;
  const stats = ["level", "PRO", "MCOST"];
  const amounts = [
    [1, 5, 10],
    [-1, -5, -10],
    ["+1", "+5", "+10"],
  ];

  const modalOpenStat = (stat) => {
    setModalOpen(true);
    setModalStat(stat);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const modResource = (amount, resource) => {
    //character[resource] += parseInt(amount);
    //setCurrentResource(character[resource]);
    let newChar = character;
    newChar[resource] += parseInt(amount);
    setCharacter(JSON.parse(JSON.stringify(newChar)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = "modalform" + character[modalStat];
    document.getElementById(id).value = "";
    if (data !== undefined) {
      //character[modalStat] = parseInt(data);
      //setCurrentResource(character[modalStat]);
      let newChar = character;
      newChar[modalStat] += parseInt(data);
      setCharacter(JSON.parse(JSON.stringify(newChar)));
    }
    setSetButton(false);
  };

  return (
    <div className="outerbox">
      <div className="row mleft5px">STATS</div>
      <div className="padded5px mleft5px flex">
        {stats.map((stat, index) => {
          return (
            <button
              className="button bordered padded5px margin5px flexgrow"
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
                  placeholder={character[modalStat]}
                  type="text"
                  onClick={() => {
                    setSetButton(true);
                  }}
                  onChange={(e) => {
                    setData(e.target.value);
                  }}
                  id={"modalform" + character[modalStat]}
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
                      modResource(amount, modalStat);
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
                      modResource(amount, modalStat);
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

export default Resources;
