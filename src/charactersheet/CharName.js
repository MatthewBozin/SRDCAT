import React, { useState, useContext } from "react";
import Character from "../data/character.js";
import { FaPencilAlt } from "react-icons/fa";

function CharName() {
  const [character, setCharacter] = useContext(Character);
  const [isForm, setIsForm] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setCharacter(() => {
      character.name = name;
      const newCharacter = JSON.parse(JSON.stringify(character));
      console.log(newCharacter);
      return newCharacter;
    });
    setIsForm(false);
  };

  const nameDisplay = () => {
    if (isForm)
      return (
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="button bordered padded5px margin5px mleft12px"
              placeholder="Enter Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <input
            className="button bordered padded5px margin5px mleft12px"
            type="submit"
            value="Submit"
          />
        </form>
      );
    return (
      <div className="row mleft5px fullwidth">
        <span className="bordered padded5px margin5px">{character.name}</span>
        <span>
          <FaPencilAlt
            onClick={() => {
              setIsForm(true);
            }}
            className="icon"
          />
        </span>
      </div>
    );
  };

  return <div className="row mleft5px fullwidth">{nameDisplay()}</div>;
}

export default CharName;
