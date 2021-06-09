import React, { useContext } from "react";
import { FaRegShareSquare, FaRegTrashAlt } from "react-icons/fa";
import Context from "../data/context";
import Character from "../data/character";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

const AddSubtract = (props) => {
  const [context] = useContext(Context);
  const [character, setCharacter] = useContext(Character);

  const addCard = () => {
    toaster.notify("Card (" + props.card.name + ") added to character!", {
      duration: 2000,
    });
    setCharacter(() => {
      let instanced = props.card;
      if (instanced.table !== undefined) {
        instanced.savedresult = 0;
      }
      instanced.savedrank = 0;
      character[context.collections].push(instanced);

      if (context.collections !== "items") {
        let jsonArray = character[context.collections].map(JSON.stringify);
        let uniqueSet = new Set(jsonArray);
        let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
        character[context.collections] = uniqueArray;
      }
      const newCharacter = JSON.parse(JSON.stringify(character));
      return newCharacter;
    });
  };

  const deleteCard = () => {
    toaster.notify("Card (" + props.card.name + ") removed from character!", {
      duration: 2000,
    });
    setCharacter(() => {
      character[props.deleteFrom].splice(props.placement, 1);
      const newCharacter = JSON.parse(JSON.stringify(character));
      return newCharacter;
    });
  };

  if (props.form === "plus") {
    return <FaRegShareSquare className="icon mright12px" onClick={addCard} />;
  }
  if (props.form === "minus") {
    return (
      <FaRegTrashAlt
        className="icon mright12px"
        onClick={() => {
          deleteCard();
        }}
      />
    );
  }
};

export default AddSubtract;
