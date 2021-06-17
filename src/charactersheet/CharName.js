import React, { useState, useContext } from "react";
import Character from "../data/character.js";
import { FaRegEdit, FaRegCheckSquare } from "react-icons/fa";

function CharName() {
  const [character, setCharacter] = useContext(Character);
  const [isForm, setIsForm] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCharacter(() => {
      character.name = name;
      const newCharacter = JSON.parse(JSON.stringify(character));
      return newCharacter;
    });
    setIsForm(false);
  };

  const nameDisplay = () => {
    if (isForm)
      return (
        <form onSubmit={handleSubmit}>
          <input
            className="button bordered padded5px margin5px mleft12px"
            placeholder="Enter Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="button clearborder mtop10px"
            type="submit"
            value="Submit"
          >
            <FaRegCheckSquare className="iconbutton" />
          </button>
        </form>
      );
    return (
      <div className="row mleft5px">
        <span className="bordered padded5px margin5px">{character.name}</span>
        <span>
          <FaRegEdit
            onClick={() => {
              setIsForm(true);
            }}
            className="icon mtop10px"
          />
        </span>
      </div>
    );
  };

  return <div className="mleft5px fullwidth">{nameDisplay()}</div>;
}

export default CharName;
