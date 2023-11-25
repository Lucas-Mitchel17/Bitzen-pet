<script setup>
import { ref, reactive } from "vue";
import { AuthLayout } from "src/layouts";
import { BaseText } from "src/components/ui/base";

const disabled = ref(false);
const loading = ref(false);
const checkbox = ref(false);

const fields = reactive([
  {
    type: "text",
    size: "is-full",
    label: "Nome",
    model: "",
    placeholder: "Seu Nome",
    errorMessage: "Campo obrigatório",
  },
  {
    type: "email",
    size: "is-full",
    label: "Email",
    model: "",
    placeholder: "Insira seu e-mail",
    errorMessage: "Campo obrigatório",
  },
  {
    type: "number",
    size: "is-half",
    label: "CPF",
    model: "",
    placeholder: "Insira o seu CPF",
    errorMessage: "Campo obrigatório",
  },
  {
    type: "tel",
    size: "is-half",
    label: "Telefone",
    model: "",
    placeholder: "Insira o seu telefone",
    errorMessage: "Campo obrigatório",
  },
  {
    type: "password",
    size: "is-half",
    label: "Senha",
    model: "",
    placeholder: "Crie uma senha",
    errorMessage: "Campo obrigatório",
  },
  {
    type: "password",
    size: "is-half",
    label: "Confirmar senha",
    model: "",
    placeholder: "Repita a senha",
    errorMessage: "Campo obrigatório",
  },
]);
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

      <q-form class="q-gutter-md auth-form">
        <q-input
          v-model="field.model"
          v-for="field in fields"
          lazy-rules
          outlined
          stack-label
          :class="field.size"
          :label="field.label"
          :key="field.label"
          :placeholder="field.placeholder"
          :rules="[(val) => (val && val.length > 0) || field.errorMessage]"
          :type="field.type"
          :loading="loading"
          :disable="disabled"
        />

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
