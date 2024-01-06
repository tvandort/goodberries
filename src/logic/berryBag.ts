import { Berry, BerryCount, byHeal } from "./types";

export const countBerries = (berries: Berry[]) => {
  const berryCount: BerryCount = {};
  for (let berryIndex = 0; berryIndex < berries.length; berryIndex++) {
    const berry = berries[berryIndex];
    if (berryCount[berry.heals] === undefined) {
      berryCount[berry.heals] = 0;
    }

    berryCount[berry.heals]++;
  }

  return berryCount;
};

export const berryCountToArray = (berryCount: BerryCount) => {
  const berries: Berry[] = [];
  for (const heals in berryCount) {
    const count = berryCount[heals];
    for (let i = 0; i < count; i++) {
      berries.push({ heals: Number(heals) });
    }
  }

  return berries.sort(byHeal);
};

export class BerryBag {
  private berries: BerryCount;
  constructor(berries: Berry[]) {
    this.berries = countBerries(berries);
  }

  asArray() {
    return berryCountToArray(this.berries);
  }

  asCount() {
    return { ...this.berries };
  }

  subtract(berries: Berry[]) {
    const berryCount = countBerries(berries);
    for (const heals in berryCount) {
      this.berries[heals] -= berryCount[heals];
    }
  }
}
