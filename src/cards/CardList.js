import React from "react";
import Card from "./Card";
import ItemCard from "./ItemCard";
import SpellCard from "./SpellCard";
import Col from "react-bootstrap/Row";

const CardList = (props) => {
  const ifCard = (card, placement) => {
    if (props.category === "items") {
      return (
        <ItemCard
          key={placement}
          card={card}
          form={props.form}
          placement={placement}
          deleteFrom={props.deleteFrom}
          category={props.category}
        />
      );
    }
    if (props.category === "spells") {
      return (
        <SpellCard
          key={placement}
          card={card}
          form={props.form}
          placement={placement}
          deleteFrom={props.deleteFrom}
          category={props.category}
        />
      );
    }
    return (
      <Card
        key={placement}
        card={card}
        form={props.form}
        placement={placement}
        deleteFrom={props.deleteFrom}
        category={props.category}
      />
    );
  };

  return (
    <div>
      {props.deleteFrom !== "none" && (
        <div>
          {props.content.map((card, index) => {
            return ifCard(card, index);
          })}
        </div>
      )}
      {props.deleteFrom === "none" && (
        <Col>
          {props.content.map((card, index) => {
            return ifCard(card, index);
          })}
        </Col>
      )}
    </div>
  );
};

export default CardList;
