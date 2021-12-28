import React, { useContext } from "react";
import Context from "../data/context.js";
import WorldState from "../data/worldstate.js";
import SlotName from "../components/charactersheet/SlotName";
import SaveModal from "../components/charactersheet/SaveModal";
import ExportModal from "../components/charactersheet/ExportModal";
import CardEnvironment from "../components/cards/CardEnvironment";
import CardScene from "../components/cards/CardScene";
import { Link } from "react-router-dom";

const HeroSheet = () => {
  const [context, setContext] = useContext(Context);
  const [worldState] = useContext(WorldState);

  if (context.scene) {
    //"run scene button in scene modal?"
    //return scene version that populates scene data based on the environment
    //with "save scene" button that saves current scene data like a character sheet
    //with "exit scene" button that sets context.scene to false, thus returning to environment
    //import/export scenes
    //scene structure:
    //has scene description/stats like hero sheet?
    //space to record notes? (build off of name/search input)
    //has collection boxes like hero sheet
  }

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
        <div>Currently at:</div>
        <CardEnvironment
          context={context}
          key={0}
          card={{ name: worldState.environment }}
          form={"minus"}
          placement={0}
          deleteFrom={"environments"}
          category={"environments"}
        />
        <Link
          onClick={() =>
            setContext(() => {
              let newcontext = context;
              newcontext.collections = "environments";
              newcontext.link = "collections";
              let final = JSON.parse(JSON.stringify(newcontext));
              return final;
            })
          }
          className="button bordered"
          to="/"
        >
          Change Environment
        </Link>
      </div>
      <div className="outerbox limitwidth">
        {!worldState.scene && (
          <div>
            You have no scene selected.
            <Link
              onClick={() =>
                setContext(() => {
                  let newcontext = context;
                  newcontext.collections = "scenes";
                  newcontext.link = "collections";
                  let final = JSON.parse(JSON.stringify(newcontext));
                  return final;
                })
              }
              className="button bordered"
              to="/"
            >
              Build Scene
            </Link>
          </div>
        )}
        {worldState.scene && (
          <div className="outerbox limitwidth">
            <div>Current Scene:</div>
            <CardScene
              context={context}
              key={0}
              card={{ name: worldState.scene }}
              form={"minus"}
              placement={0}
              deleteFrom={"environments"}
              category={"environments"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroSheet;
