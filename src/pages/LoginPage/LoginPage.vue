<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { api } from "boot/axios";
import { Notify } from "quasar";
import { apiErrorHandler, formHelper } from "src/helpers";
import { useUserStore } from "src/stores";
import { AuthLayout } from "src/layouts";
import { BaseText } from "src/components/ui/base";
import { LoginForm } from "./sections";
import { useLoginForm } from "./composables";

const ROUTER = useRouter();
const USER_STORE = useUserStore();
const { fields } = useLoginForm();

const { getPayload } = formHelper();

const disabled = ref(false);
const loading = ref(false);

async function onSubmit() {
  const payload = getPayload(fields);

  loading.value = true;
  await login(payload).finally(() => (loading.value = false));
}

async function login(payload) {
  return await api
    .post("/login", payload)
    .then((response) => response.data.data)
    .then(({ user, token }) => {
      USER_STORE.setUser(user, token);

      Notify.create({
        type: "positive",
        message: "Login efetuado com sucesso!",
      });

      ROUTER.push("/seus-pets");
    })
    .catch((error) => {
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
    });
}
</script>

<template>
  <q-page padding class="login">
    <AuthLayout has-image>
      <template #title>
        <BaseText tag="h2" class="auth-title"> Entrar na plataforma </BaseText>
      </template>

      <template #description>
        <BaseText class="description">
          Não tem uma conta?
          <RouterLink to="/cadastro">Cadastre-se gratuitamente</RouterLink>
        </BaseText>
      </template>

      <LoginForm
        :disabled="disabled"
        :fields="fields"
        :loading="loading"
        @onSubmitLoginForm="onSubmit"
      />
    </AuthLayout>
  </q-page>
</template>

<style lang="scss" scoped>
.login {
  display: grid;
  place-items: center;
}
</style>
