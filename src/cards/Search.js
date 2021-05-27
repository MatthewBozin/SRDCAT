import React, { useContext, useState } from "react";
import Context from "../data/context";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [context, setContext] = useContext(Context);
  const [data, setData] = useState("Enter tag or name");

  const submitSearch = () => {
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
    console.log(context2);
    document.getElementById("searchbox").value = "";
    setData(() => {
      return "Enter tag or name";
    });
    setContext(() => {
      return JSON.parse(JSON.stringify(context2));
    });
  };

  return (
    <div className="row mleft5px fullwidth">
      <div className="flex fullwidth">
        <input
          id="searchbox"
          className="button bordered link flexgrow2"
          placeholder={data}
          type="text"
          onChange={(e) => setData(e.target.value)}
        />
        <button
          className="button bordered link searchbutton"
          onClick={submitSearch}
          value="Search"
        >
          <FaSearch />
        </button>
        <button
          className="button bordered link mright12px searchbutton"
          onClick={resetSearch}
        >
          <b>C</b>
        </button>
      </div>
    </div>
  );
};

export default Search;
