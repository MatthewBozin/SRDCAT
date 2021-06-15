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
import { ReactComponent as Defend } from "../data/icons/defend.svg";
import { ReactComponent as DefendAlt } from "../data/icons/defendbasealt.svg";
import Character from "../data/character.js";
import architecture from "../data/architecture.json";
import { sackstonesoap, updateState, toggle } from "../data/exports.js";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

const ItemCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [attackModalOpen, setAttackModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [itemNotWorn, setItemNotWorn] = useState(true);
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

  const toggleWear = () => {
    let newchar = character;
    let item = newchar.items[props.placement];
    item.worn = itemNotWorn;
    setCharacter(JSON.parse(JSON.stringify(newchar)));
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
            {props.deleteFrom === "items" &&
              type === "defensive" &&
              itemNotWorn === true && (
                <Defend
                  className="iconsvg"
                  onClick={() => {
                    toggle(setItemNotWorn, itemNotWorn);
                    toggleWear();
                    toaster.notify(name + " worn!", {
                      duration: 2000,
                    });
                  }}
                />
              )}
            {props.deleteFrom === "items" &&
              type === "defensive" &&
              itemNotWorn === false && (
                <DefendAlt
                  className="iconsvg"
                  onClick={() => {
                    toggle(setItemNotWorn, itemNotWorn);
                    toggleWear();
                    toaster.notify(name + " taken off!", {
                      duration: 2000,
                    });
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

export default ItemCard;
