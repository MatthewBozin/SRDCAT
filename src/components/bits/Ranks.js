import React, { useState, useContext } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Table from "./Table";
import Character from "../../data/character.js";
import Context from "../../data/context";

const Ranks = (props) => {
  const ifRank = () => {
    if (props.savedrank !== undefined) {
      return props.savedrank;
    } else {
      return 0;
    }
  };

  const [context, setContext] = useContext(Context);
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
      if (
        props.deleteFrom !== "none" &&
        props.deleteFrom !== "single" &&
        context.link === "herosheet"
      ) {
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
    if (typeof rank == "object" && props.category !== "spells") {
      return (
        <span>
          <span>{rank.base}</span>
          <Table table={rank.entries} />
          <span>{rank.end}</span>
        </span>
      );
    } else if (props.category === "spells") {
      return props.ranks[index].effect;
    } else {
      return rank;
    }
  };

  const rankButtons = (props) => {
    if (props.ranks.length > 1) {
      return (
        <span>
          <button
            className="button bordered padded2px"
            onClick={() => {
              modify(-1);
            }}
          >
            <FaChevronLeft className="pbottom5px" />
          </button>
          <button
            className="button bordered padded2px"
            onClick={() => {
              modify(1);
            }}
          >
            <FaChevronRight className="pbottom5px" />
          </button>
        </span>
      );
    }
  };

  const ifRankType = (type) => {
    if (type === "single") {
      return <span className="orangetext">Feature: </span>;
    } else if (props.category === "spells") {
      return (
        <span className="orangetext">Cost {props.ranks[index].power}: </span>
      );
    } else {
      return <span className="orangetext">Rank {index + 1}: </span>;
    }
  };

  return (
    <div>
      {rankButtons(props)}
      <span className="padded5px">
        {ifRankType(props.deleteFrom)}
        {rankTable(rank)}
      </span>
    </div>
  );
};

export default Ranks;
