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

  const setPlaceholder = () => {
    if (context.search === "") {
      return "Enter tag or name";
    }
    return context.search;
  };

  return (
    <div className="row name entry fullwidth">
      <form className="fullheight flex fullwidth" onSubmit={handleSubmit}>
        <input
          className="button bordered flexgrow2"
          placeholder={setPlaceholder()}
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <input
          className="button bordered marginleft"
          type="submit"
          value="Search"
        />
        <button
          className="button bordered marginleft marginright"
          onClick={resetSearch}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default Search;
