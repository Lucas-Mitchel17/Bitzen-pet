<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "boot/axios";
import { Notify } from "quasar";
import { apiErrorHandler, formHelper } from "src/helpers";
import { useUserStore } from "src/stores";
import { AuthLayout } from "src/layouts";
import { BaseText } from "src/components/ui/base";
import { useSignUpFormFields } from "./composables";
import { SignUpForm } from "./sections";

const ROUTER = useRouter();
const { fields } = useSignUpFormFields();

const USER_STORE = useUserStore();

const { getPayload } = formHelper();

const disabled = ref(false);
const loading = ref(false);

async function onSubmit() {
  const payload = getPayload(fields);

  loading.value = true;
  await register(payload);
  loading.value = false;
}

function register(payload) {
  return api
    .post("/register", payload)
    .then((response) => response.data.data)
    .then(({ user, token }) => {
      USER_STORE.$patch(user);

      localStorage.setItem("AUTH_TOKEN", token);

      Notify.create({
        type: "positive",
        message: "Cadastro realizado com sucesso!",
      });

      ROUTER.push("/entrar");
    })
    .catch((error) => {
      const { message, data } = apiErrorHandler(error);
      Notify.create({ type: "negative", message });

      fields.forEach((field) => {
        const hasKey = data.hasOwnProperty(field.name);

        if (hasKey) {
          field.errorMessage = data[field.name][0];
        }
      });
    });
}
</script>

<template>
  <q-page padding class="sign-up">
    <AuthLayout
      back-button
      back-button-link="/entrar"
      form-variation="is-large"
      submit-label="Criar Conta"
    >
      <template #main-title>
        <BaseText tag="h1"> Cadastre-se </BaseText>
      </template>

      <template #description>
        <BaseText class="description">
          Já possui uma conta?
          <RouterLink to="/login">Entrar na plataforma</RouterLink>
        </BaseText>
      </template>

      <SignUpForm
        :disabled="disabled"
        :fields="fields"
        :loading="loading"
        @onSubmitSignUpForm="onSubmit"
      />
    </AuthLayout>
  </q-page>
</template>

<style lang="scss" scoped>
.sign-up {
  display: grid;
  place-items: center;
}
</style>
