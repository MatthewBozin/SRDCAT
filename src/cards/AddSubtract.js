import React, { useContext } from "react";
import { FaRegShareSquare, FaRegTrashAlt } from "react-icons/fa";
import { ReactComponent as Herosheet } from "../data/icons/herosheet.svg";
import { FaGlobe } from "react-icons/fa";
import Context from "../data/context";
import Character from "../data/character";
import WorldState from "../data/worldstate.js";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

const AddSubtract = (props) => {
  const [context] = useContext(Context);
  const [character, setCharacter] = useContext(Character);
  const [worldState, setWorldState] = useContext(WorldState);
  let cards = require(`../data/collections/` + context.collections);

  const gate = () => {
    if (props.context === "character") {
      return character;
    }
    if (props.context === "worldstate") {
      return worldState;
    }
  };

  const addCard = () => {
    toaster.notify(
      `Card (${cards.data[props.card.name].name}) added to ${props.context}!`,
      {
        duration: 2000,
      }
    );
    let instanced = { name: props.card.name, savedrank: 0 };
    if (cards.data[props.card.name].table !== undefined) {
      instanced.savedresult = 0;
    }
    if (context.collections === "creatures") {
      instanced.lifecurrent = cards.data[props.card.name].life;
    }
    let newslot = gate();
    newslot[context.collections].push(instanced);
    if (context.collections !== "items") {
      let jsonArray = newslot[context.collections].map(JSON.stringify);
      let uniqueSet = new Set(jsonArray);
      let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
      newslot[context.collections] = uniqueArray;
    }
    if (props.context === "character") {
      setCharacter(JSON.parse(JSON.stringify(newslot)));
    }
    if (props.context === "worldstate") {
      setWorldState(JSON.parse(JSON.stringify(newslot)));
    }
  };

  const deleteCard = () => {
    toaster.notify(
      `Card (${cards.data[props.card.name].name}) removed from ${
        props.context
      }!`,
      {
        duration: 2000,
      }
    );
    let newslot = gate();
    newslot[props.deleteFrom].splice(props.placement, 1);
    if (props.context === "character") {
      setCharacter(JSON.parse(JSON.stringify(newslot)));
    }
    if (props.context === "worldstate") {
      setWorldState(JSON.parse(JSON.stringify(newslot)));
    }
  };

  if (props.form === "plus") {
    return (
      <div>
        {props.context === "character" && (
          <Herosheet className="iconsvg mright3px" onClick={addCard} />
        )}
        {props.context === "worldstate" && (
          <FaGlobe className="icon mright12px" onClick={addCard} />
        )}
      </div>
    );
  }
  if (props.form === "minus") {
    return (
      <FaRegTrashAlt
        className="icon mright12px mtop10px"
        onClick={() => {
          deleteCard();
        }}
      />
    );
  }
};

export default AddSubtract;
