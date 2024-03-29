import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import architecture from "../../data/architecture.json";
import NameValuePair from "../bits/NameValuePair.js";
import toaster from "toasted-notes";
import {
  r,
  test,
  damagecalc,
  toggleState,
  toggle,
  withProAdv,
} from "../../utils/exports.js";

function ModalCreatureAttack(props) {
  const [target, setTarget] = useState(10);
  const [attackResult, setAttackResult] = useState("");
  const [attackMessage, setAttackMessage] = useState("");
  const [attack, setAttack] = useState({ adv: "" });
  const [damage, setDamage] = useState({ adv: "" });

  const {
    attackModalOpen,
    setAttackModalOpen,
    creatureName,
    attackName,
    attackBonus,
    attackDamage,
    attackStat,
    creatureProperties,
  } = props;

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

    let attackResult = test(target, attack.adv, pro, attackBonus);
    let attackText = attackResult.resultString;
    let damageResult = damagecalc(attackDamage, damage.adv);

    if (attackText.startsWith("Critical S")) {
      damageResult.total = damageResult.total * 2;
      let critRoll = r(20) + 1;
      if (critRoll === "20") {
        damageResult.total = damageResult.total * 2;
        attackText.concat("Double ", attackText);
      }
    }
    if (
      attackText.startsWith("S") ||
      attackText.startsWith("B") ||
      attackText.startsWith("Critical S")
    ) {
      setAttackResult(
        <div>
          {attackText} <br /> {damageResult.total} {attackStat} damage dealt!{" "}
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
      let message = `${creatureName} attacks using their ${attackName} ${
        withProAdv(attack).string
      }!\nThe attack is a ${attackText}\n${
        damageResult.total
      } ${attackStat} damage ${damageAdv} dealt!`;
      setAttackMessage(message);
    } else {
      let message = `${creatureName} attacks using their ${attackName}${
        withProAdv(attack).string
      }!\nThe attack is a ${attackText}`;
      setAttackResult(attackText);
      setAttackMessage(message);
    }
  };

  return (
    <Modal
      show={attackModalOpen}
      onHide={() => {
        toggle(setAttackModalOpen, attackModalOpen);
      }}
    >
      <Modal.Header className="modalbackground">
        <span className="cardname">Attack using {attackName}!</span>
      </Modal.Header>
      <Modal.Body className="modalbackground">
        <div>Attacker: {creatureName}</div>
        <hr />
        {creatureProperties.map((property, index) => {
          if (property.of !== attackName) return null;
          return (
            <div key={index}>
              <NameValuePair
                name={property.name}
                value={property.description}
              />
              <hr />
            </div>
          );
        })}
        <div>
          Attack Bonus{modularString(attack)}: {attackBonus}
        </div>
        <div className="flex">
          <button
            className="button bordered padded5px margin5px flexgrow"
            onClick={() => {
              toggleState(attack, setAttack, "adv", "", "-");
            }}
          >
            [-]
          </button>
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
          Damage{modularString(damage)}: {attackDamage}
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
        <div>
          Target {architecture.statMasks[attackStat]}: {target}
        </div>
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
        <div className="flex">
          <button
            className="button bordered padded5px margin5px flexgrow"
            onClick={() => {
              confirmAttack();
            }}
          >
            Confirm Attack
          </button>
        </div>
        {attackResult !== "" && (
          <div>
            <hr />
            <div
              className="button padded5px"
              onClick={() => {
                toaster.notify(
                  () => (
                    <div className="outerbox modalbackground">
                      {"Attack text copied to clipboard!"}
                    </div>
                  ),
                  {
                    duration: 1000,
                  }
                );
                navigator.clipboard.writeText(attackMessage);
              }}
            >
              {attackResult}
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalCreatureAttack;
