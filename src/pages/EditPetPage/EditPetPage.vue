<script setup>
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "boot/axios";
import { Notify } from "quasar";
import { apiErrorHandler, formHelper } from "src/helpers";

const { getPayload } = formHelper();

const ROUTER = useRouter();
const ROUTE = useRoute();
const disabled = ref(false);
const loading = ref(false);

const petData = ROUTE.params;
console.log("🚀 ~ file: EditPetPage.vue:16 ~ petData:", petData);

const fields = reactive([
  {
    name: "name",
    type: "text",
    size: "is-half",
    label: "Nome",
    model: "",
    placeholder: "Nome do pet",
    errorMessage: "",
  },
  {
    name: "color",
    type: "text",
    size: "is-half",
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
    size: "is-half",
    label: "Sobre o pet",
    model: "",
    placeholder: "Escreva um pequeno texto sobre o pet",
    errorMessage: "",
  },
  {
    name: "image",
    type: "file",
    size: "is-pet-picture",
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
      console.log(data);
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
    <div class="pet-form">
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
    </div>

    <q-btn
      class="btn is-blue is-full new-pet-btn"
      label="Criar Pet"
      @click="onSubmit"
      :loading="loading"
    />
  </q-page>
</template>

<style lang="scss">
.new-pet {
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-top: 65px;
  position: relative;

  @media (min-width: $xxl) {
    align-items: flex-end;
  }

  .pet-form {
    background-color: white;
    border-radius: 8px;
    max-width: 1023px;
    padding: 64px 40px 0;
    width: 100%;

    & > .is-half {
      width: 100%;

      @media (min-width: $xxl) {
        width: 50%;
      }
    }

    & > .is-pet-picture {
      @media (min-width: $xxl) {
        position: absolute;
        top: 65px;
        left: 0;
        min-height: 280px;
      }

      .q-field__control {
        height: 100% !important;
      }
    }
  }

  .new-pet-btn {
    max-width: 1023px;
  }

  .q-field--with-bottom {
    padding-bottom: 50px;
  }

  .q-field--outlined .q-field__control {
    height: auto !important;
  }
}
</style>
