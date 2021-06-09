import React, { useState, useContext } from "react";
import Name from "./Name";
import Tag from "./Tag";
import Flavor from "./Flavor";
import AddSubtract from "./AddSubtract";
import NameValuePair from "./NameValuePair.js";
import ItemAttackModal from "./ItemAttackModal.js";
import ItemSaleModal from "./ItemSaleModal.js";
import modsdata from "../data/collections/modifiers.json";
import { FaDollarSign } from "react-icons/fa";
import { ReactComponent as Attack } from "../data/icons/attack.svg";
import Character from "../data/character.js";
import architecture from "../data/architecture.json";
import "toasted-notes/src/styles.css";
import { sackstonesoap, updateState, toggle } from "../data/exports.js";

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [attackModalOpen, setAttackModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [character, setCharacter] = useContext(Character);
  const [attack, setAttack] = useState({ pro: "", mod: 0, adv: "" });

  const { name, type, tags, flavor, weight, value, number, stat, modifiers } =
    props.card;

  const calcAttackInfo = () => {
    let substat = architecture.defenses[stat];
    let attribute = Math.max(
      character[substat.substats[0]],
      character[substat.substats[1]]
    );
    updateState(attack, setAttack, "mod", attribute);
  };

  const displayValue = (value) => {
    let valuesplit = value.split("x");
    let newvalue = valuesplit[0] + " x " + valuesplit[1] + " cash";
    return newvalue;
  };

  const capitalism = (deleteFrom) => {
    if (deleteFrom === "items" || deleteFrom === "none") {
      return true;
    }
  };

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
          <span className="rightfloat mright12px">
            {props.deleteFrom === "items" && type === "offensive" && (
              <Attack
                className="iconsvg"
                onClick={() => {
                  setAttackModalOpen(true);
                  setSaleModalOpen(false);
                  calcAttackInfo();
                }}
              />
            )}
            {capitalism(props.deleteFrom) && (
              <FaDollarSign
                className="icon"
                onClick={() => {
                  setSaleModalOpen(true);
                  setAttackModalOpen(false);
                }}
              />
            )}
            <AddSubtract
              card={props.card}
              form={props.form}
              placement={props.placement}
              deleteFrom={props.deleteFrom}
            />
          </span>
        </div>
        {expanded === false && (
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
            <Flavor flavor={flavor} />
            <hr></hr>
            <NameValuePair
              name={"Weight"}
              value={sackstonesoap(weight, "item")}
            />
            <NameValuePair name={"Value"} value={displayValue(value)} />
            <div>
              <span className="padded5px">
                {type === "defensive" && (
                  <span className="orangetext">Defense: </span>
                )}
                {type === "offensive" && (
                  <span className="orangetext">Damage: </span>
                )}
                <span>
                  {number} <i>{architecture.statMasks[stat]}</i>
                </span>
              </span>
            </div>
            <hr></hr>
            <div className="margin5x">
              {modifiers.map((mod, index) => {
                let modifier = modsdata[mod];
                return (
                  <NameValuePair
                    key={index}
                    name={modifier.name}
                    value={modifier.description}
                  />
                );
              })}
            </div>
          </span>
        )}
      </article>
      <ItemAttackModal
        attack={attack}
        setAttack={setAttack}
        attackModalOpen={attackModalOpen}
        setAttackModalOpen={setAttackModalOpen}
        character={character}
        name={name}
        number={number}
      />
      <ItemSaleModal
        saleModalOpen={saleModalOpen}
        setSaleModalOpen={setSaleModalOpen}
        character={character}
        setCharacter={setCharacter}
        name={name}
        value={value}
        card={props.card}
        displayValue={displayValue}
        deleteFrom={props.deleteFrom}
      />
    </div>
  );
};

export default Card;
