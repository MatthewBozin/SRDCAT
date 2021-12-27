import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { toggle } from "../utils/exports.js";
import Card from "./Card";
import CardItem from "./CardItem";
import CardSpell from "./CardSpell";
import CardCreature from "./CardCreature";
import CardEnvironment from "./CardEnvironment";
import CardScene from "./CardEnvironment";
import CardProp from "./CardProp";

function ModalCardDisplay(props) {
  const { entry } = props;
  const [cardModalOpen, setCardModalOpen] = useState(false);

  const { name, category } = entry;

  const card = name;
  const deleteFrom = category;
  const form = "plus";

  const ifCard = (card, placement) => {
    let cardObject;
    if (typeof card === "object") {
      cardObject = card;
    } else {
      cardObject = { name: card, savedrank: 0 };
    }
    if (category === "items") {
      return (
        <CardItem
          key={placement}
          card={cardObject}
          form={form}
          placement={placement}
          deleteFrom={deleteFrom}
          category={category}
          expanded={true}
        />
      );
    }
    if (category === "spells") {
      return (
        <CardSpell
          key={placement}
          card={cardObject}
          form={form}
          placement={placement}
          deleteFrom={deleteFrom}
          category={category}
          expanded={true}
        />
      );
    }
    if (category === "creatures") {
      return (
        <CardCreature
          key={placement}
          card={cardObject}
          form={form}
          placement={placement}
          deleteFrom={deleteFrom}
          category={category}
          expanded={true}
        />
      );
    }
    if (category === "environments") {
      return (
        <CardEnvironment
          key={placement}
          card={cardObject}
          form={form}
          placement={placement}
          deleteFrom={deleteFrom}
          category={category}
          expanded={true}
        />
      );
    }
    if (category === "scenes") {
      return (
        <CardScene
          key={placement}
          card={cardObject}
          form={form}
          placement={placement}
          deleteFrom={deleteFrom}
          category={category}
          expanded={true}
        />
      );
    }
    if (category === "props") {
      return (
        <CardProp
          key={placement}
          card={cardObject}
          form={form}
          placement={placement}
          deleteFrom={deleteFrom}
          category={category}
          expanded={true}
        />
      );
    }
    return (
      <Card
        key={placement}
        card={cardObject}
        form={form}
        placement={placement}
        deleteFrom={deleteFrom}
        category={category}
        expanded={true}
      />
    );
  };

  return (
    <span>
      <span
        className="button"
        onClick={() => {
          setCardModalOpen(true);
        }}
      >
        {entry.display}
      </span>
      <Modal
        show={cardModalOpen}
        onHide={() => {
          toggle(setCardModalOpen, cardModalOpen);
        }}
      >
        <Modal.Body className="modalbackground">{ifCard(card, 0)}</Modal.Body>
      </Modal>
    </span>
  );
}

export default ModalCardDisplay;
