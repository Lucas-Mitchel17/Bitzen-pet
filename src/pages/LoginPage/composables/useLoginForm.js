import { reactive } from "vue";

export default function () {
  const fields = reactive([
    {
      name: "email",
      type: "email",
      size: "is-full",
      label: "Email",
      model: "lucasmitchelcampos17@gmail.com",
      placeholder: "Insira seu e-mail",
      errorMessage: "",
    },
    {
      name: "password",
      type: "password",
      size: "is-full",
      label: "Senha",
      model: "123456Lu.",
      placeholder: "Sua Senha",
      errorMessage: "",
    },
  ]);

  return {
    fields,
  };
}
