import React, { useContext } from "react";
import CardList from "../cards/CardList";
import Context from "../data/context.js";
import Character from "../data/character.js";
import StatSheet from "../charactersheet/StatSheet";
import SlotName from "../charactersheet/SlotName";
import SaveModal from "../charactersheet/SaveModal";
import ExportModal from "../charactersheet/ExportModal";
import RandomCharModal from "../charactersheet/RandomCharModal";
import { sackstonesoap } from "../data/exports.js";
import { Link } from "react-router-dom";

const HeroSheet = () => {
  const [context, setContext] = useContext(Context);
  const [character] = useContext(Character);

  const categoryArray = [
    { name: "Skills", value: "skills" },
    { name: "Traits", value: "traits" },
    { name: "Spells", value: "spells" },
    { name: "Creatures", value: "creatures" },
  ];

  const getEncumbrance = () => {
    let cards = require(`../data/collections/items`);
    let encumbrance = 0;
    for (let element of character.items) {
      encumbrance += cards.data[element.name].weight;
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
          <SaveModal savepath={"SRDcharacters"} context={"character"} />
          <ExportModal context={"character"} />
          <RandomCharModal />
        </span>
        <SlotName context={"character"} />
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
            context={"character"}
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
                context={"character"}
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
