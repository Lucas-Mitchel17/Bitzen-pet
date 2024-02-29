import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { refreshToken } from "src/services/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    _user: {
      id: null,
      name: "",
      profile_photo_url: "",
    },
    _token: "",
  }),

  getters: {
    getUser: (state) => state?._user,
    getName: (state) => state._user?.name ?? "",
    getImage: (state) => state._user?.profile_photo_url ?? "",
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

      if (!storedUser || !storedToken) return;

      const { user, token } = await refreshToken(storedToken);

      if (!user || !token) return;

      this.setUser(user, token);
    },
  },
});
