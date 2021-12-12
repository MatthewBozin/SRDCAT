import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaFileDownload } from "react-icons/fa";
import Character from "../data/character.js";
import WorldState from "../data/worldstate.js";
import architecture from "../data/architecture.json";
import ExportCard from "./ExportCard.js";
import ImportCard from "./ImportCard.js";
import { sackstonesoap } from "../utils/exports.js";

const ExportModal = (props) => {
  const [character] = useContext(Character);
  const [worldState] = useContext(WorldState);
  const [modalOpen, setModalOpen] = useState(false);
  const [slotexport, setSlotExport] = useState("");

  const modalOpening = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const gate = () => {
    if (props.context === "character") {
      return character;
    }
    if (props.context === "worldstate") {
      return worldState;
    }
  };

  let properties = architecture.properties;

  const exportTxt = () => {
    let txtstring = "";
    for (let property of properties) {
      let slotprop = gate()[property];
      if (typeof slotprop == "object") {
        //if slotprop === "items"
        let cards = require(`../data/collections/` + property);
        let stringprop = "";
        for (let i = 0; i < slotprop.length; i++) {
          let object = slotprop[i];
          let card = cards[object.name];
          let stringcard = "";
          stringcard += "Name: " + card.name + "\n";
          if (card.description !== undefined) {
            stringcard += "Description: " + card.description;
            if (card.table !== undefined) {
              let result = card.table[object.savedresult].toLowerCase();
              stringcard += " " + result + ".";
            }
            stringcard += "\n";
          }
          if (card.ranks !== undefined) {
            for (let i = 0; i < card.ranks.length; i++) {
              let i2 = i + 1;
              if (i <= object.savedrank && typeof card.ranks[i] !== "object") {
                stringcard += "Rank " + i2 + ": " + card.ranks[i] + "\n";
              } else if (property === "spells") {
                stringcard +=
                  "Cost " +
                  card.ranks[i].power +
                  ": " +
                  card.ranks[i].effect +
                  "\n";
              }
              if (i <= card.savedrank - 1) {
                stringcard += "...\n";
              }
            }
          }
          //stringcard += "rank: " + card.ranks[card.savedrank] + "\n";
          //item properties
          if (property === "items") {
            stringcard += "Type: " + card.type + "\n";
            stringcard +=
              "Weight: " + sackstonesoap(card.weight, "none") + "\n";
            //import weight to sackstonesoaps
            stringcard += "Value: " + card.value + "\n";
            if (card.stat !== undefined) {
              let itemprop = "";
              if (card.type === "offensive") {
                itemprop = "Damage: ";
              }
              if (card.type === "defensive") {
                itemprop = "Defense: ";
              }
              stringcard +=
                itemprop +
                card.number +
                " " +
                architecture.statMasks[card.stat] +
                "\n";
            }
          }
          if (property === "creatures") {
            stringcard += `Level ${card.level} / Life ${card.life}\n`;
            let facets = ``;
            for (let facet of card.facets) {
              facets += `${facet}, `;
            }
            stringcard += `${facets}`;
            for (let attack of card.attacks) {
              let attackstring = `${attack.defensename}: ${attack.defenseamount} / ${attack.bonus} ${attack.name} ${attack.damage}\n`;
              stringcard += attackstring;
            }
            for (let prop of card.properties) {
              let propstring = `${prop.name}: ${prop.description}\n`;
              stringcard += propstring;
            }
          }
          console.log(i);
          console.log(slotprop.length);
          stringprop += stringcard;
          if (i + 1 !== slotprop.length) {
            stringprop += "----------------------------------------\n";
          }
        }
        txtstring +=
          "=========================\n" +
          property +
          "\n=========================\n" +
          stringprop;
      } else {
        let txtproperty = slotprop.toString();
        txtstring += property + ": " + txtproperty + "\n";
      }
    }
    setSlotExport(txtstring);
  };

  /*const process = (toProcess) => {
    console.log(toProcess);
    let toProcessString = toProcess.toString();
    if (toProcessString.includes(",")) {
      return '"' + toProcessString + '",';
    } else {
      return toProcessString + ",";
    }
  };*/

  const exportJson = () => {
    setSlotExport(JSON.stringify(gate()));
  };

  const exportCsv = () => {
    /*let csvstring = "";
    for (let property of properties) {
      let charProperty = character[property];
      console.log(charProperty);
      if (typeof charProperty == "object") {
        let csvobject = [];
        for (let part of charProperty) {
          csvobject += process(part) + ",";
        }
        csvstring += process(csvobject);
      } else {
        csvstring += process(charProperty);
      }
    }
    //setSlotExport(csvstring);*/
    setSlotExport("Feature under construction.");
  };

  const ifCharExport = () => {
    if (slotexport !== "") {
      return (
        <div>
          <button
            className="button bordered padded5px fullwidth"
            onClick={() => {
              navigator.clipboard.writeText(slotexport);
              //possible nonfunctionality with older browsers?
            }}
          >
            copy
          </button>
          <button
            className="button bordered padded5px fullwidth"
            onClick={() => {
              setSlotExport("");
            }}
          >
            reset
          </button>
        </div>
      );
    }
  };

  const exportTypes = [
    {
      name: "Export as .txt",
      description: "Great for games over Discord!",
      method: () => {
        exportTxt();
      },
    },
    {
      name: "Export as .json",
      description: "Great for JSON data connectivity between apps!",
      method: () => {
        exportJson();
      },
    },
    {
      name: "Export as .csv",
      description: "This feature is currently under construction.",
      method: () => {
        exportCsv();
      },
    },
  ];

  return (
    <div>
      <FaFileDownload
        className="icon mtop10px"
        onClick={() => {
          modalOpening();
        }}
      />
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header className="modalbackground">
          {gate().name} Export/Import Options
        </Modal.Header>
        <Modal.Body className="modalbackground">
          <ImportCard
            context={props.context}
            name={"Import as .json"}
            description={
              "Copy and paste character JSON data into the textarea."
            }
          />
          <hr />
          {exportTypes.map((type, index) => {
            return (
              <ExportCard
                key={index}
                name={type.name}
                description={type.description}
                method={type.method}
              />
            );
          })}
          <br />
          {ifCharExport()}
          <div className={"textwrap"}>{slotexport}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default ExportModal;
