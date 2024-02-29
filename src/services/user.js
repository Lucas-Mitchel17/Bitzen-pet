import { api } from "src/boot/axios";
import { Notify } from "quasar";
import router from "src/router";

const baseUrl = "/user";

const authCheck = (status, router) => {
  if (status === 401) {
    router.push("/entrar");
    return;
  }
};

export const userData = (router) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.get(baseUrl);
      resolve(data);
    } catch (error) {
      authCheck(error.response.status, router);
      reject(error);
    }
  });
};

export const update = (payload, router) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.post(
        baseUrl,
        { _method: "put", ...payload },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      resolve(data);
    } catch (error) {
      authCheck(error.response.status, router);
      reject(error);
    }
  });
};

export const logout = (router) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await api.post("/logout");
      localStorage.removeItem("AUTH_TOKEN");
      router.push("/entrar");
      Notify.create({ type: "positive", message: "Logout feito com sucesso" });

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const refreshToken = (storedToken) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.post(
        "/refresh-token",
        {},
        {
          headers: {
            Authorization: "Bearer " + storedToken,
          },
        }
      );
      resolve(data.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const sendPasswordCode = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.post("/forgot-password", payload);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const validateToken = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await api.post("/reset-password/token/validate", payload);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const resetPassword = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await api.post("/reset-password", payload);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};
