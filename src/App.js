import React, { useState } from "react";
import Context from "./data/context.js";
import Character from "./data/character.js";
import NavMaster from "./navigation/NavMaster";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Collections from "./pages/Collections";
import CharSheet from "./pages/CharSheet";
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
  if (localStorage.getItem("SRDcharacters") === undefined) {
    localStorage.setItem("SRDcharacters", []);
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
              <Route path="/character">
                <CharSheet />
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
