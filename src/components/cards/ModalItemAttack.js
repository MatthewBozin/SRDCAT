import React, { useState, useContext } from "react";
import Character from "../../data/character.js";
import Modal from "react-bootstrap/Modal";
import architecture from "../../data/architecture.json";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import {
  r,
  test,
  adjudicate,
  damagecalc,
  toggleState,
  toggle,
  withProAdv,
} from "../../utils/exports.js";

function ModalItemAttack(props) {
  const [character, setCharacter] = useContext(Character);
  const [target, setTarget] = useState(10);
  const [attackResult, setAttackResult] = useState("");
  const [lastAttackData, setlastAttackData] = useState("");
  const [lastDamageData, setlastDamageData] = useState("");
  const [attackMessage, setAttackMessage] = useState("");
  const [damage, setDamage] = useState({ adv: "" });

  const {
    attack,
    setAttack,
    attackModalOpen,
    setAttackModalOpen,
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

  const determineMessage = (attackResult, damageResult, index) => {
    let attackText = attackResult.resultString;
    if (
      attackText.startsWith("S") ||
      attackText.startsWith("B") ||
      attackText.startsWith("Critical S")
    ) {
      setAttackResult(
        <div>
          {attackText} <br /> {damageResult.total}{" "}
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
      }!\nThe attack is a ${attackText}\n${damageResult.total} ${
        architecture.statMasks[stat[index]]
      } damage${damageAdv} dealt!`;
      setAttackMessage(message);
    } else {
      let message = `${character.name} attacks with their ${name}${
        withProAdv(attack).string
      }!\nThe attack is a ${attackText}`;
      setAttackResult(attackText);
      setAttackMessage(message);
    }
  };

  const confirmAttack = (index) => {
    let pro = 0;
    if (attack.pro === "single") {
      pro += character.PRO;
    }
    if (attack.pro === "double") {
      pro += character.PRO * 2;
    }

    let attackResult = test(target, attack.adv, pro, attack.mod[index]);
    let damageResult = damagecalc(number[index], damage.adv);
    attackResult.index = index;
    setlastAttackData(attackResult.rollData);
    setlastDamageData(damageResult);

    determineMessage(attackResult, damageResult, index);
  };

  const spendHeroDie = () => {
    let dieRoll = r(6) + 1;
    let newRollData = {
      rollResult: lastAttackData.rollResult + dieRoll,
      rollTotal: lastAttackData.rollTotal + dieRoll,
      target: lastAttackData.target,
      text: lastAttackData.text,
    };

    let newResultString = adjudicate(newRollData);
    let newAttackResult = {
      resultString: newResultString,
      rollData: newRollData,
    };
    determineMessage(newAttackResult, lastDamageData, lastAttackData.index);
    let newCharacter = character;
    newCharacter.HERODICE -= 1;
    setCharacter(JSON.parse(JSON.stringify(newCharacter)));
    console.log(character.HERODICE);
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
            <hr />
            {character.HERODICE > 0 && (
              <div
                className="button bordered padded5px margin5px center flexgrow"
                onClick={() => {
                  spendHeroDie();
                }}
              >
                Spend Hero Die ({character.HERODICE} remaining)
              </div>
            )}
            {character.HERODICE < 1 && <div>No hero dice remaining.</div>}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ModalItemAttack;
