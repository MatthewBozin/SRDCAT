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

export { r, s, rdamage };
