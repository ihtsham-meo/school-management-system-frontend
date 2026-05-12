import api from "./api";

export const loginApi = (credentials) => {
  return api.post("/auth/login", credentials);
};

export const logoutApi = () => {
  return api.post("/auth/logout");
};

export const forgotPasswordApi = (email) => {
  return api.post("/auth/forgot-password", { email });
};

export const resetPasswordApi = (data) => {
  return api.post("/auth/reset-password", data);
};

export const changePasswordApi = (data) => {
  return api.post("/auth/change-password", data);
};