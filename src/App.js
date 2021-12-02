import React, { useState } from "react";
import Context from "./data/context.js";
import Character from "./data/character.js";
import Worldstate from "./data/worldstate.js";
import NavMaster from "./navigation/NavMaster";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Collections from "./pages/Collections";
import HeroSheet from "./pages/HeroSheet";
import WorldSheet from "./pages/WorldSheet";
import Error from "./pages/Error";
import architecture from "./data/architecture.json";

function App() {
  const currentChar = architecture.currentChar;
  const currentWorld = architecture.currentWorld;

  const [context, setContext] = useState({
    persona: "PC",
    collections: "items",
    link: "collections",
    search: "",
  });
  const [character, setCharacter] = useState(currentChar);
  if (
    localStorage.getItem("SRDcharacters") === undefined ||
    localStorage.getItem("SRDcharacters") === [] ||
    localStorage.getItem("SRDcharacters") === null
  ) {
    let array = [];
    array.push(currentChar);
    localStorage.setItem("SRDcharacters", JSON.stringify(array));
  }
  const [worldState, setWorldState] = useState(currentWorld);
  if (
    localStorage.getItem("SRDworlds") === undefined ||
    localStorage.getItem("SRDworlds") === [] ||
    localStorage.getItem("SRDworlds") === null
  ) {
    let array = [];
    array.push(currentWorld);
    localStorage.setItem("SRDworlds", JSON.stringify(array));
  }

  const heroOrWorld = () => {
    if (context.persona === "PC") {
      return <HeroSheet />;
    }
    if (context.persona === "TC") {
      return <WorldSheet />;
    }
  };

  return (
    <div>
      <Context.Provider value={[context, setContext]}>
        <Worldstate.Provider value={[worldState, setWorldState]}>
          <Character.Provider value={[character, setCharacter]}>
            <Router>
              <NavMaster />
              <Switch>
                <Route exact path="/">
                  <Collections />
                </Route>
                <Route path="/sheet">{heroOrWorld}</Route>
                <Route path="*">
                  <Error />
                </Route>
              </Switch>
            </Router>
          </Character.Provider>
        </Worldstate.Provider>
      </Context.Provider>
    </div>
  );
}

export default App;
