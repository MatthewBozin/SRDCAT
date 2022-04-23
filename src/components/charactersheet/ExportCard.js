import React, { useState } from "react";
import Name from "../bits/Name";
import Description from "../bits/Description";
import Col from "react-bootstrap/Col";
import { ReactComponent as Download} from "../../data/icons/download.svg";

const ExportCard = (props) => {
  const [expanded, setExpanded] = useState(false);

  const expandCollapse = (status) => {
    setExpanded(!status);
  };

  const { name, description, method } = props;

  return (
    <Col>
      <article className="outerbox">
        <div className="row">
          <Name
            name={name}
            expanded={expanded}
            expandCollapse={expandCollapse}
          />
          <Download
            className="rightfloat iconsvg mright24px mtop4px"
            onClick={() => {
              method();
            }}
          />
        </div>
        {expanded === true && (
          <span>
            <hr></hr>
            <Description description={description} />
            <hr></hr>
            <button
              className="button bordered padded5px fullwidth"
              onClick={() => {
                method();
              }}
            >
              Export
            </button>
          </span>
        )}
      </article>
    </Col>
  );
};

export default ExportCard;
