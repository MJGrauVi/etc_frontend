import  request  from "../services/apiClient.js";

/* Operaciones de autenticación(login, register, logout, me).Objeto ya que no usa react. */
const authService = {

  login: (email, password) =>
    request("login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  me: () => request("me"),

  // Añadimos el registro aquí
  register: (userData) =>
    request("register", {
      method: "POST",
      body: JSON.stringify(userData ),
    }),

  
  checkEmail: (email) => 
    request(`check-email?email=${email}`, {
      method: "GET",
    }),

  logout: async () => {
    try {
      await request("user/logout", { method: "POST" });
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem("token");
  },
};

export { authService };
