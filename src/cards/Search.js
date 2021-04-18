import React, { useContext, useState } from "react";
import Context from "../data/context";

const Search = () => {
  const [context, setContext] = useContext(Context);
  const [data, setData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let context2 = context;
    context2.search = data;
    setContext(() => {
      return JSON.parse(JSON.stringify(context2));
    });
    console.log(context);
  };

  const resetSearch = () => {
    let context2 = context;
    context2.search = "";
    setContext(() => {
      return JSON.parse(JSON.stringify(context2));
    });
  };

  return (
    <h4 className="item">
      <div className="row fullwidth name">
        <form className="fullheight" onSubmit={handleSubmit}>
          <input
            className="button bordered marginleft"
            placeholder={"Enter tag or name"}
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <input
            className="button bordered marginleft"
            type="submit"
            value="Search"
          />
        </form>
        <button className="button bordered marginleft" onClick={resetSearch}>
          Reset
        </button>
      </div>
    </h4>
  );
};

export default Search;
