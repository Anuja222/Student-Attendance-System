import { getCurrentUser } from "./auth";

export const hasRole = (
  role: string
) => {
  const user = getCurrentUser();

  if (!user) {
    return false;
  }

  return user.role === role;
};