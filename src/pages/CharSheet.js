import React, { useContext } from "react";
import CardList from "../cards/CardList";
import Context from "../data/context.js";
import Character from "../data/character.js";
import StatSheet from "../charactersheet/StatSheet";
import CharName from "../charactersheet/CharName";
import { FaSave, FaFileDownload, FaDiceD20 } from "react-icons/fa";
import { Link } from "react-router-dom";

const CharSheet = () => {
  const [context, setContext] = useContext(Context);
  const [character, setCharacter] = useContext(Character);

  const saveChar = () => {
    localStorage.setItem("SRDcharacter", JSON.stringify(character));
  };
  const loadChar = () => {
    const loadchar = localStorage.getItem("SRDcharacter");
    setCharacter(JSON.parse(loadchar));
  };

  const randomChar = () => {
    console.log("Observing the console log, are we?");
  };

  const categoryArray = [
    { name: "Skills", value: "skills" },
    { name: "Abilities", value: "abilities" },
    { name: "Mutations", value: "mutations" },
  ];

  const getEncumbrance = () => {
    let encumbrance = 0;
    for (let element of character.items) {
      encumbrance += element.weight;
    }
    return <span>{encumbrance}</span>;
  };

  return (
    <div>
      <h4 className="item">
        <div className="row entry fullwidth">
          <span className="row entry">Hero Sheet</span>
          <span className="right">
            <FaSave
              className="button right margin"
              onClick={() => {
                saveChar(character);
              }}
            />
            <FaFileDownload
              className="button right margin"
              onClick={() => {
                loadChar(character);
              }}
            />
            <FaDiceD20
              className="button right margin"
              onClick={() => {
                randomChar(character);
              }}
            />
          </span>
        </div>
      </h4>
      <div className="item">
        <CharName />
        <StatSheet />
      </div>
      <div className="item">
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
        <div className="item">
          <span className="entry tag">Cash: </span>
          <span className="entry">{character.cash}</span>
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
      {categoryArray.map((category) => {
        return (
          <div className="item">
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
            />
          </div>
        );
      })}
    </div>
  );
};

export default CharSheet;
