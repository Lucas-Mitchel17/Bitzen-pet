import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { refreshToken } from "src/services/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    _user: {
      id: null,
      name: "",
    },
    _token: "",
  }),

  getters: {
    getUser: (state) => state?._user,
    getName: (state) => state._user?.name ?? "",
  },

  actions: {
    setUser(user, token) {
      this._user = user;
      localStorage.setItem("USER", JSON.stringify(user));

      if (token) {
        this._token = token;
        localStorage.setItem("AUTH_TOKEN", token);
        api.defaults.headers.common["Authorization"] = "Bearer " + token;
      }
    },

    async refreshTokenUser() {
      const storedUser = localStorage.getItem("USER");
      const storedToken = localStorage.getItem("AUTH_TOKEN");
      const { user, token } = await refreshToken(storedToken);

      if (!storedUser || !storedToken) return;
      if (!user || !token) return;

      this.setUser(user, token);
    },
  },
});
