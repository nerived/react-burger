import { CommonError } from "../types";

export const request = async <T extends unknown>(
  url: RequestInfo | URL,
  options?: RequestInit
) => {
  return fetch(url, options).then(checkResponse<T>);
};

export const checkResponse = async <T>(
  response: Response
): Promise<T | CommonError> => {
  if (response.ok) {
    const payload = await response.json();
    if (payload.success) {
      return payload;
    }
  }
  return {
    success: false,
    reason: `Ошибка ${response.status}`,
  };
};
