import { apiClient } from "../apiClient";
import { LoginRequest } from "../types/LoginRequest";

export const login = async (
  payload: LoginRequest
) => {
  const response = await apiClient.post(
    "/auth/login",
    payload
  );

  return response.data;
};