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

/*const chargen = (tier) => {
  const firstnames = ["Aersk", "Akres", "Arkes"];
  const lastnames = ["Assrot", "Rotsas", "Sotsra"];

  let name = s(firstnames) + " " + s(lastnames);

  let level = [0, 3, 6, 9];
  let skills = [1, 3, 5, 9];
  let traits = [0, 2, 5, 9];
  let pro = [1, 2, 3, 4];
  let statpoints = [5, 7, 9, 11];
  let statlimit = [3, 4, 5, 5];
  let LIFE = [5, 20, 38, 42];
  let HERODICE = [0, 3, 6, 9];
  let XP = [0, 999, 9999, 99999];
  let startingitems = [1, 4, 4, 6];
  let weaponsarmor = [0, 0, 1, 1]; //represent yes/no
  let cash = [30, 300, 3000, 30000];

  let fullchar = {
    name: name,
    level: level[tier],
    pro: pro[tier],
    actions: 2,
    STR: 1,
    END: 1,
    AGI: 1,
    CHA: 1,
    AUR: 1,
    THO: 1,
    HA: 10,
    KA: 10,
    BA: 10,
    LIFE: 20,
    MCOST: 2,
    HERODICE: 0,
    XP: 0,
    skills: [],
    abilities: [],
    mutations: [],
    items: [],
    cash: cash[tier],
    materials: ["metal", "fuel"],
  };

  return fullchar;
};*/

export { r, s, rdamage };
