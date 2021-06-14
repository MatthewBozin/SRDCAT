import React, { useState } from "react";
import Context from "./data/context.js";
import Character from "./data/character.js";
import NavMaster from "./navigation/NavMaster";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Collections from "./pages/Collections";
import HeroSheet from "./pages/HeroSheet";
import Error from "./pages/Error";
import architecture from "./data/architecture.json";

function App() {
  const currentChar = architecture.currentChar;

  const [context, setContext] = useState({
    collections: "items",
    link: "collections",
    search: "",
  });
  const [character, setCharacter] = useState(currentChar);
  if (
    localStorage.getItem("SRDcharacters") === undefined ||
    localStorage.getItem("SRDcharacters") === []
  ) {
    let array = [];
    array.push(currentChar);
    localStorage.setItem("SRDcharacters", JSON.stringify(array));
  }
  return (
    <div>
      <Context.Provider value={[context, setContext]}>
        <Character.Provider value={[character, setCharacter]}>
          <Router>
            <NavMaster />
            <Switch>
              <Route exact path="/">
                <Collections />
              </Route>
              <Route path="/hero">
                <HeroSheet />
              </Route>
              <Route path="*">
                <Error />
              </Route>
            </Switch>
          </Router>
        </Character.Provider>
      </Context.Provider>
    </div>
  );
}

export default App;
