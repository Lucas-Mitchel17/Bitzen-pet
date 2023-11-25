import { reactive } from "vue";

export default function () {
  const fields = reactive([
    {
      name: "name",
      type: "text",
      size: "is-full",
      label: "Nome",
      model: "",
      placeholder: "Seu Nome",
      errorMessage: "",
    },
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
      name: "document",
      type: "text",
      size: "is-half",
      label: "CPF",
      model: "",
      placeholder: "Insira o seu CPF",
      errorMessage: "",
      mask: "XXX.XXX.XXX-XX",
    },
    {
      name: "phone_number",
      type: "tel",
      size: "is-half",
      label: "Telefone",
      model: "",
      placeholder: "Insira o seu telefone",
      errorMessage: "",
      mask: "XX XXXX-XXXX",
    },
    {
      name: "password",
      type: "password",
      size: "is-half",
      label: "Senha",
      model: "",
      placeholder: "Crie uma senha",
      errorMessage: "",
    },
    {
      name: "password_confirmation",
      type: "password",
      size: "is-half",
      label: "Confirmar senha",
      model: "",
      placeholder: "Repita a senha",
      errorMessage: "",
    },
  ]);

  return {
    fields,
  };
}
