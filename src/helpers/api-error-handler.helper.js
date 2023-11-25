export default function (error) {
  function throwDeveloperError({ code, message, response }) {
    const { data, status } = response;

    console.error({
      code,
      message,
      status: status,
      data: data.data,
    });
  }

  function getUserErrors({ response }) {
    const { message, data } = response.data;

    return {
      data,
      message,
    };
  }

  if (process.env.DEV) {
    throwDeveloperError(error);
  }

  return getUserErrors(error);
}
