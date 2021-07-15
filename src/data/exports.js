import architecture from "./architecture.json";

/*
1. Utility
2. Combat
3. Tests
4. Status
*/

/*
------------------------------------------------------------------
  UTILITY
------------------------------------------------------------------
*/

const r = function (c) {
  return Math.floor(Math.random() * c);
};

const s = function (array) {
  return array[r(array.length)];
};

const multiRoll = (value) => {
  let total = 0;
  let ifexploding = value.slice(-1);
  if (ifexploding === "*") {
    value = value.slice(0, -1);
  }
  let dice = value.split("d");
  let times = parseInt(dice[0]);
  let size = parseInt(dice[1]);
  for (let i = 0; i < times; i++) {
    let subtotal = 0;
    let result = r(size) + 1;
    subtotal += result;
    if (result === size && ifexploding === "*") {
      console.log("BOOM");
      while (true) {
        let newresult = r(size) + 1;
        subtotal += newresult;
        if (newresult !== size) {
          break;
        }
      }
    }
    total += subtotal;
  }
  return total;
};

const updateState = (object, method, property, value) => {
  let object2 = object;
  object2[property] = value;
  method(JSON.parse(JSON.stringify(object2)));
};

const toggleState = (object, method, property, value, togglevalue) => {
  if (object[property] === value) {
    updateState(object, method, property, togglevalue);
  } else {
    updateState(object, method, property, value);
  }
};

const toggle = (method, status) => {
  method(!status);
};

/*
------------------------------------------------------------------
  COMBAT
------------------------------------------------------------------
*/

const rdamage = (string) => {
  let split = string.split("d");

  let base = r(split[split.length - 1]) + 1;
  let nug = split.pop();
  if (split.length > 1) {
    base = base * r(split[split.length - 1]) + 1;
  } else {
    base = base * split[split.length - 1];
  }
  nug = split.pop();
  if (split.length > 0) {
    base = base * split[split.length - 1];
  }

  return base;
};

const damage = (string) => {
  let exploding = false;
  let explosions = 0;
  if (string.substr(string.length - 1) === "*") {
    exploding = true;
    string = string.slice(0, -1);
  }
  let total = 0;
  let dice = string.split("d");
  let times = parseInt(dice[0]);
  let size = parseInt(dice[1]);
  for (let i = 0; i < times; i++) {
    let subtotal = 0;
    let result = r(size) + 1;
    subtotal += result;
    //exploding dice
    if (result === size && exploding === true) {
      console.log("BOOM");
      while (true) {
        explosions += 1;
        let newresult = r(size) + 1;
        subtotal += newresult;
        if (newresult !== size) {
          break;
        }
      }
    }
    total += subtotal;
  }
  return { total: total, explosions: explosions };
};

const damagecalc = (string, adv) => {
  let result1;
  let result2;
  if (adv !== "") {
    result1 = damage(string);
    result2 = damage(string);
  } else {
    result1 = damage(string);
  }

  if (adv === "+") {
    if (result1.total > result2.total) {
      return result1;
    }
    return result2;
  }
  if (adv === "-") {
    if (result1.total < result2.total) {
      return result1;
    }
    return result2;
  }
  return result1;
};

/*
------------------------------------------------------------------
  TESTS
------------------------------------------------------------------
*/

const calcSale = (value) => {
  let valuesplit = value.split("x");
  let roll = multiRoll(valuesplit[0]);
  return roll * parseInt(valuesplit[1]);
};

const minitest = (pro, stat) => {
  return r(20) + pro + stat;
};

const roll = (adv, pro) => {
  let result = 0;
  let total = 0;
  let text = "";
  if (adv === "+") {
    let roll1 = r(20) + 1;
    let roll2 = r(20) + 1;
    result = Math.max(roll1, roll2);
    text = "Results: " + roll1 + ", " + roll2;
  } else if (adv === "-") {
    let roll1 = r(20) + 1;
    let roll2 = r(20) + 1;
    result = Math.min(roll1, roll2);
    text = "Results: " + roll1 + ", " + roll2;
  } else {
    result = r(20) + 1;
    text = "Result: " + result;
  }
  if (pro !== 0) {
    total = result + pro;
  } else {
    total = result;
  }
  return { result: result, total: total, text: text };
};

const test = (target, adv, pro, mod) => {
  let rollData = roll(adv, pro);
  let rollResult = rollData.result;
  let rollTotal = parseInt(rollData.total) + parseInt(mod);
  let resultString = "";
  if (rollResult === 20 || rollResult === 1) {
    resultString += "Critical ";
  }
  if (rollTotal === target) {
    resultString += "Barely a ";
  }
  if (rollTotal >= target) {
    resultString += "Success";
  } else {
    resultString += "Failure";
  }
  if (rollResult === 7 && rollTotal <= target) {
    resultString += " with a Silver Lining";
  }
  if (rollResult === 13 && rollTotal >= target) {
    resultString += " with a Drawback";
  }

  resultString += "! " + rollData.text + ". Total: " + rollTotal + ".";
  return resultString;
};

const haggleRoll = (result, mode) => {
  let multiplier = 1;
  let add = (result - 15) * 0.05;
  if (mode === "none") {
    //buying
    multiplier -= add;
  }
  if (mode === "items") {
    //selling
    multiplier += add;
  }
  return multiplier;
};

/*
------------------------------------------------------------------
  STATUS
------------------------------------------------------------------
*/

const withProAdv = (object) => {
  let string = "";
  let mod = "";
  if (object.pro !== undefined) {
    if (object.pro !== "" || object.adv !== "") {
      string += " with ";
    }
    if (object.pro === "single") {
      string += "Proficiency";
    }
    if (object.pro === "double") {
      string += "Double Proficiency";
    }
    if (object.pro !== "" && object.adv !== "") {
      string += " and ";
    }
  } else if (object.adv !== "") {
    string += " with ";
  }
  if (object.adv === "+") {
    string += "Advantage";
    mod = "[+]";
  }
  if (object.adv === "-") {
    string += "Disadvantage";
    mod = "[-]";
  }
  return { string: string, mod: mod };
};

const invcalc = (encumbrance, placement, placement2) => {
  return encumbrance.toString().slice(placement, placement2);
};

const sackstonesoap = (weight, mode) => {
  let encumbrance = weight;
  let soaps = invcalc(encumbrance, -1);
  let stones = invcalc(encumbrance, -2, -1);
  let sacks = invcalc(encumbrance, -3, -2);
  let array = [
    { amount: sacks, name: "Sacks" },
    { amount: stones, name: "Stones" },
    { amount: soaps, name: "Soaps" },
  ];
  let sackstonesoap = "";
  for (let i = 0; i < array.length; i++) {
    let element = array[i];
    let amount = parseInt(element.amount);
    if (amount === 0 || amount === "" || amount !== amount) {
      if (mode === "inventory") {
        sackstonesoap += " 0 " + element.name;
        if (i !== array.length - 1) {
          sackstonesoap += ", ";
        }
      }
    } else {
      sackstonesoap += element.amount + " " + element.name;
      if (i < array.length - 1) {
        if (parseInt(array[i + 1].amount) !== 0) {
          sackstonesoap += ", ";
        }
      }
    }
  }
  return sackstonesoap;
};

const messageStats = (stat) => {
  return (
    <span>
      {stat.map((eachstat, index) => {
        return (
          <span key={index}>
            <i>{architecture.statMasks[eachstat]}</i>
            {index < 0 && index > stat.length && <span> or </span>}
          </span>
        );
      })}
    </span>
  );
};

export {
  r,
  s,
  rdamage,
  multiRoll,
  damagecalc,
  calcSale,
  roll,
  minitest,
  test,
  haggleRoll,
  sackstonesoap,
  updateState,
  toggleState,
  toggle,
  withProAdv,
  messageStats,
};
