<script setup>
import { ref, reactive } from "vue";
import { api } from "boot/axios";
import { Notify } from "quasar";
import { apiErrorHandler } from "src/helpers";
import { AuthLayout } from "src/layouts";
import { BaseText } from "src/components/ui/base";

const disabled = ref(false);
const loading = ref(false);
const checkbox = ref(false);

const fields = reactive([
  {
    name: "name",
    type: "text",
    size: "is-full",
    label: "Nome",
    model: "Lucas",
    placeholder: "Seu Nome",
    errorMessage: "",
  },
  {
    name: "email",
    type: "email",
    size: "is-full",
    label: "Email",
    model: "lucas@gmail.com",
    placeholder: "Insira seu e-mail",
    errorMessage: "",
  },
  {
    name: "document",
    type: "text",
    size: "is-half",
    label: "CPF",
    model: "15115732602",
    placeholder: "Insira o seu CPF",
    errorMessage: "",
    mask: "XXX.XXX.XXX-XX",
  },
  {
    name: "phone_number",
    type: "tel",
    size: "is-half",
    label: "Telefone",
    model: "31987698188",
    placeholder: "Insira o seu telefone",
    errorMessage: "",
    mask: "XX XXXX-XXXX",
  },
  {
    name: "password",
    type: "password",
    size: "is-half",
    label: "Senha",
    model: "12345678",
    placeholder: "Crie uma senha",
    errorMessage: "",
  },
  {
    name: "password_confirmation",
    type: "password",
    size: "is-half",
    label: "Confirmar senha",
    model: "12345678",
    placeholder: "Repita a senha",
    errorMessage: "",
  },
]);

function onSubmit() {
  const payload = getPayload();

  register(payload);
}

function getPayload() {
  const payload = {};

  fields.forEach(({ name, model, mask, type }) => {
    if (type === "tel") {
      payload[name] = `${model.substring(0, 2)} ${model.substring(2)}`;
      return;
    }

    if (mask) {
      payload[name] = model.replace(/[ .-]/g);
      return;
    }

    payload[name] = model;
  });

  return payload;
}

function register(payload) {
  return api
    .post("/register", payload)
    .then((response) => {
      console.log(response);
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
      back-button-link="/login"
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

      <q-form class="q-gutter-md auth-form" @submit="onSubmit">
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

        <div class="auth-check-pass">
          <div class="auth-checkbox">
            <q-checkbox class="auth-checkbox-icon" v-model="checkbox" />

            <BaseText class="auth-checkbox-label is-sign-up">
              Li e concordo com os
              <RouterLink to="#">Termos de uso</RouterLink> e a
              <RouterLink to="#">Política de privacidade</RouterLink> do
              sistema.
            </BaseText>
          </div>

          <div class="auth-forgot-password">
            <router-link to="/esqueceu-sua-senha">
              <BaseText class="is-blue"> Esqueceu sua senha? </BaseText>
            </router-link>
          </div>
        </div>

        <q-btn type="submit" class="btn is-blue is-full" label="Criar conta" />
      </q-form>
    </AuthLayout>
  </q-page>
</template>

<style lang="scss" scoped>
.sign-up {
  display: grid;
  place-items: center;
}
</style>
