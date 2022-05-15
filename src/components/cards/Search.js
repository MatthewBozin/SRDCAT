import React, { useContext, useState } from "react";
import Context from "../../data/context";
import { ReactComponent as SearchIcon} from "../../data/icons/search.svg";
import { s } from "../../utils/exports.js";
import orders from "../../data/orders.json";
import filter from "../../utils/filter.js";

const Search = () => {
  const [context, setContext] = useContext(Context);
  const [data, setData] = useState("Enter tag or name");

  const contextData = require(`../../data/collections/` + context.collections);

  const submitSearch = (e) => {
    e.preventDefault();
    let context2 = context;
    if (context2.search === "") {
      context2.search = data;
    } else {
      context2.search = context2.search + "+" + data;
    }
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

  const randomResult = () => {
    let resultpool;
    let finalresult;

    if (context.search === "") {
      resultpool = orders[context.collections];
    } else {
      resultpool = filter("tags", context.collections, context.search);
      if (resultpool.length === 0) {
        resultpool = filter("name", context.collections, context.search);
      }
      if (resultpool.length === 1) {
        resultpool = orders[context.collections];
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
    let finalresultname = contextData[finalresult].name;
    let context2 = context;
    context2.search = finalresultname;
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
      <div className="fullwidth flex">
        <form onSubmit={submitSearch} className="flex">
          <input
            id="searchbox"
            className="button bordered link flexstart fontsize"
            placeholder={defaultPlaceholder()}
            type="text"
            onChange={(e) => setData(e.target.value)}
          />
          <button
            className="button bordered link flexstart searchbutton"
            type="submit"
            value="Search"
          >
            <SearchIcon className="iconsvg scaledown80" />
          </button>
        </form>
        <button
          className="button bordered link flexstart searchbutton"
          onClick={resetSearch}
        >
          <b>C</b>
        </button>
        <button
          className="button bordered link flexstart searchbutton"
          onClick={randomResult}
        >
          <b>R</b>
        </button>
      </div>
    </div>
  );
};

export default Search;
