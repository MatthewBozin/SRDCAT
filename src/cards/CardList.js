import React from "react";
import Card from "./Card";
import ItemCard from "./ItemCard";
import Row from "react-bootstrap/Row";

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
    <section>
      <Row>
        {props.content.map((card, index) => {
          return ifItem(card, index);
        })}
      </Row>
    </section>
  );
};

export default CardList;
