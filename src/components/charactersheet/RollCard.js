import React, { useState } from "react";
import Name from "../bits/Name";
import Description from "../bits/Description";
import Col from "react-bootstrap/Col";
import { ReactComponent as D20} from "../../data/icons/d20.svg";

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
          <D20
            className="iconsvg rightfloat mtop8px"
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
            <Description description={"Target: " + target} />
          </span>
        )}
      </article>
    </Col>
  );
};

export default RollCard;
