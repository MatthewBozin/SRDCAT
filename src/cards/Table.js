import React, { useState } from "react";
import { r, rdamage } from "../data/exports.js";
import { FaDiceD20 } from "react-icons/fa";

const Table = (props) => {
  const [index, setIndex] = useState(0);
  const entry = props.table[index];
  const [damage, setDamage] = useState("");

  const roll = () => {
    setIndex((index) => {
      return r(props.table.length);
    });
  };

  const rollDamage = () => {
    setDamage(() => {
      return rdamage(props.table);
    });
  };

  if (typeof props.table == "string") {
    return (
      <span>
        <button
          className="button clearborder"
          onClick={() => {
            rollDamage();
          }}
        >
          <FaDiceD20 className="button scaleup" />
        </button>
        <span className="bit">{damage}</span>
      </span>
    );
  } else {
    return (
      <span>
        <button className="button clearborder" onClick={roll}>
          <FaDiceD20 className="button scaleup" />
        </button>
        <span className="bit">{entry}</span>
      </span>
    );
  }
};

export default Table;
