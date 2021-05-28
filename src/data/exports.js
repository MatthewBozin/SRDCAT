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

const calcSale = (value) => {
  let price = 0;
  let valuesplit = value.split("x");
  let dice = valuesplit[0].split("d");
  let times = parseInt(dice[0]);
  let size = parseInt(dice[1]);
  for (let i = 0; i < times; i++) {
    price += r(size);
  }
  return price * parseInt(valuesplit[1]);
};

const test = (pro, stat) => {
  return r(20) + pro + stat;
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

export { r, s, rdamage, calcSale, test, haggleRoll };
