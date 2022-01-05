import React, { useState, useContext } from "react";
import Name from "../bits/Name";
import Tag from "../bits/Tag";
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
  const { name, tags, description, properties, actions } =
    cards[props.card.name];

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
            {actions !== undefined && (
              <div>
                <hr></hr>
                {actions.map((action, index) => {
                  return (
                    <div>
                      <ModalAction action={action} key={index} />
                    </div>
                  );
                })}
              </div>
            )}
            {properties !== undefined && (
              <div>
                <hr></hr>
                {properties.map((property, index) => {
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
