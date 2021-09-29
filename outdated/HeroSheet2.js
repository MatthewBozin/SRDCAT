import React, { useContext } from "react";
import CardList from "../src/cards/CardList";
import Context from "../src/data/context.js";
import Character from "../src/data/character.js";
import StatSheet from "../src/charactersheet/StatSheet";
import SlotName from "../src/charactersheet/SlotName";
import SaveModal from "../src/charactersheet/SaveModal";
import ExportModal from "../src/charactersheet/ExportModal";
import RandomCharModal from "../src/charactersheet/RandomCharModal";
import { sackstonesoap } from "../src/data/exports.js";
import { Link } from "react-router-dom";

const HeroSheet = () => {
  const [context, setContext] = useContext(Context);
  const [character] = useContext(Character);

  const categoryArray = [
    { name: "Skills", value: "skills" },
    { name: "Traits", value: "traits" },
    { name: "Spells", value: "spells" },
  ];

  const getEncumbrance = () => {
    let encumbrance = 0;
    for (let element of character.items) {
      encumbrance += element.weight;
    }
    for (let element of character.spells) {
      encumbrance += 10;
    }
    encumbrance += Math.round(character.CASH / 25);
    return encumbrance;
  };

  const weightString = () => {
    let encumbrance = getEncumbrance();
    let weightstring = sackstonesoap(encumbrance, "inventory");
    return <span>{weightstring}</span>;
  };

  return (
    <div className="charsheet">
      <div className="outerbox limitwidth">
        <span className="row rightfloat mright12px">
          <SaveModal />
          <ExportModal />
          <RandomCharModal />
        </span>
        <SlotName />
        <StatSheet />
      </div>
      <div className="outerbox limitwidth">
        <div className="outerbox">
          <div className="row mleft5px fullwidth">
            <span>
              <Link
                onClick={() =>
                  setContext(() => {
                    let newcontext = context;
                    newcontext.collections = "items";
                    return newcontext;
                  })
                }
                className="row mleft5px button"
                to="/"
              >
                Inventory
              </Link>
            </span>
          </div>
          <div className="outerbox">
            {getEncumbrance() > 100 && (
              <span className="mleft5px orangetext">ENCUMBERED!! </span>
            )}
            {getEncumbrance() <= 100 && (
              <span className="mleft5px orangetext">Encumbrance: </span>
            )}
            <span className="mleft5px">{weightString()}</span>
          </div>
          <CardList
            content={character.items}
            form={"minus"}
            deleteFrom={"items"}
            category={"items"}
          />
        </div>
        {categoryArray.map((category, index) => {
          return (
            <div className="outerbox" key={index}>
              <div className="row mleft5px fullwidth">
                <span>
                  <Link
                    onClick={() =>
                      setContext(() => {
                        let newcontext = context;
                        newcontext.collections = category.value;
                        return newcontext;
                      })
                    }
                    className="row mleft5px button"
                    to="/"
                  >
                    {category.name}
                  </Link>
                </span>
              </div>
              <CardList
                content={character[category.value]}
                form={"minus"}
                deleteFrom={category.value}
                category={category.value}
                key={index}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSheet;
