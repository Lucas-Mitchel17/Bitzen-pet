import { api } from "src/boot/axios";

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

export const logout = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await api.post("/logout");
      resolve(data);
    } catch (error) {
      authCheck(error.response.status, router);
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
