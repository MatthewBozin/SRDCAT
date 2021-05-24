import React, { useState, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Table from "./Table";
import Character from "../data/character.js";

const Ranks = (props) => {
  const ifRank = () => {
    if (props.savedrank !== undefined) {
      return props.savedrank;
    } else {
      return 0;
    }
  };

  const [character, setCharacter] = useContext(Character);
  const [index, setIndex] = useState(ifRank());
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

  const modify = (mod) => {
    setIndex((index) => {
      let newIndex = index + mod;
      if (props.deleteFrom !== "none" && props.deleteFrom !== "single") {
        setCharacter(() => {
          character[props.category][props.placement].savedrank = newIndex;
          let newCharacter = JSON.parse(JSON.stringify(character));
          return newCharacter;
        });
      }
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
          <button
            className="button bordered padded"
            onClick={() => {
              modify(-1);
            }}
          >
            <FaChevronLeft className="bpad" />
          </button>
          <button
            className="button bordered padded"
            onClick={() => {
              modify(1);
            }}
          >
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
