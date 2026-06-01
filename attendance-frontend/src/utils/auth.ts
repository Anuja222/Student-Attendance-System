export const getCurrentUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  return JSON.parse(user);
};

export const logout = () => {
  localStorage.removeItem("user");
};