import React, { useContext } from "react";
import Navbar from "../components/navigation/Navbar";
import Search from "../components/cards/Search";
import CardList from "../components/cards/CardList";
import Context from "../data/context";
import filter from "../utils/filter.js";
let contextData = require(`../data/orders.json`);

const Collections = () => {
  const [context, setContext] = useContext(Context);

  const ifSearch = () => {
    //let data = require(`../data/collections/` + context.collections);
    if (context.search !== "") {
      let filtered = filter("tags", context.collections, context.search);
      if (filtered.length === 0) {
        filtered = filter("name", context.collections, context.search);
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
