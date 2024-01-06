import { berryCountToArray } from "./berryBag";
import { topoffDistributor } from "./topoffDistributor";
import { asBerries } from "./types";

test("distributing 10 berries to 2 players", () => {
  const players = [
    { name: "A", currentHp: 1, maxHp: 10 },
    { name: "B", currentHp: 1, maxHp: 10 },
  ];

  const berries = asBerries([5, 5, 4, 3, 1]);

  const result = topoffDistributor(players, berries);

  expect(result.players).toEqual([
    { name: "A", currentHp: 10, maxHp: 10 },
    { name: "B", currentHp: 10, maxHp: 10 },
  ]);
  expect(result.remainingBerries).toEqual({
    "1": 0,
    "3": 0,
    "4": 0,
    "5": 0,
  });
});

test("distributing 10 berries to 2 players", () => {
  const players = [
    { name: "A", currentHp: 1, maxHp: 52 },
    { name: "B", currentHp: 1, maxHp: 88 },
  ];

  const berries = berryCountToArray({
    6: 30,
    5: 50,
    4: 40,
  });

  const result = topoffDistributor(players, berries);

  expect(result.players).toEqual([
    { name: "A", currentHp: 49, maxHp: 52 },
    { name: "B", currentHp: 85, maxHp: 88 },
  ]);
  expect(result.remainingBerries).toEqual({
    "4": 40,
    "5": 50,
    "6": 8,
  });
});
