import React, { useState } from "react";
import Name from "../cards/Name";
import Description from "../cards/Description";
import Col from "react-bootstrap/Col";
import { FaDiceD20 } from "react-icons/fa";

const RollCard = (props) => {
  const [expanded, setExpanded] = useState(false);

  const expandCollapse = (status) => {
    setExpanded(!status);
  };

  const { name, description, target, method } = props;

  return (
    <Col>
      <article className="outerbox">
        <div className="row fullwidth">
          <Name
            name={name}
            expanded={expanded}
            expandCollapse={expandCollapse}
          />
          <FaDiceD20
            className="icon rightfloat mtop10px"
            onClick={() => {
              method();
            }}
          ></FaDiceD20>
        </div>
        {expanded === true && (
          <span>
            <hr></hr>
            <Description description={description} />
            <hr></hr>
            <Description description={"Target: " + target} />
          </span>
        )}
      </article>
    </Col>
  );
};

export default RollCard;
