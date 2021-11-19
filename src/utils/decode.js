import React, { useContext, useState } from "react";
import Character from "../data/character.js";
import WorldState from "../data/worldstate.js";
import Context from "../data/context";
import orders from "../data/orders.json";

//add toaster notifications

const decode = (code) => {
  const [character, setCharacter] = useContext(Character);
  const [worldState, setWorldState] = useContext(WorldState);
  const [context] = useContext(Context);

  const set = (content, method) => {
    method(JSON.parse(JSON.stringify(content)));
  };

  const mod = (type, stat, amount) => {
    if (type === "char") {
      let newCharacter = character;
      newCharacter[stat] += amount;
      set(newCharacter, setCharacter());
    }
    if (typeof type === "number") {
      let placement = type;
      let newWorldState = worldState;
      newWorldState.creatures[placement][stat] += amount;
      set(newWorldState, setWorldState());
    }
  };

  const damage = (subject) => {
    if (subject[0] === "char") {
      let newCharacter = character;
      newCharacter.life -= subject[1];
      if (newCharacter.life < 0) {
        newCharacter.life = 0;
      }
      set(newCharacter, setCharacter());
    }
    if (typeof subject[0] === "number") {
      let placement = subject[0];
      let newWorldState = worldState;
      newWorldState.creatures[placement].life -= subject[1];
      if (newWorldState.creatures[placement].life < 0) {
        newWorldState.creatures[placement].life = 0;
      }
      set(newWorldState, setWorldState());
    }
  };

  const heal = (subject) => {
    if (subject[0] === "char") {
      let newCharacter = character;
      newCharacter.life += subject[1];
      if (newCharacter.life > newCharacter.maxlife) {
        newCharacter.life = 0;
      }
      set(newCharacter, setCharacter());
    }
    if (typeof subject[0] === "number") {
      let placement = subject[0];
      let newWorldState = worldState;
      newWorldState.creatures[placement].life += subject[1];
      if (newWorldState.creatures[placement].life > 0) {
        newWorldState.creatures[placement].life = 0;
      }
      set(newWorldState, setWorldState());
    }
  };

  const add = (type, category, card) => {
    if (type === "char") {
      if (!character[category]) return;
      if (!orders[category][card]) return;
      let newCharacter = character;
      newCharacter[category].push(card);
      set(newCharacter, setCharacter());
    }
    if (type === "world") {
      if (!worldState[category]) return;
      if (!orders[category][card]) return;
      let newWorldState = worldState;
      newWorldState[category].push(card);
      set(newWorldState, setWorldState());
    }
  };

  let lineArray = code.split(", ");
  for (line of lineArray) {
    if (line.includes(":")) {
      //line is conditional
      //if conditional is untrue, return;
    }

    let wordArray = line.split(" ");
    let action = wordArray.shift();

    switch (action) {
      case "mod":
        mod(wordArray[0], wordArray[1], wordArray[2]);
        break;
      case "xp":
        mod("char", "xp", wordArray[0]);
        break;
      case "cash":
        mod("char", "cash", wordArray[0]);
        break;
      case "damage":
        damage(wordArray);
        break;
      case "heal":
        heal(wordArray);
        break;
      case "add":
        add(wordArray[0], wordArray[1], wordArray[2]);
        break;
      default:
        return;
    }
  }
};

export { decode };
