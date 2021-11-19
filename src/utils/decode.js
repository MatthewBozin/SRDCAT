import React, { useContext, useState } from "react";
import Character from "../data/character.js";
import WorldState from "../data/worldstate.js";
import Context from "../data/context";

//add toaster notifications

const decode = (code) => {
  const [character, setCharacter] = useContext(Character);
  const [worldState, setWorldState] = useContext(WorldState);
  const [context] = useContext(Context);

  const set = (content, method) => {
    method(JSON.parse(JSON.stringify(content)));
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

  let lineArray = code.split(", ");
  for (line of lineArray) {
    let wordArray = line.split(" ");
    let action = wordArray.shift();

    switch (action) {
      case "damage":
        damage(wordArray);
        break;
      case "heal":
        heal(wordArray);
        break;
      default:
        return;
    }
  }
};

export { decode };
