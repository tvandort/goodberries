import { BerryBag } from "./berryBag";
import { topoff } from "./topoff";
import { GoodberryConsumer, Player, Berry, Distributor } from "./types";

export const topoffDistributor: Distributor = (
  players: (GoodberryConsumer & Player)[],
  berries: Berry[],
) => {
  const berryBag = new BerryBag(berries);
  const result = [];
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    const berries = berryBag.asArray();
    const request = topoff(player, berries);
    berryBag.subtract(request.berriesConsumed);
    result.push({
      ...player,
      currentHp: request.currentHp,
    });
  }

  const remainingBerries = berryBag.asCount();

  return { players: result, remainingBerries };
};
