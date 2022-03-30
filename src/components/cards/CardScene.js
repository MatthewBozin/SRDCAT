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
  const { name, tags, description, actions, creatures } = cards[props.card.name];
  const cardprops = cards[props.card.name].props;

  console.log(actions);

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
            name={name}
            expanded={expanded}
            expandCollapse={expandCollapse}
          />
          <span className="rightfloat mtop4px mright12px">
            <AddSubtract
              context={"worldstate"}
              card={props.card}
              form={props.form}
              placement={props.placement}
              deleteFrom={props.deleteFrom}
              category={props.category}
            />
          </span>
        </div>
        {expanded === false && props.deleteFrom === "none" && (
          <span>
            {tags.map((tag, index) => {
              return <Tag tag={tag} form={props.form} key={index} />;
            })}
          </span>
        )}
        {expanded === true && (
          <span>
            <hr></hr>
            {tags.map((tag, index) => {
              return <Tag tag={tag} form={props.form} key={index} />;
            })}
            {description !== undefined && (
              <div>
                <Description description={description} />
              </div>
            )}
            {(creatures.length > 0 || cardprops.length > 0) && <hr></hr>}
            {creatures.length > 0 && (
              <div>Creature types: {creatures.map((creature, index) => {
                return <span key={index}>{creature} </span>
              })}</div>
            )}
            {cardprops.length > 0 && (
              <div>Prop types: {cardprops.map((prop, index) => {
                return <span key={index}>{prop} </span>
              })}</div>
            )}
            {actions !== undefined && actions.length > 0 && (
              <div>
                <hr></hr>
                Actions:
                {actions.map((action, index) => {
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
