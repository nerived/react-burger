import { API_DOMAIN } from "../../../constants";
import { request } from "../../../api";

import * as storage from "../../storage";
import {
  RegisterPayload,
  AuthResponse,
  RefreshResponse,
  LoginPayload,
  LogoutResponse,
} from "./types";

export const sendRegisterForm = async (data: RegisterPayload) => {
  const value = await request<AuthResponse>(`${API_DOMAIN}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });

  if (value.success) {
    storage.set("refreshToken", value.refreshToken);
    storage.set("accessToken", value.accessToken.split("Bearer ")[1]);
    return value;
  }
};

export const sendLoginForm = async (data: LoginPayload) => {
  const value = await request<AuthResponse>(`${API_DOMAIN}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(data),
  });

  if (value.success) {
    storage.set("refreshToken", value.refreshToken);
    storage.set("accessToken", value.accessToken.split("Bearer ")[1]);
    return value;
  }
};

export const refreshToken = async () => {
  const token = storage.get("refreshToken");
  const value = await request<RefreshResponse>(`${API_DOMAIN}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token }),
  });

  if (value.success) {
    storage.set("refreshToken", value.refreshToken);
    storage.set("accessToken", value.accessToken.split("Bearer ")[1]);
    return value;
  }
};

export const logout = async () => {
  const token = storage.get("refreshToken");
  const value = await request<LogoutResponse>(`${API_DOMAIN}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token }),
  });

  if (value.success) {
    storage.remove("refreshToken");
    storage.remove("accessToken");
    return value;
  }
};
