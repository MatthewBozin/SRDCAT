import React, { useState, useContext } from "react";
import Name from "../bits/Name";
import Tag from "../bits/Tag";
import Flavor from "../bits/Flavor";
import Description from "../bits/Description";
import AddSubtract from "../bits/AddSubtract";
import NameValuePair from "../bits/NameValuePair";
import Context from "../../data/context";
import Table from "../bits/Table";
import ModalConnection from "./ModalConnection";
import WorldState from "../../data/worldstate";

const Card = (props) => {

  const [worldState, setWorldState] = useContext(WorldState);

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
  const loadEncounter = (creatures) => {
    let newWorldState = worldState;
    let cards = require(`../../data/collections/creatures`);
    newWorldState.creatures = [];
    for (let creature of creatures) {
      newWorldState.creatures.push({name: creature, lifecurrent: cards[creature].life, mods: [], statmods: {}})
    }
    setWorldState(JSON.parse(JSON.stringify(newWorldState)));
  }

  const loadZone = (zone) => {
    let newWorldState = worldState;
    newWorldState.zone = zone.name;
    setWorldState(JSON.parse(JSON.stringify(newWorldState)));
  }

  const loadProp = (prop) => {
    let newWorldState = worldState;
    newWorldState.props.push({name: prop.name})
    setWorldState(JSON.parse(JSON.stringify(newWorldState)));
  }

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
            {card.conditions !== undefined && (
              <div>
                {card.conditions.map((condition, index) => {
                  return <NameValuePair name={condition.name} value={condition.description} key={index} />;
                })}
                <hr></hr>
              </div>
            )}
            {/* {card.denizens !== undefined && (
              <div>
                Denizens:{" "}
                <Table
                  table={card.denizens}
                  savedresult={savedresult}
                  placement={props.placement}
                  category={props.category}
                />
              </div>
            )} */}
            {card.events !== undefined && (
              <div>
                Event:{" "}
                <Table
                  table={card.events}
                  savedresult={savedresult}
                  placement={props.placement}
                  category={props.category}
                  disruption={worldState.disruption}
                />
              </div>
            )}
            {card.encounters !== undefined && (
              <div>
                Encounter:{" "}
                <Table
                  table={card.encounters}
                  savedresult={savedresult}
                  placement={props.placement}
                  category={props.category}
                  method={loadEncounter}
                  type={"encounter"}
                />
              </div>
            )}
            {/* {card.gains !== undefined && (
              <div>
                Gains:{" "}
                <Table
                  table={card.gains}
                  savedresult={savedresult}
                  placement={props.placement}
                  category={props.category}
                />
              </div>
            )} */}
            {card.zones !== undefined && (
              <div>
                Zone:{" "}
                <Table
                  table={card.zones}
                  savedresult={savedresult}
                  placement={props.placement}
                  category={props.category}
                  method={loadZone}
                  type={"zone"}
                />
              </div>
            )}
            {card.props !== undefined && (
              <div>
                Discovery:{" "}
                <Table
                  table={card.props}
                  savedresult={savedresult}
                  placement={props.placement}
                  category={props.category}
                  method={loadProp}
                  type={"prop"}
                />
              </div>
            )}
            {card.connections !== undefined && (
              <div>
                <hr></hr>
                <ModalConnection connections={card.connections}></ModalConnection>
              </div>
            )}
            {card.actions !== undefined && (
              <div>
                {card.actions.map((action, index) => {
                  return <NameValuePair name={action.name} value={action.description} key={index} />;
                })}
                <hr></hr>
              </div>
            )}
          </span>
        )}
      </div>
    </div>
  );
};

export default Card;
