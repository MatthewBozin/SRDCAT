import React, { useState, useContext } from "react";
import Name from "../bits/Name";
import Tag from "../bits/Tag";
import Flavor from "../bits/Flavor";
import Description from "../bits/Description";
import AddSubtract from "../bits/AddSubtract";
import Context from "../../data/context";
import NameValuePair from "../bits/NameValuePair.js";
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
            {card.flavor !== undefined && (
              <div>
                <Flavor flavor={card.flavor} />
              </div>
            )}
            {card.description !== undefined && (
              <div>
                <Description description={card.description} />
              </div>
            )}
            {card.actions !== undefined && (
              <div>
                <hr></hr>
                {card.actions.map((action, index) => {
                  return (
                    <div key={index} >
                      <ModalAction action={action} key={index} />
                    </div>
                  );
                })}
              </div>
            )}
            {card.properties !== undefined && (
              <div>
                <hr></hr>
                {card.properties.map((property, index) => {
                  return (
                    <NameValuePair
                      name={property.name}
                      value={property.description}
                      key={index}
                    />
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
