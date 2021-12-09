import React, { useState, useContext } from "react";
import Name from "./Name";
import NameValuePair from "./NameValuePair";
import Col from "react-bootstrap/Col";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Character from "../data/character.js";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

const ExportCard = (props) => {
  const { name, rank, modulate } = props;

  const [castText, setCastText] = useState("");
  const [character, setCharacter] = useContext(Character);

  let totalCost = rank.power * character.MCOST;

  const cast = () => {
    let newchar = character;
    newchar.life -= totalCost;
    setCharacter(JSON.parse(JSON.stringify(newchar)));
    setCastText(
      `${character.name} casted ${name} at base cost ${rank.power} for a total cost of ${totalCost} life!`
    );
  };

  return (
    <Col>
      <article className="outerbox">
        <div className="row">
          <Name name={"Life Cost: " + totalCost} />
          <button
            className="button bordered padded2px"
            onClick={() => {
              modulate(-1);
              setCastText("");
            }}
          >
            <FaChevronLeft className="pbottom5px" />
          </button>
          <button
            className="button bordered padded2px"
            onClick={() => {
              modulate(1);
              setCastText("");
            }}
          >
            <FaChevronRight className="pbottom5px" />
          </button>
        </div>
        <div className="margin5px outerbox">
          <NameValuePair name={"Current Life"} value={character.life} />
          <NameValuePair name={"Base Cost"} value={rank.power} />
          <NameValuePair
            name={"Character Magic Cost"}
            value={character.MCOST}
          />
          <NameValuePair name={"Effect"} value={rank.effect} />
        </div>
        {totalCost >= character.life && (
          <div className="outerbox">
            You don't have the life to cast this spell!
          </div>
        )}
        {totalCost < character.life && (
          <div
            className="button bordered margin5px center"
            onClick={() => {
              cast(totalCost);
            }}
          >
            Cast Spell
          </div>
        )}
        {castText !== "" && (
          <div
            className="button padded5px"
            onClick={() => {
              toaster.notify("Spell cast text copied to clipboard!", {
                duration: 1000,
              });
              navigator.clipboard.writeText(castText);
            }}
          >
            {castText}
          </div>
        )}
      </article>
    </Col>
  );
};

export default ExportCard;
