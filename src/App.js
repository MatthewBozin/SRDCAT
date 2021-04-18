import React, { useState } from "react";
import Context from "./data/context.js";
import Character from "./data/character.js";
import NavMaster from "./navigation/NavMaster";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Collections from "./pages/Collections";
import CharSheet from "./pages/CharSheet";

function App() {
  const [context, setContext] = useState({
    collections: "items",
    link: "collections",
    search: "none",
  });
  const [character, setCharacter] = useState({
    name: "Akres Sarsot",
    STR: 1,
    END: 1,
    AGI: 1,
    CHA: 1,
    AUR: 1,
    THO: 1,
    HA: 10,
    KA: 10,
    BA: 10,
    LIFE: 20,
    MCOST: 3,
    HERODICE: 0,
    XP: 0,
    skills: [],
    abilities: [],
    mutations: [],
    items: [],
    cash: 0,
    materials: ["metal", "fuel"],
  });
  return (
    <div>
      <Context.Provider value={[context, setContext]}>
        <Character.Provider value={[character, setCharacter]}>
          <Router>
            <NavMaster />
            <Route exact path="/">
              <Collections />
            </Route>
            <Route path="/character">
              <CharSheet />
            </Route>
          </Router>
        </Character.Provider>
      </Context.Provider>
    </div>
  );
}

export default App;
