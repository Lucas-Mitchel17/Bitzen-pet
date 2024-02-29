import { Notify } from "quasar";

export default function (error) {
  function throwDeveloperError(error) {
    if (error.name === "AxiosError") {
      const { code, message, response } = error;
      const { data, status } = response;

      console.error({
        code,
        message,
        status: status,
        data: data.data,
      });
    }
  }

  function getUserErrors(error) {
    if (error.name === "AxiosError") {
      const { response } = error;
      let { message, data } = response.data;

      // if (message === "Você não está autenticado.") {
      //   Notify.create({ type: "negative", message });
      //   message = "MISSING_AUTH";
      // }

      return {
        data,
        message,
      };
    }

    throw error;
  }

  if (process.env.DEV) {
    throwDeveloperError(error);
  }

  return getUserErrors(error);
}
