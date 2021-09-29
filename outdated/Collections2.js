import React, { useContext } from "react";
import Navbar from "../src/navigation/Navbar";
import Search from "../src/cards/Search";
import CardList from "../src/cards/CardList";
import Context from "../src/data/context";

const Collections = () => {
  const [context] = useContext(Context);

  const filter = (filterBy) => {
    //filterBy sets which property in the card the filter pays attention to. currently it's set to "tags"
    let contextData = require(`../data/collections/` + context.collections);
    let newData = [];
    contextData.data.map((element) => {
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
      newData.push(element);
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
        />
      );
    }

    return (
      <CardList
        content={data.data}
        form={"plus"}
        deleteFrom={"none"}
        category={context.collections}
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
