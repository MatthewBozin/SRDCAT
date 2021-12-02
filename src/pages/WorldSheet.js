import React, { useContext } from "react";
import CardList from "../cards/CardList";
import Context from "../data/context.js";
import WorldState from "../data/worldstate.js";
import SlotName from "../charactersheet/SlotName";
import SaveModal from "../charactersheet/SaveModal";
import ExportModal from "../charactersheet/ExportModal";
import { Link } from "react-router-dom";

const HeroSheet = () => {
  const [context, setContext] = useContext(Context);
  const [worldState] = useContext(WorldState);

  const categoryArray = [
    { name: "Expeditions", value: "expeditions" },
    { name: "Props", value: "props" },
    { name: "Items", value: "items" },
    { name: "Creatures", value: "creatures" },
  ];

  return (
    <div className="charsheet">
      <div className="outerbox limitwidth">
        <span className="row rightfloat mright12px">
          <SaveModal savepath={"SRDworlds"} context={"worldstate"} />
          <ExportModal context={"worldstate"} />
        </span>
        <SlotName context={"worldstate"} />
      </div>
      <div className="outerbox limitwidth">
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
                context={"worldstate"}
                content={worldState[category.value]}
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
