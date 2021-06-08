const r = function (c) {
  return Math.floor(Math.random() * c);
};

const s = function (array) {
  return array[r(array.length)];
};

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

const multiRoll = (value) => {
  let total = 0;
  let dice = value.split("d");
  let times = parseInt(dice[0]);
  let size = parseInt(dice[1]);
  for (let i = 0; i < times; i++) {
    total += r(size);
  }
  return total;
};

const damage = (string) => {
  let exploding = false;
  let explosions = 0;
  console.log(string.substr(string.length - 1));
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

const calcSale = (value) => {
  let valuesplit = value.split("x");
  let roll = multiRoll(valuesplit[0]);
  return roll * parseInt(valuesplit[1]);
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

const minitest = (pro, stat) => {
  return r(20) + pro + stat;
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
  for (let element of array) {
    let amount = parseInt(element.amount);
    if (amount === 0 || amount === "" || amount !== amount) {
      if (mode === "inventory") {
        sackstonesoap += element.name + ": 0 ";
      }
    } else {
      sackstonesoap += element.name + ": " + element.amount + " ";
    }
  }
  return sackstonesoap;
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
};
