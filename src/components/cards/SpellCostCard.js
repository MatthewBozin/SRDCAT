import React, { useState, useContext } from "react";
import Name from "../bits/Name";
import NameValuePair from "../bits/NameValuePair";
import { ReactComponent as Left} from "../../data/icons/left.svg";
import { ReactComponent as Right} from "../../data/icons/right.svg";
import Character from "../../data/character.js";
import toaster from "toasted-notes";

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
      `${character.name} cast ${name} at base cost ${rank.power} for a total cost of ${totalCost} life!`
    );
  };

  return (
    <div>
        <div className="row">
          <Name name={"Life Cost: " + totalCost} />
          <button
            className="button bordered padded2px"
            onClick={() => {
              modulate(-1);
              setCastText("");
            }}
          >
            <Left className="iconsvg scaledown80" />
          </button>
          <button
            className="button bordered padded2px"
            onClick={() => {
              modulate(1);
              setCastText("");
            }}
          >
            <Right className="iconsvg scaledown80" />
          </button>
        </div>
        <div className="margin5px">
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
            toaster.notify(
              () => (
                <div className="outerbox modalbackground">
                  {"Spell cast text copied to clipboard!"}
                </div>
              ),
              {
                duration: 1000,
              }
            );
            navigator.clipboard.writeText(castText);
          }}
        >
          {castText}
        </div>
      )}
    </div>
  );
};

export default ExportCard;
