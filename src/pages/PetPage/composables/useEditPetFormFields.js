import { reactive, ref } from "vue";

export default function () {
  const petName = ref("");
  const petColor = ref("");
  const petDescription = ref("");
  const petBirthdate = ref("");
  const petFile = ref("");

  const petValues = {
    petName,
    petColor,
    petBirthdate,
    petDescription,
    petFile,
  };

  const fields = reactive([
    {
      name: "name",
      type: "text",
      size: "is-half",
      label: "Nome",
      model: petName,
      placeholder: "Nome do pet",
      errorMessage: "",
    },
    {
      name: "color",
      type: "text",
      size: "is-half",
      label: "Cor",
      model: petColor,
      placeholder: "Cor do pet",
      errorMessage: "",
    },
    {
      name: "birthdate",
      type: "date",
      size: "is-half",
      label: "Data de Nascimento",
      model: petBirthdate,
      placeholder: "Selecione",
      errorMessage: "",
    },
    {
      name: "observation",
      type: "textarea",
      size: "is-half",
      label: "Sobre o pet",
      model: petDescription,
      placeholder: "Escreva um pequeno texto sobre o pet",
      errorMessage: "",
    },
    {
      name: "image",
      type: "file",
      size: "is-pet-picture",
      label: "Foto",
      model: petFile,
      placeholder: "Clique para adicionar uma imagem",
      errorMessage: "",
      multiple: false,
    },
  ]);

  return {
    fields,
    petValues,
  };
}
