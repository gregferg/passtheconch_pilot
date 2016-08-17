function sample(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

export default function createAPrompt() {
  var part1 = sample(ADJECTIVES) + " " + sample(LIVING_THINGS);
  part1 = VOWELS[part1[0]] ? "an " + part1 : "a " + part1;

  var part2 = sample(OBJECTS);
  part2 = VOWELS[part2[0]] ? "an " + part2 : "a " + part2;

  var part3 = sample(ADJECTIVES) + " " + sample(EVENTS);
  part3 = VOWELS[part3[0]] ? "an " + part3 : "a " + part3;


  return "Your story begins with " + part2 + ", "  + part1 + ", and " + part3;
};

const VOWELS = {
  "a": true,
  "e": true,
  "i": true,
  "o": true,
  "u": true
}

const ADJECTIVES = [
  'mischievous',
  'good',
  'bad',
  'little',
  'big',
  'important',
  'gnarly',
  'gassy',
  'heartfelt',
  'unbelievable'
];

const LIVING_THINGS = [
  'dog',
  'carpenter',
  'fish',
  'brick layer',
  'longshoreman',
  'maid',
  'CEO',
  'farter',
  'programmer',
  'lawyer'
];

const OBJECTS = [
  'pickle',
  'motel',
  'cliff',
  'country',
  'farm',
  'airplane',
  'race car',
  'shopping mall'
];

const EVENTS = [
  'box social',
  'parade',
  'date',
  'movie',
  'rocket lauch',
  'murder plot',
  'night',
  'surfing competition',
  'breakfast',
  'rave',
  'film shoot'
];
