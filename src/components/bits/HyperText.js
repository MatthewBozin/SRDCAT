import React from "react";
import ModalCardDisplay from "../cards/ModalCardDisplay";

const HyperText = (props) => {
  let split = props.text.split(`*`);
  if (split.length === 1) {
    return <span>{split}</span>;
  }
  return (
    <span>
      {split.map((text, index) => {
        if (index % 2 === 0) return <span key={index}>{text}</span>;
        let data = text.split(`.`);
        const cards = require(`../../data/collections/` + data[0]);
        let display = cards[data[1]].name;
        let entry = { display: display, name: data[1], category: data[0] };
        return <ModalCardDisplay entry={entry} key={index} />;
      })}
    </span>
  );
};

export default HyperText;
