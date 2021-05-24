import React, { useState, useContext } from "react";
import Character from "../data/character.js";

function Input(props) {
  const [character, setCharacter] = useContext(Character);
  const [isForm, setIsForm] = useState(false);
  const [data, setData] = useState("");
  const attribute = props.attribute;

  const handleSubmit = (e) => {
    e.preventDefault();
    setCharacter(() => {
      character[attribute] = data;
      const newCharacter = JSON.parse(JSON.stringify(character));
      console.log(newCharacter);
      return newCharacter;
    });
    setIsForm(false);
  };

  const inputDisplay = () => {
    if (isForm)
      return (
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="button bordered padded5px margin5px mleft12px"
              placeholder="Enter Name"
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
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
        <button
          className="bordered padded5px margin5px"
          onClick={() => {
            setIsForm(true);
          }}
        >
          {character[attribute]}
        </button>
      </div>
    );
  };

  return <div className="row mleft5px fullwidth">{inputDisplay()}</div>;
}

export default Input;
