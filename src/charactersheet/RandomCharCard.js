import React, { useState } from "react";
import Name from "../cards/Name";
import Flavor from "../cards/Flavor";
import Description from "../cards/Description";
import Col from "react-bootstrap/Col";
import { FaDiceD20 } from "react-icons/fa";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

const RandomCharCard = (props) => {
  const [expanded, setExpanded] = useState(false);

  const expandCollapse = (status) => {
    setExpanded(!status);
  };

  const {
    name,
    flavor,
    description,
    stats,
    buttonname,
    buttonprop,
    buttonfunction,
  } = props;

  return (
    <Col>
      <article className="outerbox">
        <div className="row">
          <Name
            name={name}
            expanded={expanded}
            expandCollapse={expandCollapse}
          />
          <FaDiceD20
            className="rightfloat icon mright24px mtop12px"
            onClick={() => {
              toaster.notify("Random character generated!", {
                duration: 2000,
              });
              buttonfunction(buttonprop);
            }}
          />
        </div>
        {expanded === true && (
          <span>
            <hr></hr>
            <Flavor flavor={flavor} />
            <Description description={description} />
            <hr></hr>
            {stats.map((stat, index) => {
              return (
                <div key={index} className="padded5px">
                  {stat}
                </div>
              );
            })}
            <hr></hr>
            <button
              className="button bordered padded5px fullwidth"
              onClick={() => {
                toaster.notify("Random character generated!", {
                  duration: 2000,
                });
                buttonfunction(buttonprop);
              }}
            >
              {buttonname}
            </button>
          </span>
        )}
      </article>
    </Col>
  );
};

export default RandomCharCard;
