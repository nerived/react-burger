export type ForgotPasswordPayload = {
  email: string;
};

export type ForgotPasswordResponse = {
  success: boolean;
  message: string;
};

export type NewPasswordPayload = {
  password: string;
  token: string;
};

export type NewPasswordResponse = {
  success: boolean;
  message: string;
};
