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
import {
  test,
  multiRoll,
  calcSale,
  minitest,
  haggleRoll,
  sackstonesoap,
} from "../data/exports.js";
import architecture from "../data/architecture.json";

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [attackModalOpen, setAttackModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [character, setCharacter] = useContext(Character);
  const [salePrice, setSalePrice] = useState(0);
  const [failSale, setFailSale] = useState(false);
  const [message, setMessage] = useState(false);
  const [attackInfo, setAttackInfo] = useState(0);
  const [target, setTarget] = useState(10);
  const [pro, setPro] = useState(0);
  const [adv, setAdv] = useState("");
  const [attackResult, setAttackResult] = useState("");

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

  const togglePro = () => {
    if (pro === 0) {
      setPro(character.PRO);
    } else {
      setPro(0);
    }
  };

  const toggleAdv = (input) => {
    if (input === "+") {
      if (adv === "+") {
        setAdv("");
      } else {
        setAdv("+");
      }
    } else if (input === "-") {
      if (adv === "-") {
        setAdv("");
      } else {
        setAdv("-");
      }
    }
  };

  const calcAttackInfo = () => {
    let substat = architecture.defenses[stat];
    let attribute = Math.max(
      character[substat.substats[0]],
      character[substat.substats[1]]
    );
    setAttackInfo(attribute);
  };

  const ifTitle = () => {
    let titleString = "Attack using your " + name;
    let mod = "";
    if (pro !== 0 || adv !== "") {
      titleString += " with ";
    }
    if (pro !== 0) {
      titleString += "Proficiency";
    }
    if (pro !== 0 && adv !== "") {
      titleString += " and ";
    }
    if (adv === "+") {
      titleString += "Advantage";
      mod = "[+]";
    }
    if (adv === "-") {
      titleString += "Disadvantage";
      mod = "[-]";
    }
    return (
      <span className="cardname">
        {titleString} {mod}
      </span>
    );
  };

  const confirmAttack = () => {
    let attack = test(target, adv, pro, attackInfo);
    let damage = multiRoll(number);

    if (
      attack.startsWith("S") ||
      attack.startsWith("B") ||
      attack.startsWith("Critical S")
    ) {
      setAttackResult(
        <div>
          {attack} {damage} <i>{stat}</i> damage dealt!
        </div>
      );
    } else {
      setAttackResult(attack);
    }
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
    let testResult = minitest(character.PRO, character.CHA);
    let multiplier = haggleRoll(testResult, props.deleteFrom);
    setSalePrice(Math.round(price * multiplier));
  };

  const capitalism = (deleteFrom) => {
    if (deleteFrom === "items" || deleteFrom === "none") {
      return true;
    }
  };

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
                  calcAttackInfo();
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
            <NameValuePair
              name={"Weight"}
              value={sackstonesoap(weight, "item")}
            />
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
        <Modal.Header className="modalbackground">{ifTitle()}</Modal.Header>
        <Modal.Body className="modalbackground">
          {pro !== 0 && <div>Attack Bonus: {attackInfo + pro}</div>}
          {pro === 0 && <div>Attack Bonus: {attackInfo}</div>}
          <div>
            Weapon Damage: {number} <i>{stat}</i>
          </div>
          <hr />
          <div className="flex">
            <button
              className="button bordered padded5px margin5px flexgrow"
              onClick={() => {
                togglePro();
              }}
            >
              PRO
            </button>
            <button
              className="button bordered padded5px margin5px flexgrow"
              onClick={() => {
                toggleAdv("+");
              }}
            >
              [+]
            </button>
            <button
              className="button bordered padded5px margin5px flexgrow"
              onClick={() => {
                toggleAdv("-");
              }}
            >
              [-]
            </button>
          </div>
          <hr />
          <div className="center">Target: {target}</div>
          <div className="flex">
            <button
              className="button bordered padded5px margin5px flexgrow"
              onClick={() => {
                setTarget(target - 1);
              }}
            >
              -1
            </button>
            <button
              className="button bordered padded5px margin5px flexgrow"
              onClick={() => {
                setTarget(target + 1);
              }}
            >
              +1
            </button>
          </div>
          <hr />
          <button
            className="button bordered padded5px margin5px fullwidth"
            onClick={() => {
              confirmAttack();
            }}
          >
            Confirm Attack
          </button>
          {attackResult !== "" && <div>{attackResult}</div>}
        </Modal.Body>
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
