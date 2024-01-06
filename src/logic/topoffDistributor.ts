import { BerryBag } from "./berryBag";
import { topoff } from "./topoff";
import { GoodberryConsumer, Player, Berry } from "./types";

export const topoffDistributor = (
  players: (GoodberryConsumer & Player)[],
  berries: Berry[],
) => {
  const berryBag = new BerryBag(berries);
  const result = players.map((player) => {
    const berries = berryBag.asArray();
    const request = topoff(player, berries);
    berryBag.subtract(request.berriesConsumed);
    return {
      ...player,
      currentHp: request.currentHp,
    };
  });

  const remainingBerries = berryBag.asCount();

  return { players: result, remainingBerries };
};
