<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { AuthLayout } from "src/layouts";
import { BaseText } from "src/components/ui/base";
import { ForgotPasswordForm } from "./sections";
import { sendPasswordCode } from "src/services/user";
import { Notify } from "quasar";
import { apiErrorHandler, formHelper } from "src/helpers";

const disabled = ref(false);
const loading = ref(false);
const { getPayload } = formHelper();
const ROUTER = useRouter();

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
]);

async function onSubmit() {
  const payload = getPayload(fields);
  const userEmail = fields[0].model;

  localStorage.setItem("EMAIL_TOKEN_VALIDATION", userEmail);

  await sendCodeEmail(payload);
}

async function sendCodeEmail(payload) {
  loading.value = true;

  try {
    await sendPasswordCode(payload);

    Notify.create({
      type: "positive",
      message: "Código enviado para o seu email!",
    });
    ROUTER.push("/codigo-de-verificacao");
  } catch (error) {
    const { message, data } = apiErrorHandler(error);

    Notify.create({ type: "negative", message });

    if (data) {
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
</script>

<template>
  <q-page padding class="forgot-password">
    <AuthLayout hasImage backButton backButtonLink="/entrar">
      <template #title>
        <BaseText tag="h2" class="auth-title"> Esqueceu sua senha? </BaseText>
      </template>

      <template #description>
        <BaseText class="description">
          Vamos te ajudar nisso! Primeiro, digite seu e-mail cadastrado ao criar
          a sua conta.
        </BaseText>
      </template>

      <ForgotPasswordForm
        :disabled="disabled"
        :fields="fields"
        :loading="loading"
        @onSubmitForgotPasswordForm="onSubmit"
      />
    </AuthLayout>
  </q-page>
</template>

<style lang="scss" scoped>
.forgot-password {
  display: grid;
  place-items: center;
}
</style>
