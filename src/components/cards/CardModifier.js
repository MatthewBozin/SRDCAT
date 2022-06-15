import React, { useState } from "react";
import Description from "../bits/Description";
import Tag from "../bits/Tag";
import Name from "../bits/Name";
import { ReactComponent as AddCard} from "../../data/icons/addcard.svg";

const CardModifier = (props) => {
  let ifExpanded = false;
  if (props.expanded) {
    ifExpanded = props.expanded;
  }
  const [expanded, setExpanded] = useState(ifExpanded);

  const expandCollapse = (status) => {
    setExpanded(!status);
  };

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
          <Name name={card.name} expanded={expanded} expandCollapse={expandCollapse} />
          <span className="row rightfloat mright8px mtop4px">
            <AddCard className="iconsvg mright12px" onClick={() => {props.addMod(card)}}/>
          </span>
        </div>
        <span>
          {card.tags.map((tag, index) => {
            return <Tag tag={tag} form={props.form} key={index} />;
          })}
        </span>
        {expanded === true && <span>
          <hr></hr>
          <Description description={card.description}/>
          </span>
        }
      </div>
    </div>
  );
};

export default CardModifier;
