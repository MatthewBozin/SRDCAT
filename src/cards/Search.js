import React, { useContext, useState } from "react";
import Context from "../data/context";
import { FaSearch } from "react-icons/fa";
import { s } from "../data/exports.js";

const Search = () => {
  const [context, setContext] = useContext(Context);
  const [data, setData] = useState("Enter tag or name");

  const contextData = require(`../data/collections/` + context.collections);

  const submitSearch = () => {
    let context2 = context;
    context2.search = data;
    setContext(() => {
      return JSON.parse(JSON.stringify(context2));
    });
  };

  const resetSearch = () => {
    let context2 = context;
    context2.search = "";
    document.getElementById("searchbox").value = "";
    setData(() => {
      return "Enter tag or name";
    });
    setContext(() => {
      return JSON.parse(JSON.stringify(context2));
    });
  };

  const filter = (filterBy) => {
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
      if (toFilter.includes(context.search.toLowerCase())) {
        newData.push(element);
      }
    });
    return newData;
  };

  const randomResult = () => {
    let resultpool;
    let finalresult;

    if (context.search === "") {
      resultpool = contextData.data;
    } else {
      resultpool = filter("tags");
      if (resultpool.length === 0) {
        resultpool = filter("name");
        console.log(resultpool);
      }
      if (resultpool.length === 1) {
        return;
      }
      if (resultpool.length === 0) {
        let context2 = context;
        context2.search = "randomization error";
        setContext(() => {
          return JSON.parse(JSON.stringify(context2));
        });
        return;
      }
    }
    finalresult = s(resultpool);
    let context2 = context;
    context2.search = finalresult.name;
    setContext(() => {
      return JSON.parse(JSON.stringify(context2));
    });
  };

  const defaultPlaceholder = () => {
    if (context.search === "") {
      return "Enter tag or name";
    }
    return context.search;
  };

  return (
    <div className="row mleft5px fullwidth">
      <div className="flex fullwidth">
        <input
          id="searchbox"
          className="button bordered link flexgrow2 pleft5px"
          placeholder={defaultPlaceholder()}
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
          className="button bordered link searchbutton"
          onClick={resetSearch}
        >
          <b>C</b>
        </button>
        <button
          className="button bordered link mright12px searchbutton"
          onClick={randomResult}
        >
          <b>R</b>
        </button>
      </div>
    </div>
  );
};

export default Search;
