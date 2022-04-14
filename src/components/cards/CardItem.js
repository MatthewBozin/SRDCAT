import React, { useState, useContext } from "react";
import Name from "../bits/Name";
import Tag from "../bits/Tag";
import Flavor from "../bits/Flavor";
import AddSubtract from "../bits/AddSubtract";
import NameValuePair from "../bits/NameValuePair.js";
import ModalItemAttack from "./ModalItemAttack.js";
import ModalItemSale from "./ModalItemSale.js";
import { FaDollarSign } from "react-icons/fa";
import { ReactComponent as Attack } from "../../data/icons/attack.svg";
import { ReactComponent as Defend } from "../../data/icons/defend.svg";
import { ReactComponent as DefendAlt } from "../../data/icons/defendbasealt.svg";
import Context from "../../data/context.js";
import Character from "../../data/character.js";
import architecture from "../../data/architecture.json";
import { sackstonesoap, updateState, toggle } from "../../utils/exports.js";
import toaster from "toasted-notes";

const CardItem = (props) => {
  let ifExpanded = false;
  if (props.expanded) {
    ifExpanded = props.expanded;
  }
  const [expanded, setExpanded] = useState(ifExpanded);
  let cards = require(`../../data/collections/items`);

  const [attackModalOpen, setAttackModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [itemNotWorn, setItemNotWorn] = useState(true);
  const [context] = useContext(Context);
  const [character, setCharacter] = useContext(Character);
  const [attack, setAttack] = useState({ pro: "", mod: [], adv: "" });
  //mod becomes mods: []

  let card = JSON.parse(JSON.stringify(cards[props.card.name]));

  if (props.context === "character") {
    let baseItem = character.items[props.placement];
    for (let mod of baseItem.mods) {
      card.properties.push(mod);
    }
  }

  const calcAttackInfo = () => {
    let modifiers = [];
    for (let eachstat of card.stat) {
      let substat = architecture.defenses[eachstat];
      let substats = [];
      for (let subattribute of substat.substats) {
        substats.push(character[subattribute]);
      }
      modifiers.push(Math.max(...substats));
    }
    //alter the math to return a modifier for each stat
    updateState(attack, setAttack, "mod", modifiers);
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
            name={card.name}
            expanded={expanded}
            expandCollapse={() => {
              toggle(setExpanded, expanded);
            }}
          />
          <span className="row rightfloat mright12px mtop4px">
            {context.link !== "collections" &&
              props.deleteFrom === "items" &&
              card.tags.includes("offensive") && (
                <Attack
                  className="iconsvg"
                  onClick={() => {
                    setAttackModalOpen(true);
                    setSaleModalOpen(false);
                    calcAttackInfo();
                  }}
                />
              )}
            {context.link !== "collections" &&
              props.deleteFrom === "items" &&
              card.tags.includes("defensive") &&
              itemNotWorn === true && (
                <Defend
                  className="iconsvg"
                  onClick={() => {
                    toggle(setItemNotWorn, itemNotWorn);
                    toggleWear();
                    toaster.notify(
                      () => (
                        <div className="outerbox modalbackground">
                          {card.name + " worn!"}
                        </div>
                      ),
                      {
                        duration: 1000,
                      }
                    );
                  }}
                />
              )}
            {context.link !== "collections" &&
              props.deleteFrom === "items" &&
              card.tags.includes("defensive") &&
              itemNotWorn === false && (
                <DefendAlt
                  className="iconsvg"
                  onClick={() => {
                    toggle(setItemNotWorn, itemNotWorn);
                    toggleWear();
                    toaster.notify(
                      () => (
                        <div className="outerbox modalbackground">
                          {card.name + " taken off!"}
                        </div>
                      ),
                      {
                        duration: 1000,
                      }
                    );
                  }}
                />
              )}
            {context.persona === "PC" && capitalism(props.deleteFrom) && (
              <FaDollarSign
                className="icon mright12px mtop10px"
                onClick={() => {
                  setSaleModalOpen(true);
                  setAttackModalOpen(false);
                }}
              />
            )}
            {props.context !== "worldstate" && (
              <AddSubtract
                context={"character"}
                card={props.card}
                form={props.form}
                placement={props.placement}
                deleteFrom={props.deleteFrom}
                category={props.category}
              />
            )}

            {props.context !== "character" && (
              <AddSubtract
                context={"worldstate"}
                card={props.card}
                form={props.form}
                placement={props.placement}
                deleteFrom={props.deleteFrom}
                category={props.category}
              />
            )}
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
            <Flavor flavor={card.flavor} />
            <hr></hr>
            <NameValuePair
              name={"Weight"}
              value={sackstonesoap(card.weight, "item")}
            />
            <NameValuePair name={"Value"} value={card.value} />
            {card.stat &&
            <div>
              <span className="padded5px">
                {card.tags.includes("defensive") && (
                  <span className="orangetext">Defense: </span>
                )}
                {card.tags.includes("offensive") && (
                  <span className="orangetext">Damage: </span>
                )}
                {card.stat && card.stat.map((eachstat, index) => {
                  return (
                    <span key={index}>
                      {index < card.stat.length &&
                        index !== 0 &&
                        card.tags.includes("defensive") && <span> and </span>}
                      {index < card.stat.length &&
                        index !== 0 &&
                        card.tags.includes("offensive") && <span> or </span>}
                      {card.number[index]} <i>{architecture.statMasks[eachstat]}</i>
                    </span>
                  );
                })}
              </span>
            </div>
            }
            
            <hr></hr>
            <div className="margin5x">
              {card.properties.map((property, index) => {
                return (
                  <div key={index}>
                    <NameValuePair
                      name={property.name}
                      value={property.description}
                    />
                  </div>
                );
              })}
            </div>
          </span>
        )}
      </article>
      {props.deleteFrom === "items" && card.stat && (
        <ModalItemAttack
          attack={attack}
          setAttack={setAttack}
          attackModalOpen={attackModalOpen}
          setAttackModalOpen={setAttackModalOpen}
          character={character}
          name={card.name}
          number={card.number}
          stat={card.stat}
        />
      )}
      <ModalItemSale
        saleModalOpen={saleModalOpen}
        setSaleModalOpen={setSaleModalOpen}
        character={character}
        setCharacter={setCharacter}
        placement={props.placement}
        name={card.name}
        value={card.value}
        card={props.card}
        deleteFrom={props.deleteFrom}
      />
    </div>
  );
};

export default CardItem;
