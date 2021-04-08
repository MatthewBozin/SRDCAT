import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Table from "./Table";

const Ranks = (props) => {
  const [index, setIndex] = useState(0);
  const rank = props.ranks[index];

  const checkNumber = (number) => {
    if (number > props.ranks.length - 1) {
      return 0;
    }
    if (number < 0) {
      return props.ranks.length - 1;
    }
    return number;
  };

  const next = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };
  const prev = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  const rankTable = (rank) => {
    if (typeof rank == "object") {
      return (
        <span>
          <span>{rank.base}</span>
          <Table table={rank.entries} />
          <span>{rank.end}</span>
        </span>
      );
    } else {
      return rank;
    }
  };

  const rankButtons = (props) => {
    if (props.ranks.length > 1) {
      return (
        <span>
          <button className="button bordered padded" onClick={prev}>
            <FaChevronLeft className="bpad" />
          </button>
          <button className="button bordered padded" onClick={next}>
            <FaChevronRight className="bpad" />
          </button>
        </span>
      );
    }
  };

  const ifItem = (type) => {
    if (type === "items") {
      return <span className="tag">Amount: </span>;
    } else if (type === "single") {
      return <span className="tag">Feature: </span>;
    } else {
      return <span className="tag">Rank {index + 1}: </span>;
    }
  };

  return (
    <div>
      {rankButtons(props)}
      <span className="bit">
        {ifItem(props.deleteFrom)}
        {rankTable(rank)}
      </span>
    </div>
  );
};

export default Ranks;
