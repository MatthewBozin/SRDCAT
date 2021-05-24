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
      <div>
        <span className="padded5px outerbox">{char.name}</span>
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
    );
  }
};

export default CharSlot;
