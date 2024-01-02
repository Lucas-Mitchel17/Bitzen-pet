<script setup>
import { onBeforeMount, reactive, ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import { itemDetails, updateItem } from "src/services/pets";
import { Notify } from "quasar";
import { apiErrorHandler, formHelper } from "src/helpers";
import { PetForm } from "src/components/ui/nested";
import { ActionsSection, PetInfo } from "./sections";

const { getPayload } = formHelper();
const ROUTER = useRouter();
const disabled = ref(false);
const loading = ref(false);
const route = useRoute();
const isEditing = ref(route.path.includes("edit"));

const petId = route.params.id;

const petName = ref("");
const petColor = ref("");
const petDescription = ref("");
const petImage = ref("");
const petBirthdate = ref("");
const petFile = ref("");

const petData = reactive({
  name: "",
  color: "",
  age: "",
  birthdate: "",
  description: "",
  image: "",
});

watchEffect(() => {
  isEditing.value = route.path.includes("edit");
  petName.value = petData.name;
  petColor.value = petData.color;
  petDescription.value = petData.description;
  petBirthdate.value = petData.birthdate;
  petImage.value = petData.image;
});

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

onBeforeMount(async () => await getPetDetails(petId));

async function getPetDetails(id) {
  loading.value = true;
  try {
    const { data } = await itemDetails(id, ROUTER);

    Object.assign(petData, data);
    petData.description = data.observation;
    petData.image = data.image_url;

    petName.value = data.name;
    petColor.value = data.color;
    petDescription.value = data.observation;
    petBirthdate.value = data.birthdate;
    petImage.value = data.image_url;
  } catch (error) {
    const { message, data } = apiErrorHandler(error);

    if (data) {
      Notify.create({ type: "negative", message });

      fields.forEach((field) => {
        const hasKey = data.hasOwnProperty(field.name);

        if (hasKey) {
          field.errorMessage = data[field.name][0];
        }
      });
    }
  } finally {
    loading.value = false;
  }
}

function selectFile() {
  const input = document.querySelector(".is-pet-picture");
  input.addEventListener("change", handleFileChange);
  input.click();
}

function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const imageURL = URL.createObjectURL(file);

    petFile.value = [file];
    petImage.value = imageURL;
  }
}

async function onSubmit() {
  const payload = getPayload(fields);

  loading.value = true;
  await updatePet(payload).finally(() => (loading.value = false));
}

async function updatePet(payload) {
  try {
    await updateItem(petId, payload, ROUTER);

    petData.description = petDescription.value;
    petData.image = petImage.value;
    petData.birthdate = petBirthdate.value;
    petData.color = petColor.value;
    petData.name = petName.value;

    Notify.create({
      type: "positive",
      message: "Pet atualizado com sucesso!",
    });

    ROUTER.push(`/pet/${petId}`);
  } catch (error) {
    const { message, data } = apiErrorHandler(error);

    if (message === "MISSING_AUTH") {
      ROUTER.push("/entrar");
      return;
    }

    if (data) {
      Notify.create({ type: "negative", message });

      fields.forEach((field) => {
        const hasKey = data.hasOwnProperty(field.name);

        if (hasKey) {
          field.errorMessage = data[field.name][0];
        }
      });
    }
  }
}
</script>

<template>
  <q-page padding class="pet-page">
    <section class="show-pet" v-if="!isEditing">
      <ActionsSection :pet-id="petId" />

      <PetInfo
        :pet-image="petData.image"
        :pet-name="petData.name"
        :pet-color="petData.color"
        :pet-age="petData.age"
        :pet-description="petData.description"
      />
    </section>

    <section class="form" v-else>
      <PetForm
        :disabled="disabled"
        :fields="fields"
        :loading="loading"
        :petImage="petImage"
        @onSelectFile="selectFile()"
      />

      <q-btn
        class="btn is-blue is-full new-pet-btn"
        label="Atualizar Pet"
        @click="onSubmit"
        :loading="loading"
      />
    </section>
  </q-page>
</template>

<style lang="scss">
.pet-page {
  padding-top: 30px;

  .form {
    align-items: center;
    display: flex;
    flex-direction: column;
    padding-top: 65px;
    position: relative;

    @media (min-width: $xxl) {
      align-items: flex-end;
    }

    .new-pet-btn {
      max-width: 1023px;
    }
  }
}
</style>
