import { API_DOMAIN } from "../../../constants";
import { request } from "../../../api";
import { CommonError } from "../../../types";

import * as storage from "../../storage";
import { UserResponse, UpdateUserPayload, UpdateUserResponse } from "./types";

export const fetchUser = async () => {
  let token = storage.get("accessToken");
  if (!token) {
    return {
      success: false,
      reason: "Not authorized",
    } as CommonError;
  }

  let value = await request<UserResponse>(`${API_DOMAIN}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer " + token,
    },
  });
  return value;
};

export const updateUser = async (data: UpdateUserPayload) => {
  const token = storage.get("accessToken");

  const value = await request<UpdateUserResponse>(`${API_DOMAIN}/auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });

  return value;
};
