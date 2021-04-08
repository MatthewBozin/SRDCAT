import React, { useContext } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import Context from "../data/context";
import Character from "../data/character";

const PlusMinus = (props) => {
  const [context] = useContext(Context);
  const [character, setCharacter] = useContext(Character);

  const addCard = () => {
    setCharacter(() => {
      character[context.collections].push(props.card);

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
      <button className="bit right button bordered padded2 margin">
        <FaPlus className="bpad" onClick={addCard} />
      </button>
    );
  }
  if (props.form === "minus") {
    return (
      <button className="bit right button bordered padded2 margin">
        <FaMinus
          className="bpad"
          onClick={() => {
            deleteCard();
          }}
        />
      </button>
    );
  }
};

export default PlusMinus;
