import React from "react";
import Card from "./Card";
import Row from "react-bootstrap/Row";

const CardList = (props) => {
  let placement = -1;
  return (
    <section>
      <Row>
        {props.content.map((card) => {
          placement++;
          return (
            <Card
              key={card.name}
              card={card}
              form={props.form}
              placement={placement}
              deleteFrom={props.deleteFrom}
            />
          );
        })}
      </Row>
    </section>
  );
};

export default CardList;
