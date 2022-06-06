import React, { useState, useContext } from "react";
import Name from "../bits/Name";
import Tag from "../bits/Tag";
import AddSubtract from "../bits/AddSubtract";
import NameValuePair from "../bits/NameValuePair.js";
import ModalCreatureAttack from "./ModalCreatureAttack.js";
//import ModalCreatureEdit from "./ModalCreatureEdit.js";
import ModalLifeEdit from "./ModalLifeEdit.js";
import Character from "../../data/character.js";
import architecture from "../../data/architecture.json";
import { toggle } from "../../utils/exports.js";
import "toasted-notes/src/styles.css";
import ModalItemSale from "./ModalItemSale.js";
import { ReactComponent as Dollar} from "../../data/icons/dollar.svg";
import Context from "../../data/context.js";

const CardCreature = (props) => {
  let ifExpanded = false;
  if (props.expanded) {
    ifExpanded = props.expanded;
  }
  const [expanded, setExpanded] = useState(ifExpanded);
  let cards = require(`../../data/collections/creatures`);
  const [attackModalOpen, setAttackModalOpen] = useState(false);
  //const [editModalOpen, setEditModalOpen] = useState(false);
  const [character, setCharacter] = useContext(Character);
  const [context] = useContext(Context);
  const [attackName, setAttackName] = useState("");
  const [attackDamage, setAttackDamage] = useState("");
  const [attackBonus, setAttackBonus] = useState("");
  const [attackStat, setAttackStat] = useState("");
  const [saleModalOpen, setSaleModalOpen] = useState(false);

  //mod becomes mods: []

  let card = JSON.parse(JSON.stringify(cards[props.card.name]));

  if (context.persona === "PC" && context.link === "sheet") {
    let base = character.creatures[props.placement];
    for (let mod of base.mods) {
      card.properties.push(mod);
    }
    let statmods = Object.keys(base.statmods)
    for (let statmod of statmods) {
      if (!card[statmod]) continue;
      if (typeof card[statmod] !== "number") continue;
      card[statmod] += base.statmods[statmod];
    }
  }

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
            name={card.name}
            expanded={expanded}
            expandCollapse={() => {
              toggle(setExpanded, expanded);
            }}
          />
          <span className="row rightfloat mright8px mtop4px">
            {context.persona === "PC" && (props.deleteFrom === "creatures" || props.deleteFrom === "none") && card.value && (
              <span>
              <Dollar
                className="iconsvg"
                onClick={() => {
                  setSaleModalOpen(true);
                  setAttackModalOpen(false);
                }}
              />
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
                mode={"creatures"}
              />
              </span>
            )}
            {!props.display && (
              <AddSubtract
                context={"character"}
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
            <hr></hr>
            {card.facets.map((facet, index) => {
              return (
                <span key={index}>
                  <i>{facet},</i>{" "}
                </span>
              );
            })}
            <div>{card.description}</div>
            <hr />
            <div>
              Level: {card.level} 
              {context.link !== "collections" && !props.display && (
                <span>
                  {" "}|{" "}<ModalLifeEdit placement={props.placement} life={card.life} />
                </span>
              )}
              {(context.link === "collections" || props.display) && <span> | Life: {card.life}</span>}
              {card.value && <span> | Value: {card.value}</span>}
              {card.carry && <span> | Carry: {card.carry} sacks</span>}
            </div>

            <hr />
            <div>
              {card.attacks.map((attack, index) => {
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
      {
        <>
          <ModalCreatureAttack
            attackModalOpen={attackModalOpen}
            setAttackModalOpen={setAttackModalOpen}
            character={character}
            creatureName={card.name}
            attackName={attackName}
            attackBonus={attackBonus}
            attackDamage={attackDamage}
            attackStat={attackStat}
            creatureProperties={card.properties}
          />
          {/* <ModalCreatureEdit
            editModalOpen={editModalOpen}
            setEditModalOpen={setEditModalOpen}
            character={character}
            creatureName={name}
            creatureProperties={properties}
          /> */}
        </>
      }
    </div>
  );
};

export default CardCreature;
