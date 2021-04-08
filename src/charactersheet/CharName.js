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
              className="bit button bordered padded2 marginleft"
              placeholder="Enter Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <input
            className="bit button bordered padded2 marginleft"
            type="submit"
            value="Submit"
          />
        </form>
      );
    return (
      <div className="row entry fullwidth">
        <span className="bit bordered padded2">{character.name}</span>
        <span className="entry marginleft">
          <FaPencilAlt
            onClick={() => {
              setIsForm(true);
            }}
            className="button margintop"
          />
        </span>
      </div>
    );
  };

  return <div className="row entry fullwidth">{nameDisplay()}</div>;
}

export default CharName;
