import React, { useState, useContext } from "react";
import Name from "../cards/Name";
import Description from "../cards/Description";
import Col from "react-bootstrap/Col";
import Character from "../data/character.js";

const SaveCharCard = (props) => {
  const [character, setCharacter] = useContext(Character);
  const [expanded, setExpanded] = useState(false);

  const { key, char, saveChar, loadChar, deleteChar, slot } = props;

  const expandCollapse = (status) => {
    setExpanded(!status);
  };

  console.log(char);
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
          <div>
            <button
              onClick={() => {
                saveChar(slot, character);
              }}
              className="button bordered padded5px margin5px"
            >
              overwrite
            </button>
            <button
              onClick={() => {
                deleteChar(slot);
              }}
              className="button bordered padded5px margin5px"
            >
              delete
            </button>
            <button
              onClick={() => {
                loadChar(slot);
              }}
              className="button bordered padded5px margin5px"
            >
              load
            </button>
          </div>
        </article>
      </Col>
    );
  }
};

export default SaveCharCard;
