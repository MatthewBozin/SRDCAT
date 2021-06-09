import React from "react";
import Card from "./Card";
import ItemCard from "./ItemCard";
import Col from "react-bootstrap/Row";

const CardList = (props) => {
  const ifItem = (card, placement) => {
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
            return ifItem(card, index);
          })}
        </div>
      )}
      {props.deleteFrom === "none" && (
        <Col>
          {props.content.map((card, index) => {
            return ifItem(card, index);
          })}
        </Col>
      )}
    </div>
  );
};

export default CardList;
