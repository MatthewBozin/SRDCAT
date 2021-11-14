import React from "react";
import Card from "./Card";
import CardItem from "./CardItem";
import CardSpell from "./CardSpell";
import CardCreature from "./CardCreature";
import CardExpedition from "./CardExpedition";
import CardProp from "./CardProp";
import Col from "react-bootstrap/Row";

const CardList = (props) => {
  const ifCard = (card, placement) => {
    let cardObject;
    if (typeof card === "object") {
      cardObject = card;
    } else {
      cardObject = { name: card, savedrank: 0 };
    }
    if (props.category === "items") {
      return (
        <CardItem
          context={props.context}
          key={placement}
          card={cardObject}
          form={props.form}
          placement={placement}
          deleteFrom={props.deleteFrom}
          category={props.category}
        />
      );
    }
    if (props.category === "spells") {
      return (
        <CardSpell
          context={props.context}
          key={placement}
          card={cardObject}
          form={props.form}
          placement={placement}
          deleteFrom={props.deleteFrom}
          category={props.category}
        />
      );
    }
    if (props.category === "creatures") {
      return (
        <CardCreature
          context={props.context}
          key={placement}
          card={cardObject}
          form={props.form}
          placement={placement}
          deleteFrom={props.deleteFrom}
          category={props.category}
        />
      );
    }
    if (props.category === "expeditions") {
      return (
        <CardExpedition
          context={props.context}
          key={placement}
          card={cardObject}
          form={props.form}
          placement={placement}
          deleteFrom={props.deleteFrom}
          category={props.category}
        />
      );
    }
    if (props.category === "props") {
      return (
        <CardProp
          context={props.context}
          key={placement}
          card={cardObject}
          form={props.form}
          placement={placement}
          deleteFrom={props.deleteFrom}
          category={props.category}
        />
      );
    }
    return (
      <Card
        context={props.context}
        key={placement}
        card={cardObject}
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
