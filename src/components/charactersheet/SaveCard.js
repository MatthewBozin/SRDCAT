import React, { useState, useContext } from "react";
import Name from "../bits/Name";
import Description from "../bits/Description";
import Col from "react-bootstrap/Col";
import Character from "../../data/character.js";
import WorldState from "../../data/worldstate.js";
import { ReactComponent as Trash} from "../../data/icons/trash.svg";
import { ReactComponent as Folder} from "../../data/icons/folder.svg";

const SaveCard = (props) => {
  const [character] = useContext(Character);
  const [worldState] = useContext(WorldState);
  const [expanded, setExpanded] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [confirmType, setConfirmType] = useState({});

  const { context, eachSlot, saveSlot, loadSlot, deleteSlot, slot } = props;

  const gate = () => {
    if (context === "character") {
      return character;
    }
    if (context === "worldstate") {
      return worldState;
    }
  };

  const expandCollapse = (status) => {
    setExpanded(!status);
  };

  const confirmToggle = (status) => {
    setConfirm(!status);
  };

  const confirmAction = () => {
    switch (confirmType.type) {
      case "overwrite":
        saveSlot(slot, gate());
        break;
      case "delete":
        deleteSlot(slot);
        break;
      default:
        loadSlot(slot);
    }
    confirmToggle(confirm);
  };

  const stats = [
    { name: "Level", value: "level" },
    { name: "Life", value: "life" },
    { name: "Cash", value: "CASH" },
    { name: "XP", value: "XP" },
    { name: "Type", value: "type" },
  ];

  if (eachSlot.name === undefined) {
    return (
      <div>
        <span className="padded5px outerbox">(empty)</span>
        <button
          onClick={() => {
            saveSlot(slot, gate());
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
              name={eachSlot.name}
              expanded={expanded}
              expandCollapse={expandCollapse}
            />
            <span className="rightfloat mright15px">
              <Folder
                className="iconsvg scaleup125 mright3px"
                onClick={() => {
                  confirmToggle();
                  setConfirmType({
                    text: `Load this ${props.context}`,
                    type: "load",
                  });
                }}
              />
              <Trash
                className="iconsvg mright3px mleft8px"
                onClick={() => {
                  //deleteSlot(slot);
                  confirmToggle();
                  setConfirmType({
                    text: `Delete this ${props.context}`,
                    type: "delete",
                  });
                }}
              />
            </span>
          </div>
          {expanded === true && (
            <span>
              <hr></hr>
              <Description description={"(placeholder)"} />
              <hr></hr>
              {stats.map((stat, index) => {
                return (
                  <div className="padded5px" key={index}>
                    {stat.name}: {eachSlot[stat.value]}
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

export default SaveCard;
