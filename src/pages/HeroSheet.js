import React, { useContext } from "react";
import CardList from "../components/cards/CardList";
import Context from "../data/context.js";
import Character from "../data/character.js";
import StatSheet from "../components/charactersheet/StatSheet";
import SlotName from "../components/charactersheet/SlotName";
import SaveModal from "../components/charactersheet/SaveModal";
import ExportModal from "../components/charactersheet/ExportModal";
import RandomCharModal from "../components/charactersheet/RandomCharModal";
import PromotionModal from "../components/charactersheet/PromotionModal";
import Notes from "../components/charactersheet/Notes";
import { sackstonesoap } from "../utils/exports.js";

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
      encumbrance += cards[element.name].weight;
    }
    for (let i = 0; i < character.spells.length; i++) {
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
  <div>
    <div className="outerbox">
      <span className="row rightfloat mright12px">
        <RandomCharModal />
        <SaveModal savepath={"SRDcharacters"} context={"character"} />
        <ExportModal context={"character"} />
        <PromotionModal />
      </span>
      <SlotName context={"character"} />
    </div>
    <div className="charsheet">
      <StatSheet />
      <div className="limitwidth">
        <div className="outerbox">
          <div className="row mleft5px fullwidth">
            <span>
              <div
                onClick={() =>
                  setContext(() => {
                    let newcontext = context;
                    newcontext.collections = "items";
                    newcontext.link = "collections";
                    let final = JSON.parse(JSON.stringify(newcontext));
                    return final;
                  })
                }
                className="row mleft5px button"
                to="/"
              >
                Inventory
              </div>
            </span>
          </div>
          <div className="outerbox fontsize">
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
            mode={"character"}
          />
        </div>
        {categoryArray.map((category, index) => {
          return (
            <div className="outerbox" key={index}>
              <div className="row mleft5px fullwidth">
                <span>
                  <div
                    onClick={() =>
                      setContext(() => {
                        let newcontext = context;
                        newcontext.collections = category.value;
                        newcontext.link = "collections";
                        let final = JSON.parse(JSON.stringify(newcontext));
                        return final;
                      })
                    }
                    className="row mleft5px button"
                    to="/"
                  >
                    {category.name}
                  </div>
                </span>
              </div>
              <CardList
                context={"character"}
                content={character[category.value]}
                form={"minus"}
                deleteFrom={category.value}
                category={category.value}
                key={index}
                mode={"character"}
              />
            </div>
          );
        })}
      </div>
      <div className="outerbox">      
        <Notes />
      </div>
    </div>
  </div>
  );
};

export default HeroSheet;
