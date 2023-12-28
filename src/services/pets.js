import { api } from "src/boot/axios";

const baseUrl = "/pets";

const authCheck = (status, router) => {
  if (status === 401) {
    router.push("/entrar");
    return;
  }
};

export const listAll = (params, router) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.get(baseUrl, { params });
      resolve(data);
    } catch (error) {
      authCheck(error.response.status, router);
      reject(error);
    }
  });
};

export const deleteItem = (id, router) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.delete(`${baseUrl}/${id}`);
      resolve(data);
    } catch (error) {
      authCheck(error.response.status, router);
      reject(error);
    }
  });
};

export const createItem = (payload, headers, router) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.post(baseUrl, payload, headers);
      resolve(data);
    } catch (error) {
      authCheck(error.response.status, router);
      reject(error);
    }
  });
};

export const updateItem = (id, payload, router) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.post(
        `${baseUrl}/${id}`,
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

export const itemDetails = (id, router) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await api.get(`${baseUrl}/${id}`);
      resolve(data);
    } catch (error) {
      authCheck(error.response.status, router);
      reject(error);
    }
  });
};
