import React, { useState, useContext } from "react";
import Name from "../bits/Name";
import Tag from "../bits/Tag";
import Description from "../bits/Description";
import AddSubtract from "../bits/AddSubtract";
import Context from "../../data/context";
import ModalAction from "./ModalAction";

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
          {props.form === "plus" &&
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
            {card.description !== undefined && (
              <div>
                <Description description={card.description} />
              </div>
            )}
            {(card.creatures.length > 0 || card.props.length > 0) && <hr></hr>}
            {card.creatures.length > 0 && (
              <div>Creature types: {card.creatures.map((creature, index) => {
                return <span key={index}>{creature} </span>
              })}</div>
            )}
            {card.props.length > 0 && (
              <div>Prop types: {card.props.map((prop, index) => {
                return <span key={index}>{prop} </span>
              })}</div>
            )}
            {card.actions !== undefined && card.actions.length > 0 && (
              <div>
                <hr></hr>
                Actions:
                {card.actions.map((action, index) => {
                  return (
                    <div key={index}>
                      <ModalAction action={action} key={index} />
                    </div>
                  );
                })}
              </div>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
