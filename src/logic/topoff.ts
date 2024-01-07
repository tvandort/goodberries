import { GoodberryConsumer, Berry, GoodberryRequest, byHeal } from "./types";

export const topoff = (
  player: GoodberryConsumer,
  berries: Berry[],
): GoodberryRequest => {
  let currentHp = player.currentHp;
  let berriesConsumed: Berry[] = [];

  const berriesByHealingStrength = berries.sort(byHeal);

  for (
    let berryIndex = 0;
    berryIndex < berriesByHealingStrength.length;
    berryIndex++
  ) {
    let berry = berriesByHealingStrength[berryIndex];

    const canBeConsumedWithoutExceedingMaxHp =
      player.maxHp - currentHp >= berry.heals;

    if (canBeConsumedWithoutExceedingMaxHp) {
      berriesConsumed.push(berry);
      currentHp += berry.heals;
    }
  }

  return {
    currentHp,
    berriesConsumed,
  };
};
