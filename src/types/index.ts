export type CommonError = {
  success: false;
  reason?: string;
};

export type IngredientData = {
  _id: string;
  name: string;
  type: IngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type Ingredient = IngredientData & { count?: number };

export enum IngredientType {
  BUNN = "bun",
  MAIN = "main",
  SAUCE = "sauce",
}

export const TYPE_TO_NAME = {
  [IngredientType.BUNN]: "Булки",
  [IngredientType.SAUCE]: "Соусы",
  [IngredientType.MAIN]: "Начинки",
};

export const TABS = [
  IngredientType.BUNN,
  IngredientType.MAIN,
  IngredientType.SAUCE,
];

export type DNDIngredientItem = {
  id: string;
  type: IngredientType;
  count: number;
};

export enum ConnctionState {
  INITIAL = "initial",
  CONNECTING = "connecting",
  CONNECTED = "connected",
  CLOSED = "closed",
  ERROR = "error",
}

export enum OrderStatus {
  DONE = "done",
  CREATED = "created",
  PENDING = "pending",
}

export type TOrder = {
  ingredients: string[];
  _id: string;
  status: OrderStatus;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};
