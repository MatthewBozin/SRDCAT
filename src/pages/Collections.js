import React, { useContext } from "react";
import Navbar from "../navigation/Navbar";
import Search from "../cards/Search";
import CardList from "../cards/CardList";
import Context from "../data/context";
import data from "../data/data.json";

const Collections = () => {
  const [context] = useContext(Context);

  const filter = (filterBy) => {
    let contextData = data[context.collections];
    let newData = [];
    contextData.map((element) => {
      let toFilter;
      if (typeof element[filterBy] === "string") {
        toFilter = element[filterBy].toLowerCase();
      } else {
        toFilter = [];
        element[filterBy].map((item) => {
          toFilter.push(item.toLowerCase());
        });
      }
      if (toFilter.includes(context.search.toLowerCase())) {
        newData.push(element);
      }
    });
    return newData;
  };

  const ifSearch = () => {
    if (context.search !== "") {
      let filtered = filter("tags");
      if (filtered.length === 0) {
        filtered = filter("name");
        console.log(filtered);
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
        content={data[context.collections]}
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
