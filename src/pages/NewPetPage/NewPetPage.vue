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
    model: "Teste",
    placeholder: "Insira o nome do pet",
    errorMessage: "",
  },
  {
    name: "color",
    type: "text",
    size: "is-full",
    label: "Cor",
    model: "Branca",
    placeholder: "Insira a cor do seu Pet",
    errorMessage: "",
  },
  {
    name: "birthdate",
    type: "date",
    size: "is-half",
    label: "Data de Nascimento",
    model: "2022-05-05",
    placeholder: "",
    errorMessage: "",
  },
  {
    name: "description",
    type: "textarea",
    size: "is-full",
    label: "Descrição",
    model: "asldkasd alskdjaslkdj laksjdalksjd aslkdjaslkd asldkjaskldjas ",
    placeholder: "Insira uma descrição do seu pet",
    errorMessage: "",
  },
  {
    name: "image",
    type: "file",
    size: "is-full",
    label: "Foto",
    model: "",
    placeholder: "Insira uma foto para seu Pet",
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

async function getPetDetails(id) {
  loading.value = true;

  return await api
    .get(`/pets/${id}`)
    .then((response) => response.data.data)
    .then(({ data }) => ({
      // TODO: Preencher os campos com os valores
    }))
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

// TODO : Criar confirmação de deletar. O Botao que confirma é que chama essa fu
async function deletePet(id) {
  loading.value = true;

  return await api
    .delete(`/pets/${id}`)
    .then((response) => response.data.data)
    .then(({ data }) => {
      Notify.create({
        type: "positive",
        message: "Pet deletado com sucesso!",
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
  <q-page padding>
    <q-btn label="CRIAR" @click="onSubmit" :loading="loading" />

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
  </q-page>
</template>

<style lang="scss" scoped></style>
