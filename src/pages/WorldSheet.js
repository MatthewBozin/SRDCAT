import React, { useContext } from "react";
import Context from "../data/context.js";
import WorldState from "../data/worldstate.js";
import SlotName from "../components/charactersheet/SlotName";
import SaveModal from "../components/charactersheet/SaveModal";
import ExportModal from "../components/charactersheet/ExportModal";
import CardEnvironment from "../components/cards/CardEnvironment";
//import CardScene from "../components/cards/CardScene";
//import Scene from "../components/worldsheet/Scene.js";
import Stats from "../components/charactersheet/Stats";
import CardList from "../components/cards/CardList.js";

const WorldSheet = () => {
  const [context, setContext] = useContext(Context);
  const [worldState, setWorldState] = useContext(WorldState);
  if (worldState.environments.length > 0) {
    let newWorldState = worldState;
    newWorldState.environment =
      worldState.environments[worldState.environments.length - 1].name;
    newWorldState.environments = [];
    setWorldState(JSON.parse(JSON.stringify(newWorldState)));
  }
  if (worldState.scenes.length > 0) {
    let newWorldState = worldState;
    newWorldState.scene = worldState.scenes[worldState.scenes.length - 1].name;
    newWorldState.scenes = [];
    setWorldState(JSON.parse(JSON.stringify(newWorldState)));
  }

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
    <div>
      <div className="outerbox">
        <span className="row rightfloat mright12px">
          <SaveModal savepath={"SRDworlds"} context={"worldstate"} />
          <ExportModal context={"worldstate"} />
        </span>
        <SlotName context={"worldstate"} />
      </div>
      <Stats stats={["supply", "disruption", "knowledge"]} name={"RESOURCES"} />
      <div className="row mleft0px">
        <div className="outerbox limitwidthworld">
          <span>
            <div className="mleft5px button" 
              onClick={() =>
                setContext(() => {
                  let newcontext = context;
                  newcontext.collections = "environments";
                  newcontext.link = "collections";
                  let final = JSON.parse(JSON.stringify(newcontext));
                  return final;
                })
              }>
              ENVIRONMENT
            </div>
          </span>
          <CardEnvironment
            context={context}
            key={0}
            card={{ name: worldState.environment }}
            form={"minus"}
            placement={0}
            deleteFrom={"environments"}
            category={"environments"}
          />
        </div>
        <div className="outerbox limitwidthworld">
          <span>
            <div className="mleft5px button" 
              onClick={() =>
                setContext(() => {
                  let newcontext = context;
                  newcontext.collections = "environments";
                  newcontext.link = "collections";
                  let final = JSON.parse(JSON.stringify(newcontext));
                  return final;
                })
              }>
              ZONE
            </div>
          </span>
          <CardEnvironment
            key={0}
            card={{ name: worldState.zone }}
            form={"minus"}
            placement={0}
            deleteFrom={"zones"}
            category={"zones"}
          />
        </div>
      
        {/* <div className="outerbox limitwidthworld">
          {typeof worldState.scene === "string" && (
            <div>
              <div>Current Scene:</div>
              <CardScene
                context={context}
                key={0}
                card={{ name: worldState.scene }}
                form={"minus"}
                placement={0}
                deleteFrom={"scenes"}
                category={"scenes"}
              />
              <div
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
                Change Scene
              </div>
            </div>
          )}
          {worldState.scene && (
              <Scene />
          )}
        </div> */}
        <div className="outerbox limitwidthworld">
          <div className="row mleft5px fullwidth">
            <span>
              <div className="row mleft5px button">
                ENCOUNTER
              </div>
            </span>
          </div>
          <CardList
            context={"worldstate"}
            content={worldState.creatures}
            form={"minus"}
            deleteFrom={"creatures"}
            category={"creatures"}
            mode={"worldstate"}
          />
          <CardList
            context={"worldstate"}
            content={worldState.props}
            form={"minus"}
            deleteFrom={"props"}
            category={"props"}
            mode={"worldstate"}
          />
        </div>
      </div>
    </div>
  );
};

export default WorldSheet;
