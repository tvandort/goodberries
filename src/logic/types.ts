export interface GoodberryRequest {
  currentHp: number;
  berriesConsumed: Berry[];
}

export interface Berry {
  heals: number;
}

export interface GoodberryConsumer {
  currentHp: number;
  maxHp: number;
}

export interface Player {
  name: string;
}

export type BerryCount = Record<number, number>;

// Helper function to convert a number to a Berry object
const toBerry = (value: number) => ({ heals: value });

// Helper function to convert an array of numbers to an array of Berry objects
export const asBerries = (values: number[]) => values.map(toBerry);

export const byHeal = (a: Berry, b: Berry): number => b.heals - a.heals;
