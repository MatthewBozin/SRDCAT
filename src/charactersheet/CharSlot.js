import React, { useContext } from "react";
import Character from "../data/character.js";

const CharSlot = (props) => {
  const [character, setCharacter] = useContext(Character);

  const char = props.char;
  const saveChar = props.saveChar;
  const deleteChar = props.deleteChar;
  const loadChar = props.loadChar;
  const slot = props.slot;

  if (char.name === undefined) {
    return (
      <div>
        <span className="bit item">(empty)</span>
        <button
          onClick={() => {
            saveChar(slot, character);
          }}
          className="bit button bordered padded2"
        >
          save
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <span className="bit item">{char.name}</span>
        <button
          onClick={() => {
            saveChar(slot, character);
          }}
          className="bit button bordered padded2"
        >
          overwrite
        </button>
        <button
          onClick={() => {
            deleteChar(slot);
          }}
          className="bit button bordered padded2"
        >
          delete
        </button>
        <button
          onClick={() => {
            loadChar(slot);
          }}
          className="bit button bordered padded2"
        >
          load
        </button>
      </div>
    );
  }
};

export default CharSlot;
