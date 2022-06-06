import React from "react";
import Card from "./Card";
import CardItem from "./CardItem";
import CardSpell from "./CardSpell";
import CardCreature from "./CardCreature";
import CardEnvironment from "./CardEnvironment";
import CardProp from "./CardProp";
import CardScene from "./CardScene";
import Col from "react-bootstrap/Row";
import { ReactComponent as Left} from "../../data/icons/left.svg";
import { ReactComponent as Right} from "../../data/icons/right.svg";

const CardList = (props) => {

  const pageChange = (value) => {
    if (props.context.page + value < 0) return;
    if ((props.context.page + value) * 30 > props.content.length) return;
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
      <div className="centerchild">
        {props.mode === "collections" && 
          <div className="mleft8px">
            {props.context.page > 0 && <button className="button bordered" onClick={() => {pageChange(-1)}}><Left className="iconsvg scaledown80" /></button>}
            <span className="orangetext padded2px pbottom5px outerbox">Page {props.context.page + 1} </span>
            {(props.context.page + 1) * 30 <= props.content.length && <button className="button bordered" onClick={() => {pageChange(1)}}><Right className="iconsvg scaledown80" /></button>}
          </div>
        }
      </div>
      {props.deleteFrom !== "none" && (
        <div>
          {props.content.map((card, index) => {
            if (props.mode === "character" || props.mode === "worldstate") return ifCard(card, index);
            if (index >= props.context.page * 30 && index < (props.context.page + 1) * 30) {
              return ifCard(card, index);
            }
            return null;
          })}
        </div>
      )}
      {props.deleteFrom === "none" && (
        <Col>
          {props.content.map((card, index) => {
            if (props.mode === "character" || props.mode === "worldstate") return ifCard(card, index);
            if (index >= props.context.page * 30 && index < (props.context.page + 1) * 30) {
              return ifCard(card, index);
            }
            return null;
          })}
        </Col>
      )}
      {props.content.length > 5 && 
        <div className="centerchild">
          {props.mode === "collections" && <div className="mleft8px">
          {props.context.page > 0 && <button className="button bordered" onClick={() => {pageChange(-1)}}><Left className="iconsvg scaledown80" /></button>}
          <span className="orangetext padded2px pbottom5px outerbox">Page {props.context.page + 1} </span>
          {(props.context.page + 1) * 30 <= props.content.length && <button className="button bordered" onClick={() => {pageChange(1)}}><Right className="iconsvg scaledown80" /></button>}
        </div>
      }
    </div>
    }
    </div>
  );
};

export default CardList;
