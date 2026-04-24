export type FrontendInventoryStock = {
    id?: string;
    name: string;
    description: string;
    location: string;
    manufacturer: string;
    category: string;
    quantity: number;
    price: number;
    lowStockThreshold: number;
}

export enum Category {
  FOOD = "FOOD",
  ELECTRONICS = "ELECTRONICS",
  HEALTH = "HEALTH",
  BEAUTY = "BEAUTY"
}

export enum Manufacturer {
  LG = "LG",
  SAMSUNG = "SAMSUNG",
  LOGITEC = "LOGITEC",
  HP = "HP",
  SONY = "SONY",
  PANASONIC = "PANASONIC",
  BAYER = "BAYER",
  JOHNSON_AND_JOHNSON = "JOHNSON_AND_JOHNSON",
  ORGANIKA = "ORGANIKA",
  PROCTER_AND_GAMBLE = "PROCTER_AND_GAMBLE",
  LOREAL = "LOREAL",
  KRAFT = "KRAFT",
  MAPLE_LEAF = "MAPLE_LEAF",
  MCCAIN = "MCCAIN",
  PC = "PC",
  DOLE = "DOLE",
  DEL_MONTE = "DEL_MONTE"
}