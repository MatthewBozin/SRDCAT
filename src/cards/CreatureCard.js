import React, { useState, useContext } from "react";
import Name from "./Name";
import Tag from "./Tag";
import AddSubtract from "./AddSubtract";
import NameValuePair from "./NameValuePair.js";
import CreatureAttackModal from "./CreatureAttackModal.js";
import CreatureEditModal from "./CreatureEditModal.js";
import Character from "../data/character.js";
import modsdata from "../data/collections/modCreatures.json";
import architecture from "../data/architecture.json";
import { updateState, toggle } from "../data/exports.js";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

const CreatureCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  let cards = require(`../data/collections/creatures`);
  const [attackModalOpen, setAttackModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [character, setCharacter] = useContext(Character);
  const [attackName, setAttackName] = useState("");
  const [attackDamage, setAttackDamage] = useState("");
  const [attackBonus, setAttackBonus] = useState("");
  const [attackStat, setAttackStat] = useState("");

  //mod becomes mods: []

  const {
    name,
    level,
    life,
    facets,
    tags,
    description,
    attacks,
    properties,
    modifiers,
  } = cards.data[props.card.name];

  const noBreakpointsIfHeroSheet = () => {
    if (props.deleteFrom === "none") {
      return "col-xs-12 col-md-6 col-lg-6 col-xl-4";
    }
    return "fullwidth mright15px";
  };

  return (
    <div className={noBreakpointsIfHeroSheet()}>
      <article className="outerbox">
        <div className="row">
          <Name
            name={name}
            expanded={expanded}
            expandCollapse={() => {
              toggle(setExpanded, expanded);
            }}
          />
          <span className="row rightfloat mright12px mtop4px">
            {props.context !== "worldstate" && (
              <AddSubtract
                context={"character"}
                card={props.card}
                form={props.form}
                placement={props.placement}
                deleteFrom={props.deleteFrom}
              />
            )}

            {props.context !== "character" && (
              <AddSubtract
                context={"worldstate"}
                card={props.card}
                form={props.form}
                placement={props.placement}
                deleteFrom={props.deleteFrom}
              />
            )}
          </span>
        </div>
        {expanded === false && props.deleteFrom === "none" && (
          <span>
            {tags.map((tag, index) => {
              return <Tag tag={tag} key={index} />;
            })}
          </span>
        )}
        {expanded === true && (
          <span>
            <hr></hr>
            {tags.map((tag, index) => {
              return <Tag tag={tag} key={index} />;
            })}
            <hr></hr>
            {facets.map((facet, index) => {
              return (
                <span key={index}>
                  <i>{facet},</i>{" "}
                </span>
              );
            })}
            <div>{description}</div>
            <hr />
            <div>
              Level: {level} | Life:{" "}
              {props.card.lifecurrent && (
                <span>{props.card.lifecurrent} /</span>
              )}{" "}
              {life}
            </div>
            <hr />
            <div>
              {attacks.map((attack, index) => {
                return (
                  <div key={index}>
                    <span className="orangetext">
                      <i>{architecture.statMasks[attack.defensename]}</i>
                    </span>
                    : {attack.defenseamount} / {attack.bonus}{" "}
                    <span
                      className="button"
                      onClick={() => {
                        setAttackModalOpen(true);
                        setAttackName(attack.attackname);
                        setAttackStat(attack.defensename);
                        setAttackBonus(attack.bonus);
                        setAttackDamage(attack.damage);
                      }}
                    >
                      {attack.attackname}
                    </span>{" "}
                    {attack.damage}
                  </div>
                );
              })}
            </div>
            <hr></hr>
            <div className="margin5x">
              {properties.map((property, index) => {
                return (
                  <div key={index}>
                    <NameValuePair
                      name={property.name}
                      value={property.description}
                    />
                    <hr />
                  </div>
                );
              })}
              {/* {modifiers.map((mod, index) => {
                let modifier = modsdata[mod];
                return (
                  <div key={index}>
                    <NameValuePair
                      name={modifier.name}
                      value={modifier.description}
                    />
                    <hr />
                  </div>
                );
              })} */}
            </div>
          </span>
        )}
      </article>
      {
        <>
          <CreatureAttackModal
            attackModalOpen={attackModalOpen}
            setAttackModalOpen={setAttackModalOpen}
            character={character}
            creatureName={name}
            attackName={attackName}
            attackBonus={attackBonus}
            attackDamage={attackDamage}
            attackStat={attackStat}
            creatureProperties={properties}
          />
          <CreatureEditModal
            editModalOpen={editModalOpen}
            setEditModalOpen={setEditModalOpen}
            character={character}
            creatureName={name}
            creatureProperties={properties}
          />
        </>
      }
    </div>
  );
};

export default CreatureCard;
