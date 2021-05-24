import React, { useContext } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Context from "../data/context";
import Character from "../data/character";

const PlusMinus = (props) => {
  const [context] = useContext(Context);
  const [character, setCharacter] = useContext(Character);

  const addCard = () => {
    setCharacter(() => {
      let withranks = props.card;
      withranks.savedrank = 0;
      character[context.collections].push(withranks);
      console.log(character[context.collections]);

      let jsonArray = character[context.collections].map(JSON.stringify);
      let uniqueSet = new Set(jsonArray);
      let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
      character[context.collections] = uniqueArray;
      const newCharacter = JSON.parse(JSON.stringify(character));
      return newCharacter;
    });
  };

  const deleteCard = () => {
    setCharacter(() => {
      character[props.deleteFrom].splice(props.placement, 1);
      const newCharacter = JSON.parse(JSON.stringify(character));
      return newCharacter;
    });
  };

  if (props.form === "plus") {
    return (
      <button className="plusminus bordered" onClick={addCard}>
        <FaPlus className="pbottom5px" />
      </button>
    );
  }
  if (props.form === "minus") {
    return (
      <button
        className="plusminus bordered"
        onClick={() => {
          deleteCard();
        }}
      >
        <FaMinus className="pbottom5px" />
      </button>
    );
  }
};

export default PlusMinus;
