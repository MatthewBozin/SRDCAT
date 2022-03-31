import React, { useContext } from "react";
import Navbar from "../components/navigation/Navbar";
import Search from "../components/cards/Search";
import CardList from "../components/cards/CardList";
import Context from "../data/context";
let contextData = require(`../data/orders.json`);

const Collections = () => {
  const [context, setContext] = useContext(Context);

  const filter = (filterBy) => {
    //filterBy sets which property in the card the filter pays attention to. currently it's set to "tags"
    let contextObjects = require(`../data/collections/` + context.collections);
    let newData = [];
    contextData[context.collections].map((name) => {
      let element = contextObjects[name];
      let toFilter;
      if (typeof element[filterBy] === "string") {
        toFilter = element[filterBy].toLowerCase();
      } else {
        toFilter = [];
        element[filterBy].map((item) => {
          toFilter.push(item.toLowerCase());
        });
      }
      //toFilter is the case (or cases) to compare to the search terms. ex: ["offensive","chain"]
      let searchSplit = context.search.toLowerCase().split("+");
      for (let searchTerm of searchSplit) {
        if (!toFilter.includes(searchTerm)) {
          return;
        }
      }
      newData.push(name);
    });
    return newData;
  };

  const ifSearch = () => {
    let data = require(`../data/collections/` + context.collections);
    if (context.search !== "") {
      let filtered = filter("tags");
      if (filtered.length === 0) {
        filtered = filter("name");
      }
      if (filtered.length === 0) {
        return (
          <div className="outerbox">Your search didn't return any hits.</div>
        );
      }

      return (
        <CardList
          content={filtered}
          form={"plus"}
          deleteFrom={"none"}
          category={context.collections}
          mode={"collections"}
          context={context}
          setContext={setContext}
        />
      );
    }

    return (
      <CardList
        content={contextData[context.collections]}
        form={"plus"}
        deleteFrom={"none"}
        category={context.collections}
        mode={"collections"}
        context={context}
        setContext={setContext}
      />
    );
  };

  return (
    <div>
      <div className="outerbox">
        <Navbar />
        <Search />
      </div>
      {ifSearch()}
    </div>
  );
};

export default Collections;
