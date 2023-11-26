export default function () {
  function getPayload(fields) {
    const payload = {};

    fields.forEach(({ name, model, mask, type }) => {
      if (type === "tel") {
        payload[name] = `${model.substring(0, 2)} ${model.substring(2)}`;
        return;
      }

      // NOTE: handle attr multiple here in the future
      if (type === "file") {
        payload[name] = model[0];
        return;
      }

      if (mask) {
        payload[name] = model.replace(/[ .-]/g, "");
        return;
      }

      payload[name] = model;
    });

    return payload;
  }

  return {
    getPayload,
  };
}
