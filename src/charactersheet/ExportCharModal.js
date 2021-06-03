import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaFileDownload } from "react-icons/fa";
import Character from "../data/character.js";
import architecture from "../data/architecture.json";
import ExportCharCard from "./ExportCharCard.js";
import { sackstonesoap } from "../data/exports.js";

const SaveCharModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [character] = useContext(Character);
  const [charexport, setCharExport] = useState("");

  const modalOpening = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  let properties = architecture.properties;

  const exportTxt = () => {
    let txtstring = "";
    for (let property of properties) {
      let charprop = character[property];
      if (typeof charprop == "object") {
        //if charprop === "items"
        let stringprop = "";
        for (let card of charprop) {
          let stringcard = "";
          stringcard += "Name: " + card.name + "\n";
          if (card.description !== undefined) {
            stringcard += "Description: " + card.description;
            if (card.table !== undefined) {
              let result = card.table[card.savedresult].toLowerCase();
              stringcard += " " + result + ".";
            }
            stringcard += "\n";
          }
          if (card.ranks !== undefined) {
            for (let i = 0; i < card.ranks.length; i++) {
              let i2 = i + 1;
              if (i <= card.savedrank) {
                stringcard += "Rank " + i2 + ": " + card.ranks[i] + "\n";
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
          stringprop +=
            stringcard + "----------------------------------------\n";
        }
        txtstring +=
          "=========================\n" +
          property +
          "\n=========================\n" +
          stringprop;
      } else {
        let txtproperty = charprop.toString();
        txtstring += property + ": " + txtproperty + "\n";
      }
    }
    setCharExport(txtstring);
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
    setCharExport(JSON.stringify(character));
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
    //setCharExport(csvstring);*/
    setCharExport("Feature under construction.");
  };

  const ifCharExport = () => {
    if (charexport !== "") {
      return (
        <div>
          <button
            className="button bordered padded5px fullwidth"
            onClick={() => {
              navigator.clipboard.writeText(charexport);
              //possible nonfunctionality with older browsers?
            }}
          >
            copy
          </button>
          <button
            className="button bordered padded5px fullwidth"
            onClick={() => {
              setCharExport("");
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
        className="icon"
        onClick={() => {
          modalOpening();
        }}
      />
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header className="modalbackground">
          {character.name} Export Options
        </Modal.Header>
        <Modal.Body className="modalbackground">
          {exportTypes.map((type, index) => {
            return (
              <ExportCharCard
                key={index}
                name={type.name}
                description={type.description}
                method={type.method}
              />
            );
          })}
          <br />
          {ifCharExport()}
          <div className={"textwrap"}>{charexport}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default SaveCharModal;
