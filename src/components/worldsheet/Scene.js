import React, { useContext, useState } from "react";
import WorldState from "../../data/worldstate.js";
import CardList from "../cards/CardList.js";
import Modal from "react-bootstrap/Modal";
import orders from "../../data/orders.json";
import { s } from "../../utils/exports.js";

const Scene = (props) => {
  const [worldState, setWorldState] = useContext(WorldState);
  const [modalOpen, setModalOpen] = useState(false);
  const scenes = require(`../../data/collections/scenes`);

  // const categoryArray = [
  //   { name: "Creatures", value: "creatures" },
  //   { name: "Props", value: "props" },
  //   { name: "Creatures", value: "creatures" },
  // ];

  const buildScene = () => {
    //in modal: scenes.map() lists each scene
    //in here:
    //pull random creatures/props/gains from worldState.environment
    //scene will have limiters that narrow down choices
    //sample worldState.environment[category] for objects that match the limiters
    //if none, pull randomly from full library
    //if only 1 or 2, use those and then pull randomly from full library
    //set worldState.scene

    let scene = JSON.parse(JSON.stringify(scenes[worldState.scene]));


    const getFilteredList = (cards, nameList, tag) => {
      let filteredList = [];
      for (let name of nameList) {
        if (cards[name].tags.includes(tag)) {
          filteredList.push(name);
        }
      }
      return filteredList;
    };

    const getSelectionsByCategory = (category, tags, repetitions) => {
      const nameList = orders[category];
      let masterList = [];
      const cards = require(`../../data/collections/` + category);
      for (let tag of tags) {
        let list = getFilteredList(cards, nameList, tag);
        let newMasterList = masterList.concat(list);
        masterList = newMasterList;
      }
      let selections = [];
      for (let i = 0; i < repetitions; i++) {
        let selection = {};
        if (masterList.length === 0 || masterList.length <= i) {
          selection.name = s(nameList);
        } else {
          selection.name = s(masterList);
        }
        if (category === "creatures") {
          selection.lifecurrent = cards[selection.name].life;
        }
        selections.push(selection);
      }
      return selections;
    };

    let categories = ["creatures"];

    let newWorldState = worldState;
    newWorldState.scene = scene;

    for (let category of categories) {
      let selections = getSelectionsByCategory(
        category,
        scene[category],
        2
      );
      newWorldState.scene[category] = selections;
    }
    setWorldState(JSON.parse(JSON.stringify(newWorldState)));
  };

  const unBuildScene = () => {
    let sceneId = worldState.scene.name.toLowerCase().replace(" ");
    let newWorldState = worldState;
    newWorldState.scene = sceneId;
    setWorldState(JSON.parse(JSON.stringify(newWorldState)));
  }

  return (
    <div>
      {worldState.scene.creatures && (
        <div>
          <div>Creatures</div>
          <CardList
            context={"worldState"}
            content={worldState.scene.creatures}
            form={"minus"}
            deleteFrom={"creatures"}
            category={"creatures"}
          />
        </div>
      )}
      {typeof worldState.scene === "string" && 
      <button className="button bordered"
        onClick={() => {
          //setModalOpen(true);
          buildScene();
        }}
      >
        Build Scene
      </button> 
      }
      {typeof worldState.scene !== "string" && 
      <button className="button bordered"
        onClick={() => {
          //setModalOpen(true);
          unBuildScene();
        }}
      >
        Unbuild Scene
      </button> 
      }
      
      <Modal
        show={modalOpen}
        onHide={() => {
          setModalOpen(false);
        }}
      >
        <Modal.Header className="modalbackground">Scene</Modal.Header>
        <Modal.Body className="modalbackground"></Modal.Body>
      </Modal>
    </div>
  );
};

export default Scene;
