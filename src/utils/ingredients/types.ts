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
  IngredientType.SAUCE,
  IngredientType.MAIN,
];
