import React, { useState } from "react";
import Name from "./Name";
import NameValuePair from "./NameValuePair";
import Col from "react-bootstrap/Col";
import { ReactComponent as Cast } from "../data/icons/magic.svg";

const ExportCharCard = (props) => {
  const [expanded, setExpanded] = useState(false);

  const expandCollapse = (status) => {
    setExpanded(!status);
  };

  const { name, rank, character } = props;

  let totalCost = rank.power * character.MCOST;

  const cast = (cost) => {
    console.log(
      "You tried to cast " +
        name +
        " at cost " +
        cost +
        " for a total cost of " +
        character.MCOST * cost +
        "!"
    );
  };

  return (
    <Col>
      <article className="outerbox">
        <div className="row">
          <Name
            name={"Life Cost: " + totalCost}
            expanded={expanded}
            expandCollapse={expandCollapse}
          />
          <Cast
            className="rightfloat iconsvg mright24px mtop12px"
            onClick={() => {
              cast(totalCost);
            }}
          />
        </div>
        {expanded === true && (
          <div className="margin5px outerbox">
            <NameValuePair name={"Base Cost"} value={rank.power} />
            <NameValuePair
              name={"Character Magic Cost"}
              value={character.MCOST}
            />
            <NameValuePair name={"Effect"} value={rank.effect} />
          </div>
        )}
      </article>
    </Col>
  );
};

export default ExportCharCard;
