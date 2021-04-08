import React, { useContext } from "react";
import Navbar from "../navigation/Navbar";
import CardList from "../cards/CardList";
import Context from "../data/context";
import data from "../data/data.json";

const Collections = () => {
  const [context] = useContext(Context);
  return (
    <div>
      <Navbar />
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
