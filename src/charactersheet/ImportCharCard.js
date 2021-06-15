import React, { useState, useContext } from "react";
import Name from "../cards/Name";
import Description from "../cards/Description";
import Col from "react-bootstrap/Col";
import { FaFileUpload } from "react-icons/fa";
import Character from "../data/character.js";

const ExportCharCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [character, setCharacter] = useContext(Character);
  const [importData, setImportData] = useState("");

  const expandCollapse = (status) => {
    setExpanded(!status);
  };

  const { name, description } = props;

  const importJson = (string) => {
    setCharacter(JSON.parse(string));
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
          <FaFileUpload
            className="rightfloat icon mright24px mtop12px"
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

export default ExportCharCard;
