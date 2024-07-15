import { CommonError } from "../types";
import { API_DOMAIN } from "../constants";
import * as storage from "../services/storage";

export type RefreshResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
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

export const request = async <T extends unknown>(
  url: RequestInfo | URL,
  options?: RequestInit
) => {
  return fetch(url, options).then((data) => {
    return checkResponse<T>(data, { url, options });
  });
};

type Request = {
  url: RequestInfo | URL;
  options?: RequestInit & {
    isRetry?: boolean;
    headers?: { authorization?: string };
  };
};

export const checkResponse = async <T>(
  response: Response,
  config: Request
): Promise<T | CommonError> => {
  const { url, options } = config;

  if (response.ok) {
    const payload = await response.json();
    if (payload.success) {
      return payload;
    }
  }

  if (response.status === 403 && !options?.isRetry && options?.headers) {
    const res = await refreshToken();
    if (res?.success) {
      options.isRetry = true;
      options.headers["authorization"] = res.accessToken;
      return request<T>(url, options);
    }
  }

  return {
    success: false,
    reason: `Ошибка ${response.status}`,
  };
};
