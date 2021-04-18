import React, { useContext } from "react";
import Navbar from "../navigation/Navbar";
import Search from "../cards/Search";
import CardList from "../cards/CardList";
import Context from "../data/context";
import data from "../data/data.json";

const Collections = () => {
  const [context] = useContext(Context);

  const filterData = () => {
    let contextData = data[context.collections];
    console.log(data);
    console.log(context);
    console.log(context.collections);
    console.log(contextData);
    let newData = [];
    contextData.map((element) => {
      if (element.tags.includes(context.search)) {
        newData.push(element);
      }
    });
    return newData;
  };

  if (context.search !== "none") {
    return (
      <div>
        <Navbar />
        <Search />
        <CardList
          content={filterData()}
          form={"plus"}
          deleteFrom={"none"}
          category={context.collections}
        />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Search />
      <CardList
        content={data[context.collections]}
        form={"plus"}
        deleteFrom={"none"}
        category={context.collections}
      />
    </div>
  );
};

export default Collections;
