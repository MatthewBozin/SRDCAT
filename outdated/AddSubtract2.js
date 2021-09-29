import React, { useContext } from "react";
import { FaRegShareSquare, FaRegTrashAlt } from "react-icons/fa";
import Context from "../src/data/context";
import Character from "../src/data/character";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

const AddSubtract = (props) => {
  const [context] = useContext(Context);
  const [character, setCharacter] = useContext(Character);

  const addCard = () => {
    toaster.notify("Card (" + props.card.name + ") added to character!", {
      duration: 2000,
    });
    let instanced = props.card;
    if (instanced.table !== undefined) {
      instanced.savedresult = 0;
    }
    instanced.savedrank = 0;
    let newchar = character;
    newchar[context.collections].push(instanced);
    if (context.collections !== "items") {
      let jsonArray = newchar[context.collections].map(JSON.stringify);
      let uniqueSet = new Set(jsonArray);
      let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
      newchar[context.collections] = uniqueArray;
    }
    setCharacter(JSON.parse(JSON.stringify(newchar)));
  };

  const deleteCard = () => {
    toaster.notify("Card (" + props.card.name + ") removed from character!", {
      duration: 2000,
    });
    let newchar = character;
    newchar[props.deleteFrom].splice(props.placement, 1);
    setCharacter(JSON.parse(JSON.stringify(newchar)));
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
