export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  coins: number;
  isDeleted: boolean;
  isAdmin: boolean;
  isValidated: boolean;
};

export type PetListing = {
  id: string;
  name: string;
  appearance: {
    src: string;
  };
};

export type Pet = {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  intelligence: number;
  hunger: number;
  maxHunger: number;
  appearance: {
    src: string;
  };
};

export type Item = {
  id: string;
  tag: string;
  imgUrl: string;
  statusEffect: string[];
};

export type UserItem = {
  item: Item;
  isStored: boolean;
};

export type NpcItem = {
  item: Item;
  baseValue: number;
  quantity: number;
  lastUpdate: Date;
};
