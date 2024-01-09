<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { AuthLayout } from "src/layouts";
import { BaseText } from "src/components/ui/base";
import { EmailCodeForm } from "./sections";
import { validateToken } from "src/services/user";
import { Notify } from "quasar";
import { apiErrorHandler, formHelper } from "src/helpers";

const disabled = ref(false);
const loading = ref(false);
const { getPayload } = formHelper();
const ROUTER = useRouter();

const fields = reactive([
  {
    name: "number1",
    type: "number",
    size: "is-email-code",
    model: "",
    mask: "",
  },
  {
    name: "number2",
    type: "number",
    size: "is-email-code",
    model: "",
  },
  {
    name: "number3",
    type: "number",
    size: "is-email-code",
    model: "",
  },
  {
    name: "number4",
    type: "number",
    size: "is-email-code",
    model: "",
  },
  {
    name: "number5",
    type: "number",
    size: "is-email-code",
    model: "",
  },
  {
    name: "number6",
    type: "number",
    size: "is-email-code",
    model: "",
  },
]);

async function onSubmit() {
  const payload = getPayload(fields);
  const valuesArray = Object.values(payload);
  const concatenatedString = valuesArray.join("");
  const userEmail = localStorage.getItem("EMAIL_TOKEN_VALIDATION");

  localStorage.setItem("USER_PASSWORD_TOKEN", concatenatedString);

  const userPayload = {
    token: concatenatedString,
    email: userEmail,
  };

  await checkResetPasswordToken(userPayload);
}

async function checkResetPasswordToken(payload) {
  loading.value = true;

  try {
    await validateToken(payload);

    Notify.create({
      type: "positive",
      message: "O token foi verificado corretamente!",
    });
    ROUTER.push("/nova-senha");
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
  <q-page padding class="email-code">
    <AuthLayout
      form-variation="is-email-code"
      has-image
      back-button
      back-button-link="/esqueceu-sua-senha"
      href-submit="#"
      submit-label="Próximo"
    >
      <template #title>
        <BaseText tag="h2" class="auth-title"> Confira o seu email </BaseText>
      </template>

      <template #description>
        <BaseText class="description">
          Insira nos campos abaixo o código que enviamos para você no seu
          endereço de e-mail.
        </BaseText>
      </template>

      <EmailCodeForm
        :disabled="disabled"
        :fields="fields"
        :loading="loading"
        @onSubmitEmailCodeForm="onSubmit"
      />

      <BaseText class="auth-send-code">
        Não recebeu o código?
        <RouterLink to="/esqueceu-sua-senha">Reenviar</RouterLink>
      </BaseText>
    </AuthLayout>
  </q-page>
</template>

<style lang="scss" scoped>
.email-code {
  display: grid;
  place-items: center;
}
</style>
