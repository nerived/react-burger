import { OrderStatus } from "../types";

export const API_DOMAIN = "https://norma.nomoreparties.space/api";
export const ID_SPLITER = "-MODIFY-";

export const WS_FEED_URL = "wss://norma.nomoreparties.space/orders/all";
export const WS_HISTORY_URL = `wss://norma.nomoreparties.space/orders`;

export const STATUS_MAP = {
  [OrderStatus.DONE]: "Выполнен",
  [OrderStatus.CREATED]: "Создан",
  [OrderStatus.PENDING]: "Готовится",
};
