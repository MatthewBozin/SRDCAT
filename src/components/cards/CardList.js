import React from "react";
import Card from "./Card";
import CardItem from "./CardItem";
import CardSpell from "./CardSpell";
import CardCreature from "./CardCreature";
import CardEnvironment from "./CardEnvironment";
import CardProp from "./CardProp";
import CardScene from "./CardScene";
import Col from "react-bootstrap/Row";
import context from "react-bootstrap/esm/AccordionContext";

const CardList = (props) => {

  const pageChange = (value) => {
    if (props.context.page + value < 0) return;
    if ((props.context.page + value) * 40 > props.content.length) return;
    let newContext = props.context;
    newContext.page += value;
    props.setContext(JSON.parse(JSON.stringify(newContext)));
  }

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
          context={props.mode}
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
          context={props.mode}
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
          context={props.mode}
          key={placement}
          card={cardObject}
          form={props.form}
          placement={placement}
          deleteFrom={props.deleteFrom}
          category={props.category}
        />
      );
    }
    if (props.category === "environments") {
      return (
        <CardEnvironment
          context={props.mode}
          key={placement}
          card={cardObject}
          form={props.form}
          placement={placement}
          deleteFrom={props.deleteFrom}
          category={props.category}
        />
      );
    }
    if (props.category === "scenes") {
      return (
        <CardScene
          context={props.mode}
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
          context={props.mode}
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
        context={props.mode}
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
      {props.mode === "collections" && <div>
        <button className="button bordered mleft12px" onClick={() => {pageChange(-1)}}>{"<"}</button>
        <span className="button bordered padded2px"> {props.context.page} </span>
        <button className="button bordered" onClick={() => {pageChange(1)}}>{">"}</button>
      </div>}
      
      {props.deleteFrom !== "none" && (
        <div>
          {props.content.map((card, index) => {
            if (props.mode === "character") return ifCard(card, index);
            if (index >= props.context.page * 40 && index < (props.context.page + 1) * 40) {
              return ifCard(card, index);
            }
          })}
        </div>
      )}
      {props.deleteFrom === "none" && (
        <Col>
          {props.content.map((card, index) => {
            if (props.mode === "character") return ifCard(card, index);
            if (index >= props.context.page * 40 && index < (props.context.page + 1) * 40) {
              return ifCard(card, index);
            }
          })}
        </Col>
      )}
      {props.mode === "collections" && <div>
        <button className="button bordered mleft12px" onClick={() => {pageChange(-1)}}>{"<"}</button>
        <span className="button bordered padded2px"> {props.context.page} </span>
        <button className="button bordered" onClick={() => {pageChange(1)}}>{">"}</button>
      </div>}
    </div>
  );
};

export default CardList;
