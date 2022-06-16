import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import NameValuePair from "../bits/NameValuePair.js";
import CardModifier from "./CardModifier.js";
import { toggle } from "../../utils/exports.js";
let contextData = require(`../../data/orders.json`);
let modifiers = require(`../../data/collections/modifiers.json`);

function ModalItemTinker(props) {
  const [message, setMessage] = useState("");

  const {
    tinkerModalOpen,
    setTinkerModalOpen,
    character,
    setCharacter,
    name,
  } = props;
  
  //add random mod button, costs waaaay less
  
  const filterMods = () => {
    let modsList = [];
    for ( let modname of contextData.modifiers) {
      let mod = modifiers[modname];
      if (!mod.tags.includes("items")) continue;
      if (mod.tags.includes("offensive") && !props.tags.includes("offensive")) continue;
      if (mod.tags.includes("defensive") && !props.tags.includes("defensive")) continue;
      modsList.push(modname);
    }
    return modsList;
  }
  
  let modsList = filterMods();

  const calcCost = () => {
    let mods = character.items[props.placement].mods.length;
    let cost = 100;
    for (let i = 0; i < mods; i++) {
      cost = cost * 2;
    }
    return cost;
  }

  const addMod = (mod) => {
    let cost = calcCost();
    if (character.XP < cost) {
      setMessage(`Not enough XP! Required: ${cost}.`)
      return;
    };
    console.log(character.items[props.placement].mods);
    console.log(mod);
    for (let currentmod of character.items[props.placement].mods) {
      if (currentmod.name === mod.name) {
        setMessage(`Item already has mod: ${mod.name}.`)
        return;
      }
    }
    let newCharacter = character;
    newCharacter.items[props.placement].mods.push(mod);
    newCharacter.XP -= cost;
    setCharacter(JSON.parse(JSON.stringify(newCharacter)));
    setMessage(`Mod added: ${mod.name}!`)
    console.log();
  }

  return (
    <Modal
      show={tinkerModalOpen}
      onHide={() => {
        toggle(setTinkerModalOpen, tinkerModalOpen);
      }}
    >
      <Modal.Header className="modalbackground">
        <span className="fullwidth">
          Promote {name}
          <span className="rightfloat">Current XP: {character.XP}</span>
          <div>{message}</div>
        </span>
      </Modal.Header>
      <Modal.Body className="modalbackground">
        <NameValuePair name={"Add modifier cost"} value={calcCost()+"."} />
        {modsList.length === 0 && <div>There are no compatible mods for this item.</div>}
        {modsList.map((mod, index) => {
          let cardObject;
          if (typeof card === "object") {
            cardObject = mod;
          } else {
            cardObject = { name: mod, savedrank: 0 };
          }
          return (
            <CardModifier
              key={index}
              card={cardObject}
              form={props.form}
              placement={index}
              deleteFrom={"modifiers"}
              category={props.category}
              addMod={addMod}
            />
          );
        })}
      </Modal.Body>
    </Modal>
  );
}

export default ModalItemTinker;
