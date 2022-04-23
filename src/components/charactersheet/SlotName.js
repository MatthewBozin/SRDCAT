import React, { useState, useContext } from "react";
import Character from "../../data/character.js";
import WorldState from "../../data/worldstate.js";
import { ReactComponent as Edit} from "../../data/icons/edit.svg";
import { FaRegCheckSquare } from "react-icons/fa";

function SlotName(props) {
  const [character, setCharacter] = useContext(Character);
  const [worldState, setWorldState] = useContext(WorldState);
  const [isForm, setIsForm] = useState(false);
  const [name, setName] = useState("");

  const gate = () => {
    if (props.context === "character") {
      return character;
    }
    if (props.context === "worldstate") {
      return worldState;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.context === "character") {
      setCharacter(() => {
        gate().name = name;
        const newCharacter = JSON.parse(JSON.stringify(gate()));
        return newCharacter;
      });
    }
    if (props.context === "worldstate") {
      setWorldState(() => {
        gate().name = name;
        const newWorldState = JSON.parse(JSON.stringify(gate()));
        return newWorldState;
      });
    }
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
        <span className="bordered padded5px margin5px">{gate().name}</span>
        <span>
          <Edit
            onClick={() => {
              setIsForm(true);
            }}
            className="iconsvg mleft5px scaleup150"
          />
        </span>
      </div>
    );
  };

  return <div className="mleft5px fullwidth">{nameDisplay()}</div>;
}

export default SlotName;
