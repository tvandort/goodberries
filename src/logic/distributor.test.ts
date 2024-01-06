import { BerryBag, berryCountToArray } from "./berryBag";
import { topoffDistributor } from "./topoff";
import { Berry, GoodberryConsumer, Player, asBerries } from "./types";

const distribute = (
  players: (GoodberryConsumer & Player)[],
  berries: Berry[],
) => {
  const berryBag = new BerryBag(berries);
  const result = players.map((player) => {
    const berries = berryBag.asArray();
    const request = topoffDistributor(player, berries);
    berryBag.subtract(request.berriesConsumed);
    return {
      ...player,
      currentHp: request.currentHp,
    };
  });

  const remainingBerries = berryBag.asCount();

  return { players: result, remainingBerries };
};

test("distributing 10 berries to 2 players", () => {
  const players = [
    { name: "A", currentHp: 1, maxHp: 10 },
    { name: "B", currentHp: 1, maxHp: 10 },
  ];

  const berries = asBerries([5, 5, 4, 3, 1]);

  const result = distribute(players, berries);

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

  const result = distribute(players, berries);

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
