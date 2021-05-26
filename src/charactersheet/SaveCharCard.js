import React, { useState, useContext } from "react";
import Name from "../cards/Name";
import Description from "../cards/Description";
import Col from "react-bootstrap/Col";
import Character from "../data/character.js";
import { FaRegTrashAlt, FaRegFolderOpen } from "react-icons/fa";

const SaveCharCard = (props) => {
  const [character, setCharacter] = useContext(Character);
  const [expanded, setExpanded] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState({});

  const { key, char, saveChar, loadChar, deleteChar, slot } = props;

  const expandCollapse = (status) => {
    setExpanded(!status);
  };

  const confirmToggle = (status) => {
    setConfirm(!status);
  };

  const confirmAction = () => {
    switch (confirmType.type) {
      case "overwrite":
        saveChar(slot, character);
        break;
      case "delete":
        deleteChar(slot);
        break;
      case "load":
        loadChar(slot);
    }
    confirmToggle(confirm);
  };

  const stats = [
    { name: "Level", value: "LEVEL" },
    { name: "Life", value: "LIFE" },
    { name: "Cash", value: "CASH" },
    { name: "XP", value: "XP" },
  ];

  if (char.name === undefined) {
    return (
      <div>
        <span className="padded5px outerbox">(empty)</span>
        <button
          onClick={() => {
            saveChar(slot, character);
          }}
          className="button bordered padded5px margin5px"
        >
          save
        </button>
      </div>
    );
  } else {
    return (
      <Col>
        <article className="outerbox">
          <div className="row">
            <Name
              name={char.name}
              expanded={expanded}
              expandCollapse={expandCollapse}
            />
            <span className="rightfloat mright15px">
              <FaRegTrashAlt
                className="icon mright3px"
                onClick={() => {
                  //deleteChar(slot);
                  confirmToggle();
                  setConfirmType({
                    text: "Delete This Hero",
                    type: "delete",
                  });
                }}
              ></FaRegTrashAlt>
              <FaRegFolderOpen
                className="icon mright3px"
                onClick={() => {
                  confirmToggle();
                  setConfirmType({
                    text: "Load This Hero",
                    type: "load",
                  });
                }}
              ></FaRegFolderOpen>
            </span>
          </div>
          {expanded === true && (
            <span>
              <hr></hr>
              <Description description={"A character."} />
              <hr></hr>
              {stats.map((stat, index) => {
                return (
                  <div className="padded5px">
                    {stat.name}: {char[stat.value]}
                  </div>
                );
              })}
              <hr></hr>
            </span>
          )}
          {confirm === true && (
            //flex these
            <div>
              <hr></hr>
              <button
                className="button bordered padded5px margin5px"
                onClick={() => {
                  confirmAction();
                }}
              >
                {confirmType.text}
              </button>
              <button
                className="button bordered padded5px margin5px"
                onClick={() => {
                  confirmToggle(confirm);
                }}
              >
                No
              </button>
            </div>
          )}
        </article>
      </Col>
    );
  }
};

export default SaveCharCard;
