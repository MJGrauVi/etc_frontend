import { fetchErroresRed } from "../utils/api.js";
const API_URL = "http://localhost:8095/api";

//L defino aquí también porque me() necesita el token
const getToken = () => localStorage.getItem("token");

const useApiAuth = () => {

  const login = (email, password) =>
    fetchErroresRed(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

  const register = (formData) =>
    fetchErroresRed(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

  const logout = async () => {
    try {
      await fetchErroresRed(`${API_URL}/user/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: "application/json",
        },
      });
    } catch (e) {
      console.log(e.message);
    }
    localStorage.removeItem("token");
  };

  const me = () =>
    fetchErroresRed(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
        Accept: "application/json",
      },
    });

  return { login, register, logout, me };
};

export { useApiAuth };
