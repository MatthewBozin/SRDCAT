import React, { useState } from "react";
import Name from "../cards/Name";
import Flavor from "../cards/Flavor";
import Description from "../cards/Description";
import Col from "react-bootstrap/Col";

const ExportCharCard = (props) => {
  const [expanded, setExpanded] = useState(false);

  const expandCollapse = (status) => {
    setExpanded(!status);
  };

  const { name, description, method } = props;

  return (
    <Col xs={12} md={6} lg={6} xl={4}>
      <article className="outerbox">
        <div className="row">
          <Name
            name={name}
            expanded={expanded}
            expandCollapse={expandCollapse}
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

export default ExportCharCard;
