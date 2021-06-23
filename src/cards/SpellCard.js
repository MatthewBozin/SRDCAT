import React, { useState, useContext } from "react";
import Character from "../data/character.js";
import SpellCastModal from "./SpellCastModal.js";
import { ReactComponent as Cast } from "../data/icons/magic.svg";
import Name from "./Name";
import Tag from "./Tag";
import Flavor from "./Flavor";
import Description from "./Description";
import Ranks from "./Ranks";
import AddSubtract from "./AddSubtract";
import Table from "./Table";
import NameValuePair from "./NameValuePair";
import modsdata from "../data/collections/modSpells.json";

const SpellCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [castModalOpen, setCastModalOpen] = useState(false);
  const [character, setCharacter] = useContext(Character);

  const expandCollapse = (status) => {
    setExpanded(!status);
  };

  const { name, tags, flavor, description, ranks, table, modifiers } =
    props.card;

  let savedrank = 0;
  if (props.card.savedrank !== undefined) {
    savedrank = props.card.savedrank;
  }

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

  return (
    <div className={noBreakpointsIfHeroSheet()}>
      <div className="outerbox">
        <div className="row">
          <Name
            name={name}
            expanded={expanded}
            expandCollapse={expandCollapse}
          />
          <span className="rightfloat mright12px mtop4px">
            {props.deleteFrom !== "none" && (
              <Cast
                className="iconsvg"
                onClick={() => {
                  setCastModalOpen(true);
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
            <Description description={description} />
            {table !== undefined && (
              <span>
                <Table
                  table={table}
                  savedresult={savedresult}
                  placement={props.placement}
                  category={props.category}
                />
              </span>
            )}
            <hr></hr>
            <div className="padded5px">
              {ranks.length < 2 ? (
                <span>
                  <Ranks ranks={ranks} deleteFrom="single" />
                </span>
              ) : (
                <span>
                  <Ranks
                    ranks={ranks}
                    savedrank={savedrank}
                    deleteFrom={props.deleteFrom}
                    placement={props.placement}
                    category={props.category}
                  />
                </span>
              )}
            </div>
            <hr></hr>
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
          </span>
        )}
      </div>
      {props.deleteFrom === "spells" && (
        <SpellCastModal
          castModalOpen={castModalOpen}
          setCastModalOpen={setCastModalOpen}
          character={character}
          setCharacter={setCharacter}
          name={name}
          description={description}
          ranks={ranks}
          modifiers={modifiers}
        />
      )}
    </div>
  );
};

export default SpellCard;
