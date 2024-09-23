export type User = {
  id: string;
  username: string;
  password: string;
  email: string;
  coins: number;
  is_deleted: boolean;
  is_admin: boolean;
  is_validated: boolean;
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
  max_health: number;
  intelligence: number;
  hunger: number;
  max_hunger: number;
  appearance: {
    src: string;
  };
};

export type Item = {
  id: string;
  tag: string;
  img_url: string;
  status_effect: string[];
};

export type UserItem = {
  item: Item;
  is_stored: boolean;
};

export type NpcItem = {
  item: Item;
  base_value: number;
  quantity: number;
  last_update: Date;
};

export type EmailData = {
  username: string;
  email: string;
  token: string;
  subject: string;
  template: "signup" | "forgot-password";
};
