<script setup>
import { reactive, ref } from "vue";
import { AuthLayout } from "src/layouts";
import { useRouter } from "vue-router";
import { BaseText } from "src/components/ui/base";
import { NewPasswordForm } from "./sections";
import { resetPassword } from "src/services/user";
import { Notify } from "quasar";
import { apiErrorHandler, formHelper } from "src/helpers";

const disabled = ref(false);
const loading = ref(false);
const { getPayload } = formHelper();
const ROUTER = useRouter();

const fields = reactive([
  {
    name: "password",
    type: "password",
    size: "is-full",
    label: "Nova senha",
    model: "",
    placeholder: "Crie uma nova senha",
    errorMessage: "",
  },
  {
    name: "password_confirmation",
    type: "password",
    size: "is-full",
    label: "Confirmar nova senha",
    model: "",
    placeholder: "Repita a senha",
    errorMessage: "",
  },
]);

async function onSubmit() {
  const { password, password_confirmation } = getPayload(fields);
  const email = localStorage.getItem("EMAIL_TOKEN_VALIDATION");
  const token = localStorage.getItem("USER_PASSWORD_TOKEN");
  const payload = {
    token,
    email,
    password,
    password_confirmation,
  };

  await resetNewPassword(payload);

  localStorage.removeItem("EMAIL_TOKEN_VALIDATION");
  localStorage.removeItem("USER_PASSWORD_TOKEN");
}

async function resetNewPassword(payload) {
  loading.value = true;

  try {
    await resetPassword(payload);

    Notify.create({
      type: "positive",
      message: "Senha redefinida com sucesso!",
    });
    ROUTER.push("/entrar");
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
  <q-page padding class="new-password">
    <AuthLayout
      has-image
      back-button
      back-button-link="#"
      href-submit="#"
      submit-label="Próximo"
    >
      <template #title>
        <BaseText tag="h2" class="auth-title"> Crie uma nova senha </BaseText>
      </template>

      <template #description>
        <BaseText class="description">
          Crie uma nova senha de acesso à sua conta.
        </BaseText>
      </template>

      <NewPasswordForm
        :disabled="disabled"
        :fields="fields"
        :loading="loading"
        @onSubmitNewPasswordForm="onSubmit"
      />
    </AuthLayout>
  </q-page>
</template>

<style lang="scss" scoped>
.new-password {
  display: grid;
  place-items: center;
}
</style>
