import React, { useContext } from "react";
import CardList from "../cards/CardList";
import Context from "../data/context.js";
import Character from "../data/character.js";
import StatSheet from "../charactersheet/StatSheet";
import CharName from "../charactersheet/CharName";
import SaveCharModal from "../charactersheet/SaveCharModal";
import ExportCharModal from "../charactersheet/ExportCharModal";
import RandomCharModal from "../charactersheet/RandomCharModal";
import { Link } from "react-router-dom";

const CharSheet = () => {
  const [context, setContext] = useContext(Context);
  const [character, setCharacter] = useContext(Character);

  const categoryArray = [
    { name: "Skills", value: "skills" },
    { name: "Traits", value: "traits" },
    { name: "Mutations", value: "mutations" },
  ];

  const invcalc = (encumbrance, placement, placement2) => {
    return encumbrance.toString().slice(placement, placement2);
  };

  const getEncumbrance = () => {
    let encumbrance = 0;
    for (let element of character.items) {
      encumbrance += element.weight;
    }
    let soaps = invcalc(encumbrance, -1);
    let stones = invcalc(encumbrance, -2, -1);
    let sacks = invcalc(encumbrance, -3, -2);
    let array = [
      { amount: sacks, name: "Sacks" },
      { amount: stones, name: ", Stones" },
      { amount: soaps, name: ", Soaps" },
    ];
    let sackstonesoap = "";
    for (let element of array) {
      console.log(element.amount);
      if (element.amount !== 0 && element.amount !== "") {
        sackstonesoap += element.name + ": " + element.amount + " ";
      } else {
        sackstonesoap += element.name + ": 0";
      }
    }
    return <span>{sackstonesoap}</span>;
  };

  return (
    <div>
      <h4 className="outerbox">
        <div className="row entry fullwidth">
          <span className="row entry">Hero Sheet</span>
          <span className="row right">
            <SaveCharModal />
            <ExportCharModal />
            <RandomCharModal />
          </span>
        </div>
      </h4>
      <div className="outerbox">
        <CharName />
        <StatSheet />
      </div>
      <div className="outerbox">
        <div className="row entry fullwidth">
          <span>
            <Link
              onClick={() =>
                setContext(() => {
                  let newcontext = context;
                  newcontext.collections = "items";
                  return newcontext;
                })
              }
              className="row entry button"
              to="/"
            >
              Inventory
            </Link>
          </span>
        </div>
        <div className="outerbox">
          <span className="entry tag">Encumbrance: </span>
          <span className="entry">{getEncumbrance()}</span>
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
            <div className="row entry fullwidth">
              <span>
                <Link
                  onClick={() =>
                    setContext(() => {
                      let newcontext = context;
                      newcontext.collections = category.value;
                      return newcontext;
                    })
                  }
                  className="row entry button"
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
  );
};

export default CharSheet;
