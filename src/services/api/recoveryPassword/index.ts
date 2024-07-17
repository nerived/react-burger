import { API_DOMAIN } from "../../../constants";
import { request } from "../../../api";

import {
  ForgotPasswordPayload,
  ForgotPasswordResponse,
  NewPasswordPayload,
  NewPasswordResponse,
} from "./types";

export const sendForgotPassword = async (data: ForgotPasswordPayload) => {
  const value = await request<ForgotPasswordResponse>(
    `${API_DOMAIN}/password-reset`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }
  );

  if (value.success) {
    return value;
  }
};

export const sendNewPassword = async (data: NewPasswordPayload) => {
  const value = await request<NewPasswordResponse>(
    `${API_DOMAIN}/password-reset/reset`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }
  );

  if (value.success) {
    return value;
  }
};
