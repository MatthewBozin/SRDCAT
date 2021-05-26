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
  const amounts = [
    [1, 5, 10],
    [-1, -5, -10],
    ["+1", "+5", "+10"],
  ];

  const amounts2 = [
    [1, 5, 20, 100],
    [-1, -5, -20, -100],
    ["+1", "+5", "+20", "+100"],
  ];

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = "modalform" + character[modalStat];
    document.getElementById(id).value = "";
    if (data !== undefined) {
      character[modalStat] = parseInt(data);
      setCurrentResource(character[modalStat]);
    }
  };

  const ifStat1 = (stat) => {
    if (stat == "XP" || stat == "CASH") {
      return amounts2[0].map((amount, index) => {
        return (
          <button
            className="button bordered padded5px margin5px flexgrow"
            key={index}
            onClick={() => {
              modResource(amount, modalStat);
            }}
          >
            {amounts2[2][index]}
          </button>
        );
      });
    } else {
      return amounts[0].map((amount, index) => {
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
      });
    }
  };

  const ifStat2 = (stat) => {
    if (stat == "XP" || stat == "CASH") {
      return amounts2[1].map((amount, index) => {
        return (
          <button
            className="button bordered padded5px margin5px flexgrow"
            key={index}
            onClick={() => {
              modResource(amount, modalStat);
            }}
          >
            {amount}
          </button>
        );
      });
    } else {
      return amounts[1].map((amount, index) => {
        return (
          <button
            className="button bordered padded5px margin5px flexgrow"
            key={index}
            onClick={() => {
              modResource(amount, modalStat);
            }}
          >
            {amount}
          </button>
        );
      });
    }
  };

  return (
    <div className="outerbox">
      <div className="row mleft5px">RESOURCES</div>
      <div className="padded5px row mleft5px">
        {resources.map((stat, index) => {
          return (
            <button
              className="button bordered padded5px margin5px"
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
        <Modal.Body className="modalbackground">
          <form onSubmit={handleSubmit} className="flex">
            <div className="padded5px button bordered margin5px flex flexgrow2">
              <span className="margin5px button--override">{modalStat}</span>
              <input
                className="padded5px button clearborder flexgrow2 lefttoright"
                placeholder={character[modalStat]}
                type="text"
                onChange={(e) => {
                  setData(e.target.value);
                }}
                id={"modalform" + character[modalStat]}
              />
            </div>
            <input
              className="button bordered padded5px margin5px flexgrow2"
              type="submit"
              //value = stat.value
              value="Set"
            />
          </form>
          <div className="flex">{ifStat1(modalStat)}</div>
          <div className="flex">{ifStat2(modalStat)}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Resources;
