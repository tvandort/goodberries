import { countBerries } from "./berryBag";
import { Berry, BerryCount, asBerries, byHeal } from "./types";
import { BerryBag } from "./berryBag";

const countToArray = (berryCount: BerryCount) => {
  const berries: Berry[] = [];
  for (const heals in berryCount) {
    const count = berryCount[heals];
    for (let i = 0; i < count; i++) {
      berries.push({ heals: Number(heals) });
    }
  }

  return berries.sort(byHeal);
};

test("countBerries should return the correct berry count", () => {
  const berries = asBerries([5, 5, 4, 3, 1]);

  const result = countBerries(berries);

  expect(result).toEqual({
    5: 2,
    4: 1,
    3: 1,
    1: 1,
  });
});

test("countToArray should return the correct array of berries", () => {
  const berryCount = {
    5: 2,
    4: 1,
    3: 1,
    1: 1,
  };

  const result = countToArray(berryCount);

  expect(result).toEqual([
    { heals: 5 },
    { heals: 5 },
    { heals: 4 },
    { heals: 3 },
    { heals: 1 },
  ]);
});

test("subtract should remove the specified berries from the BerryBag", () => {
  const initialBerries: Berry[] = asBerries([5, 5, 4, 3, 1]);

  const berriesToRemove: Berry[] = asBerries([5, 3]);

  const expectedRemainingBerries: Berry[] = asBerries([5, 4, 1]);

  const berryBag = new BerryBag(initialBerries);

  berryBag.subtract(berriesToRemove);

  expect(berryBag.asArray()).toEqual(expectedRemainingBerries);
});

test("subtract should not remove any berries if the specified berries are not present in the BerryBag", () => {
  const initialBerries: Berry[] = asBerries([5, 5, 4, 3, 1]);

  const berriesToRemove: Berry[] = asBerries([2, 6]);

  const expectedRemainingBerries: Berry[] = asBerries([5, 5, 4, 3, 1]);

  const berryBag = new BerryBag(initialBerries);

  berryBag.subtract(berriesToRemove);

  expect(berryBag.asArray()).toEqual(expectedRemainingBerries);
});
