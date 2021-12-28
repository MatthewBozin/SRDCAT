import React from "react";
import Description from "../bits/Description";
import Tag from "../bits/Tag";

const CardModifier = (props) => {
  let cards;
  if (props.deleteFrom !== "none") {
    cards = require(`../../data/collections/` + props.deleteFrom);
  }

  const { name, description, tags } = cards[props.card.name];

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
          <div className="orangetext cardname">{name}</div>
        </div>
        <span>
          {tags.map((tag, index) => {
            return <Tag tag={tag} key={index} />;
          })}
        </span>
        <hr></hr>
        <Description description={description} />
      </div>
    </div>
  );
};

export default CardModifier;
