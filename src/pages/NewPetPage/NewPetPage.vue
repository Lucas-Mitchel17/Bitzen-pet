<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "boot/axios";
import { Notify } from "quasar";
import { apiErrorHandler, formHelper } from "src/helpers";

const { getPayload } = formHelper();

const ROUTER = useRouter();
const disabled = ref(false);
const loading = ref(false);

const fields = reactive([
  {
    name: "name",
    type: "text",
    size: "is-full",
    label: "Nome",
    model: "",
    placeholder: "Nome do pet",
    errorMessage: "",
  },
  {
    name: "color",
    type: "text",
    size: "is-full",
    label: "Cor",
    model: "",
    placeholder: "Cor do pet",
    errorMessage: "",
  },
  {
    name: "birthdate",
    type: "date",
    size: "is-half",
    label: "Data de Nascimento",
    model: "",
    placeholder: "Selecione",
    errorMessage: "",
  },
  {
    name: "description",
    type: "textarea",
    size: "is-full",
    label: "Sobre o pet",
    model: "",
    placeholder: "Escreva um pequeno texto sobre o pet",
    errorMessage: "",
  },
  {
    name: "image",
    type: "file",
    size: "is-full",
    label: "Foto",
    model: "",
    placeholder: "Clique para adicionar uma imagem",
    errorMessage: "",
    multiple: false,
  },
]);

async function onSubmit() {
  const payload = getPayload(fields);

  loading.value = true;
  await createPet(payload).finally(() => (loading.value = false));
}

async function createPet(payload) {
  return await api
    .post("/pets", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data.data)
    .then((response) => {
      Notify.create({
        type: "positive",
        message: "Pet cadastrado com sucesso!",
      });

      ROUTER.push("/seus-pets");
    })
    .catch((error) => {
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
    });
}

async function updatePet(payload) {
  return await api
    .put("/pets", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data.data)
    .then((response) => {
      Notify.create({
        type: "positive",
        message: "Pet atualizado com sucesso!",
      });

      ROUTER.push("/seus-pets");
    })
    .catch((error) => {
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
    });
}
</script>

<template>
  <q-page padding class="new-pet">
    <router-link to="/seus-pets">
      <q-btn type="submit" class="btn is-back">
        <svg
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 19.5L3 12M3 12L10.5 4.5M3 12H21"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>

        Voltar
      </q-btn>
    </router-link>

    <q-input
      v-model="field.model"
      v-for="field in fields"
      lazy-rules
      outlined
      stack-label
      :rules="[field.errorMessage]"
      :class="field.size"
      :label="field.label"
      :key="field.label"
      :placeholder="field.placeholder"
      :type="field.type"
      :loading="loading"
      :disable="disabled"
      :error="!!field.errorMessage"
      :mask="field.mask"
    >
      <template #error>
        <div>{{ field.errorMessage }}</div>
      </template>
    </q-input>

    <q-btn
      class="btn is-blue"
      label="Criar Pet"
      @click="onSubmit"
      :loading="loading"
    />
  </q-page>
</template>

<style lang="scss">
.new-pet {
  padding: 40px 30px;

  .new-pet-btn {
    margin-bottom: 40px;
  }

  .q-field--with-bottom {
    padding-bottom: 60px;
  }

  .q-field--outlined .q-field__control {
    height: auto !important;
  }
}
</style>
