import { reactive } from "vue";

export default function () {
  const fields = reactive([
    {
      name: "email",
      type: "email",
      size: "is-full",
      label: "Email",
      model: "",
      placeholder: "Insira seu e-mail",
      errorMessage: "",
    },
    {
      name: "password",
      type: "password",
      size: "is-full",
      label: "Senha",
      model: "",
      placeholder: "Sua Senha",
      errorMessage: "",
    },
  ]);

  return {
    fields,
  };
}
