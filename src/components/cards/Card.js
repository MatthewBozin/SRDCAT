import React, { useState, useContext } from "react";
import Name from "../bits/Name";
import Tag from "../bits/Tag";
import Flavor from "../bits/Flavor";
import Description from "../bits/Description";
import Ranks from "../bits/Ranks";
import AddSubtract from "../bits/AddSubtract";
import Table from "../bits/Table";
import Context from "../../data/context";

const Card = (props) => {
  let ifExpanded = false;
  if (props.expanded) {
    ifExpanded = props.expanded;
  }
  const [expanded, setExpanded] = useState(ifExpanded);
  const [context] = useContext(Context);
  let cards;
  if (props.deleteFrom !== "none") {
    cards = require(`../../data/collections/` + props.deleteFrom);
  } else {
    cards = require(`../../data/collections/` + context.collections);
  }

  const expandCollapse = (status) => {
    setExpanded(!status);
  };

  let card = JSON.parse(JSON.stringify(cards[props.card.name]));

  let savedrank = 0;
  if (props.card.savedrank !== undefined) {
    savedrank = props.card.savedrank;
  }

  let savedresult = undefined;
  if (props.card.savedresult !== undefined) {
    savedresult = props.card.savedresult;
  }

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
          <Name
            name={card.name}
            expanded={expanded}
            expandCollapse={expandCollapse}
          />
          {context.persona === "PC" && (
            <span className="rightfloat mtop4px mright8px">
              <AddSubtract
                context={"character"}
                card={props.card}
                form={props.form}
                placement={props.placement}
                deleteFrom={props.deleteFrom}
                category={props.category}
              />
            </span>
          )}
        </div>
        {expanded === false && props.deleteFrom === "none" && (
          <span>
            {card.tags.map((tag, index) => {
              return <Tag tag={tag} form={props.form} key={index} />;
            })}
          </span>
        )}
        {expanded === true && (
          <span>
            <hr></hr>
            {card.tags.map((tag, index) => {
              return <Tag tag={tag} form={props.form} key={index} />;
            })}
            <Flavor flavor={card.flavor} />
            {card.description !== undefined && (
              <Description description={card.description} />
            )}
            {card.table !== undefined && (
              <span>
                <Table
                  table={card.table}
                  savedresult={savedresult}
                  placement={props.placement}
                  category={props.category}
                />
              </span>
            )}
            <hr></hr>
            <div className="padded5px">
              {card.ranks.length < 2 ? (
                <span>
                  <Ranks ranks={card.ranks} deleteFrom="single" />
                </span>
              ) : (
                <span>
                  <Ranks
                    ranks={card.ranks}
                    savedrank={savedrank}
                    deleteFrom={props.deleteFrom}
                    placement={props.placement}
                    category={props.category}
                  />
                </span>
              )}
            </div>
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
