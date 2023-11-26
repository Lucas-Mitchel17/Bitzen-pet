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
      const { message, data } = response.data;

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
