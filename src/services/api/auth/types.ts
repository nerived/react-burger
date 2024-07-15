export type RegisterPayload = {
  email: string;
  password: string;
  name: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RefreshResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type AuthResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type LogoutResponse = {
  success: boolean;
  message: string;
};
