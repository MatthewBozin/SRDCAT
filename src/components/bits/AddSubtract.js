import React, { useContext } from "react";
import { ReactComponent as AddCard} from "../../data/icons/addcard.svg";
import { ReactComponent as Trash} from "../../data/icons/trash.svg";
import Context from "../../data/context";
import Character from "../../data/character";
import WorldState from "../../data/worldstate.js";
import toaster from "toasted-notes";

const AddSubtract = (props) => {
  const [context] = useContext(Context);
  const [character, setCharacter] = useContext(Character);
  const [worldState, setWorldState] = useContext(WorldState);
  let cards = require(`../../data/collections/` + props.category);
  console.log(props.context);
  console.log(context.persona);

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
      () => (
        <div className="outerbox modalbackground">{`Card (${
          cards[props.card.name].name
        }) added to ${props.context}!`}</div>
      ),
      {
        duration: 1000,
      }
    );
    let instanced = { name: props.card.name, savedrank: 0 };
    if (cards[props.card.name].table !== undefined) {
      instanced.savedresult = 0;
    }
    if (props.category === "creatures") {
      instanced.lifecurrent = cards[props.card.name].life;
    }
    if (props.category === "items" || props.category === "creatures") {
      instanced.mods = [];
      instanced.statmods = {};
    }
    let newslot = gate();
    newslot[props.category].push(instanced);
    if (props.category !== "items" && props.category !== "creatures") {
      let jsonArray = newslot[props.category].map(JSON.stringify);
      let uniqueSet = new Set(jsonArray);
      let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
      newslot[props.category] = uniqueArray;
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
      () => (
        <div className="outerbox modalbackground">{`Card (${
          cards[props.card.name].name
        }) removed from ${props.context}!`}</div>
      ),
      {
        duration: 1000,
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
        {(props.context === "character" || props.context === "collections") && context.persona === "PC" && (
          <AddCard className="iconsvg mright12px" onClick={addCard} />
        )}
        {props.context === "worldstate" && context.persona === "TC" && (
          <AddCard className="iconsvg mright12px" onClick={addCard} />
        )}
      </div>
    );
  }
  if (props.form === "minus" && context.link !== "collections") {
    return (
      <Trash className="iconsvg mright12px" 
        onClick={() => {
          deleteCard();
        }} />
    );
  }
  if (props.form === "minus" && context.link === "collections") {
    return null;
  }
};

export default AddSubtract;
