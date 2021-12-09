import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import architecture from "../data/architecture.json";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import {
  r,
  test,
  damagecalc,
  toggleState,
  toggle,
  withProAdv,
} from "../utils/exports.js";

function ModalItemAttack(props) {
  const [target, setTarget] = useState(10);
  const [attackResult, setAttackResult] = useState("");
  const [attackMessage, setAttackMessage] = useState("");
  const [damage, setDamage] = useState({ adv: "" });

  const {
    attack,
    setAttack,
    attackModalOpen,
    setAttackModalOpen,
    character,
    name,
    stat,
    number,
  } = props;

  const modularString = (object) => {
    let data = withProAdv(object);
    return (
      <span>
        {data.string} {data.mod}
      </span>
    );
  };

  const confirmAttack = (index) => {
    let pro = 0;
    if (attack.pro === "single") {
      pro += character.PRO;
    }
    if (attack.pro === "double") {
      pro += character.PRO * 2;
    }

    let attackRes = test(target, attack.adv, pro, attack.mod[index]);
    let damageResult = damagecalc(number[index], damage.adv);

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
          {architecture.statMasks[stat[index]]} damage dealt!{" "}
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
      let message = `${character.name} attacks with their ${name}${
        withProAdv(attack).string
      }!\nThe attack is a ${attackRes}\n${damageResult.total} ${
        architecture.statMasks[stat[index]]
      } damage${damageAdv} dealt!`;
      setAttackMessage(message);
    } else {
      let message = `${character.name} attacks with their ${name}${
        withProAdv(attack).string
      }!\nThe attack is a ${attackRes}`;
      setAttackResult(attackRes);
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
        <span className="cardname">Attack using your {name}</span>
      </Modal.Header>
      <Modal.Body className="modalbackground">
        {attack.pro === "single" && (
          <div>
            Attack Bonus {modularString(attack)}:
            {stat.map((eachstat, index) => {
              return (
                <span key={index}>
                  {" "}
                  <i>{architecture.statMasks[eachstat]}</i>{" "}
                  {attack.mod[index] + character.PRO}
                </span>
              );
            })}{" "}
          </div>
        )}
        {attack.pro === "double" && (
          <div>
            Attack Bonus {modularString(attack)}:
            {stat.map((eachstat, index) => {
              return (
                <span key={index}>
                  {" "}
                  <i>{architecture.statMasks[eachstat]}</i>{" "}
                  {attack.mod[index] + character.PRO * 2}
                </span>
              );
            })}{" "}
          </div>
        )}
        {attack.pro === "" && (
          <div>
            Attack Bonus {modularString(attack)}:
            {stat.map((eachstat, index) => {
              return (
                <span key={index}>
                  {" "}
                  <i>{architecture.statMasks[eachstat]}</i> {attack.mod[index]}
                </span>
              );
            })}{" "}
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
                toggleState(attack, setAttack, "pro", "single", character.PRO);
              }}
            >
              PRO
            </button>
          )}
          {attack.pro === "single" && (
            <button
              className="button bordered padded5px margin5px flexgrow"
              onClick={() => {
                toggleState(attack, setAttack, "pro", "double", character.PRO);
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
          Damage {modularString(damage)}:{" "}
          {stat.map((eachstat, index) => {
            return (
              <span key={index}>
                {number[index]} <i>{architecture.statMasks[eachstat]}</i>
                {index + 1 < stat.length && <span> or </span>}
              </span>
            );
          })}
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
        <div className="flex">
          {stat.map((eachstat, index) => {
            return (
              <button
                key={index}
                className="button bordered padded5px margin5px flexgrow"
                onClick={() => {
                  confirmAttack(index);
                }}
              >
                Attack with {architecture.statMasks[eachstat]}
              </button>
            );
          })}
        </div>
        {attackResult !== "" && (
          <div>
            <hr />
            <div
              className="button padded5px"
              onClick={() => {
                toaster.notify("Attack text copied to clipboard!", {
                  duration: 1000,
                });
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

export default ModalItemAttack;
