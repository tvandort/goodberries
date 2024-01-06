import { GoodberryConsumer, Berry, GoodberryRequest, byHeal } from "./types";

export const topoff = (
  player: GoodberryConsumer,
  berries: Berry[],
): GoodberryRequest => {
  let currentHp = player.currentHp;
  let berriesConsumed: Berry[] = [];

  // Sort berries in descending order based on heals
  const sortedBerries = berries.sort(byHeal);

  // Iterate through the sorted berries
  for (let berryIndex = 0; berryIndex < sortedBerries.length; berryIndex++) {
    let berry = sortedBerries[berryIndex];

    // Check if the berry can be consumed without exceeding maxHp
    if (player.maxHp - currentHp >= berry.heals) {
      berriesConsumed.push(berry);
      currentHp += berry.heals;
    }
  }

  return {
    currentHp,
    berriesConsumed,
  };
};
