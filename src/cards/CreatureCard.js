import React, { useState, useContext } from "react";
import Name from "./Name";
import Tag from "./Tag";
import AddSubtract from "./AddSubtract";
import NameValuePair from "./NameValuePair.js";
import CreatureAttackModal from "./CreatureAttackModal.js";
import { ReactComponent as Attack } from "../data/icons/attack.svg";
import Character from "../data/character.js";
import modsdata from "../data/collections/modCreatures.json";
import architecture from "../data/architecture.json";
import { updateState, toggle } from "../data/exports.js";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

const CreatureCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [attackModalOpen, setAttackModalOpen] = useState(false);
  const [character, setCharacter] = useContext(Character);
  const [attack, setAttack] = useState({ pro: "", mod: [], adv: "" });
  //mod becomes mods: []

  const { name, level, life, facets, tags, description, attacks, modifiers } =
    props.card;

  console.log(modifiers);

  // const calcAttackInfo = () => {
  //   let modifiers = [];
  //   for (let eachstat of stat) {
  //     let substat = architecture.defenses[eachstat];
  //     let substats = [];
  //     for (let subattribute of substat.substats) {
  //       substats.push(character[subattribute]);
  //     }
  //     modifiers.push(Math.max(...substats));
  //   }
  //   //alter the math to return a modifier for each stat
  //   updateState(attack, setAttack, "mod", modifiers);
  // };

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
          <span className="rightfloat mright12px mtop4px">
            {/* {props.deleteFrom === "items" && tags.includes("offensive") && (
              <Attack
                className="iconsvg"
                onClick={() => {
                  setAttackModalOpen(true);
                  setSaleModalOpen(false);
                  calcAttackInfo();
                }}
              />
            )} */}
            <AddSubtract
              card={props.card}
              form={props.form}
              placement={props.placement}
              deleteFrom={props.deleteFrom}
            />
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
              Level: {level} / Life: {life}
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
                    <span className="button">{attack.attackname}</span>{" "}
                    {attack.damage}
                  </div>
                );
              })}
            </div>
            <hr></hr>
            <div className="margin5x">
              {modifiers.map((mod, index) => {
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
              })}
            </div>
          </span>
        )}
      </article>
      {/* {props.deleteFrom === "items" && (
        <CreatureAttackModal
          attack={attack}
          setAttack={setAttack}
          attackModalOpen={attackModalOpen}
          setAttackModalOpen={setAttackModalOpen}
          character={character}
          name={name}
          number={number}
          stat={stat}
        />
      )} */}
    </div>
  );
};

export default CreatureCard;
