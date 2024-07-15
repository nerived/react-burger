export type UserState = {
  email: string;
  name: string;
};

export type UserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};

export type UpdateUserPayload = {
  email: string;
  password: string;
  name: string;
};

export type UpdateUserResponse = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
};
