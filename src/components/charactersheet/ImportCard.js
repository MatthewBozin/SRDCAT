import React, { useState, useContext } from "react";
import Name from "../bits/Name";
import Description from "../bits/Description";
import Col from "react-bootstrap/Col";
import { ReactComponent as Upload} from "../../data/icons/upload.svg";
import Character from "../../data/character.js";
import toaster from "toasted-notes";

const ImportCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [character, setCharacter] = useContext(Character);
  const [importData, setImportData] = useState("");

  const expandCollapse = (status) => {
    setExpanded(!status);
  };

  const { name, description } = props;

  const importJson = (string) => {
    try {
      setCharacter(JSON.parse(string));
    } catch (error) {
      toaster.notify(
      () => (
        <div className="outerbox modalbackground">{`There was an error when importing your hero data.`}</div>
      ),
      {
        duration: 1000,
      }
    );
    }
  };

  return (
    <Col>
      <article className="outerbox">
        <div className="row">
          <Name
            name={name}
            expanded={expanded}
            expandCollapse={expandCollapse}
          />
          <Upload
            className="rightfloat iconsvg mright24px mtop12px"
            onClick={() => {
              expandCollapse(expanded);
            }}
          />
        </div>
        {expanded === true && (
          <span>
            <hr></hr>
            <Description description={description} />
            <hr></hr>
            <textarea
              className="textarea"
              name="importChar"
              id="importChar"
              cols="40"
              rows="5"
              onChange={(e) => setImportData(e.target.value)}
            ></textarea>
            <button
              className="button bordered padded5px fullwidth"
              onClick={() => {
                importJson(importData);
              }}
            >
              Import
            </button>
          </span>
        )}
      </article>
    </Col>
  );
};

export default ImportCard;
