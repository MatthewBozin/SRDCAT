import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import NameValuePair from "./NameValuePair.js";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import { calcSale, minitest, haggleRoll, toggle } from "../data/exports.js";

function ItemSaleModal(props) {
  const [salePrice, setSalePrice] = useState(0);
  const [failSale, setFailSale] = useState(false);

  const {
    saleModalOpen,
    setSaleModalOpen,
    character,
    setCharacter,
    value,
    displayValue,
    name,
    deleteFrom,
  } = props;

  const haggle = () => {
    let price = calcSale(value);
    let testResult = minitest(character.PRO, character.CHA);
    let multiplier = haggleRoll(testResult, props.deleteFrom);
    setSalePrice(Math.round(price * multiplier));
  };

  const sale = () => {
    if (salePrice === 0) {
      setSalePrice(calcSale(value));
    }
    if (salePrice > character.CASH && props.deleteFrom === "none") {
      setFailSale(true);
      return;
    }

    let newCharacter = JSON.parse(JSON.stringify(character));
    if (props.deleteFrom === "none") {
      newCharacter.CASH -= salePrice;
      newCharacter["items"].push(props.card);
      toaster.notify(
        `Item bought: ${name}! Cost: ${salePrice}, Current Cash: ${newCharacter.CASH}`,
        {
          duration: 3000,
        }
      );
    }
    if (props.deleteFrom === "items") {
      newCharacter.CASH += salePrice;
      newCharacter[props.deleteFrom].splice(props.placement, 1);
      toaster.notify(
        `Item sold: ${name}! Cost: ${salePrice}, Current Cash: ${newCharacter.CASH}`,
        {
          duration: 3000,
        }
      );
    }
    setSalePrice(0);
    toggle(setSaleModalOpen, saleModalOpen);
    setCharacter(newCharacter);
  };

  return (
    <Modal
      show={saleModalOpen}
      onHide={() => {
        toggle(setSaleModalOpen, saleModalOpen);
      }}
    >
      <Modal.Header className="modalbackground">
        <span className="fullwidth">
          {deleteFrom === "none" && <span>Buy: {name}</span>}
          {deleteFrom === "items" && <span>Sell: {name}</span>}
          <span className="rightfloat">Current Cash: {character.CASH}</span>
        </span>
      </Modal.Header>
      <Modal.Body className="modalbackground">
        <NameValuePair name={"Item Value"} value={displayValue(value)} />
        {salePrice === 0 && (
          <button
            className="button bordered padded5px margin5px"
            onClick={() => {
              haggle();
            }}
          >
            Haggle
          </button>
        )}
        <button
          className="button bordered padded5px margin5px"
          onClick={() => {
            sale();
          }}
        >
          Confirm Sale
        </button>
        <button
          className="button bordered padded5px margin5px"
          onClick={() => {
            setSalePrice(0);
            setFailSale(false);
            toggle(setSaleModalOpen, saleModalOpen);
          }}
        >
          Never Mind
        </button>
        {salePrice !== 0 && failSale === false && (
          <div>The merchant will offer you a deal of {salePrice} cash.</div>
        )}
        {salePrice !== 0 && failSale === true && (
          <div>You do not have enough cash!</div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ItemSaleModal;
