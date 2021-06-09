import React, { useState, useContext } from "react";
import Name from "./Name";
import Tag from "./Tag";
import Flavor from "./Flavor";
import AddSubtract from "./AddSubtract";
import Modal from "react-bootstrap/Modal";
import NameValuePair from "./NameValuePair.js";
import modsdata from "../data/collections/modifiers.json";
import { FaDollarSign } from "react-icons/fa";
import { ReactComponent as Attack } from "../data/icons/attack.svg";
import Character from "../data/character.js";
import {
  r,
  test,
  damagecalc,
  calcSale,
  minitest,
  haggleRoll,
  sackstonesoap,
  updateState,
  toggleState,
  toggle,
  withProAdv,
} from "../data/exports.js";
import architecture from "../data/architecture.json";

const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [attackModalOpen, setAttackModalOpen] = useState(false);
  const [saleModalOpen, setSaleModalOpen] = useState(false);
  const [character, setCharacter] = useContext(Character);
  const [salePrice, setSalePrice] = useState(0);
  const [failSale, setFailSale] = useState(false);
  const [target, setTarget] = useState(10);
  const [attackResult, setAttackResult] = useState("");
  const [attackMessage, setAttackMessage] = useState("");

  const [attack, setAttack] = useState({ pro: "", mod: 0, adv: "" });
  const [damage, setDamage] = useState({ adv: "" });

  const { name, type, tags, flavor, weight, value, number, stat, modifiers } =
    props.card;

  const displayValue = (value) => {
    let valuesplit = value.split("x");
    let newvalue = valuesplit[0] + " x " + valuesplit[1] + " cash";
    return newvalue;
  };

  const calcAttackInfo = () => {
    let substat = architecture.defenses[stat];
    let attribute = Math.max(
      character[substat.substats[0]],
      character[substat.substats[1]]
    );
    updateState(attack, setAttack, "mod", attribute);
  };

  const modularString = (object) => {
    let data = withProAdv(object);
    return (
      <span>
        {data.string} {data.mod}
      </span>
    );
  };

  const confirmAttack = () => {
    let pro = 0;
    if (attack.pro === "single") {
      pro += character.PRO;
    }
    if (attack.pro === "double") {
      pro += character.PRO * 2;
    }

    let attackRes = test(target, attack.adv, pro, attack.mod);
    let damageResult = damagecalc(number, damage.adv);

    if (attackRes.startsWith("Critical S")) {
      damageResult.total = damageResult.total * 2;
      let critRoll = r(20) + 1;
      if (critRoll === "20") {
        damageResult.total = damageResult.total * 2;
        attackRes.concat("Double ", attackRes);
      }
    }
    if (
      attackRes.startsWith("S") ||
      attackRes.startsWith("B") ||
      attackRes.startsWith("Critical S")
    ) {
      setAttackResult(
        <div>
          {attackRes} <br /> {damageResult.total}{" "}
          <i>{architecture.statMasks[stat]}</i> damage dealt!{" "}
          {damageResult.explosions !== 0 && (
            <span>(Explosions: {damageResult.explosions})</span>
          )}
        </div>
      );
      let damageAdv = "";
      if (damage.adv === "+") {
        damageAdv = " [+] ";
      }
      if (damage.adv === "-") {
        damageAdv = " [-] ";
      }
      let message =
        character.name +
        " attacks with their " +
        name +
        withProAdv(attack).string +
        "!\nThe attack is a " +
        attackRes +
        "\n" +
        damageResult.total +
        " " +
        architecture.statMasks[stat] +
        " damage" +
        damageAdv +
        " dealt!";
      setAttackMessage(message);
    } else {
      let message =
        character.name +
        " attacks with their " +
        name +
        withProAdv(attack).string +
        "!\nThe attack is a " +
        attackRes;
      setAttackResult(attackRes);
      setAttackMessage(message);
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
    setSalePrice(0);
    toggle(setSaleModalOpen, saleModalOpen);
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

  const noBreakpointsIfHeroSheet = () => {
    if (props.deleteFrom === "none") {
      return "col-xs-12 col-md-6 col-lg-6 col-xl-4";
    }
    return "fullwidth mright15px";
  };

  return (
    <div className={noBreakpointsIfHeroSheet()}>
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
              <Attack
                className="iconsvg"
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
                  {number} <i>{architecture.statMasks[stat]}</i>
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
          <span className="cardname">Attack using your {name}</span>
        </Modal.Header>
        <Modal.Body className="modalbackground">
          {attack.pro === "single" && (
            <div>
              Attack Bonus {modularString(attack)}: {attack.mod + character.PRO}
            </div>
          )}
          {attack.pro === "double" && (
            <div>
              Attack Bonus {modularString(attack)}:{" "}
              {attack.mod + character.PRO * 2}
            </div>
          )}
          {attack.pro === "" && (
            <div>
              Attack Bonus {modularString(attack)}: {attack.mod}
            </div>
          )}
          <div className="flex">
            <button
              className="button bordered padded5px margin5px flexgrow"
              onClick={() => {
                toggleState(attack, setAttack, "adv", "", "-");
              }}
            >
              [-]
            </button>
            {attack.pro === "" && (
              <button
                className="button bordered padded5px margin5px flexgrow"
                onClick={() => {
                  toggleState(
                    attack,
                    setAttack,
                    "pro",
                    "single",
                    character.PRO
                  );
                }}
              >
                PRO
              </button>
            )}
            {attack.pro === "single" && (
              <button
                className="button bordered padded5px margin5px flexgrow"
                onClick={() => {
                  toggleState(
                    attack,
                    setAttack,
                    "pro",
                    "double",
                    character.PRO
                  );
                }}
              >
                PRO x2
              </button>
            )}
            {attack.pro === "double" && (
              <button
                className="button bordered padded5px margin5px flexgrow"
                onClick={() => {
                  toggleState(attack, setAttack, "pro", "", character.PRO);
                }}
              >
                No PRO
              </button>
            )}
            <button
              className="button bordered padded5px margin5px flexgrow"
              onClick={() => {
                toggleState(attack, setAttack, "adv", "", "+");
              }}
            >
              [+]
            </button>
          </div>
          <hr />
          <div>
            Damage {modularString(damage)}: {number}{" "}
            <i>{architecture.statMasks[stat]}</i>
          </div>
          <div className="flex">
            <button
              className="button bordered padded5px margin5px flexgrow"
              onClick={() => {
                toggleState(damage, setDamage, "adv", "", "-");
              }}
            >
              [-]
            </button>
            <button
              className="button bordered padded5px margin5px flexgrow"
              onClick={() => {
                toggleState(damage, setDamage, "adv", "", "+");
              }}
            >
              [+]
            </button>
          </div>
          <hr />
          <div>Target: {target}</div>
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
            Roll Attack
          </button>
          {attackResult !== "" && (
            <div>
              <hr />
              <div
                className="button padded5px"
                onClick={() => {
                  navigator.clipboard.writeText(attackMessage);
                }}
              >
                {attackResult}
              </div>
            </div>
          )}
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
    </div>
  );
};

export default Card;
