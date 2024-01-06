import { topoff } from "./topoff";
import { asBerries } from "./types";

interface Case {
  case: string;
  berryValues: number[];
  currentHp: number;
  maxHp: number;
  consumedBerryValues: number[];
  futureHp: number;
}

test.each<Case>([
  {
    case: "Player heals exactly 5 to max",
    berryValues: [5],
    currentHp: 0,
    maxHp: 5,
    consumedBerryValues: [5],
    futureHp: 5,
  },
  {
    case: "Players heals exactly 10 with 2 berries to max",
    berryValues: [5, 5],
    currentHp: 0,
    maxHp: 10,
    consumedBerryValues: [5, 5],
    futureHp: 10,
  },
  {
    case: "Player heals to half",
    berryValues: [5],
    currentHp: 0,
    maxHp: 10,
    consumedBerryValues: [5],
    futureHp: 5,
  },
  {
    case: "Player doesn't waste a berry",
    berryValues: [5],
    currentHp: 1,
    maxHp: 5,
    consumedBerryValues: [],
    futureHp: 1,
  },
  {
    case: "Player will heal with different size berries",
    berryValues: [4, 5, 6],
    currentHp: 0,
    maxHp: 10,
    consumedBerryValues: [6, 4],
    futureHp: 10,
  },
])("$case", (data) => {
  const player = { currentHp: data.currentHp, maxHp: data.maxHp };
  const berries = asBerries(data.berryValues);

  const expected = {
    currentHp: data.futureHp,
    berriesConsumed: asBerries(data.consumedBerryValues),
  };

  expect(topoff(player, berries)).toStrictEqual(expected);
});
