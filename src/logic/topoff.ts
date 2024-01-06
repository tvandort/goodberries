interface PlayerConsumption {
  currentHp: number;
  berriesConsumed: Berry[];
}

interface Berry {
  heals: number;
}

interface Player {
  currentHp: number;
  maxHp: number;
}

export const topoff = (player: Player, berries: Berry[]): PlayerConsumption => {
  let currentHp = player.currentHp;
  let berriesConsumed: Berry[] = [];

  // Sort berries in descending order based on heals
  const sortedBerries = berries.sort((a, b) => b.heals - a.heals);

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

// Helper function to convert a number to a Berry object
const toBerry = (value: number) => ({ heals: value });

// Helper function to convert an array of numbers to an array of Berry objects
export const asBerries = (values: number[]) => values.map(toBerry);
