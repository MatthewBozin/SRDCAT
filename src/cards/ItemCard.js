import React, { useState, useContext } from "react";
import Name from "./Name";
import Tag from "./Tag";
import Flavor from "./Flavor";
import AddSubtract from "./AddSubtract";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import NameValuePair from "./NameValuePair.js";
import modsdata from "../data/collections/modifiers.json";
import { FaDiceD20, FaDollarSign } from "react-icons/fa";
import Character from "../data/character.js";
import { calcSale, test, haggleRoll } from "../data/exports.js";

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [attackModalOpen, setAttackModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [character, setCharacter] = useContext(Character);
  const [salePrice, setSalePrice] = useState(0);
  const [failSale, setFailSale] = useState(false);
  const [message, setMessage] = useState(false);

  const toggle = (method, status) => {
    method(!status);
  };

  const { name, type, tags, flavor, weight, value, number, stat, modifiers } =
    props.card;

  const displayValue = (value) => {
    let valuesplit = value.split("x");
    let newvalue = valuesplit[0] + " x " + valuesplit[1] + " cash";
    return newvalue;
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
    }
    if (props.deleteFrom === "items") {
      newCharacter.CASH += salePrice;
      newCharacter[props.deleteFrom].splice(props.placement, 1);
    }

    setCharacter(newCharacter);
  };

  const haggle = () => {
    let price = calcSale(value);
    let testResult = test(character.PRO, character.CHA);
    let multiplier = haggleRoll(testResult, props.deleteFrom);
    setSalePrice(Math.round(price * multiplier));
  };

  const capitalism = (deleteFrom) => {
    if (deleteFrom === "items" || deleteFrom === "none") {
      return true;
    }
  };

  //add item attack modal
  //chooses attack attribute by picking the higher attribute associated with the stat
  //aka hakaba

  return (
    <Col xs={12} md={6} lg={6} xl={4}>
      <article className="outerbox">
        <div className="row">
          <Name
            name={name}
            expanded={expanded}
            expandCollapse={() => {
              toggle(setExpanded, expanded);
            }}
          />
          <span className="rightfloat mright12px">
            {props.deleteFrom === "items" && type === "offensive" && (
              <FaDiceD20
                className="icon"
                onClick={() => {
                  setAttackModalOpen(true);
                  setSaleModalOpen(false);
                }}
              />
            )}
            {capitalism(props.deleteFrom) && (
              <FaDollarSign
                className="icon"
                onClick={() => {
                  setSaleModalOpen(true);
                  setAttackModalOpen(false);
                }}
              />
            )}
            <AddSubtract
              card={props.card}
              form={props.form}
              placement={props.placement}
              deleteFrom={props.deleteFrom}
            />
          </span>
        </div>
        {expanded === false && (
          <span>
            {tags.map((tag, index) => {
              return <Tag tag={tag} key={index} />;
            })}
          </span>
        )}
        {expanded === true && (
          <span>
            <hr></hr>
            {tags.map((tag, index) => {
              return <Tag tag={tag} key={index} />;
            })}
            <Flavor flavor={flavor} />
            <hr></hr>
            <NameValuePair name={"Weight"} value={weight} />
            <NameValuePair name={"Value"} value={displayValue(value)} />
            <div>
              <span className="padded5px">
                {type === "defensive" && (
                  <span className="orangetext">Defense: </span>
                )}
                {type === "offensive" && (
                  <span className="orangetext">Damage: </span>
                )}
                <span>
                  {number} <i>{stat}</i>
                </span>
              </span>
            </div>
            <hr></hr>
            <div className="margin5x">
              {modifiers.map((mod, index) => {
                let modifier = modsdata[mod];
                return (
                  <NameValuePair
                    key={index}
                    name={modifier.name}
                    value={modifier.description}
                  />
                );
              })}
            </div>
          </span>
        )}
      </article>
      <Modal
        show={attackModalOpen}
        onHide={() => {
          toggle(setAttackModalOpen, attackModalOpen);
        }}
      >
        <Modal.Header className="modalbackground">
          Attack with your {name}
        </Modal.Header>
        <Modal.Body className="modalbackground"></Modal.Body>
      </Modal>
      <Modal
        show={saleModalOpen}
        onHide={() => {
          toggle(setSaleModalOpen, saleModalOpen);
        }}
      >
        <Modal.Header className="modalbackground">
          <span className="fullwidth">
            {props.deleteFrom === "none" && <span>Buy: {name}</span>}
            {props.deleteFrom === "items" && <span>Sell: {name}</span>}
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
              toggle(setSaleModalOpen, saleModalOpen);
            }}
          >
            Confirm Sale
          </button>
          <button
            className="button bordered padded5px margin5px"
            onClick={() => {
              setSalePrice(0);
              toggle(setSaleModalOpen, saleModalOpen);
            }}
          >
            Never Mind
          </button>
          {message !== "" && <div>{message}</div>}
          {salePrice !== 0 && failSale === false && (
            <div>The merchant will offer you a deal of {salePrice} cash.</div>
          )}
          {salePrice !== 0 && failSale === true && (
            <div>You do not have enough cash!</div>
          )}
        </Modal.Body>
      </Modal>
    </Col>
  );
};

export default Card;
