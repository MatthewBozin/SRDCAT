import React from "react";
import Description from "../bits/Description";
import Tag from "../bits/Tag";

const CardModifier = (props) => {
  let cards;
  if (props.deleteFrom !== "none") {
    cards = require(`../../data/collections/` + props.deleteFrom);
  }

  let card = JSON.parse(JSON.stringify(cards[props.card.name]));

  const noBreakpointsIfHeroSheet = () => {
    if (props.deleteFrom === "none") {
      return "col-xs-12 col-md-6 col-lg-6 col-xl-4";
    }
    return "fullwidth mright15px";
  };

  return (
    <div className={noBreakpointsIfHeroSheet()}>
      <div className="outerbox">
        <div className="row">
          <div className="orangetext cardname">{card.name}</div>
        </div>
        <span>
          {card.tags.map((tag, index) => {
            return <Tag tag={tag} form={props.form} key={index} />;
          })}
        </span>
        <hr></hr>
        <Description description={card.description} />
      </div>
    </div>
  );
};

export default CardModifier;
