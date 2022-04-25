import React, { useState, useContext } from "react";
import Name from "../bits/Name";
import Tag from "../bits/Tag";
import Flavor from "../bits/Flavor";
import Description from "../bits/Description";
import AddSubtract from "../bits/AddSubtract";
import Context from "../../data/context";
import Table from "../bits/Table";
import ModalConnection from "./ModalConnection";

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
          {context.link === "collections" && 
            <span className="rightfloat mtop4px mright8px">
              <AddSubtract
                context={"worldstate"}
                card={props.card}
                form={props.form}
                placement={props.placement}
                deleteFrom={props.deleteFrom}
                category={props.category}
              />
            </span>
          }
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
            <hr></hr>
            {card.denizens !== undefined && (
              <div>
                Denizens:{" "}
                <Table
                  table={card.denizens}
                  savedresult={savedresult}
                  placement={props.placement}
                  category={props.category}
                />
              </div>
            )}
            {card.events !== undefined && (
              <div>
                Events:{" "}
                <Table
                  table={card.events}
                  savedresult={savedresult}
                  placement={props.placement}
                  category={props.category}
                />
              </div>
            )}
            {card.gains !== undefined && (
              <div>
                Gains:{" "}
                <Table
                  table={card.gains}
                  savedresult={savedresult}
                  placement={props.placement}
                  category={props.category}
                />
              </div>
            )}
            {card.zones !== undefined && (
              <div>
                Zones:{" "}
                <Table
                  table={card.zones}
                  savedresult={savedresult}
                  placement={props.placement}
                  category={props.category}
                />
              </div>
            )}
            {card.connections !== undefined && (
              <div>
                <hr></hr>
                <ModalConnection connections={card.connections}></ModalConnection>
              </div>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
